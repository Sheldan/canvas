import {docReady} from "canvas-common";

import './style.css'
import {World} from "./data.ts";
import {Bubble, CircleBarrier, PointGravitySource, LineBarrier, DirectionalGravitySource} from "./objects.ts";
import {Vector} from "./vector.ts";

let canvas;
let ctx;
let animationId;

let world = new World();

let config = {
    general: {
        size: {
            height: window.innerHeight,
            width: window.innerWidth
        },
        fps: 60,
        debug: true
    }
};

declare global {
    interface Window { config: any; }
}

window.config = config;

function loadWorld() {
    let borderSize = 0;
    world.addItem(new PointGravitySource(config.general.size.width / 2, config.general.size.height / 2, 10))
    for (let i = 0; i < 12; i++) {
        world.addItem(new Bubble(config.general.size.width * Math.random(), config.general.size.height * Math.random(), Math.random() * 25))
    }

    // diamond shape
    //world.addItem(new LineBarrier(new Vector(config.general.size.width / 2, 0), new Vector(config.general.size.width, config.general.size.height / 2)))
    //world.addItem(new LineBarrier(new Vector(config.general.size.width, config.general.size.height / 2), new Vector(config.general.size.width / 2, config.general.size.height)))
    //world.addItem(new LineBarrier(new Vector(config.general.size.width / 2, config.general.size.height), new Vector(0, config.general.size.height / 2)))
    //world.addItem(new LineBarrier(new Vector(0, config.general.size.height / 2), new Vector(config.general.size.width / 2, 0)))

    world.addItem(new CircleBarrier(new Vector(config.general.size.width / 2, config.general.size.height / 2), 150));
    // borders
    world.addItem(new LineBarrier(new Vector(borderSize, borderSize), new Vector(config.general.size.width - borderSize, borderSize)))
    world.addItem(new LineBarrier(new Vector(config.general.size.width - borderSize, borderSize), new Vector(config.general.size.width - borderSize, config.general.size.height - borderSize)))
    world.addItem(new LineBarrier(new Vector(borderSize, config.general.size.height - borderSize), new Vector(config.general.size.width - borderSize, config.general.size.height - borderSize)))
    world.addItem(new LineBarrier(new Vector(borderSize, config.general.size.height - borderSize), new Vector(borderSize, borderSize)))
}

docReady(function() {
    canvas = document.getElementById('canvas')
    canvas.width = config.general.size.width;
    canvas.height = config.general.size.height;
    ctx = canvas.getContext("2d");
    ctx.translate(0.5, 0.5); // to make better anti-aliasing
    loadWorld();
    requestAnimationFrame(render);
});


function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.draw(ctx);
    world.act()
    setTimeout(function () {
        animationId = requestAnimationFrame(render);
    }, 1000 / config.general.fps)
}


