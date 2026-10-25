import {
    createRainbowColors,
    docReady, getIndexForCoordinate, randomInteger
} from "canvas-common";

let canvas;
let ctx;

let world = [];

let config = {
    size: {
        height: window.innerHeight,
        width: window.innerWidth
    }
};

const a = 2 * Math.PI / 6;

config.flip = {
    fps: 60,
    radius: 50
};

function createHexagon(x, y) {
    let hexagon = {
        x: x,
        y: y,
        points: []
    }
    for (let i = 0; i < 6; i++) {
        hexagon.points.push({x: config.flip.radius * Math.cos(a * i), y: config.flip.radius * Math.sin(a * i)});
    }
    return hexagon
}


function drawHexagon(hexagon) {
    ctx.beginPath();
    hexagon.points.forEach(p => {
        ctx.lineTo(hexagon.x + p.x, hexagon.y + p.y);
    })
    ctx.closePath();
    ctx.stroke();
}

docReady(function() {
    canvas = document.getElementById('canvas')
    canvas.width = config.size.width;
    canvas.height = config.size.height;
    ctx = canvas.getContext("2d");
    canvas.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    let triangleHeight = config.flip.radius * Math.sqrt(3) / 2;
    let otherPosition = 250 + triangleHeight;
    console.log(otherPosition)
    let hex = createHexagon(250, 250);
    let hex2 = createHexagon(250 + (3/2 * config.flip.radius), 250 + config.flip.radius * Math.sqrt(3) / 2);
    let hex3 = createHexagon(250, 250 + Math.sqrt(3) * config.flip.radius);
    drawHexagon(hex)
    drawHexagon(hex2)
    drawHexagon(hex3)
});


// https://www.redblobgames.com/grids/hexagons/