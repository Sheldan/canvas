import type {Acting, Drawable, Healthy, Weapon} from "./interfaces.ts";
import {Vector} from "./base.ts";
import {drawDot} from "./utils.ts";

export class Player implements Drawable, Acting, Healthy {
    private _position: Vector;
    private _stats: PlayerStats;
    private _color: string;
    private _status: PlayerStatus;
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

    public static generatePlayer(position?: Vector): Player {
        if(position === undefined) {
            position = new Vector(500, 500)
        }
        let player = new Player(position);
        player._color = 'blue';
        player._stats = PlayerStats.defaultPlayerStats();
        player._speed = new Vector(0, 0)
        player._status = new PlayerStatus(10, 0);
        return player;
    }

    addWeapon(weapon: Weapon) {
        let weaponCount = this._weapons.length + 1;
        let angle = 2 * Math.PI / weaponCount;
        for (let i = 0; i < this._weapons.length; i++) {
            let affectedWeapon = this._weapons[i];
            let x = Math.cos(angle * i)
            let y = Math.sin(angle * i)
            console.log(x + ' ' + y)
            affectedWeapon.setOffset(new Vector(x, y).multiply(affectedWeapon.getSize()))
        }
        let newPosition = new Vector(Math.cos(angle * (weaponCount - 1)), Math.sin(angle * (weaponCount - 1)));
        newPosition = newPosition.multiply(weapon.getSize())
        console.log(newPosition.x + ' ' + newPosition.y)
        weapon.setOffset(newPosition)
        this._weapons.push(weapon)
    }

    move(direction: Vector) {
        this._position = this.position.add(direction)
    }

    takeDamage(damage: number) {
        this._status.health -= damage;
    }

    heal(amount: number) {
        this._status.health +=  amount;
        this._status.health = Math.min(this._status.health, this._stats.health)
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

    get stats(): PlayerStats {
        return this._stats;
    }

    get status(): PlayerStatus {
        return this._status;
    }

    get speed(): Vector {
        return this._speed;
    }

    act() {
        this._weapons.forEach(weapon => weapon.act())
    }

    die() {
    }

    getPosition(): Vector {
        return this._position;
    }

    getSize() {
        return this.stats.size
    }

    dead() {
        return this.status.dead
    }
}

export class PlayerStatus {
    constructor(private _health: number, private _wealth: number) {
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    get dead(): boolean {
        return this._health <= 0
    }

    get wealth(): number {
        return this._wealth;
    }

    set wealth(value: number) {
        this._wealth = value;
    }
}

export class PlayerStats {
    constructor(private _speed: number,
                private _size: number,
                private _health: number,
                private _pullRange: number,
                private _weaponRange: number,
                private _weaponRangeFactor: number) {
    }

    get speed(): number {
        return this._speed;
    }

    get size(): number {
        return this._size;
    }

    get pullRange(): number {
        return this._pullRange;
    }

    get health(): number {
        return this._health;
    }

    get weaponRange(): number  {
        return this._weaponRange
    }

    get effectiveWeaponRange(): number {
        return this._weaponRange * this._weaponRangeFactor;
    }

    public static defaultPlayerStats(): PlayerStats {
        return new PlayerStats(3, 5, 10, 150, 250, 1);
    }
}