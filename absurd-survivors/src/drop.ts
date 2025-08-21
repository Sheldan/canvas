import type {Drop} from "./interfaces.ts";
import {World} from "./World.ts";
import {drawDot, moveInDirectionOf} from "./utils.ts";
import {Vector} from "./base.ts";

export class MoneyDrop implements Drop {
    private world: World;
    private worth: number;
    private _position: Vector;
    private _color: string;
    private _size: number;


    constructor(world: World, position: Vector) {
        this.world = world;
        this._position = position.clone();
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this._position, this.getSize(), this._color, ctx)
    }

    pickup() {
        this.world.player.status.wealth += this.worth
    }

    getPosition(): Vector {
        return this._position;
    }

    move() {
    }

    static createMoneyDrop(world: World, position?: Vector): MoneyDrop {
        if(!position) {
            position = world.randomPlace()
        }
        let drop = new MoneyDrop(world, position)
        drop.worth = 1;
        drop._size = 1;
        drop._color = 'yellow';
        world.addDrop(drop)
        return drop;
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

}