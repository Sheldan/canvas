import type {Acting, Drawable, Healthy, Weapon} from "./interfaces.ts";
import {Vector} from "./base.ts";
import {drawDot} from "./utils.ts";

export class Player implements Drawable, Acting, Healthy {
    private _position: Vector;
    private _stats: Stats;
    private _color: string;
    private _status: Status;
    private _weapons: [Weapon] = []

    // temp
    private _speed: Vector;


    constructor(position: Vector) {
        this._position = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.position, this._stats.size, this._color, ctx)
        this._weapons.forEach(weapon => weapon.draw(ctx))
    }

    public static generatePlayer(): Player {
        let player = new Player(new Vector(500, 500));
        player._color = 'blue';
        player._stats = Stats.defaultPlayerStats();
        player._speed = new Vector(0, 0)
        player._status = new Status(10);
        return player;
    }

    addWeapon(weapon: Weapon) {
        this._weapons.push(weapon)
    }

    move(direction: Vector) {
        this._position = this.position.add(direction)
    }

    takeDamage(damage: number) {
        this._status.health -= damage;
    }

    get health(): number {
        return this._status.health;
    }

    get position(): Vector {
        return this._position;
    }

    get color(): string {
        return this._color;
    }

    get stats(): Stats {
        return this._stats;
    }

    get speed(): Vector {
        return this._speed;
    }

    act() {
        this._weapons.forEach(weapon => weapon.act())
    }
}

export class Status {
    constructor(private _health: number) {
    }


    get health(): number {
        return this._health;
    }


    set health(value: number) {
        this._health = value;
    }
}

export class Stats {
    constructor(private _speed: number,
                private _size: number,
                private _health: number) {
    }

    get speed(): number {
        return this._speed;
    }

    set speed(value: number) {
        this._speed = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }


    get health(): number {
        return this._health;
    }

    public static defaultPlayerStats(): Stats {
        return new Stats(2, 5, 10);
    }
}