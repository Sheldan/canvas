export function pointDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) +
        Math.pow(pointA.y - pointB.y, 2));
}


// https://stackoverflow.com/questions/9899372/vanilla-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-whe
export function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}


export function createRainbowColors(frequency, alpha=255){
    var colors = [];
    var most = 2 * Math.PI / frequency;
    for (var i = 0; i < most; ++i) {
        var red   = Math.sin(frequency * i + 0) * 127 + 128;
        var green = Math.sin(frequency * i + 2) * 127 + 128;
        var blue  = Math.sin(frequency * i + 4) * 127 + 128;
        var color = {r: red << 0, g: green << 0, b: blue << 0, a: alpha};
        addRGBStyle(color);
        addRGBAStyle(color);
        colors.push(color)
    }
    return colors;
}

export function addRGBStyle(color) {
    color.styleRGB = '#' + d2h(color.r) + d2h(color.g) + d2h(color.b);
}

export function addRGBAStyle(color){
    color.styleRGBA = 'rgba(%red, %green, %blue, %alpha)'
        .replace('%red', color.r)
        .replace('%blue', color.b)
        .replace('%green', color.g)
        .replace('%alpha', color.a / 277);
}

export function d2h(d) {
    return (d / 256 + 1 / 512).toString(16).substring(2, 4);
}

export function toRad(angle) {
    return angle / 180 * Math.PI;
}

export function toDeg(angle) {
    return angle * 180 / Math.PI;
}

//http://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
export function dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

export function downloadCanvas(name, canvas_obj, downloadBtn) {
    downloadBtn.download = name + '_' + new Date().toISOString() + '.png';

    let imageData = canvas_obj.toDataURL({
        format: 'png',
        multiplier: 4
    });
    let blob = dataURLtoBlob(imageData);
    downloadBtn.href = URL.createObjectURL(blob);
}

export function downloadCanvasWithoutButton(name, canvas_obj) {
    var downloadBtn = document.getElementById('download');
    downloadBtn.download = name + '_' + new Date().toISOString() + '.png';

    var imageData = canvas_obj.toDataURL({
        format: 'png',
        multiplier: 4
    });
    var blob = dataURLtoBlob(imageData);
    downloadBtn.href = URL.createObjectURL(blob);

}

export function convertColorToRgbaWithAlphaPlaceholderStyle(color) {
    color.styleRGBA = 'rgba(%red, %green, %blue, %alpha)'
        .replace('%red', color.r)
        .replace('%blue', color.b)
        .replace('%green', color.g);
}

export function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

export function vectorLength(vect) {
    return Math.sqrt(vect.x * vect.x + vect.y * vect.y);
}

export function normalizeVector(vect) {
    let length = vectorLength(vect);
    vect.x /= length;
    vect.y /= length;
    return vect;
}

export function createVector(tip, shaft) {
    return {
        x: tip.x - shaft.x,
        y: tip.y - shaft.y
    };
}


export function randomElement(array) {
    return array[~~(Math.random() * array.length)];
}

export function roundedRandom(amount) {
    return ~~(Math.random() * amount);
}

export function randomNumberButAtLeast(range, min) {
    let rand = roundedRandom(range);
    return (rand < min) ? min : rand;
}

export function randomNumber(n, cur) {
    var rand = (Math.random() * n) - n / 2;
    if (cur + rand < 0) return 0;
    return rand;
}


export function getIndexForCoordinate(config, x, y) {
    return (y * config.size.width + x) * 4;
}

export function createNormalizedVector(tip, shaft) {
    let vect = createVector(tip, shaft);

    let dist = pointDistance(tip, shaft);
    vect.x /= dist;
    vect.y /= dist;
    return vect;
}

// only normalized vectors
export function angleBetweenTwoVectors(vectorA, vectorB){
    return Math.acos(dotProduct(vectorA, vectorB));
}

export function dotProduct(vector1, vector2) {
    return vector1.x * vector2.x + vector1.y * vector2.y;
}

export function randomInteger(n){
    return (Math.random() * n) << 0
}

export function getCoordinates(config, index) {
    return {x: index / 4 % config.size.width, y: Math.floor((index / 4 / config.size.width))}
}

export function formatInterval(date1, date2, message) {
    console.log(message + ((date2 - date1) / 1000));
}