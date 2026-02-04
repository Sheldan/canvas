import {
    createRainbowColors,
    docReady, getIndexForCoordinate, randomInteger
} from "canvas-common";

let canvas;
let ctx;
let imageData = {};

let final_data;

let config = {
    size: {
        height: window.innerHeight,
        width: window.innerWidth
    }
};


config.mandelBrot = {
    fps: 60,
};

// 100 colors
let rainbowColors = createRainbowColors(1/16);

function translatePoint(x, y) {
    return {x: x / (config.size.width / 3), y: y / (config.size.height / 3)}
}

function setup() {
    final_data = imageData.data;
    for (let y = -config.size.height / 2; y < config.size.height / 2; y++) {
        let yToUse = Math.floor(y)
        for (let x = -config.size.width / 2; x < config.size.width / 2; x++) {
            let xToUse = Math.floor(x);
            let translated = translatePoint(xToUse, yToUse)
            let iterations = getIterations(translated.x, translated.y);
            let color = rainbowColors[iterations];
            let actualX = x + config.size.width / 2;
            let actualY = y + config.size.height / 2;
            let index = getIndexForCoordinate(config, actualX, actualY);
            final_data[index] = color.r;
            final_data[index + 1] = color.g;
            final_data[index + 2] = color.b;
            final_data[index + 3] = 255;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function getIterations(x, y) {
    let z_i = {r: 0, i: 0}
    let c_r = x;
    let c_i = y;
    let visited = {}
    let iterations = 0;
    for (let i = 0; i < 100; i++) {
        z_i = getValue(i, z_i.r, z_i.i, c_r, c_i)
        let key = z_i.r + '' + z_i.i;
        if (key in visited) {
            return 0;
        }
        iterations = i;
        if(z_i.r === Infinity || z_i.i === Infinity) {
            return iterations;
        }
        visited[key] = 1
    }
    return iterations;
}

// 0 + 0.5i
// 0 + 0.5i^2 + 0.5i -> -0.25 + 0.5i
// (-0.25 + 0.5i)^2 + 0.5i -> -0.25 * -0.25 + -0.25 * 0.5i + -0.25 * 0.5i + 0.5i * 0.5i + 0.5i
// -3/16 * -3/16 + - 3/16 * 0.25i - 3/16 * 0.25i + 0.25i * 0.25i + 0.5i
function getValue(i, z_r, z_i, c_r, c_i) {
    let iFactor = z_r < 0 ? -1 : 1
    return {r: z_r ** 2 + (Math.abs(z_i ** 2) * -1) + c_r, i: z_i * z_r * 2 + c_i}
}

docReady(function() {
    canvas = document.getElementById('canvas')
    canvas.width = config.size.width;
    canvas.height = config.size.height;
    ctx = canvas.getContext("2d");
    canvas.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    imageData = ctx.getImageData(0, 0, config.size.width, config.size.height);
    setup()
});
