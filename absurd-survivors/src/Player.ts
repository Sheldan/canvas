import type {Acting, Drawable, Healthy, Item, Weapon} from "./interfaces.ts";
import {Vector} from "./base.ts";
import {fillDot, getCoordinatesSplit} from "./utils.ts";
import {PlayerStats} from "./stats.ts";
import {PlayerStatus} from "./status.ts";
import {World} from "./World.ts";
import {HealingParticle} from "./particles.ts";

export class Player implements Drawable, Acting, Healthy  {
    private _position: Vector;
    private _baseStats: PlayerStats;
    private _effectiveStats: PlayerStats;
    private _tempStats: PlayerStats;
    private _color: string;

    private _status: PlayerStatus;
    private _weapons: Weapon[] = []
    private _items: Item[] = []
    private _healTick: number = 0;
    private static readonly HEAL_TICK_INTERVAL = 20;
    private _world: World;

    // temp
    private _speed: Vector;
    private _toHeal: number = 0;

    constructor(position: Vector) {
        this._position = position;
        this._effectiveStats = new PlayerStats()
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
        player.statsChanged()
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

    set world(value: World) {
        this._world = value;
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

    isHurt() {
        return this.health < this._effectiveStats.health
    }

    tick(seconds: number, tick: number) {
        this._healTick += 1;
        if((this._healTick % Player.HEAL_TICK_INTERVAL) == 0 && this.isHurt()) {
            let healed = this._effectiveStats.healthRegen / seconds
            this._toHeal += healed;
            if(this._toHeal >= 1) {
                let toHealNow = this._toHeal - (this._toHeal % 1);
                this._toHeal -= toHealNow;
                this.heal(toHealNow);
                HealingParticle.spawnHealingParticle(this._world, toHealNow, this.position)
            }
        }
    }
}

