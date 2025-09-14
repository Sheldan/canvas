import {Vector} from "./base.ts";
import type {Player} from "./Player.ts";
import type {Rarity} from "./items.ts";
import type {World} from "./World.ts";

export interface Acting {
    act()
    tick(seconds: number, tick: number)
}

export interface Healthy {
    takeDamage(damage: number);
    die();
    dead();
}

export interface Leveling {
    increaseLevel();
    level()
}

export interface Item {
    pickup(player: Player, world: World);
    name(): string
    getRarity(): Rarity;
}

export interface ChanceEntry {
    chance: number;
    creationMethod: (any: any) => any;
}

export interface Drop extends Drawable, Acting {
    pickup()
}

export interface Particle extends Drawable, Placeable, Acting {

}

export interface Placeable {
    move(any?: any)
    getSize();
    getPosition(): Vector;
}

export interface MouseInteracting {
    hit(pos: Vector): boolean
    clickAction(pos: Vector): void
}

export interface MouseInterActingContainer {
    mouseDown(pos: Vector)
}

export interface Projectile extends Drawable {

}

export interface Equipment {
    getOffset(): Vector;
    setOffset(vec: Vector);
}

export interface Weapon extends Drawable, Equipment, Leveling {
    act()
}

export interface Shooting {
    createProjectile(): Projectile;
    removeProjectile(projectile: Projectile)
}

export interface Drawable extends Placeable {
    draw(ctx: CanvasRenderingContext2D);
}

export interface DrawContainer {
    draw(ctx: CanvasRenderingContext2D);
}