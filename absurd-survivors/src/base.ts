import type {Healthy, Placeable} from "./interfaces.ts";

export class Vector {

    constructor(private _x: number, private _y: number) {
    }

    static createVector(tip: Vector, shaft: Vector): Vector {
        return new Vector(tip.x - shaft.x, tip.y - shaft.y);
    }

    static zero() {
        return new Vector(0, 0)
    }

    normalize(): Vector {
        let length = this.vecLength();
        return new Vector(this.x / length, this.y / length)
    }

    vecLength(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    clone() {
        return new Vector(this.x, this.y)
    }

    distanceTo(point: Vector): number {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }

    add(vec: Vector): Vector {
        return new Vector(this._x + vec._x, this._y + vec._y)
    }

    minus(vec: Vector): Vector {
        return new Vector(this.x - vec._x, this.y - vec.y)
    }

    multiply(number: number): Vector {
        return new Vector(this.x * number, this.y * number)
    }

    multiplyVec(vec: Vector): Vector {
        return new Vector(this.x * vec._x, this.y * vec.y)
    }

    negate(): Vector {
        return this.multiply(-1)
    }

    dotProduct(vector: Vector): number {
        return (this._x * vector._x + this._y * vector._y) / Math.pow(vector.vecLength(), 2);
    }

    dotProduct2(vector: Vector): number {
        return (this._x * vector._x + this._y * vector._y)
    }

    angleTo(vector: Vector): number {
        return Math.acos(this.dotProduct2(vector) / (this.vecLength() * vector.vecLength()))
    }

    rotate(angle: number) {
        let c = Math.cos(angle);
        let s = Math.sin(angle)
        let x = this._x * c - this._y * s
        let y = this._x * s + this._y * c
        return new Vector(x, y)
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
}

export class Cooldown {
    private _currentValue;
    private _totalValue;


    constructor(totalValue) {
        this._totalValue = totalValue;
        this._currentValue = 0
    }

    cooledDown(): boolean {
        return this.currentValue <= 0;
    }

    get currentValue(): number {
        return this._currentValue;
    }

    decreaseCooldown() {
        this._currentValue -= 1;
    }

    resetCooldown() {
        this._currentValue = this._totalValue;
    }
}

export class Point implements Placeable {

    private position: Vector;


    constructor(position: Vector) {
        this.position = position;
    }

    getPosition(): Vector {
        return this.position;
    }

    getSize() {
    }

    move(any?: any) {
    }

}

export class DeadPoint implements Placeable, Healthy {

    private position: Vector;


    constructor(position: Vector) {
        this.position = position;
    }

    getPosition(): Vector {
        return this.position;
    }

    getSize() {
    }

    move(any?: any) {
    }

    dead() {
        return true;
    }

    die() {
    }

    takeDamage(damage: number) {
    }

}