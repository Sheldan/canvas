import {Cooldown} from "./base.ts";

export class PlayerStatus {
    constructor(private _health: number,
                private _wealth: number,
                private _level: number) {
    }


    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    get dead(): boolean {
        return this._health <= 0
    }

    get wealth(): number {
        return this._wealth;
    }

    set wealth(value: number) {
        this._wealth = value;
    }

    increaseLevel() {
        this._level += 1
    }
}


export class EnemyStatus {
    constructor(private _health: number) {
    }


    get health(): number {
        return this._health;
    }

    get dead(): boolean {
        return this._health <= 0;
    }

    set health(value: number) {
        this._health = value;
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
