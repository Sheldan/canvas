import {Vector} from "./base.ts";

export interface Acting {
    act()
}

export interface Healthy {
    takeDamage(damage: number);
    die();
    dead();
}

export interface Drop extends Drawable, Acting {
    pickup()
}

export interface Placeable {
    move(any?: any)
    getSize();
    getPosition(): Vector;
}

export interface Projectile extends Drawable {

}

export interface Equipment {
    getOffset(): Vector;
    setOffset(vec: Vector);
}

export interface Weapon extends Drawable, Equipment {
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