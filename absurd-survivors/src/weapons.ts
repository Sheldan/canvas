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

    constructor(world: World, stats: WeaponStats) {
        this.player = world.player;
        this.world = world;
        this.stats = stats;
    }

    act() {
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
}

export abstract class RangeWeapon extends BasicWeapon {

    protected projectiles: [Projectile] = []
    protected shootInterval: number;
    protected shootCooldown: number = 0;

    abstract createProjectile(): boolean;

    act() {
        if(this.shootCooldown <= 0) {
            if(this.createProjectile()) {
                this.shootCooldown = this.shootInterval;
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
            let stats = new ProjectileStats(this.stats.projectilePiercings, 1, this.stats.damage, this.stats.projectileSpeed)
            let projectile = HomingProjectile.createHomingProjectile(this.world, this.getPosition(), this.player, closestTargetTo[1]!, stats, 'yellow')
            this.projectiles.push(projectile)
            return true
        } else {
            return false;
        }
    }

    static spawnPistol(world: World, offset?: Vector) {
        if(!offset) {
            offset = new Vector(5, 5)
        }
        let stats = new WeaponStats(0, 1, 3, 5, 5)
        let pistol = new HomingPistol(world, stats)
        pistol.offset = offset;
        pistol.size = 5;
        pistol.color = 'yellow';
        pistol.shootInterval = 50;
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
            let stats = new ProjectileStats(this.stats.projectilePiercings, 1, this.stats.damage, this.stats.projectileSpeed)
            let projectile = StraightProjectile.createStraightProjectile(this.world, this.getPosition(), closestTargetTo[1]!.getPosition(), this.player, stats, 'pink')
            this.projectiles.push(projectile)
            return true
        } else {
            return false;
        }
    }

    static spawnPistol(world: World, offset?: Vector) {
        if(!offset) {
            offset = new Vector(5, 5)
        }
        let stats = new WeaponStats(0,
            1,
            5,
            2,
            5)
        let pistol = new Pistol(world, stats)
        pistol.offset = offset;
        pistol.size = 5;
        pistol.color = 'brown';
        pistol.shootInterval = 50;
        return pistol;
    }
}


export class WeaponStats {
    constructor(private _weaponRange: number,
                private _weaponRangeFactor: number,
                private _projectileSpeed: number,
                private _projectilePiercings: number,
                private _damage: number) {
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

    get effectiveWeaponRange(): number {
        return this._weaponRange * this._weaponRangeFactor
    }
}
