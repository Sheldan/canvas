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