import type {Acting, Placeable, Healthy, Weapon} from "./interfaces.ts";
import type {Vector} from "./base.ts";
import {World} from "./World.ts";
import {Cooldown, DeadPoint, Point, Vector} from "./base.ts";
import {
    circleLineCollision,
    drawDot,
    getCoordinatesSplit,
    moveInDirectionOf,
    pointOnLineWithinLine,
    straightMove,
    toRad
} from "./utils.ts";
import {InstanceOfUtils} from "./instance.ts";
import {ChainBall, MeleeWeapon} from "./weapons.ts";
import type {Enemy} from "./Enemies.ts";

export abstract class Projectile implements Acting, Placeable {

    protected position: Vector;
    protected speedVec: Vector;
    protected world: World;
    protected parent: any;
    protected color: string
    protected stats: ProjectileStats;
    protected status: ProjectileStatus;
    protected lastPosition: Vector;
    protected secondToLastPosition?: Vector
    protected lastColliding?: Placeable;

    constructor(position: Vector, speedVec: Vector, stats: ProjectileStats, world: World, parent: any) {
        this.position = position.clone();
        this.speedVec = speedVec.clone();
        this.world = world;
        this.parent = parent;
        this.stats = stats;
        this.status = new ProjectileStatus(stats.piercings)
    }

    die() {
        this.world.removeProjectile(this)
    }

    act() {
        this.move()
        if(this.parent !== this.world.player) {
            if(this.position.distanceTo(this.world.player.position) < (this.stats.size + this.world.player.stats.size) && this.status.collisionCooldown.cooledDown()) {
                this.impactPlayer()
                this.status.collisionCooldown.resetCooldown()
            }
        } else if(this.parent === this.world.player) {
            let closestTargetTo = this.world.getClosestTargetToButNot(this.position, this.lastColliding);
            if(closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
                let target: Placeable = closestTargetTo[1]!;
                if(target.getPosition().distanceTo(this.position) < (this.stats.size + target.getSize())
                    || circleLineCollision(target.getPosition(), target.getSize(), this.position, this.lastPosition)) {
                    if(target !== this.lastColliding) {
                        if(InstanceOfUtils.instanceOfHealthy(target)) {
                            let healthy = target as Healthy;
                            healthy.takeDamage(this.stats.damage)
                            if(!this.status.hasPiercingLeft()) {
                               this.die()
                            }
                            this.status.decreasePiercings()
                        } else {
                            this.die()
                        }
                    }
                    this.lastColliding = target;
                } else {
                    this.lastColliding = undefined;
                }
            } else {
                this.lastColliding = undefined;
            }
        }
        this.status.collisionCooldown.decreaseCooldown()
        this.checkWorldBorder()
    }

    checkWorldBorder() {
        if(this.world.outside(this.position)) {
            this.die()
        }
    }

    impactPlayer() {
        this.world.player.takeDamage(this.stats.damage)
        this.die()
    };

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.position, this.stats.size, this.color, ctx)
    }

    move() {
        this.secondToLastPosition = this.lastPosition;
        this.lastPosition = this.position.clone()
    }

    getPosition(): Vector {
        return this.position;
    }

    getSize() {
        return this.stats.size
    }

}

export class StraightProjectile extends Projectile {


    constructor(position: Vector, dirVector: Vector, stats: ProjectileStats, world: World, parent: any) {
        super(position, dirVector, stats, world, parent);
    }

    move() {
        super.move()
        this.position = straightMove(this.position, this.speedVec)
    }

    static createStraightProjectile(world: World, start: Vector, targetPosition: Vector, parent: any, stats: ProjectileStats, color?: string) {
        let dirVector = Vector.createVector(targetPosition, start).normalize().multiply(stats.speed);
        let projectile = new StraightProjectile(start, dirVector, stats, world, parent)
        projectile.color = color === undefined ? 'red' : color!;
        world.addProjectile(projectile)
        return projectile;
    }
}

export class ChainBallProjectile extends Projectile {
    private weapon: ChainBall;
    private movingBack: boolean = false;
    private target: Vector;
    private lastHit: Enemy[] = []

    constructor(position: Vector, speedVec: Vector, stats: ProjectileStats, world: World, parent: any, weapon: ChainBall, target: Vector) {
        super(position, speedVec, stats, world, parent);
        this.weapon = weapon;
        this.target = target.clone()
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawDot(this.position, this.stats.size, 'pink', ctx) // todo render the weapon instead
    }

    act() {
        this.move()
        // TODO It seems that the projectile doesnt _quite_ hit the enemy, but is just getting close to it
        let hitEnemies = this.world.getAllInRange(this.position, this.stats.size * 2);
        hitEnemies.forEach(value => {
            if(this.lastHit.indexOf(value) !== -1) {
                if(InstanceOfUtils.instanceOfHealthy(value)) {
                    let healthy = value as Healthy;
                    healthy.takeDamage(this.stats.damage)
                }
            }
        })
        this.lastHit = hitEnemies;
    }

    move() {
        super.move()
        if(!this.movingBack) {
            this.position = straightMove(this.position, this.speedVec)
            if(this.position.distanceTo(this.target) < this.stats.size) {
                this.movingBack = true;
                this.speedVec = this.speedVec.multiply(3)
            }
        } else {
            this.position = moveInDirectionOf(this.position, this.world.player.position, this.speedVec.vecLength())
        }
        if(this.movingBack && this.position.distanceTo(this.world.player.position) < (this.stats.size + this.world.player.stats.size)) {
            this.weapon.reset();
            this.die()
        }
    }

    static createChainBallProjectile(world: World, start: Vector, targetPosition: Vector, parent: any, stats: ProjectileStats, weapon: MeleeWeapon, color?: string) {
        let dirVector = Vector.createVector(targetPosition, start).normalize().multiply(stats.speed);
        let projectile = new ChainBallProjectile(start, dirVector, stats, world, parent, weapon, targetPosition)
        projectile.color = color === undefined ? 'red' : color!;
        world.addProjectile(projectile)
        return projectile;
    }
}

export class StraightMeleeWeaponProjectile extends Projectile {

    private weapon: MeleeWeapon;
    private movingBack: boolean = false;
    private target: Vector;
    private lastHit: Enemy[] = []

    constructor(position: Vector, speedVec: Vector, stats: ProjectileStats, world: World, parent: any, weapon: ChainBall, target: Vector) {
        super(position, speedVec, stats, world, parent);
        this.weapon = weapon;
        this.target = target.clone()
    }

    draw(ctx: CanvasRenderingContext2D) {
        let position = this.getRealPosition();
        drawDot(position, this.stats.size, 'brown', ctx) // todo render the weapon instead
    }

    getRealPosition(): Vector {
        return this.world.player.getPosition().add(this.position)
    }

    act() {
        this.move()
        let hitEnemies = this.world.getAllInRange(this.getRealPosition(), this.stats.size * 2);
        hitEnemies.forEach(value => {
            if(this.lastHit.indexOf(value) !== -1) {
                if(InstanceOfUtils.instanceOfHealthy(value)) {
                    let healthy = value as Healthy;
                    healthy.takeDamage(this.stats.damage)
                }
            }
        })
        this.lastHit = hitEnemies;
    }

    move() {
        super.move()
        if(!this.movingBack) {
            this.position = straightMove(this.position, this.speedVec)
            if(this.position.distanceTo(this.target) < this.stats.size) {
                this.movingBack = true;
                this.speedVec = this.speedVec.multiply(3)
            }
        } else {
            this.position = moveInDirectionOf(this.position, new Vector(0, 0), this.speedVec.vecLength())
        }
        if(this.movingBack && this.position.distanceTo(new Vector(0, 0)) < (this.stats.size + this.world.player.stats.size)) {
            this.weapon.reset();
            this.die()
        }
    }

    static createStraightMeleeProjectile(world: World, start: Vector, targetPosition: Vector, parent: any, stats: ProjectileStats, weapon: MeleeWeapon, color?: string) {
        let dirVector = Vector.createVector(targetPosition, start).normalize().multiply(stats.speed);
        let projectile = new StraightMeleeWeaponProjectile(start, dirVector, stats, world, parent, weapon, targetPosition)
        projectile.color = color === undefined ? 'red' : color!;
        world.addProjectile(projectile)
        return projectile;
    }
}

export class HomingProjectile extends Projectile {

    private target: Placeable;

    constructor(position: Vector, speedVec: Vector, stats: ProjectileStats, world: World, parent: any, target: Placeable) {
        super(position, speedVec, stats, world, parent);
        this.target = target;
    }

    move() {
        super.move()
        this.position = moveInDirectionOf(this.position, this.target.getPosition(), this.speedVec.vecLength())
        if(InstanceOfUtils.instanceOfHealthy(this.target)) {
            let target = this.target as Healthy
            if(target.dead()) {
                let closestTargetTo = this.world.getClosestTargetTo(this.position)

                let oldTargetDirection = Vector.createVector(this.target.getPosition(), this.position)
                let justMovedDirection = Vector.createVector(this.position, this.lastPosition).normalize()
                let olderMovedDirection: Vector;
                if(this.secondToLastPosition !== undefined) {
                    olderMovedDirection = Vector.createVector(this.lastPosition, this.secondToLastPosition).normalize();
                } else {
                    olderMovedDirection = new Vector(0, 1)
                }
                if (closestTargetTo !== undefined && closestTargetTo[1] !== undefined) {
                    let newTargetPosition = closestTargetTo[1]!.getPosition();
                    let newDir = Vector.createVector(newTargetPosition, this.position)
                    let newDirAngle = newDir.angleTo(olderMovedDirection);
                    if(Math.abs(newDirAngle) <= toRad(30)) {
                        this.target = closestTargetTo[1]!;
                    } else {
                        if(pointOnLineWithinLine(this.target.getPosition(), this.lastPosition, this.position)) {
                            justMovedDirection = olderMovedDirection
                        }
                        this.target = new DeadPoint(this.position.add(justMovedDirection.multiply(this.world.maxValue())))
                    }
                } else {
                    if(pointOnLineWithinLine(this.target.getPosition(), this.lastPosition, this.position)) {
                        justMovedDirection = olderMovedDirection
                    }
                    this.target = new DeadPoint(this.position.add(justMovedDirection.multiply(Math.max(this.world.size.x, this.world.size.y))))
                }
            }
        }
        this.checkWorldBorder()
    }

    static createHomingProjectile(world: World, start: Vector, parent: any,  target: Placeable, stats: ProjectileStats, color?: string) {

        let projectile = new HomingProjectile(start, new Vector(0, stats.speed), stats, world, parent, target)
        projectile.color = color === undefined ? 'red' : color!;
        world.addProjectile(projectile)
        return projectile;
    }


    die() {
        if(this.stats.deathSplit && this.stats.deathSplit > 0 && Math.random() > this.stats.deathSplitChance) {
            let splits = this.stats.deathSplit;
            let directionalVectors = getCoordinatesSplit(splits);
            let stats = new ProjectileStats()
                .withSize(this.stats.size / 2)
                .withDamage(this.stats.damage / 2)
                .withSpeed(this.stats.speed / 2)
            directionalVectors.forEach(value => {
                let target = this.position.add(value.multiply(this.world.maxValue()))
                StraightProjectile.createStraightProjectile(this.world, this.position, target, this.parent, stats, 'white')
            })
        }
        super.die();
    }
}

export class ProjectileStatus {
    private _piercingsLeft: number;
    private _collisionCooldown: Cooldown;

    constructor(piercingsLeft: number) {
        this._piercingsLeft = piercingsLeft;
        this._collisionCooldown = new Cooldown(10)
    }

    get piercingsLeft(): number {
        return this._piercingsLeft;
    }

    hasPiercingLeft(): boolean {
        return this.piercingsLeft > 0;
    }


    get collisionCooldown(): Cooldown {
        return this._collisionCooldown;
    }

    decreasePiercings() {
        this._piercingsLeft -= 1;
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