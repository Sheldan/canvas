import type {Acting, Placeable, Healthy} from "./interfaces.ts";
import type {Vector} from "./base.ts";
import {World} from "./World.ts";
import {Cooldown, Point, Vector} from "./base.ts";
import {circleLineCollision, drawDot, moveInDirectionOf, pointOnLineWithinLine, straightMove, toRad} from "./utils.ts";
import {InstanceOfUtils} from "./instance.ts";

export abstract class Projectile implements Acting, Placeable {

    protected position: Vector;
    protected speedVec: Vector;
    protected world: World;
    protected parent: any;
    protected color: string
    protected stats: ProjectileStats;
    protected status: ProjectileStatus;
    protected lastPosition: Vector;
    protected secondToLastPosition?: Vector
    protected lastColliding?: Placeable;

    constructor(position: Vector, speedVec: Vector, stats: ProjectileStats, world: World, parent: any) {
        this.position = position.clone();
        this.speedVec = speedVec.clone();
        this.world = world;
        this.parent = parent;
        this.stats = stats;
        this.status = new ProjectileStatus(stats.piercings)
    }

    act() {
        this.move()
        if(this.parent !== this.world.player) {
            if(this.position.distanceTo(this.world.player.position) < (this.stats.size + this.world.player.stats.size) && this.status.collisionCooldown.cooledDown()) {
                this.impactPlayer()
                this.status.collisionCooldown.resetCooldown()
            }
        } else if(this.parent === this.world.player) {
            let closestTargetTo = this.world.getClosestTargetToButNot(this.position, this.lastColliding);
            if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
                let target: Placeable = closestTargetTo[1]!;
                if(target.getPosition().distanceTo(this.position) < (this.stats.size + target.getSize())
                    || circleLineCollision(target.getPosition(), target.getSize(), this.position, this.lastPosition)) {
                    if(target !== this.lastColliding) {
                        if(InstanceOfUtils.instanceOfHealthy(target)) {
                            let healthy = target as Healthy;
                            healthy.takeDamage(this.stats.damage)
                            if(!this.status.hasPiercingLeft()) {
                                this.world.removeProjectile(this)
                            }
                            this.status.decreasePiercings()
                        } else {
                            this.world.removeProjectile(this)
                        }
                    }
                    this.lastColliding = target;
                } else {
                    this.lastColliding = undefined;
                }
            } else {
                this.lastColliding = undefined;
            }
        }
        this.status.collisionCooldown.decreaseCooldown()
        this.checkWorldBorder()
    }

    checkWorldBorder() {
        if(this.world.outside(this.position)) {
            this.world.removeProjectile(this)
        }
    }

    impactPlayer() {
        this.world.player.takeDamage(this.stats.damage)
        if(!this.status.hasPiercingLeft()) {
            this.world.removeProjectile(this)
        }
    };

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.position, this.stats.size, this.color, ctx)
    }

    move() {
        this.secondToLastPosition = this.lastPosition;
        this.lastPosition = this.position.clone()
    }

    getPosition(): Vector {
        return this.position;
    }

    getSize() {
        return this.stats.size
    }

}

export class StraightProjectile extends Projectile {


    constructor(position: Vector, dirVector: Vector, stats: ProjectileStats, world: World, parent: any) {
        super(position, dirVector, stats, world, parent);
    }

    move() {
        super.move()
        this.position = straightMove(this.position, this.speedVec)
    }

    static createStraightProjectile(world: World, start: Vector, targetPosition: Vector, parent: any, stats: ProjectileStats, color?: string) {
        let dirVector = Vector.createVector(targetPosition, start).normalize().multiply(stats.speed);
        let projectile = new StraightProjectile(start, dirVector, stats, world, parent)
        projectile.color = color === undefined ? 'red' : color!;
        world.addProjectile(projectile)
        return projectile;
    }
}

export class HomingProjectile extends Projectile {

    private target: Placeable;

    constructor(position: Vector, speedVec: Vector, stats: ProjectileStats, world: World, parent: any, target: Placeable) {
        super(position, speedVec, stats, world, parent);
        this.target = target;
    }

    move() {
        super.move()
        this.position = moveInDirectionOf(this.position, this.target.getPosition(), this.speedVec.vecLength())
        if(InstanceOfUtils.instanceOfHealthy(this.target)) {
            let target = this.target as Healthy
            if(target.dead()) {
                let closestTargetTo = this.world.getClosestTargetTo(this.position)

                let newTargetDirection = Vector.createVector(this.target.getPosition(), this.position)
                let justMovedDirection = Vector.createVector(this.position, this.lastPosition).normalize()
                let olderMovedDirection: Vector;
                if(this.secondToLastPosition !== undefined) {
                    olderMovedDirection = Vector.createVector(this.lastPosition, this.secondToLastPosition).normalize();
                } else {
                    olderMovedDirection = new Vector(0, 1)
                }
                if (closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
                    let newTargetPosition = closestTargetTo[1]!.getPosition();
                    let newDir = Vector.createVector(newTargetPosition, this.position)
                    let newDirAngle = newDir.angleTo(newTargetDirection);
                    if(Math.abs(newDirAngle) >= toRad(150)) {
                        this.target = closestTargetTo[1]!;
                    } else {
                        if(pointOnLineWithinLine(this.target.getPosition(), this.lastPosition, this.position)) {
                            justMovedDirection = olderMovedDirection
                        }
                        this.target = new Point(this.position.add(justMovedDirection.multiply(Math.max(this.world.size.x, this.world.size.y))))
                    }
                } else {
                    if(pointOnLineWithinLine(this.target.getPosition(), this.lastPosition, this.position)) {
                        justMovedDirection = olderMovedDirection
                    }
                    this.target = new Point(this.position.add(justMovedDirection.multiply(Math.max(this.world.size.x, this.world.size.y))))
                }
            }
        }
        this.checkWorldBorder()
    }

    static createHomingProjectile(world: World, start: Vector, parent: any,  target: Placeable, stats: ProjectileStats, color?: string) {

        let projectile = new HomingProjectile(start, new Vector(0, stats.speed), stats, world, parent, target)
        projectile.color = color === undefined ? 'red' : color!;
        world.addProjectile(projectile)
        return projectile;
    }

}

export class ProjectileStatus {
    private _piercingsLeft: number;
    private _collisionCooldown: Cooldown;

    constructor(piercingsLeft: number) {
        this._piercingsLeft = piercingsLeft;
        this._collisionCooldown = new Cooldown(10)
    }

    get piercingsLeft(): number {
        return this._piercingsLeft;
    }

    hasPiercingLeft(): boolean {
        return this.piercingsLeft >= 0;
    }


    get collisionCooldown(): Cooldown {
        return this._collisionCooldown;
    }

    decreasePiercings() {
        this._piercingsLeft -= 1;
    }

}

export class ProjectileStats {
    private _piercings: number;
    private _size: number;
    private _damage: number;
    private _speed: number;

    constructor(piercings: number, size: number, damage: number, _speed: number) {
        this._piercings = piercings;
        this._size = size;
        this._damage = damage
        this._speed = _speed;
    }

    get piercings(): number {
        return this._piercings;
    }

    get size(): number {
        return this._size;
    }


    get speed(): number {
        return this._speed;
    }

    get damage(): number {
        return this._damage;
    }
}