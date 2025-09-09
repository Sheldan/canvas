import type {Drop, Item} from "./interfaces.ts";
import {World} from "./World.ts";
import {fillDot, moveInDirectionOf} from "./utils.ts";
import {Vector} from "./base.ts";
import {rarityColor} from "./items.ts";

export abstract class BasicDrop implements Drop {
    protected world: World;
    protected _position: Vector;
    protected _color: string;
    protected size: number;

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
        if(distanceToPlayer < (this.world.player.effectiveStats.size + this.size)) {
            this.pickup()
            this.world.removeDrop(this)
        } else if(distanceToPlayer < this.world.player.effectiveStats.pullRange) {
            let speedFactor = 125 / distanceToPlayer;
            this._position = moveInDirectionOf(this._position, this.world.player.position,  speedFactor)
        }
    }

    abstract draw(ctx: CanvasRenderingContext2D);

    getSize() {
        return this.size
    }

}

export class MoneyDrop extends BasicDrop {

    private worth: number;

    draw(ctx: CanvasRenderingContext2D) {
        fillDot(this._position, this.size, this._color, ctx)
    }

    pickup() {
        this.world.player.status.wealth += this.worth
    }

    static spawnMoneyDrop(world: World, position?: Vector) {
        world.addDrop(this.createMoneyDrop(world, position))
    }

    static createMoneyDrop(world: World, position?: Vector): MoneyDrop {
        if(!position) {
            position = world.randomPlace()
        }
        let drop = new MoneyDrop(world, position)
        drop.worth = 1;
        drop.size = 1;
        drop._color = 'orange';
        return drop;
    }
}

export class HealthPack extends BasicDrop {
    private healAmount: number;

    draw(ctx: CanvasRenderingContext2D) {
        fillDot(this._position, this.size, this._color, ctx)
    }

    pickup() {
        this.world.player.heal(this.healAmount)
    }

    static spawnHealthPack(world: World, position?: Vector) {
        world.addDrop(this.createHealthPack(world, position))
    }

    static createHealthPack(world: World, position?: Vector) {
        if(!position) {
            position = world.randomPlace()
        }
        let drop = new HealthPack(world, position)
        drop.healAmount = 5;
        drop.size = 2;
        drop._color = 'green';
        return drop;
    }
}

export class LevelDrop extends BasicDrop {
    draw(ctx: CanvasRenderingContext2D) {
        fillDot(this._position, this.size, this._color, ctx)
    }

    pickup() {
        this.world.player.increaseLevel()
    }

    static spawnLevelDrop(world: World, position?: Vector) {
        world.addDrop(this.createLevelDrop(world, position))
    }
    static createLevelDrop(world: World, position?: Vector): LevelDrop {
        if(!position) {
            position = world.randomPlace()
        }
        let drop = new LevelDrop(world, position)
        drop.size = 5;
        drop._color = 'blue';
        return drop;
    }

}

export class ItemDrop extends BasicDrop {

    private item: Item;


    constructor(world: World, position: Vector, item: Item) {
        super(world, position);
        this.item = item;
    }

    pickup() {
        this.item.pickup(this.world.player, this.world)
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = rarityColor(this.item.getRarity())
        ctx.fillText(this.item.name() + '', this._position.x, this._position.y)
    }

    static spawnItemDrop(world: World, item: Item, position?: Vector) {
        world.addDrop(this.createItemDrop(world, item, position))
    }

    static createItemDrop(world: World, item: Item, position?: Vector) {
        if(!position) {
            position = world.randomPlace()
        }
        let drop = new ItemDrop(world, position, item)
        drop.size = 3
        return drop
    }
}