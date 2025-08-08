import {World} from "./data.ts";
import {PointGravitySource} from "./objects.ts";
import {BoundingBox, Circle, Line, Vector} from "./vector.ts";

export interface Drawable extends Item, Positionable {
    draw(ctx)
}

export interface Actable extends Item {
    act(world: World)
}

export enum CollisionBehaviour {
    CIRCLE,
    LINE
}

export interface Collidable extends Item {
    collide(world: World, collidable: Collidable);
    boundingBox(): BoundingBox;
    geometricCollisionBehaviour(): CollisionBehaviour;
}

export interface Gravitatable extends Item {
    affect(gravitySource: PointGravitySource)
}

export interface Circable {
    getCircle(): Circle;
}

export interface Lineable {
    getLine(): Line;
}

export interface Positionable {
    get position(): Vector;
    set position(vector: Vector);
}

export interface MassOwning {
    get mass(): number;
    set mass(mass: number);
}

export interface Item {
    id(): number;
}

export abstract class AbstractItem implements Item {
    private _id: number;
    private _flag: boolean;

    protected constructor() {
        this._id = ~~(Math.random() * 10000000)
        this._flag = false;
    }

    id(): number {
        return this._id;
    }

}

export abstract class MovingItem extends AbstractItem implements Positionable, Actable {

    private _speed: Vector;
    private _position: Vector;

    constructor(_x?: number,
                _y?: number,
                _x_speed?: number,
                _y_speed?: number) {
        super();
        this._position = new Vector(_x?? 0, _y?? 0)
        this._speed = new Vector(_x_speed?? 0, _y_speed?? 0)
    }

    act(world: World) {
        this._position = this.position.plus(this._speed)
    }

    get speed(): Vector {
        return this._speed;
    }
    set speed(vector: Vector){
        this._speed = vector;
    }
    accelerate(vector: Vector) {
        this._speed = this.speed.plus(vector)
    }

    get position(): Vector {
        return this._position;
    }

}