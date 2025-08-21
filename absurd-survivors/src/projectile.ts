import type {Acting, Placeable, Healthy} from "./interfaces.ts";
import type {Vector} from "./base.ts";
import {World} from "./World.ts";
import {Cooldown, Vector} from "./base.ts";
import {drawDot, moveInDirectionOf, straightMove} from "./utils.ts";
import {InstanceOfUtils} from "./instance.ts";

export abstract class Projectile implements Acting, Placeable {

    protected position: Vector;
    protected speedVec: Vector;
    protected world: World;
    protected parent: any;
    protected color: string
    private stats: ProjectileStats;
    private status: ProjectileStatus;

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
        if(this.status.collisionCooldown.cooledDown()) {
            if(this.parent !== this.world.player) {
                if(this.position.distanceTo(this.world.player.position) < (this.stats.size + this.world.player.stats.size)) {
                    this.impactPlayer()
                    this.status.collisionCooldown.resetCooldown()
                }
            } else if(this.parent === this.world.player) {
                let closestTargetTo = this.world.getClosestTargetTo(this.position);
                if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined && closestTargetTo[1]?.getPosition().distanceTo(this.position) < (this.stats.size + closestTargetTo[1]?.getSize())) {
                    let target: Placeable = closestTargetTo[1]!;
                    if(InstanceOfUtils.instanceOfHealthy(target)) {
                        let healthy = target as Healthy;
                        healthy.takeDamage(this.stats.damage)
                        if(this.status.piercingsLeft <= 0) {
                            this.world.removeProjectile(this)
                        }
                        this.status.decreasePiercings()
                    }
                }
            }
        }
        this.status.collisionCooldown.decreaseCooldown();

    }

    impactPlayer() {
        this.world.player.takeDamage(this.stats.damage)
        this.world.removeProjectile(this)
    };

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.position, this.stats.size, this.color, ctx)
    }

    move() {
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
        this.position = straightMove(this.position, this.speedVec)
    }

    static createStraightProjectile(world: World, start: Vector, targetPosition: Vector, parent: any, stats: ProjectileStats, color?: string) {
        let dirVector = Vector.createVector(targetPosition, start).normalize().multiply(2);
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
        if(InstanceOfUtils.instanceOfHealthy(this.target)) {
            let target = this.target as Healthy
            if(target.dead()) {
                if(this.position.distanceTo(this.target.getPosition()) < (this.target.getSize() + this.getSize())) {
                    this.world.removeProjectile(this)
                    return;
                }
                let closestTargetTo = this.world.getClosestTargetTo(this.world.player.position)
                if (closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
                    this.target = closestTargetTo[1]!;
                }
            }
        }
        this.position = moveInDirectionOf(this.position, this.target.getPosition(), this.speedVec.vecLength())
    }

    static createHomingProjectile(world: World, start: Vector, parent: any,  target: Placeable, stats: ProjectileStats, color?: string) {

        let projectile = new HomingProjectile(start, new Vector(5, 1), stats, world, parent, target)
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

    constructor(piercings: number, size: number, damage: number) {
        this._piercings = piercings;
        this._size = size;
        this._damage = damage
    }

    get piercings(): number {
        return this._piercings;
    }

    get size(): number {
        return this._size;
    }


    get damage(): number {
        return this._damage;
    }
}