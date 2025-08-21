import type {Acting, Drawable, Healthy, Placeable, Shooting} from "./interfaces.ts";
import {drawDot, moveInDirectionOf} from "./utils.ts";
import {Vector} from "./base.ts";
import {World} from "./World.ts";
import type {Projectile} from "./projectile.ts";
import {HomingProjectile, ProjectileStats, StraightProjectile} from "./projectile.ts";
import {HealthPack, MoneyDrop} from "./drop.ts";

export abstract class Enemy implements Placeable, Drawable, Acting, Healthy {
    protected _position: Vector;
    protected speed: number;
    protected world: World;
    protected status: EnemyStatus = new EnemyStatus(10);

    constructor(position: Vector) {
        this._position = position.clone();
    }

    draw(ctx: CanvasRenderingContext2D) {
    }

    act() {
        this.move()
    }

    move() {
    }


    getPosition(): Vector {
        return this._position;
    }

    takeDamage(damage: number) {
        this.status.health -= damage;
        if(this.status.dead) {
            this.die()
            this.world.removeEnemy(this)
        }
    }

    die() {
        MoneyDrop.createMoneyDrop(this.world, this._position);
    }

    getSize() {
    }

    dead() {
        return this.status.dead
    }

}

export class BasicEnemy extends Enemy {

    constructor(position: Vector) {
        super(position);
    }

    protected size: number;
    protected color: string;
    protected impactDamage: number;
    protected impactCooldown: number = 0;
    protected impactInterval: number = 60;

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this._position, this.size, this.color, ctx)
    }


    move() {
        this._position = moveInDirectionOf(this._position, this.world.player.position, this.speed)
    }

    act() {
        super.act();
        if(this._position.distanceTo(this.world.player.position) < this.size && this.impactCooldown <= 0) {
            this.world.player.takeDamage(this.impactDamage)
            this.impactCooldown = this.impactInterval;
        }
        this.impactCooldown -= 1;
    }

    static generateBasicEnemy(world: World, position?: Vector): BasicEnemy {
        if(position === undefined) {
            position = new Vector(250, 250)
        }
        let basicEnemy = new BasicEnemy(position);
        basicEnemy.size = 5;
        basicEnemy.world = world;
        basicEnemy.speed = 0.5;
        basicEnemy.color = 'orange'
        basicEnemy.impactDamage = 2;
        return basicEnemy;
    }

    getSize() {
        return this.size
    }
}

export class ShootingEnemy extends BasicEnemy implements Shooting {
    private shootCooldown: number = 0;
    private shootInterval: number;
    private projectiles: Projectile[] = []

    constructor(position: Vector) {
        super(position);
    }

    removeProjectile(projectile: Projectile) {
        this.projectiles = this.projectiles.filter(item => item !== projectile)
    }

    act() {
        super.act();
        if(this.shootCooldown <= 0) {
            this.createProjectile()
            this.shootCooldown = this.shootInterval;
        }
        this.shootCooldown -= 1;
    }

    createProjectile() {
        let stats = new ProjectileStats(0, 1, 5, 2)
        let projectile = StraightProjectile.createStraightProjectile(this.world, this._position, this.world.player.position, this, stats)
        this.projectiles.push(projectile)
        return projectile
    }

    static generateShootingEnemy(world: World, position?: Vector) {
        if(position === undefined) {
            position = world.randomPlace()
        }
        let basicEnemy = new ShootingEnemy(position);
        basicEnemy.size = 5;
        basicEnemy.world = world;
        basicEnemy.speed = 0.5;
        basicEnemy.color = 'green'
        basicEnemy.impactDamage = 2;
        basicEnemy.shootInterval = 100
        return basicEnemy;
    }
}

export class EnemyStatus {
    constructor(private _health: number) {
    }


    get health(): number {
        return this._health;
    }

    get dead(): boolean {
        return this._health <= 0;
    }

    set health(value: number) {
        this._health = value;
    }
}

export class HealthEnemy extends Enemy {

    constructor(position: Vector) {
        super(position);
    }

    protected size: number;
    protected color: string;

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this._position, this.size, this.color, ctx)
    }


    move() {
    }

    act() {
        super.act();
    }

    die() {
        HealthPack.createHealthPack(this.world, this._position)
    }

    static createHealthEnemy(world: World, position?: Vector) {
        if(position === undefined) {
            position = world.randomPlace()
        }
        let basicEnemy = new HealthEnemy(position);
        basicEnemy.size = 5;
        basicEnemy.world = world;
        basicEnemy.speed = 0;
        basicEnemy.color = 'purple'
        return basicEnemy;
    }


    getSize() {
        return this.size
    }
}