
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

    clone() {
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

    get weaponRange(): number {
        return this._weaponRange
    }

    get effectiveWeaponRange(): number {
        return this._weaponRange * this._weaponRangeFactor;
    }

    public static defaultPlayerStats(): PlayerStats {
        return new PlayerStats();
    }
}


export class ProjectileStats {

    private _piercings: number;
    private _size: number;
    private _damage: number;
    private _speed: number;
    private _deathSplit: number;
    private _deathSplitChance: number;

    constructor() {
        this._size = 1
    }

    withPiercings(value: number) {
        this._piercings = value;
        return this;
    }

    withSize(value: number) {
        this._size = Math.max(value, 1);
        return this;
    }

    withDamage(value: number) {
        this._damage = value;
        return this;
    }

    withSpeed(value: number) {
        this._speed = value;
        return this;
    }

    withDeathSplit(value: number) {
        this._deathSplit = value;
        return this;
    }

    withDeathSplitChance(value: number) {
        this._deathSplitChance = value;
        return this;
    }

    get piercings(): number {
        return this._piercings;
    }

    get size(): number {
        return this._size;
    }


    get speed(): number {
        return this._speed;
    }

    get damage(): number {
        return this._damage;
    }


    get deathSplitChance(): number {
        return this._deathSplitChance;
    }

    get deathSplit(): number {
        return this._deathSplit;
    }
}