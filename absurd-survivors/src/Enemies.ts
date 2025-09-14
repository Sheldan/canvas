import type {Acting, ChanceEntry, Drawable, Healthy, Placeable, Shooting} from "./interfaces.ts";
import {fillDot, moveInDirectionOf} from "./utils.ts";
import {Vector} from "./base.ts";
import {World} from "./World.ts";
import type {Projectile} from "./projectile.ts";
import {StraightProjectile} from "./projectile.ts";
import {HealthPack, ItemDrop, LevelDrop, MoneyDrop} from "./drop.ts";
import {ItemManagement} from "./items.ts";
import {ProjectileStats} from "./stats.ts";
import {EnemyStatus} from "./status.ts";
import {NumberDisplayParticle} from "./particles.ts";

export abstract class Enemy implements Placeable, Drawable, Acting, Healthy {
    protected _position: Vector;
    protected speed: number;
    protected world: World;
    protected size: number
    protected status: EnemyStatus = new EnemyStatus(10);
    protected drops: KillChanceTable;

    constructor(position: Vector) {
        this.drops = new KillChanceTable();
        this.drops.addDrop( {chance: 10, creationMethod: this.spawnMoney})
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
        NumberDisplayParticle.spawnNumberParticle(this.world, damage, this._position, 'white')
        if(this.status.dead) {
            this.die()
            this.world.removeEnemy(this)
        }
    }

    die() {
        let draw = this.drops.draw();
        if(draw) {
            draw.creationMethod(this)
        }
    }

    spawnMoney(enemy: Enemy) {
        MoneyDrop.spawnMoneyDrop(enemy.world, enemy._position);
    }

    getSize() {
        return this.size;
    }

    dead() {
        return this.status.dead
    }

    tick(seconds: number, tick: number) {
    }

}

export class BasicEnemy extends Enemy {

    constructor(position: Vector) {
        super(position);
    }

    protected color: string;
    protected impactDamage: number;
    protected impactCooldown: number = 0;
    protected impactInterval: number = 60;

    draw(ctx: CanvasRenderingContext2D) {
        fillDot(this._position, this.getSize(), this.color, ctx)
    }


    move() {
        this._position = moveInDirectionOf(this._position, this.world.player.position, this.speed)
    }

    act() {
        super.act();
        if(this._position.distanceTo(this.world.player.position) < this.getSize() && this.impactCooldown <= 0) {
            this.world.player.takeDamage(this.impactDamage)
            this.impactCooldown = this.impactInterval;
        }
        this.impactCooldown -= 1;
    }

    static spawnBasicEnemy(world: World, position?: Vector) {
        world.addEnemy(this.generateBasicEnemy(world, position))
    }

    static generateBasicEnemy(world: World, position?: Vector): BasicEnemy {
        if(position === undefined) {
            position = world.randomPlace()
        }
        let basicEnemy = new BasicEnemy(position);
        basicEnemy.size = 5;
        basicEnemy.world = world;
        basicEnemy.speed = 0.5;
        basicEnemy.color = 'orange'
        basicEnemy.impactDamage = 2;
        return basicEnemy;
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
        let stats = new ProjectileStats()
            .withPiercings(0)
            .withSize(1)
            .withDamage(5)
            .withSpeed(2)
        let projectile = StraightProjectile.createStraightProjectile(this.world, this._position, this.world.player.position, this, stats)
        this.projectiles.push(projectile)
        return projectile
    }

    static spawnShootingEnemy(world: World, position?: Vector) {
        world.addEnemy(this.generateShootingEnemy(world, position))
    }

    static generateShootingEnemy(world: World, position?: Vector) {
        if(position === undefined) {
            position = world.randomPlace()
        }
        let shootingEnemy = new ShootingEnemy(position);
        shootingEnemy.size = 5;
        shootingEnemy.world = world;
        shootingEnemy.speed = 0.5;
        shootingEnemy.color = 'green'
        shootingEnemy.impactDamage = 2;
        shootingEnemy.shootInterval = 100
        return shootingEnemy
    }
}

export class HealthEnemy extends Enemy {

    constructor(position: Vector) {
        super(position);
    }

    protected color: string;

    draw(ctx: CanvasRenderingContext2D) {
        fillDot(this._position, this.size, this.color, ctx)
    }


    move() {
    }

    act() {
        super.act();
    }

    die() {
        HealthPack.spawnHealthPack(this.world, this._position)
    }

    static spawnHealthEnemy(world: World, position?: Vector) {
        world.addEnemy(this.createHealthEnemy(world, position))
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

export class ContainerEnemy extends Enemy {

    private drops: KillChanceTable;
    constructor(position: Vector) {
        super(position);
        this.status.health = 5;
        this.drops = new KillChanceTable();
        ItemManagement.getItemsWithRarityFactor().forEach(drop => {
            this.drops.addDrop(drop)
        })
        this.drops.calculateProbs()
    }

    protected color: string;

    draw(ctx: CanvasRenderingContext2D) {
        fillDot(this._position, this.size, this.color, ctx)
    }

    move() {
    }

    act() {
        super.act();
    }

    die() {
        let draw = this.drops.draw();
        if(draw) {
            let item = draw.creationMethod(this);
            ItemDrop.spawnItemDrop(this.world, item, this._position)
        }
    }

    spawnHealthPack(enemy: ContainerEnemy) {
        HealthPack.spawnHealthPack(enemy.world, enemy._position)
    }

    spawnLevelUp(enemy: ContainerEnemy) {
        LevelDrop.spawnLevelDrop(enemy.world, enemy._position)
    }

    spawnEnemy(enemy: ContainerEnemy) {
        ShootingEnemy.spawnShootingEnemy(enemy.world, enemy._position)
    }

    static spawnContainerEnemy(world: World, position?: Vector) {
        world.addEnemy(this.createContainerEnemy(world, position))
    }

    static createContainerEnemy(world: World, position?: Vector) {
        if(position === undefined) {
            position = world.randomPlace()
        }
        let basicEnemy = new ContainerEnemy(position);
        basicEnemy.size = 5;
        basicEnemy.world = world;
        basicEnemy.speed = 0;
        basicEnemy.color = 'brown'
        return basicEnemy;
    }


    getSize() {
        return this.size
    }
}


export class KillChanceTable {
    private chances: ChanceEntry[] = []

    addDrop(entry: ChanceEntry) {
        this.chances.push(entry)
    }

    calculateProbs() {
        let sum = this.chances.reduce((sum, entry) => sum + entry.chance, 0)
        this.chances.forEach(value => value.chance /= sum)
    }

    draw() {
        if(this.chances.length === 0) {
            return undefined;
        }
        let change = Math.random();
        for (const value of this.chances) {
            change -= value.chance;
            if(change <= 0) {
                return value;
            }
        }
        return this.chances[this.chances.length - 1]
    }
}