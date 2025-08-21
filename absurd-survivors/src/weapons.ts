import type {Weapon} from "./interfaces.ts";
import {drawDot} from "./utils.ts";
import {Player} from "./Player.ts";
import {HomingProjectile, Projectile, ProjectileStats} from "./projectile.ts";
import {World} from "./World.ts";
import {Vector} from "./base.ts";

export class Pistol implements Weapon {

    private player: Player
    private shootInterval: number;
    private shootCooldown: number = 0;
    private world: World;
    private offset: Vector;
    private projectiles: [Projectile] = []
    private color: string;
    private size: number;

    constructor(world: World) {
        this.player = world.player;
        this.world = world;
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.getPosition(), this.size, this.color, ctx)
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
        let closestTargetTo = this.world.getClosestTargetTo(this.world.player.position);
        if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
            let stats = new ProjectileStats(0, 1, 5)
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
        let pistol = new Pistol(world)
        pistol.offset = offset;
        pistol.size = 1;
        pistol.color = 'yellow';
        pistol.shootInterval = 50;
        return pistol;
    }

    getPosition(): Vector {
        return this.player.position.add(this.offset);
    }

    move(any?: any) {
    }

    getSize() {
        return this.size;
    }
}