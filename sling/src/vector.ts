export class Vector {
    constructor(private _x: number, private _y: number) {
    }

    static zero(): Vector {
        return new Vector(0, 0)
    }

    static between(pointy: Vector, shaft : Vector) {
        return new Vector(pointy.x - shaft.x, pointy.y - shaft.y)
    }

    plus(vector: Vector) {
        return new Vector(this._x + vector.x, this._y + vector.y)
    }

    minus(vector: Vector) {
        return new Vector(this._x - vector.x, this._y - vector.y)
    }

    dot(vector: Vector): number {
        return this._x * vector._x + this._y *  vector._y
    }

    normal() {
        return new Vector(-this.y, this.x)
    }

    otherNormal() {
        return new Vector(this.y, -this.x)
    }

    normalize() {
        let length = this.len();
        return new Vector(this.x / length, this.y / length)
    }

    secondNorm() {
        return Math.sqrt(this._x * this._x + this._y * this._y)
    }

    divide(factor: number) {
        return new Vector(this._x / factor, this._y / factor)
    }

    angleBetween(vector: Vector) {
        return Math.atan2(this._x * vector._y - this._y * vector._x, this._x * vector._x + this._y * vector._y) * 180 / Math.PI;
    }

    multNumber(factor: number) {
        return new Vector(this._x * factor, this._y * factor)
    }

    mult(vector: Vector) {
        return new Vector(this._x * vector.x, this._y * vector.y)
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    isZero() {
        return this.x === 0 && this.y === 0;
    }

    distanceTo(vector: Vector): number {
        return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2))
    }

    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y))
    }

    invert() {
        return new Vector(-this.x, -this.y)
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}

export class Line {
    constructor(private _start: Vector, private _end: Vector) {
    }

    get start(): Vector {
        return this._start;
    }

    get end(): Vector {
        return this._end;
    }

    toVector() {
        return Vector.between(this._end, this._start)
    }

    get len(): number {
        let distX = this.end.x - this.start.x;
        let distY = this.end.y - this.start.y;
        return Math.sqrt(distX * distX + distY * distY)
    }

    pointCollision(point: Vector) {
        // https://www.jeffreythompson.org/collision-detection/line-point.php
        let d1 = point.distanceTo(this.start)
        let d2 = point.distanceTo(this.end)
        let len = this.len;
        const buffer = 0.1
        if((d1 + d2) >= (len - buffer) && (d1 + d2) <= (len + buffer)) {
            return true
        } else {
            return false;
        }
    }
}

export class Circle {
    constructor(private _center: Vector, private _radius: number) {
    }

    pointInside(point: Vector) {
        return this._center.distanceTo(point) <= this._radius;
    }

    circleCollision(circle: Circle) {
        return this._center.distanceTo(circle.center) <= this._radius + circle.radius;
    }

    get center(): Vector {
        return this._center;
    }


    get radius(): number {
        return this._radius;
    }
}

export class BoundingBox {
    constructor(private _topLeft: Vector, private _len: Vector) {
    }

    // https://www.jeffreythompson.org/collision-detection/rect-rect.php
    intersect(box: BoundingBox): boolean {
        // r1 = this
        // r2 = box
        if (this._topLeft.x + this._len.x >= box._topLeft.x &&
            this._topLeft.x <= box._topLeft.x + box._len.x &&
            this._topLeft.y + this._len.y >= box._topLeft.y &&
            this._topLeft.y <= box._topLeft.y + box._len.y) {
            return true
        } else {
            return false;
        }
    }


    get topLeft(): Vector {
        return this._topLeft;
    }

    get len(): Vector {
        return this._len;
    }
}