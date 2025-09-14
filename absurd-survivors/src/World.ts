import {Enemy} from "./Enemies.ts";
import {Player} from "./Player.ts";
import {Projectile } from "./projectile.ts";
import {Vector} from "./base.ts";
import type {Drop, Particle, Placeable} from "./interfaces.ts";

export class World {
    private _enemies: ObjectContainer<Enemy> = new ObjectContainer<Enemy>()
    private _projectiles: ObjectContainer<Projectile> = new ObjectContainer<Projectile>();
    private _drops: ObjectContainer<Drop> = new ObjectContainer<Drop>();
    private _particles: ObjectContainer<Particle> = new ObjectContainer();
    private _player: Player;
    private readonly _ctx: CanvasRenderingContext2D;
    private _size: Vector;
    private _tick: number = 0;
    private static readonly TICK_INTERVAL = 10;
    private timeStamp: Date;

    constructor(player: Player, ctx: CanvasRenderingContext2D, size: Vector) {
        this._player = player;
        this._ctx = ctx;
        this._size = size;
        this.timeStamp = new Date();
    }

    enemiesAct() {
        this._enemies.items.forEach(enemy => enemy.act())
        this._enemies.clean()
        this._projectiles.items.forEach(projectile => projectile.act())
        this._projectiles.clean()
        this._drops.items.forEach(drop => drop.act())
        this._drops.clean()
        this._particles.items.forEach(particle => particle.act())
        this._particles.clean()
    }

    draw() {
        this._enemies.items.forEach(enemy => enemy.draw(this._ctx))
        this._drops.items.forEach(drop => drop.draw(this._ctx))
        this._projectiles.items.forEach(projectile => projectile.draw(this._ctx))
        this._particles.items.forEach(particle => particle.draw(this._ctx))
        this._player.draw(this._ctx);
    }

    addProjectile(projectile: Projectile) {
        this._projectiles.add(projectile)
    }

    addParticle(particle: Particle) {
        this._particles.add(particle)
    }

    addDrop(drop: Drop)  {
        this._drops.add(drop)
    }

    removeDrop(drop: Drop) {
        this._drops.scheduleRemoval(drop)
    }

    removeParticle(particle: Particle) {
        this._particles.scheduleRemoval(particle)
    }

    removeEnemy(enemy: Enemy) {
        this._enemies.scheduleRemoval(enemy)
    }

    removeProjectile(projectile: Projectile) {
        this._projectiles.scheduleRemoval(projectile)
    }


    movePlayer(vector: Vector) {
        this._player.position.x += vector.x;
        this._player.position.y += vector.y;
        this._player.position.x = Math.min(this.size.x - this._player.getSize(), this._player.position.x)
        this._player.position.x = Math.max(this._player.getSize(), this._player.position.x)
        this._player.position.y = Math.min(this.size.y -this._player.getSize(), this._player.position.y)
        this._player.position.y = Math.max(this._player.getSize(), this._player.position.y)
    }


    maxValue() {
        return Math.max(this.size.x, this.size.y)
    }

    get size(): Vector {
        return this._size;
    }

    tick() {
        this._tick += 1;
        if((this._tick % World.TICK_INTERVAL) == 0) {
            let currentTimeStamp = new Date();
            let seconds = (currentTimeStamp.getTime() - this.timeStamp.getTime()) / 1000;
            this._player.tick(seconds, this._tick);
            this._particles.items.forEach(particle => particle.tick(seconds, this._tick))
            this.timeStamp = currentTimeStamp;
        }
    }

    outside(position: Vector): boolean {
        return position.x > this.size.x || position.y > this.size.y || position.x < 0 || position.y < 0
    }

    addEnemy(enemy: Enemy) {
        this._enemies.add(enemy)
    }

    randomPlace(): Vector {
        return new Vector(this.size.x * Math.random(), this.size.y * Math.random())
    }

    getClosestTargetTo(point: Vector, range?: number): [number, Placeable | undefined] | undefined {
        return this.getClosestTargetToButNot(point, undefined, range)
    }

    getFarthestTargetButWithin(point: Vector, range?: number): [number, Placeable | undefined] | undefined {
        let currentTarget;
        let currentDistance = Number.MAX_SAFE_INTEGER;
        this._enemies.items.forEach(enemy => {
            let distance = point.distanceTo(enemy.getPosition());
            if(range && distance > range) {
                return;
            }
            if((range - distance) < currentDistance) {
                currentDistance = distance;
                currentTarget = enemy
            }
        })
        if(currentTarget) {
            return [currentDistance, currentTarget];
        }
    }

    getClosestTargetToButNot(point: Vector, placeable?: Placeable, range?: number): [number, Placeable | undefined] | undefined {
        return this.getClosestTargetToButNotArray(point, [placeable], range)
    }

    getClosestTargetToButNotArray(point: Vector, placeAbles?: [Placeable | undefined], range?: number): [number, Placeable | undefined] | undefined {
        let currentTarget;
        let currentDistance = Number.MAX_SAFE_INTEGER;
        this._enemies.items.forEach(enemy => {
            if(placeAbles && placeAbles.indexOf(enemy) !== -1) {
                return;
            }
            let distance = point.distanceTo(enemy.getPosition());
            if(range && distance > range) {
                return;
            }
            if(distance < currentDistance) {
                currentDistance = distance;
                currentTarget = enemy
            }
        })
        if(currentTarget) {
            return [currentDistance, currentTarget];
        }
    }

    getAllInRange(point: Vector, range: number): Enemy[] {
        let found = [];
        this._enemies.items.forEach(enemy => {
            let distance = point.distanceTo(enemy.getPosition());
            if(range && distance < range) {
                found.push(enemy)
            }
        });
        return found;
    }

    get player(): Player {
        return this._player;
    }
}

class ObjectContainer<T> {
    private _items: T[] = [];
    private _itemsToRemove: T[] = [];

    constructor() {
        this._items = []
        this._itemsToRemove = []
    }

    scheduleRemoval(item: T) {
        this._itemsToRemove.push(item)
    }

    clean() {
        this._itemsToRemove.forEach(value => this.remove(value))
        this._itemsToRemove = []
    }

    private remove(itemToRemove: T) {
        this._items = this._items.filter(item => item !== itemToRemove)
    }

    add(item: T) {
        this._items.push(item)
    }


    get items(): T[] {
        return this._items;
    }
}