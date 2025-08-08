import {Actable, Collidable, Drawable, Gravitatable, Item} from "./abstracts.ts";
import {PointGravitySource} from "./objects.ts";
import {InstanceOfUtils} from "./instances.ts";
import {CollisionManager} from "./collision.ts";

export class World {
    private _items: Item[] = [];
    private _drawable: Drawable[] = [];
    private _actable: Actable[] = [];
    private _collidable: Collidable[] = [];
    private _gravitatable: Gravitatable[] = [];

    private _collisionManager: CollisionManager = new CollisionManager();

    constructor() {
    }

    addItem(item: Item) {
        this._items.push(item)
        if(InstanceOfUtils.instanceOfDrawable(item)) {
            this._drawable.push(item)
        }

        if(InstanceOfUtils.instanceOfActable(item)) {
            this._actable.push(item)
        }

        if(InstanceOfUtils.instanceOfGravitatable(item)) {
            this._gravitatable.push(item)
        }
        if(InstanceOfUtils.instanceOfCollidable(item)) {
            this._collidable.push(item)
        }
    }

    removeItem(itemToRemove: Item) {
        this._items = this._items.filter(item => item.id() !== itemToRemove.id())

        if(InstanceOfUtils.instanceOfDrawable(itemToRemove)) {
            this._drawable = this._drawable.filter(item => item.id() !== itemToRemove.id())
        }

        if(InstanceOfUtils.instanceOfActable(itemToRemove)) {
            this._actable = this._actable.filter(item => item.id() !== itemToRemove.id())
        }

        if(InstanceOfUtils.instanceOfGravitatable(itemToRemove)) {
            this._gravitatable = this._gravitatable.filter(item => item.id() !== itemToRemove.id())
        }

        if(InstanceOfUtils.instanceOfCollidable(itemToRemove)) {
            this._collidable = this._collidable.filter(item => item.id() !== itemToRemove.id())
        }
    }

    act() {
        this.collide()
        this._actable.forEach(value => value.act(this))
    }

    collide() {
        let collisionsDone = {}
        this._collidable.forEach(value => {
            this._collidable.forEach(innerCollidable => {
                let collidableKey = Math.min(value.id(), innerCollidable.id()) + '_' + Math.max(value.id(), innerCollidable.id());
                if(value.id() !== innerCollidable.id() && !(collidableKey in collisionsDone)) {
                    value.collide(this, innerCollidable);
                    collisionsDone[collidableKey] = 1;
                }
            });
        })
    }

    draw(ctx) {
        this._drawable.forEach(value => value.draw(ctx))
    }

    applyGravity(gravitySource: PointGravitySource) {
        this._gravitatable.forEach(value => value.affect(gravitySource))
    }


    get collisionManager(): CollisionManager {
        return this._collisionManager;
    }
}

