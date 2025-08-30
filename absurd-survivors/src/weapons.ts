import type {Weapon} from "./interfaces.ts";
import {drawDot} from "./utils.ts";
import {Player} from "./Player.ts";
import {HomingProjectile, Projectile, ProjectileStats, StraightProjectile} from "./projectile.ts";
import {World} from "./World.ts";
import {Vector} from "./base.ts";

export abstract class BasicWeapon implements Weapon {
    protected offset: Vector;
    protected readonly player: Player
    protected readonly world: World;
    protected color: string;
    protected size: number;
    protected stats: WeaponStats;
    protected _level: number;

    constructor(world: World, stats: WeaponStats) {
        this.player = world.player;
        this.world = world;
        this.stats = stats;
        this._level = 1;
    }

    act() {
    }

    increaseLevel() {
        this._level += 1;
        this.stats.increase()
    }

    draw(ctx: CanvasRenderingContext2D) {
    }

    getPosition(): Vector {
        return this.player.position.add(this.offset);
    }

    move(any?: any) {
    }

    getSize() {
        return this.size;
    }

    getOffset(): Vector {
        return this.offset;
    }

    setOffset(vec: Vector) {
        this.offset = vec;
    }

    level() {
        return this._level
    }
}

export abstract class RangeWeapon extends BasicWeapon {

    protected projectiles: [Projectile] = []
    protected shootCooldown: number = 0;

    abstract createProjectile(): boolean;

    act() {
        if(this.shootCooldown <= 0) {
            if(this.createProjectile()) {
                this.shootCooldown = this.stats.shootInterval;
            }
        }
        this.shootCooldown -= 1;
    }

    calculateRange(): number {
        return this.world.player.stats.effectiveWeaponRange + this.stats.effectiveWeaponRange;
    }
}

export class HomingPistol extends RangeWeapon {

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.getPosition(), 1, this.color, ctx)
    }

    createProjectile(): boolean {
        let range = this.calculateRange()
        let closestTargetTo = this.world.getClosestTargetTo(this.world.player.position, range);
        if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
            let stats = new ProjectileStats()
                .withPiercings(this.stats.projectilePiercings)
                .withSize(1)
                .withDamage(this.stats.damage)
                .withSpeed(this.stats.projectileSpeed);
            let projectile = HomingProjectile.createHomingProjectile(this.world, this.getPosition(), this.player, closestTargetTo[1]!, stats, 'yellow')
            this.projectiles.push(projectile)
            return true
        } else {
            return false;
        }
    }

    static generateHomingPistol(world: World, offset?: Vector) {
        if(!offset) {
            offset = new Vector(5, 5)
        }
        let stats = new WeaponStats()
                                    .withProjectileSpeed(1)
                                    .withDamage(3)
                                    .withShootInterval(50)
        let pistol = new HomingPistol(world, stats)
        pistol.offset = offset;
        pistol.size = 5;
        pistol.color = 'yellow';
        return pistol;
    }
}

export class Pistol extends RangeWeapon {

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.getPosition(), 1, this.color, ctx)
    }

    private createProjectile(): boolean {
        let range = this.calculateRange()
        let closestTargetTo = this.world.getClosestTargetTo(this.world.player.position, range);
        if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
            let stats = new ProjectileStats()
                .withPiercings(this.stats.projectilePiercings)
                .withSize(1)
                .withDamage(this.stats.damage)
                .withSpeed(this.stats.projectileSpeed);
            let projectile = StraightProjectile.createStraightProjectile(this.world, this.getPosition(), closestTargetTo[1]!.getPosition(), this.player, stats, 'pink')
            this.projectiles.push(projectile)
            return true
        } else {
            return false;
        }
    }

    static generatePistol(world: World, offset?: Vector) {
        if(!offset) {
            offset = new Vector(5, 5)
        }
        let stats = new WeaponStats()
            .withProjectileSpeed(2)
            .withDamage(4)
            .withShootInterval(25)
        let pistol = new Pistol(world, stats)
        pistol.offset = offset;
        pistol.size = 5;
        pistol.color = 'brown';
        return pistol;
    }
}


export class WeaponStats {

    private _weaponRange: number;
    private _weaponRangeFactor: number;
    private _projectileSpeed: number;
    private _projectilePiercings: number;
    private _damage: number;
    private _shootInterval: number;

    constructor() {
        this._weaponRangeFactor = 1
    }

    increase() {
        this._weaponRange *= 1.1;
        this._weaponRangeFactor += 0.05;
        this._damage *= 1.25;
        this._shootInterval *= 0.9
    }

    withWeaponRange(value: number) {
        this._weaponRange = value;
        return this;
    }

    withWeaponRangeFactor(value: number) {
        this._weaponRangeFactor = value;
        return this;
    }

    withProjectileSpeed(value: number) {
        this._projectileSpeed = value;
        return this;
    }

    withShootInterval(value: number) {
        this._shootInterval = value;
        return this;
    }

    withProjectilePiercings(value: number) {
        this._projectilePiercings = value;
        return this;
    }

    withDamage(value: number) {
        this._damage = value;
        return this;
    }

    get weaponRange(): number {
        return this._weaponRange;
    }

    get weaponRangeFactor(): number {
        return this._weaponRangeFactor
    }


    get projectilePiercings(): number {
        return this._projectilePiercings;
    }

    get damage(): number {
        return this._damage;
    }

    get projectileSpeed(): number {
        return this._projectileSpeed;
    }

    get shootInterval(): number {
        return this._shootInterval;
    }

    get effectiveWeaponRange(): number {
        return this._weaponRange * this._weaponRangeFactor
    }
}
