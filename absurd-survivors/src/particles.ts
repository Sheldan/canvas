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

export class NumberDisplayParticle extends BaseParticle {
    private number: number;
    private secondsToDisplay: number = 2;
    private alreadyDisplayed: number = 0;
    private color: string;

    constructor(position: Vector, world: World, healthAmount: number, color: string) {
        super(position, world);
        this.number = healthAmount;
        this.color = color
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillText(this.number + '', this._position.x, this._position.y);
    }

    tick(seconds: number, tick: number) {
        this.alreadyDisplayed += seconds;
        if(this.alreadyDisplayed > this.secondsToDisplay) {
            this.world.removeParticle(this)
        }
    }

    static spawnNumberParticle(world: World, health: number, position: Vector, color?: string) {
        if(!color) {
            color = 'red'
        }
        world.addParticle(this.createNumberParticle(world, health, position, color))
    }

    static createNumberParticle(world: World, health: number, position: Vector, color?: string) {
        if(!color) {
            color = 'red'
        }
        let particle = new NumberDisplayParticle(position, world, health, color)
        return particle
    }
}