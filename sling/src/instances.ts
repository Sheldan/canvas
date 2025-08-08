import {Actable, Circable, Collidable, Drawable, Gravitatable, Lineable, MassOwning} from "./abstracts.ts";

export class InstanceOfUtils {
    static instanceOfCircable(object: any): object is Circable{
        return 'getCircle' in object;
    }

    static instanceOfLineable(object: any): object is Lineable {
        return 'getLine' in object;
    }

    static instanceOfDrawable(object: any): object is Drawable {
        return 'draw' in object;
    }

    static instanceOfGravitatable(object: any): object is Gravitatable {
        return 'affect' in object;
    }

    static instanceOfCollidable(object: any): object is Collidable {
        return 'collide' in object;
    }

    static instanceOfActable(object: any): object is Actable {
        return 'act' in object;
    }

    static instanceOfMassOwning(object: any): object is MassOwning {
        return 'mass' in object;
    }
}