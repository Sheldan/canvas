import type {ChanceEntry, Item} from "./interfaces.ts";
import {Player} from "./Player.ts";
import {randomItem} from "./utils.ts";
import {HomingPistol, Pistol, SpreadWeapon} from "./weapons.ts";
import type {World} from "./World.ts";

export enum Rarity {
    GARBAGE= 'GARBAGE',
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    LEGENDARY = 'LEGENDARY',
    GODLY = 'GODLY'
}

export class ItemManagement {

    private static ITEMS: Item[] = []

    static addItem(item: Item) {
        this.ITEMS.push(item)
    }

    static getItemsWithRarityFactor(): ChanceEntry[] {
        let items: ChanceEntry[] =  []
        this.ITEMS.forEach((item) => {
            items.push({chance: rarityWeight(item.getRarity()), creationMethod: () => item})
        })
        return items;
    }

    static getRandomItem() {
        return randomItem(this.ITEMS)
    }

    static initializeItems() {
        this.ITEMS.push(new SpeedUp())
        this.ITEMS.push(new HealthUp())
        this.ITEMS.push(new HomingPistolItem())
        this.ITEMS.push(new PistolItem())
        this.ITEMS.push(new SpreadWeaponItem())
    }
}

export function rarityWeight(rarity: Rarity): number {
    switch (rarity) {
        case Rarity.GARBAGE: return 80;
        case Rarity.COMMON: return 65;
        case Rarity.UNCOMMON: return 50;
        case Rarity.RARE: return 30;
        case Rarity.EPIC: return 15;
        case Rarity.LEGENDARY: return 5;
        case Rarity.GODLY: return 1;
    }
}

export function rarityColor(rarity: Rarity): string {
    switch (rarity) {
        case Rarity.GARBAGE: return 'white';
        case Rarity.COMMON: return 'gray';
        case Rarity.UNCOMMON: return 'blue';
        case Rarity.RARE: return 'green';
        case Rarity.EPIC: return 'orange';
        case Rarity.LEGENDARY: return 'violett';
        case Rarity.GODLY: return 'red';
    }
}

export abstract class BaseItem implements Item {

    constructor() {
    }

    pickup(player: Player, world: World) {
        player.addItem(this)
    }

    abstract name();
    abstract getRarity(): Rarity;
}

export class SpeedUp extends BaseItem {
    pickup(player: Player, world: World) {
        player.stats.speed += 1
        super.pickup(player, world)
    }

    name() {
        return 'speed'
    }

    getRarity(): Rarity {
        return Rarity.COMMON;
    }
}

export class HealthUp extends BaseItem {
    pickup(player: Player, world: World) {
        player.stats.health += 1
        super.pickup(player, world)
    }

    name() {
        return 'health'
    }

    getRarity(): Rarity {
        return Rarity.COMMON;
    }
}

export class HomingPistolItem extends BaseItem {
    pickup(player: Player, world: World) {
        player.addWeapon(HomingPistol.generateHomingPistol(world))
        super.pickup(player, world)
    }

    name() {
        return 'homingp'
    }

    getRarity(): Rarity {
        return Rarity.RARE;
    }
}

export class PistolItem extends BaseItem {
    pickup(player: Player, world: World) {
        player.addWeapon(Pistol.generatePistol(world))
        super.pickup(player, world)
    }

    name() {
        return 'pistol'
    }

    getRarity(): Rarity {
        return Rarity.RARE;
    }
}

export class SpreadWeaponItem extends BaseItem {
    pickup(player: Player, world: World) {
        player.addWeapon(SpreadWeapon.generateSpreadWeapon(world))
        super.pickup(player, world)
    }

    name() {
        return 'spreadp'
    }

    getRarity(): Rarity {
        return Rarity.EPIC;
    }
}

