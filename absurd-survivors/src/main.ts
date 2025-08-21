import './style.css'

import {docReady} from "canvas-common";
import {World} from "./World.ts";
import {Player} from "./Player.ts";
import {Vector} from "./base.ts";
import {BasicEnemy, Enemy, HealthEnemy, ShootingEnemy} from "./Enemies.ts";
import {HUD} from "./ui.ts";
import {Pistol} from "./weapons.ts";


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
    let player = Player.generatePlayer();

    world = new World(player, ctx, new Vector(window.innerWidth,  window.innerHeight));
    state = new WorldState();

    world.addEnemy(BasicEnemy.generateBasicEnemy(world))
    world.addEnemy(ShootingEnemy.generateShootingEnemy(world, new Vector(350, 350)))
    setInterval(() => {
        world.addEnemy(ShootingEnemy.generateShootingEnemy(world))
    }, 1_000)

    setInterval(() => {
        world.addEnemy(HealthEnemy.createHealthEnemy(world))
    }, 15_000)

    player.addWeapon(Pistol.spawnPistol(world))
    let secondPistol = Pistol.spawnPistol(world, new Vector(-5, -5));
    player.addWeapon(secondPistol)
    hud = new HUD(world);


    requestAnimationFrame(updateCanvas);



})

