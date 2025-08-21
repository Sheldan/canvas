import {Vector} from "./base.ts";

export interface Acting {
    act()
}

export interface Healthy {
    takeDamage(damage: number);
}

export interface Moving {
    move()
    getPosition(): Vector;
}

export interface Projectile extends Drawable {

}

export interface Weapon extends Drawable{
    act()
}

export interface Shooting {
    createProjectile(): Projectile;
    removeProjectile(projectile: Projectile)
}

export interface Drawable {
    draw(ctx: CanvasRenderingContext2D);
}