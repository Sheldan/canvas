import type {Particle} from "./interfaces.ts";
import {Vector} from "./base.ts";
import {World} from "./World.ts";

abstract class BaseParticle implements Particle {
    protected _position: Vector;
    protected world: World;


    constructor(position: Vector, world: World) {
        this._position = position.clone();
        this.world = world;
    }

    getPosition(): Vector {
        return this._position;
    }

    getSize() {
    }

    move(any?: any) {
        this._position = this._position.add(new Vector(0, -0.5))
    }

    draw(ctx: CanvasRenderingContext2D) {
    }

    act() {
        this.move()
    }

    tick(seconds: number, tick: number) {
    }

}

export class HealingParticle extends BaseParticle {
    private healthAmount: number;
    private secondsToDisplay: number = 2;
    private alreadyDisplayed: number = 0;

    constructor(position: Vector, world: World, healthAmount: number) {
        super(position, world);
        this.healthAmount = healthAmount;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'green';
        ctx.fillText(this.healthAmount + '', this._position.x, this._position.y);
    }

    static spawnHealingParticle(world: World, health: number, position: Vector) {
        world.addParticle(this.createHealingParticle(world, health, position))
    }

    static createHealingParticle(world: World, health: number, position: Vector) {
        let healingParticle = new HealingParticle(position, world, health)
        return healingParticle
    }


    tick(seconds: number, tick: number) {
        this.alreadyDisplayed += seconds;
        if(this.alreadyDisplayed > this.secondsToDisplay) {
            this.world.removeParticle(this)
        }
    }
}