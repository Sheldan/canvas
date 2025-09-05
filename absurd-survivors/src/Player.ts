import type {Acting, Drawable, Healthy, Item, Leveling, Weapon} from "./interfaces.ts";
import {Vector} from "./base.ts";
import {drawDot, getCoordinatesSplit} from "./utils.ts";

export class Player implements Drawable, Acting, Healthy  {
    private _position: Vector;
    private _stats: PlayerStats;
    private _color: string;

    private _status: PlayerStatus;
    private _weapons: Weapon[] = []
    private _items: Item[] = []

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
        player._status = new PlayerStatus(10, 0, 0);
        return player;
    }

    addWeapon(weapon: Weapon) {
        let weaponCount = this._weapons.length + 1;
        let points = getCoordinatesSplit(weaponCount)
        for (let i = 0; i < points.length - 1; i++){
            const value = points[i];
            let affectedWeapon = this._weapons[i];
            affectedWeapon.setOffset(value.multiply(affectedWeapon.getSize()))
        }
        weapon.setOffset(points[points.length - 1].multiply(weapon.getSize()))
        this._weapons.push(weapon)
    }

    addItem(item: Item) {
        this._items.push(item)
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

    increaseLevel() {
        this.status.increaseLevel()
        this.stats.increaseLevel()
        this._weapons.forEach(weapon => {
            weapon.increaseLevel()
        })
    }

    level() {
        return this.status.level
    }
}

export class PlayerStatus {
    constructor(private _health: number,
                private _wealth: number,
                private _level: number) {
    }


    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
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

    increaseLevel() {
        this._level += 1
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

    increaseLevel() {
        this._speed *= 1.1;
        this._health += 1
        this._pullRange *= 1.1;
        this._weaponRange *= 1.25
        this._weaponRangeFactor += 0.1
    }


    set speed(value: number) {
        this._speed = value;
    }

    set size(value: number) {
        this._size = value;
    }

    set health(value: number) {
        this._health = value;
    }

    set pullRange(value: number) {
        this._pullRange = value;
    }

    set weaponRange(value: number) {
        this._weaponRange = value;
    }

    set weaponRangeFactor(value: number) {
        this._weaponRangeFactor = value;
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