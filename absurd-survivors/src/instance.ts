import type {Healthy} from "./interfaces.ts";

export class InstanceOfUtils {
    static instanceOfHealthy(object: any): object is Healthy {
        return 'takeDamage' in object;
    }
}