import {Enemy} from "./Enemies.ts";
import type {Player} from "./Player.ts";
import {Player} from "./Player.ts";
import {Projectile} from "./projectile.ts";
import {Vector} from "./base.ts";
import type {Drop, Placeable} from "./interfaces.ts";

export class World {
    private _enemies: [Enemy] = [];
    private _projectiles: [Projectile] = [];
    private _drops: [Drop] = [];
    private _player: Player;
    private _ctx: CanvasRenderingContext2D;
    private _size: Vector

    constructor(player: Player, ctx: CanvasRenderingContext2D, size: Vector) {
        this._player = player;
        this._ctx = ctx;
        this._size = size;
    }

    enemiesAct() {
        this._enemies.forEach(enemy => enemy.act())
        this._projectiles.forEach(projectile => projectile.act())
        this._drops.forEach(drop => drop.act())
    }

    draw() {
        this._enemies.forEach(enemy => enemy.draw(this._ctx))
        this._drops.forEach(drop => drop.draw(this._ctx))
        this._projectiles.forEach(projectile => projectile.draw(this._ctx))
        this._player.draw(this._ctx);
    }

    addProjectile(projectile: Projectile) {
        this._projectiles.push(projectile)
    }

    addDrop(drop: Drop)  {
        this._drops.push(drop)
    }

    removeDrop(drop: Drop) {
        this._drops = this._drops.filter(item => item !== drop)
    }

    removeProjectile(projectile: Projectile) {
        this._projectiles = this._projectiles.filter(item => item !== projectile)
    }

    removeEnemy(enemy: Enemy) {
        this._enemies = this._enemies.filter(item => item !== enemy)
    }


    get enemies(): [Enemy] {
        return this._enemies;
    }


    get size(): Vector {
        return this._size;
    }

    addEnemy(enemy: Enemy) {
        this._enemies.push(enemy)
    }

    randomPlace(): Vector {
        return new Vector(this.size.x * Math.random(), this.size.y * Math.random())
    }

    getClosestTargetTo(point: Vector): [number, Placeable | undefined] | undefined {
        let currentTarget;
        let currentDistance = Number.MAX_SAFE_INTEGER;
        this._enemies.forEach(enemy => {
            let distance = point.distanceTo(enemy.getPosition());
            if(distance < currentDistance) {
                currentDistance = distance;
                currentTarget = enemy
            }
        })
        if(currentTarget) {
            return [currentDistance, currentTarget];
        }
    }

    get player(): Player {
        return this._player;
    }
}