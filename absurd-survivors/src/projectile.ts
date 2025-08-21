import type {Acting, Moving, Healthy} from "./interfaces.ts";
import type {Vector} from "./base.ts";
import {World} from "./World.ts";
import {Vector} from "./base.ts";
import {drawDot, moveInDirectionOf, straightMove} from "./utils.ts";
import {InstanceOfUtils} from "./instance.ts";

export abstract class Projectile implements Acting, Moving {

    protected position: Vector;
    protected speedVec: Vector;
    protected impact: number;
    protected world: World;
    protected size: number;
    protected parent: any;
    protected color: string


    constructor(position: Vector, speedVec: Vector, world: World, parent: any) {
        this.position = position;
        this.speedVec = speedVec;
        this.world = world;
        this.parent = parent;
    }

    act() {
        this.move()
        if(this.parent != this.world.player) {
            if(this.position.distanceTo(this.world.player.position) < (this.size + this.world.player.stats.size)) {
                this.impactPlayer()
            }
        }
        if(this.parent == this.world.player) {
            let closestTargetTo = this.world.getClosestTargetTo(this.position);
            if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined && closestTargetTo[1]?.getPosition().distanceTo(this.position) < (this.size + this.world.player.stats.size)) {
                let target: Moving = closestTargetTo[1]!;
                if(InstanceOfUtils.instanceOfHealthy(target)) {
                    let healthy = target as Healthy;
                    healthy.takeDamage(this.impact)
                }
            }
        }

    }

    impactPlayer() {
        this.world.player.takeDamage(this.impact)
        this.world.removeProjectile(this)
    };

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.position, this.size, this.color, ctx)
    }

    move() {
    }

    getPosition(): Vector {
        return this.position;
    }

}

export class StraightProjectile extends Projectile {


    constructor(position: Vector, dirVector: Vector, world: World, parent: any) {
        super(position, dirVector, world, parent);
    }

    move() {
        this.position = straightMove(this.position, this.speedVec)
    }

    static createStraightProjectile(world: World, start: Vector, targetPosition: Vector, parent: any) {
        let projectile = new StraightProjectile(start, Vector.createVector(targetPosition, start).normalize().multiply(5), world, parent)
        projectile.impact = 1;
        projectile.size = 1
        projectile.color = 'red';
        world.addProjectile(projectile)
        return projectile;
    }
}

export class HomingProjectile extends Projectile {

    move() {
        this.position = moveInDirectionOf(this.position, this.world.player.position, this.speedVec.vecLength())
    }

    static createHomingProjectile(world: World, start: Vector, parent: any) {
        let projectile = new HomingProjectile(start, new Vector(5, 1), world, parent)
        projectile.impact = 1;
        projectile.size = 1
        projectile.color = 'red';
        world.addProjectile(projectile)
        return projectile;
    }

}