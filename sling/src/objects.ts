import {
    AbstractItem,
    Actable,
    Circable,
    Collidable,
    CollisionBehaviour,
    Drawable,
    Gravitatable,
    Lineable,
    MassOwning,
    MovingItem,
    Positionable
} from "./abstracts.ts";
import {Color} from "./generic.ts";
import {World} from "./data.ts";
import {BoundingBox, Circle, Line, Vector} from "./vector.ts";
import {CollisionType} from "./collision.ts";

export class Bubble extends MovingItem implements Gravitatable, Drawable, Collidable, Circable, MassOwning {
    private _radius: number;
    private _color: Color;
    private _score: number;
    private _mass: number

    constructor(_x: number,
                _y: number,
                radius?: number,
                color?: Color,
                _speed?: Vector,
                _score?: number) {
        super(_x, _y, _speed?.x ?? 0, _speed?.y ?? 0)
        this._radius = radius ?? 10;
        this._color = color ?? new Color(120, 120, 120);
        this._score = _score ?? 1;
        this._mass = 1;
    }


    act(world: World) {
        super.act(world);
    }

    draw(ctx) {
        ctx.beginPath();
        if (this.color) {
            ctx.fillStyle = this.color.repr();
        }
        ctx.arc(this.x, this.y, this._radius, 0, 2 * Math.PI);
        ctx.stroke()
        if(window.config.general.debug) {
            let box = this.boundingBox();
            ctx.beginPath();
            ctx.rect(box.topLeft.x, box.topLeft.y, box.len.x, box.len.y)
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.fillStyle = 'red'
        ctx.fillText(this._score, this.x, this.y)
        ctx.stroke()
        ctx.fillStyle = 'black'
    }

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    get radius(): number {
        return this._radius;
    }

    get color(): Color {
        return this._color;
    }

    affect(gravitySource: PointGravitySource) {
        let vector = Vector.between(gravitySource.position, this.position);
        let force = gravitySource.getForce(vector);
        this.accelerate(force)
    }

    boundingBox(): BoundingBox {
        let topLeft = this.position.minus(new Vector(this._radius, this._radius))
        let len = new Vector(this._radius * 2, this._radius * 2)
        return new BoundingBox(topLeft, len);
    }

    collide(world: World, collidable: Collidable) {
        let collisionResult = world.collisionManager.collide(this, collidable);
        if(collisionResult.type === CollisionType.HIT) {
            if(collidable instanceof Bubble) {
                let collidingBubble = (collidable as Bubble)
                if(this._score > collidingBubble._score && this.radius > collidingBubble.radius) {
                    this._score += collidingBubble._score;
                    this._radius += collidingBubble._radius;
                    this._mass += collidingBubble._mass;
                    world.removeItem(collidable)
                } else {
                    collidingBubble._score += this._score;
                    collidingBubble._radius += this._radius;
                    collidingBubble._mass += this._mass;
                    world.removeItem(this)
                }
            }
        }
    }

    geometricCollisionBehaviour(): CollisionBehaviour {
        return CollisionBehaviour.CIRCLE;
    }

    getCircle(): Circle {
        return new Circle(this.position, this._radius);
    }


    get score(): number {
        return this._score;
    }


    set score(value: number) {
        this._score = value;
    }

    get mass(): number {
        return this._mass;
    }

    set mass(mass: number) {
        this._mass = mass;
    }
}

export class PointGravitySource extends AbstractItem implements Actable, Positionable, Drawable {

    private  _force: number;
    private  _position: Vector;

    constructor(_x: number,
                _y: number,
                force?: number) {
        super();
        this._position = new Vector(_x, _y)
        this._force = force ?? 10;
    }

    act(world: World) {
        world.applyGravity(this)
    }

    getForce(distanceVector: Vector): Vector {
        let distance = distanceVector.len();
        return new Vector(distanceVector.x * this._force / (distance * distance), distanceVector.y * this._force / (distance * distance))
    }

    get x() {
        return this._position.x;
    }

    get y() {
        return this._position.y;
    }

    get position(): Vector {
        return this._position;
    }

    draw(ctx) {
        if(window.config.general.debug) {
            ctx.beginPath()
            ctx.strokeStyle = 'red'
            ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
            ctx.stroke()
            ctx.strokeStyle= 'black'
        }
    }
}

export class DirectionalGravitySource extends AbstractItem implements Actable, Positionable, Drawable {
    private  _force: number;
    private  _position: Vector;
    private  _direction: Vector;
    private _start: Vector;
    private _end: Vector;


    constructor(_x: number,
                _y: number,
                _direction?: Vector,
                force?: number) {
        super();
        this._position = new Vector(_x, _y)
        this._direction = _direction?? new Vector(1, 0);
        this._start = this._position.minus(this._direction.normal().multNumber(25))
        this._end = this._position.minus(this._direction.otherNormal().multNumber(25))
        this._force = force ?? 10;
    }

    act(world: World) {
        world.applyGravity(this)
    }

    getForce(distanceVector: Vector): Vector {
        let distance = distanceVector.len();
        return new Vector(distanceVector.x * this._force / (distance * distance) * this._direction.x, distanceVector.y * this._force / (distance * distance) * this._direction.y)
    }

    get x() {
        return this._position.x;
    }

    get y() {
        return this._position.y;
    }

    get position(): Vector {
        return this._position;
    }

    draw(ctx) {
        if(window.config.general.debug) {
            ctx.beginPath();
            ctx.strokeStyle = 'red'
            ctx.moveTo(this._start.x, this._start.y);
            ctx.lineTo(this._end.x, this._end.y);
            ctx.stroke();
            ctx.strokeStyle = 'black'
        }
    }
}

export abstract class Barrier extends AbstractItem implements Collidable, Positionable, Drawable {
    private _position: Vector;

    constructor(position: Vector) {
        super();
        this._position = position;
    }

    abstract collide(world: World, collidable: Collidable);
    abstract boundingBox(): BoundingBox;
    abstract geometricCollisionBehaviour(): CollisionBehaviour;


    get position(): Vector {
        return this._position;
    }

    set position(value: Vector) {
        this._position = value;
    }

    abstract draw(ctx);
}

export class CircleBarrier extends Barrier implements Circable {

    private _radius: number;

    constructor(position: Vector, radius: number) {
        super(position);
        this._radius = radius;
    }

    boundingBox(): BoundingBox {
        let topLeft = this.position.minus(new Vector(this._radius, this._radius))
        let len = new Vector(this._radius * 2, this._radius * 2)
        return new BoundingBox(topLeft, len);
    }

    collide(world: World, collidable: Collidable) {
    }

    geometricCollisionBehaviour(): CollisionBehaviour {
        return CollisionBehaviour.CIRCLE;
    }

    getCircle(): Circle {
        return new Circle(this.position, this._radius);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this._radius, 0, 2 * Math.PI);
        ctx.stroke()
    }
}

export class LineBarrier extends Barrier implements Lineable {
    private _line: Line;

    constructor(start: Vector, end: Vector) {
        super(start)
        this._line = new Line(start, end);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this._line.start.x, this._line.start.y);
        ctx.lineTo(this._line.end.x, this._line.end.y);
        ctx.stroke();
        if(window.config.general.debug) {
            let box = this.boundingBox();
            ctx.beginPath();
            ctx.rect(box.topLeft.x, box.topLeft.y, box.len.x, box.len.y)
            ctx.stroke()
        }
    }

    boundingBox(): BoundingBox {
        let topLeft = new Vector(Math.min(this._line.start.x, this._line.end.x), Math.min(this._line.start.y, this._line.end.y))
        let len = new Vector(this._line.start.x - this._line.end.x, this._line.start.y - this._line.end.y)
        return new BoundingBox(topLeft, len.abs());
    }

    collide(world: World, collidable: Collidable) {
    }

    geometricCollisionBehaviour(): CollisionBehaviour {
        return CollisionBehaviour.LINE;
    }

    getLine(): Line {
        return this._line;
    }

}