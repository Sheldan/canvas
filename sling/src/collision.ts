import {Circle, Line, Vector} from "./vector.ts";
import {Circable, Collidable, CollisionBehaviour, Drawable, Lineable, MassOwning, MovingItem} from "./abstracts.ts";
import {InstanceOfUtils} from "./instances.ts";

export enum CollisionType {
    MISS = 0,
    HIT = 1,
}

export class CollisionResult {
    constructor(private _type: CollisionType, private _collisionLocation?: Vector) {

    }

    static miss(): CollisionResult {
        return new CollisionResult(CollisionType.MISS)
    }

    static hit(point: Vector): CollisionResult {
        return new CollisionResult(CollisionType.HIT, point)
    }

    get type(): CollisionType {
        return this._type;
    }

    get collision(): Vector | undefined {
        return this._collisionLocation;
    }
}

class CollisionPair {
    constructor(private _first: CollisionBehaviour, private _second: CollisionBehaviour) {
    }


    get first(): CollisionBehaviour {
        return this._first;
    }

    get second(): CollisionBehaviour {
        return this._second;
    }
}

export class CollisionManager {

    private collTypes = new Map<CollisionPair, (first: Collidable, second: Collidable) => CollisionResult>();
    private collReactions = new Map<CollisionPair, (first: Collidable, second: Collidable, point: Vector) => void>();

    constructor() {
        this.addCollisionMapper(CollisionBehaviour.LINE, CollisionBehaviour.CIRCLE, this.circleLine)
        this.addCollisionMapper(CollisionBehaviour.CIRCLE, CollisionBehaviour.CIRCLE, this.circleCircle)
        this.addCollisionReactions(CollisionBehaviour.LINE, CollisionBehaviour.CIRCLE, this.circleLineAngleOut)
        this.addCollisionReactions(CollisionBehaviour.CIRCLE, CollisionBehaviour.CIRCLE, this.circleCircleAngleOut)
    }

    private addCollisionMapper(first: CollisionBehaviour, second: CollisionBehaviour, method: (first: Collidable, second: Collidable) => CollisionResult) {
        this.collTypes.set(new CollisionPair(first, second), method)
        this.collTypes.set(new CollisionPair(second, first), method)
    }

    private addCollisionReactions(first: CollisionBehaviour, second: CollisionBehaviour, method: (first: Collidable, second: Collidable, point: Vector) => void) {
        this.collReactions.set(new CollisionPair(first, second), method)
        this.collReactions.set(new CollisionPair(second, first), method)
    }

    private getCollisionPair(first: CollisionBehaviour, second: CollisionBehaviour): CollisionPair | undefined {
        for (let [key, value] of this.collTypes.entries()) {
            if(key.first === first && key.second === second) {
                return key;
            }
        }
        return undefined;
    }

    private getCollisionReactionPair(first: CollisionBehaviour, second: CollisionBehaviour): CollisionPair | undefined {
        for (let [key, value] of this.collReactions.entries()) {
            if(key.first === first && key.second === second) {
                return key;
            }
        }
        return undefined;
    }

    collide(collidable: Collidable, secondCollidable: Collidable): CollisionResult {
        if(collidable.boundingBox().intersect(secondCollidable.boundingBox())) {
            let collisionPair = this.getCollisionPair(collidable.geometricCollisionBehaviour(), secondCollidable.geometricCollisionBehaviour());
            if(collisionPair) {
                let functionToExecute = this.collTypes.get(collisionPair);
                let collision = functionToExecute(collidable, secondCollidable);
                if(collision.type === CollisionType.HIT) {
                    let reactionPair = this.getCollisionReactionPair(collidable.geometricCollisionBehaviour(), secondCollidable.geometricCollisionBehaviour());
                    if(reactionPair) {
                        let functionToExecute = this.collReactions.get(reactionPair);
                        functionToExecute(collidable, secondCollidable, collision.collision!);
                        return collision;
                    } else {
                        console.log(`Did not find a collision reaction pair between ${collidable.geometricCollisionBehaviour()} and ${secondCollidable.geometricCollisionBehaviour()}`)
                    }
                }
            } else {
                console.log(`Did not find a collision pair between ${collidable.geometricCollisionBehaviour()} and ${secondCollidable.geometricCollisionBehaviour()}`)
            }
        }
        return CollisionResult.miss();
    }

    circleLineAngleOut(first: Collidable, second: Collidable, collisionPoint: Vector): void {
        let firstCircle = first instanceof MovingItem;
        let secondCircle = first instanceof MovingItem;
        if(firstCircle || secondCircle) {
            let res = CollisionManager.getCircleLine(first, second);
            let circle = res.circle;
            let line= res.line;

            let movingItem: MovingItem;
            if(firstCircle) {
                movingItem = first as MovingItem;
            } else {
                movingItem = second as MovingItem;
            }
            let vector = Vector.between(collisionPoint, circle.center).normalize()
            let lineNormal = line.toVector().normal();
            let secondLineNormal = line.toVector().otherNormal();
            let normalToUse = secondLineNormal;
            if(movingItem.speed.angleBetween(lineNormal) < movingItem.speed.angleBetween(secondLineNormal)) {
                normalToUse = lineNormal;
            }
            let normal = normalToUse.normalize()
            let distanceAlongNormal = vector.x * normal.x + vector.y * normal.y
            let x = - 2.0 * distanceAlongNormal * normal.x
            let y = - 2.0 * distanceAlongNormal * normal.y
            movingItem.speed = new Vector(x, y)
        }
    }

    circleCircleAngleOut(first: Collidable, second: Collidable, collisionPoint: Vector): void {
        if(first instanceof MovingItem && second instanceof MovingItem) {
            let firstMass = 1;
            let firstHasMass = false;
            if(InstanceOfUtils.instanceOfMassOwning(first)) {
                firstMass = (first as MassOwning).mass;
                firstHasMass = true;
            }

            let secondMass = 1;
            let secondHasMass = false;
            if(InstanceOfUtils.instanceOfMassOwning(second)) {
                secondMass = (second as MassOwning).mass;
                secondHasMass = true;
            }
            let useMass = firstHasMass && secondHasMass;
            let firstMassFactor = useMass ? 2 * secondMass / (firstMass + secondMass) : 1;
            let secondMassFactor = useMass ? 2 * firstMass / (firstMass + secondMass) : 1;
            let v1MinV2 = first.speed.minus(second.speed)
            let x1MinX2 = first.position.minus(second.position)
            let v1 = x1MinX2.multNumber(v1MinV2.dot(x1MinX2) / (x1MinX2.secondNorm() ** 2) * firstMassFactor)
            first.speed = first.speed.minus(v1);

            let v2MinV1 = second.speed.minus(first.speed)
            let x2Minx1 = second.position.minus(first.position)
            let v2 = x2Minx1.multNumber(v2MinV1.dot(x2Minx1) / (x2Minx1.secondNorm() ** 2) *  secondMassFactor)
            second.speed = second.speed.minus(v2);
        } else {
            let movingItem;
            let notMovingItem;
            if(first instanceof MovingItem) {
                movingItem = first;
                notMovingItem = second;
            } else if(second instanceof MovingItem) {
                movingItem = second;
                notMovingItem = first;
            }
            let movingCircle = (movingItem as Circable).getCircle();
            let fixedCircle = (notMovingItem as Circable).getCircle();
            let directionVector = Vector.between(collisionPoint, fixedCircle.center).normalize();
            let vector = directionVector.normal();
            let circleNormal = vector.normal()
            let otherCircleNormal = vector.otherNormal()
            let normalToUse = circleNormal;
            if(movingItem.speed.angleBetween(otherCircleNormal) < movingItem.speed.angleBetween(circleNormal)) {
                normalToUse = otherCircleNormal;
            }
            let normal = normalToUse.normalize()
            let distanceAlongNormal = movingItem.speed.x * normal.x + movingItem.speed.y * normal.y
            let x = movingItem.speed.x - 2.0 * distanceAlongNormal * normal.x
            let y = movingItem.speed.y - 2.0 * distanceAlongNormal * normal.y
            movingItem.speed = new Vector(x, y)
        }
    }

    private circleCircle(first: Collidable, second: Collidable) {
        let firstCircle = (first as Circable).getCircle();
        let secondCircle = (second as Circable).getCircle();
        if(!firstCircle.circleCollision(secondCircle)) {
            return CollisionResult.miss();
        }

        let vectorBetween = Vector.between(firstCircle.center, secondCircle.center);
        let collisionPoint = secondCircle.center.plus(vectorBetween.normalize().multNumber(secondCircle.radius));
        return CollisionResult.hit(collisionPoint)
    }

    private circleLine(first: Collidable, second: Collidable): CollisionResult {
        let res = CollisionManager.getCircleLine(first, second);
        let circle = res.circle;
        let line= res.line;
        let collisionPoint = Vector.zero();
        let dot = ((circle.center.x - line.start.x) * (line.end.x - line.start.x) + (circle.center.y - line.start.y) * (line.end.y - line.start.y)) / Math.pow(line.len, 2)
        if (circle.pointInside(line.start) || circle.pointInside(line.end)) {
            collisionPoint =  circle.center;
        } else {
            let closestX = line.start.x + dot * (line.end.x - line.start.x)
            let closestY = line.start.y + dot * (line.end.y - line.start.y)
            let closestPoint = new Vector(closestX, closestY);
            if (!line.pointCollision(closestPoint)) {
                return CollisionResult.miss();
            }
            let distance = closestPoint.distanceTo(circle.center)
            if (distance <= circle.radius) {
                collisionPoint =  closestPoint;
            } else {
                return CollisionResult.miss();
            }
        }
        return CollisionResult.hit(collisionPoint)
    }


    private static getCircleLine(first: Collidable, second: Collidable): {circle: Circle, line: Line} {
        let circle;
        if (InstanceOfUtils.instanceOfCircable(first)) {
            circle = (first as Circable).getCircle();
        } else if (InstanceOfUtils.instanceOfCircable(second)) {
            circle = (second as Circable).getCircle();
        }
        let line;
        if (InstanceOfUtils.instanceOfLineable(first)) {
            line = (first as Lineable).getLine();
        } else if (InstanceOfUtils.instanceOfLineable(second)) {
            line = (second as Lineable).getLine();
        }
        return {circle, line};
    }
}