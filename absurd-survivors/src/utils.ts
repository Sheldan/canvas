import {Vector} from "./base.ts";

export function drawDot(position: Vector, size: number, color: string, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(position.x, position.y, size, 0, 2 * Math.PI);
    ctx.fill();
}

export function moveInDirectionOf(position: Vector, target: Vector, speedFactor: number): Vector {
    let playerVector = Vector.createVector(target, position);
    let direction = playerVector.normalize()
    return position.add(direction.multiply(speedFactor))
}

export function straightMove(position: Vector, speed: Vector): Vector {
    return position.add(speed)
}

export function toRad(angle) {
    return angle / 180 * Math.PI;
}

export function toDegrees(angle) {
    return angle * 180 / Math.PI
}

export function pointInsideCircle(circleCenter: Vector, radius: number, point: Vector) {
    return circleCenter.distanceTo(point) < radius;
}

export function linePointCollision(point: Vector, lineStart: Vector, lineEnd: Vector) {
    let lineLength = Vector.createVector(lineEnd, lineStart).vecLength();
    let distanceStart = Vector.createVector(lineStart, point).vecLength()
    let distanceEnd = Vector.createVector(lineEnd, point).vecLength();
    let buffer = 0.001
    if((distanceStart + distanceEnd) >= (lineLength - buffer) && (distanceEnd + distanceStart) <= (lineLength + buffer)) {
        return true;
    }
    return false;
}

export function pointOnLineWithinLine(circleCenter: Vector, lineStart: Vector, lineEnd: Vector) {
    let lineVector = Vector.createVector(lineEnd, lineStart)
    let vectorCenterLine = Vector.createVector(circleCenter, lineStart)
    let dot = vectorCenterLine.dotProduct(lineVector)
    let closestX = lineStart.x + (dot * (lineVector.x))
    let closestY = lineStart.y + (dot * (lineVector.y))
    let closestPoint = new Vector(closestX, closestY);
    return linePointCollision(closestPoint, lineStart, lineEnd);
}

export function circleLineCollision(circleCenter: Vector, radius: number, lineStart: Vector, lineEnd: Vector) {
    if(pointInsideCircle(circleCenter, radius, lineStart) || pointInsideCircle(circleCenter, radius, lineEnd)) {
        return true;
    }
    let lineVector = Vector.createVector(lineEnd, lineStart)
    let vectorCenterLine = Vector.createVector(circleCenter, lineStart)
    let dot = vectorCenterLine.dotProduct(lineVector)
    let closestX = lineStart.x + (dot * (lineVector.x))
    let closestY = lineStart.y + (dot * (lineVector.y))
    let closestPoint = new Vector(closestX, closestY);
    let onSegment = linePointCollision(closestPoint, lineStart, lineEnd)
    if(!onSegment) {
        return false;
    }

    return pointInsideCircle(circleCenter, radius, closestPoint);
}

export function getCoordinatesSplit(amount: number) {
    let angle = 2 * Math.PI / amount;
    let points: Vector[] = [];
    for (let i = 0; i < amount; i++) {
        let x = Math.cos(angle * i)
        let y = Math.sin(angle * i)
        points.push(new Vector(x, y))
    }
    return points;
}

export function randomItem(items: any[]) {
    return items[Math.floor(Math.random() * items.length)]
}