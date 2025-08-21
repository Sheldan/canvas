import type {World} from "./World.ts";
import type {Drawable} from "./interfaces.ts";
import {World} from "./World.ts";
import type {Vector} from "./base.ts";
import {Vector} from "./base.ts";

export class HUD implements Drawable{
    private health: HealthInfo;
    private world: World;


    constructor(world: World) {
        this.world = world;
        this.health = new HealthInfo(world);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.health.draw(ctx)
    }


}

export class HealthInfo implements Drawable{
    private bar: InfoBar;
    private world: World;

    constructor(world: World) {
        this.world = world;
        this.bar = new InfoBar(new Vector(0, 50), 50, 150, () => 'Health', () => this.world.player.health, () => this.world.player.stats.health)
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.bar.draw(ctx)
    }
}

export class InfoBar implements Drawable {
    private position: Vector;
    private height: number;
    private width: number;
    private fillColor: string = 'green';
    private borderColor: string = 'black';
    private textLambda: () => string;
    private valueLambda: () => number;
    private totalValueLambda: () => number;


    constructor(position: Vector, height: number, width: number, textLambda: () => string, valueLambda: () => number, totalValueLambda: () => number) {
        this.position = position;
        this.height = height;
        this.width = width;
        this.textLambda = textLambda;
        this.valueLambda = valueLambda;
        this.totalValueLambda = totalValueLambda;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.borderColor
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = this.fillColor;
        let value = this.valueLambda();
        let totalValue = this.totalValueLambda();
        let usedWidth = (value / totalValue) * this.width;
        ctx.fillRect(this.position.x, this.position.y, usedWidth, this.height)
        ctx.fillStyle = this.borderColor
        ctx.fillText(`${value}/${totalValue}`, this.position.x + this.width / 2, this.position.y + this.height / 2)
        ctx.fill()
    }

}