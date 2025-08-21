import type {Drop} from "./interfaces.ts";
import {World} from "./World.ts";
import {drawDot, moveInDirectionOf} from "./utils.ts";
import {Vector} from "./base.ts";

export abstract class BasicDrop implements Drop {
    protected world: World;
    protected _position: Vector;
    protected _color: string;
    protected _size: number;

    constructor(world: World, position: Vector) {
        this.world = world;
        this._position = position.clone();
    }

    getPosition(): Vector {
        return this._position;
    }

    move() {
    }

    pickup() {
    }

    act() {
        let distanceToPlayer = this._position.distanceTo(this.world.player.position);
        if(distanceToPlayer < (this.world.player.stats.size + this._size)) {
            this.pickup()
            this.world.removeDrop(this)
        } else if(distanceToPlayer < this.world.player.stats.pullRange) {
            let speedFactor = 125 / distanceToPlayer;
            this._position = moveInDirectionOf(this._position, this.world.player.position,  speedFactor)
        }
    }


    getSize() {
        return this._size
    }

    abstract draw(ctx: CanvasRenderingContext2D);

}

export class MoneyDrop extends BasicDrop {

    private worth: number;

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this._position, this.getSize(), this._color, ctx)
    }

    pickup() {
        this.world.player.status.wealth += this.worth
    }

    static createMoneyDrop(world: World, position?: Vector): MoneyDrop {
        if(!position) {
            position = world.randomPlace()
        }
        let drop = new MoneyDrop(world, position)
        drop.worth = 1;
        drop._size = 1;
        drop._color = 'orange';
        world.addDrop(drop)
        return drop;
    }


}

export class HealthPack extends BasicDrop {
    private healAmount: number;

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this._position, this.getSize(), this._color, ctx)
    }

    pickup() {
        this.world.player.heal(this.healAmount)
    }

    static createHealthPack(world: World, position?: Vector): HealthPack {
        if(!position) {
            position = world.randomPlace()
        }
        let drop = new HealthPack(world, position)
        drop.healAmount = 5;
        drop._size = 2;
        drop._color = 'green';
        world.addDrop(drop)
        return drop;
    }
}