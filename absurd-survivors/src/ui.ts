import type {Drawable, DrawContainer, MouseInteracting, MouseInterActingContainer} from "./interfaces.ts";
import {World} from "./World.ts";
import {Vector} from "./base.ts";
import {rectPointIntersection} from "./utils.ts";

export class HUD implements DrawContainer {
    private health: PlayerInfo;
    private controls: Controls;
    private world: World;

    constructor(world: World, keys: any) {
        this.world = world;
        this.health = new PlayerInfo(world);
        this.controls = new Controls(world, keys);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.health.draw(ctx)
        this.controls.draw(ctx)
    }

    mouseDown(pos: Vector) {
        this.controls.mouseDown(pos)
    }

    mouseUp(pos: Vector) {
        this.controls.mouseUp(pos)
    }

}

export class Controls implements DrawContainer, MouseInterActingContainer {

    private world: World;
    private buttons: RectButton[] = []
    private lastHitButton: RectButton | undefined;

    constructor(world: World, keys: any) {
        this.world = world;
        let gapSize = 10;
        this.buttons = [
            new KeyboardButton(new Vector(this.world.size.x - 150, this.world.size.y - 150 - gapSize), new Vector(50, 50), 'W', keys),
            new KeyboardButton(new Vector(this.world.size.x - 150, this.world.size.y - 100), new Vector(50, 50), 'S', keys),
            new KeyboardButton(new Vector(this.world.size.x - 100 + gapSize, this.world.size.y - 100), new Vector(50, 50), 'D', keys),
            new KeyboardButton(new Vector(this.world.size.x - 200 - gapSize, this.world.size.y - 100), new Vector(50, 50), 'A', keys)
        ]
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.buttons.forEach(button => {
            button.draw(ctx)
        })
    }

    mouseDown(pos: Vector) {
        this.lastHitButton = undefined;
        for (const button of this.buttons) {
            if(button.hit(pos)) {
                button.clickAction(pos)
                this.lastHitButton = button;
                return
            }
        }
    }

    mouseUp(pos: Vector) {
       if(this.lastHitButton) {
           this.lastHitButton.releaseAction(pos)
       }
    }

}

export class PlayerInfo implements DrawContainer {
    private bar: InfoBar;
    private statLabels: StatLabel[] = []
    private world: World;
    private statLabelBase: Vector;
    private static readonly STAT_LABEL_HEIGHT_OFFSET: number = 4;

    constructor(world: World) {
        this.world = world;
        this.bar = new InfoBar(new Vector(0, 50), 50, 150, () => 'Health', () => this.world.player.status.health, () => this.world.player.stats.health)
        this.statLabelBase = new Vector(0, 150)
        this.statLabels = [
            new StatLabel(() => 'Money', () => this.world.player.status.wealth),
            new StatLabel(() => 'Level', () => this.world.player.status.level),
            new StatLabel(() => 'Speed', () => Math.floor(this.world.player.stats.speed)),
            new StatLabel(() => 'Pull range', () => Math.floor(this.world.player.stats.pullRange)),
            new StatLabel(() => 'Weapon range', () => Math.floor(this.world.player.stats.effectiveWeaponRange))
        ]
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.bar.draw(ctx)
        let metrics = ctx.measureText('I')
        let upperCaseCharacterSize = new Vector(0, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent).add(new Vector(0, PlayerInfo.STAT_LABEL_HEIGHT_OFFSET))
        for (let i = 0; i < this.statLabels.length; i++){
            const label = this.statLabels[i];
            label.move(this.statLabelBase.add(upperCaseCharacterSize.multiply(i)))
            label.draw(ctx);
        }
    }

}

export class RectButton implements Drawable, MouseInteracting {
    protected position: Vector;
    protected size: Vector;
    protected borderColor: string = 'light-gray';
    protected contentColor: string = 'gray';
    protected label: string;
    protected action: () => void;
    protected releaseLambda?: () => void;

    constructor(position: Vector, size: Vector, label: string,  actionLambda: () => void, releaseLambda?: () => void) {
        this.position = position;
        this.size = size;
        this.label = label;
        this.action = actionLambda;
        this.releaseLambda = releaseLambda;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.fillStyle = this.contentColor;
        ctx.strokeStyle = this.borderColor;
        ctx.rect(this.position.x, this.position.y, this.size.x, this.size.y)
        ctx.fill()
        ctx.stroke();
        ctx.fillStyle = 'black'
        ctx.fillText(this.label, this.position.x + this.size.x / 2, this.position.y + this.size.y / 2)
        ctx.closePath()
    }

    getPosition(): Vector {
        return this.position;
    }

    getSize() {
    }

    move(any?: any) {
    }

    clickAction(pos: Vector) {
        this.action()
    }

    releaseAction(pos: Vector) {
        if(this.releaseLambda) {
            this.releaseLambda()
        }
    }

    hit(pos: Vector): boolean {
        return rectPointIntersection(this.position, this.size, pos)
    }
}

export class KeyboardButton extends RectButton {
    constructor(position: Vector, size: Vector, key: string, keys: any) {
        super(position, size, key.toUpperCase(),
            () => { keys[key.toLowerCase()].state = true},
            () => { keys[key.toLowerCase()].state = false}
        )
    }
}

export class StatLabel implements Drawable {
    private position: Vector;
    private borderColor: string = 'white';
    private textLambda: () => string;
    private valueLambda: () => number;


    constructor(textLambda: () => string, valueLambda: () => number);
    constructor(textLambda: () => string, valueLambda: () => number, position?: Vector) {
        if(!position) {
            position = new Vector(0, 0)
        }
        this.position = position;
        this.textLambda = textLambda;
        this.valueLambda = valueLambda;
    }


    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.borderColor
        let value = this.valueLambda();
        let text = this.textLambda();
        ctx.fillText(`${text}: ${value}`, this.position.x, this.position.y)
        ctx.fill()
    }

    getPosition(): Vector {
        return this.position;
    }

    move(position: Vector) {
        this.position = position
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