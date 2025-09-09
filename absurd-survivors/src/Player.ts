import type {Acting, Drawable, Healthy, Item, Leveling, Weapon} from "./interfaces.ts";
import {Vector} from "./base.ts";
import {fillDot, getCoordinatesSplit} from "./utils.ts";

export class Player implements Drawable, Acting, Healthy  {
    private _position: Vector;
    private _baseStats: PlayerStats;
    private _effectiveStats: PlayerStats;
    private _tempStats: PlayerStats;
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
        fillDot(this.position, this._effectiveStats.size, this._color, ctx)
        this._weapons.forEach(weapon => weapon.draw(ctx))
    }

    public static generatePlayer(position?: Vector): Player {
        if(position === undefined) {
            position = new Vector(500, 500)
        }
        let player = new Player(position);
        player._color = 'blue';
        player._baseStats = PlayerStats.defaultPlayerStats();
        let tempStats = new PlayerStats();
        tempStats.resetToBasic()
        player._tempStats = tempStats;
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

    statsChanged() {
        this._effectiveStats.resetToBasic()
        this._effectiveStats.mergeStats(this._baseStats)
        this._effectiveStats.mergeStats(this._tempStats)
    }

    heal(amount: number) {
        this._status.health +=  amount;
        this._status.health = Math.min(this._status.health, this._effectiveStats.health)
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

    get effectiveStats(): PlayerStats {
        return this._effectiveStats;
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
        return this._effectiveStats.size
    }

    dead() {
        return this.status.dead
    }

    changeBaseStat(value: number, statFun: (stats: PlayerStats, value: number) => void) {
        this._baseStats.changeStat(value, statFun)
        this.statsChanged()
    }

    changeTempStat(value: number, statFun: (stats: PlayerStats, value: number) => void) {
        this._tempStats.changeStat(value, statFun)
        this.statsChanged()
    }

    increaseLevel() {
        this.status.increaseLevel()
        this._baseStats.increaseLevel()
        this._weapons.forEach(weapon => {
            weapon.increaseLevel()
        })
        this.statsChanged()
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

    private _speed: number;
    private _size: number;
    private _health: number;
    private _pullRange: number;
    private _weaponRange: number;
    private _weaponRangeFactor: number;

    constructor() {
        this._speed = 3;
        this._size = 5;
        this._health = 10;
        this._pullRange = 150;
        this._weaponRange = 250;
        this._weaponRangeFactor = 1;
    }

    resetToBasic() {
        this._speed = 0;
        this._health = 0;
        this._pullRange = 0;
        this._weaponRange = 0;
        this._weaponRangeFactor = 1
    }

    increaseLevel() {
        this._speed *= 1.1;
        this._health += 1
        this._pullRange *= 1.1;
        this._weaponRange *= 1.25
        this._weaponRangeFactor += 0.1
    }

    mergeStats(otherStats: PlayerStats) {
        this._speed += otherStats._speed;
        this._health += otherStats._health;
        this._pullRange += otherStats._pullRange;
        this._weaponRange += otherStats._weaponRange
        this._weaponRangeFactor += otherStats._weaponRangeFactor;
    }

    clone()  {
        let newStats = new PlayerStats();
        newStats.mergeStats(this)
        return newStats;
    }

    changeStat(value: number, statFun: (stats: PlayerStats, value: number) => void) {
        statFun(this, value)
    }

    static increaseSpeed(stats: PlayerStats, value: number) {
        stats._speed += value
    }

    static factorSpeed(stats: PlayerStats, value: number) {
        stats._speed *= value
    }

    static increasePullRange(stats: PlayerStats, value: number) {
        stats._pullRange += value
    }

    static factorPullRange(stats: PlayerStats, value: number) {
        stats._pullRange += value
    }

    static increaseHealth(stats: PlayerStats, value: number) {
        stats._health += value
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
        return new PlayerStats();
    }
}