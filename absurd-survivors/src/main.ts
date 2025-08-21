import './style.css'

import {docReady} from "canvas-common";
import {World} from "./World.ts";
import {Player} from "./Player.ts";
import {Vector} from "./base.ts";
import {BasicEnemy, Enemy, ShootingEnemy} from "./Enemies.ts";
import {HUD} from "./ui.ts";
import {Pistol} from "./weapons.ts";


let hud: HUD;
let world: World;
let config: Config;
let state: WorldState;
let ctx: CanvasRenderingContext2D;
let canvas;

export class Config {
    private _size: Vector = new Vector(window.innerWidth,  window.innerHeight)
    private _fps: number = 60;


    get size(): Vector {
        return this._size;
    }

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
    ctx.clearRect(0, 0, config.size.x, config.size.y);
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
    world.player.position.y += -world.player.stats.speed
})
makeKey('s', function () {
    world.player.position.y += world.player.stats.speed
})
makeKey('a', function () {
    world.player.position.x += -world.player.stats.speed
})
makeKey('d', function () {
    world.player.position.x += world.player.stats.speed
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

    config = new Config();
    canvas.width = config.size.x;

    canvas.height = config.size.y;


    ctx = canvas.getContext("2d");

    let player = Player.generatePlayer();

    world = new World(player, ctx);
    state = new WorldState();

    world.addEnemy(BasicEnemy.generateBasicEnemy(world))
    world.addEnemy(ShootingEnemy.generateShootingEnemy(world, new Vector(350, 350)))
    setInterval(() => {
        world.addEnemy(ShootingEnemy.generateShootingEnemy(world, new Vector(Math.random() * config.size.x, Math.random() * config.size.y)))
    }, 1000)
    player.addWeapon(Pistol.spawnPistol(world))
    let secondPistol = Pistol.spawnPistol(world, new Vector(-5, -5));
    player.addWeapon(secondPistol)
    hud = new HUD(world);


    requestAnimationFrame(updateCanvas);



})

