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