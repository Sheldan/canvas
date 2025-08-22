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

export class RangeWeapon extends BasicWeapon {
    calculateRange(): number {
        return this.world.player.stats.effectiveWeaponRange + this.stats.effectiveWeaponRange;
    }
}

export class HomingPistol extends RangeWeapon {

    private shootInterval: number;
    private shootCooldown: number = 0;

    private projectiles: [Projectile] = []

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.getPosition(), 1, this.color, ctx)
    }

    act() {
        if(this.shootCooldown <= 0) {
            if(this.createProjectile()) {
                this.shootCooldown = this.shootInterval;
            }
        }
        this.shootCooldown -= 1;
    }

    private createProjectile(): boolean {
        let range = this.calculateRange()
        let closestTargetTo = this.world.getClosestTargetTo(this.world.player.position, range);
        if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
            let stats = new ProjectileStats(5, 1, 5, 5)
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
        let stats = new WeaponStats(0, 1)
        let pistol = new HomingPistol(world, stats)
        pistol.offset = offset;
        pistol.size = 5;
        pistol.color = 'yellow';
        pistol.shootInterval = 50;
        return pistol;
    }
}

export class Pistol extends RangeWeapon {

    private shootInterval: number;
    private shootCooldown: number = 0;

    private projectiles: [Projectile] = []

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.getPosition(), 1, this.color, ctx)
    }

    act() {
        if(this.shootCooldown <= 0) {
            if(this.createProjectile()) {
                this.shootCooldown = this.shootInterval;
            }
        }
        this.shootCooldown -= 1;
    }

    private createProjectile(): boolean {
        let range = this.calculateRange()
        let closestTargetTo = this.world.getClosestTargetTo(this.world.player.position, range);
        if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
            let stats = new ProjectileStats(2, 1, 5, 5)
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
        let stats = new WeaponStats(0, 1)
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
                private _weaponRangeFactor: number) {
    }


    get weaponRange(): number {
        return this._weaponRange;
    }

    get weaponRangeFactor(): number {
        return this._weaponRangeFactor
    }

    get effectiveWeaponRange(): number {
        return this._weaponRange * this._weaponRangeFactor
    }
}
