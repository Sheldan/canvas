import './style.css'

import {docReady} from "canvas-common";
import {World} from "./World.ts";
import {Player} from "./Player.ts";
import {Vector} from "./base.ts";
import {BasicEnemy, ContainerEnemy, HealthEnemy, ShootingEnemy} from "./Enemies.ts";
import {HUD} from "./ui.ts";
import {Pistol} from "./weapons.ts";
import {ItemManagement} from "./items.ts";


let hud: HUD;
let world: World;
let config: Config;
let state: WorldState;
let ctx: CanvasRenderingContext2D;
let canvas;

export class Config {
    private _fps: number = 60;

    get fps(): number {
        return this._fps;
    }
}

export class WorldState {
    private _ended: boolean = false;


    get ended(): boolean {
        return this._ended;
    }
}


function updateCanvas() {
    ctx.clearRect(0, 0, world.size.x, world.size.y);
    hud.draw(ctx)
    if(!state.ended) {
        world.enemiesAct()
        world.player.act()
        world.draw()
        for(let key in keys) {
            if(keys[key].state) {
                keys[key].fun()
            }
        }
    } else {
        ctx.fillText('End', 15, 15)
    }

    setTimeout(function () {
        requestAnimationFrame(updateCanvas);
    }, 1000 / config.fps)

}

function makeKey(char, fun) {
    keys[char] = {
        state: false,
        fun: fun
    }
}

let keys = {};
makeKey('w', function () {
    world.movePlayer(new Vector(0, -world.player.stats.speed))
})
makeKey('s', function () {
    world.movePlayer(new Vector(0, world.player.stats.speed))
})
makeKey('a', function () {
    world.movePlayer(new Vector(-world.player.stats.speed, 0))
})
makeKey('d', function () {
    world.movePlayer(new Vector(world.player.stats.speed, 0))
})


function keyUp(event) {
    if(event.key in keys) {
        keys[event.key].state = false;
    }
}

function keyDown(event) {
    if(event.key in keys) {
        keys[event.key].state = true;
    }
}

document.onkeyup = keyUp;
document.onkeydown = keyDown;
docReady(function () {
    canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;

    canvas.height =  window.innerHeight;


    ctx = canvas.getContext("2d");
    config = new Config();
    let player = Player.generatePlayer(new Vector(window.innerWidth /2, window.innerHeight / 2));

    world = new World(player, ctx, new Vector(window.innerWidth,  window.innerHeight));
    state = new WorldState();

    setInterval(() => {
        BasicEnemy.spawnBasicEnemy(world)
    }, 1_000)

    setInterval(() => {
        ShootingEnemy.spawnShootingEnemy(world)
    }, 3_000)

    setInterval(() => {
        HealthEnemy.spawnHealthEnemy(world)
    }, 15_000)

    setInterval(() => {
        ContainerEnemy.spawnContainerEnemy(world)
    }, 10_000)

    player.addWeapon(Pistol.generatePistol(world))
    hud = new HUD(world, keys);

    canvas.onmousedown = (event) => {
        hud.mouseDown(event)
    }
    canvas.onmouseup = (event) => {
        hud.mouseUp(event)
    }

    canvas.touchstart = (event) => {
        hud.mouseDown(event)
    }

    canvas.touchend = (event) => {
        hud.mouseUp(event)
    }

    ItemManagement.initializeItems()

    requestAnimationFrame(updateCanvas);

})

