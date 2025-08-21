import type {Drawable, DrawContainer} from "./interfaces.ts";
import {World} from "./World.ts";
import {Vector} from "./base.ts";

export class HUD implements DrawContainer {
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

export class HealthInfo implements DrawContainer {
    private bar: InfoBar;
    private statLabels: [StatLabel] = []
    private world: World;

    constructor(world: World) {
        this.world = world;
        this.bar = new InfoBar(new Vector(0, 50), 50, 150, () => 'Health', () => this.world.player.status.health, () => this.world.player.stats.health)
        this.statLabels = [
            new StatLabel(new Vector(0, 150), () => 'Money', () => this.world.player.status.wealth)
        ]
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.bar.draw(ctx)
        this.statLabels.forEach(label => label.draw(ctx))
    }

}

export class StatLabel implements Drawable {
    private position: Vector;
    private borderColor: string = 'white';
    private textLambda: () => string;
    private valueLambda: () => number;


    constructor(position: Vector, textLambda: () => string, valueLambda: () => number) {
        this.position = position;
        this.textLambda = textLambda;
        this.valueLambda = valueLambda;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.borderColor
        let value = this.valueLambda();
        ctx.fillText(`${value}`, this.position.x, this.position.y)
        ctx.fill()
    }

    getPosition(): Vector {
        return this.position;
    }

    move(any?: any) {
    }

    getSize() {
    }

}

export class InfoBar implements Drawable {
    private position: Vector;
    private height: number;
    private width: number;
    private fillColor: string = 'green';
    private borderColor: string = 'white';
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

    getPosition(): Vector {
        return this.position;
    }

    move(any?: any) {
    }

    getSize() {
    }

}