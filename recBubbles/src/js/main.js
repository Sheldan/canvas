import {createRainbowColors, docReady, pointDistance, downloadCanvas} from "canvas-common";

let ctx = {};
let canvas = {};
let maxTriesField = {};
let funkyModeBox = {};
let splitMinField = {};
let minSizeField = {};
let widthField = {};
let heightField = {};
let downloadButton = {};


let config = {
    size: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    recBubbles: {
        maxTries: 5,
        splitMinSize: 2,
        fps: 10000,
        showControls: false,
        funkyMode: false,
        stopping: false
    }
};


config.recBubbles.relevantSize = Math.min(config.size.width, config.size.height);
let rootCircle = {
    x: config.size.width / 2,
    y: config.size.height / 2,
    radius: config.recBubbles.relevantSize / 2,
    circles: []
};

config.recBubbles.maxRadius = rootCircle.radius;
config.recBubbles.minRadius = -1;

// results in 101 different colors
let rainbow = createRainbowColors(1/16);
// max distance from top left corner
let max = Math.sqrt(rootCircle.x * rootCircle.x + rootCircle.y * rootCircle.y) / 2;

function toggleControls() {
    config.recBubbles.showControls = !config.recBubbles.showControls;
    let hideControlsBtn = document.getElementById('hideControlsBtn')
    let controlsElement = document.getElementById('controls');
    if(!config.recBubbles.showControls) {
        hideControlsBtn.innerText = 'Show controls'
        controlsElement.style.display = 'none'
    } else  {
        hideControlsBtn.innerText = 'Hide controls'
        controlsElement.style.display = 'block'
    }
}

function restart() {
    config.recBubbles.maxTries = parseInt(maxTriesField.value);
    config.recBubbles.funkyMode = funkyModeBox.checked;
    config.recBubbles.splitMinSize = parseInt(splitMinField.value);
    config.recBubbles.minRadius = parseInt(minSizeField.value);
    if(config.recBubbles.splitMinSize <= config.recBubbles.minRadius) {
        config.recBubbles.splitMinSize = config.recBubbles.minRadius + 1;
    }
    config.size.width = parseInt(widthField.value)
    config.size.height = parseInt(heightField.value)
    config.recBubbles.relevantSize = Math.min(config.size.width, config.size.height);
    rootCircle = {
        x: config.size.width / 2,
        y: config.size.height / 2,
        radius: config.recBubbles.relevantSize / 2,
        circles: []
    };
    max =  Math.sqrt(rootCircle.x * rootCircle.x + rootCircle.y * rootCircle.y) / 2;
    config.recBubbles.maxRadius = rootCircle.radius;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!config.recBubbles.funkyMode) {
        config.recBubbles.stopping = true;
    }
    setTimeout(() => {
        config.recBubbles.stopping = false;
        startDrawing()
    }, 500)
}

window.toggleControls = toggleControls;
window.restartBubbles = restart;
window.exportCanvas = exportCanvas;


function initControls() {
    maxTriesField.value = config.recBubbles.maxTries;
    funkyModeBox.value = config.recBubbles.funkyMode;
    splitMinField.value = config.recBubbles.splitMinSize;
    minSizeField.value = config.recBubbles.minRadius;
    widthField.value = config.size.width;
    heightField.value = config.size.height;
}

function exportCanvas() {
    downloadCanvas('recBubbles', canvas, downloadButton)
}

function startDrawing() {
    canvas.width = config.size.width;
    canvas.height = config.size.height;
    ctx.strokeStyle = rainbow[rainbow.length - 1].styleRGB;
    paintCircle(rootCircle);
    addCirclesInCircle(rootCircle);
    initControls();
    rootCircle.circles.forEach(function (circleToPaint) {
        paintCircle(circleToPaint);
    });
}

function loadControls() {
    maxTriesField = document.getElementById('maxTries');
    funkyModeBox = document.getElementById('funkyMode');
    splitMinField = document.getElementById('splitMinSize');
    minSizeField = document.getElementById('minSize');
    widthField = document.getElementById('widthInput');
    heightField = document.getElementById('heightInput');
    downloadButton = document.getElementById('download');
}

docReady(function() {
    loadControls();
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext("2d");
    ctx.translate(0.5, 0.5); // to make better anti-aliasing
    startDrawing();
});


function addCirclesInCircle(circle){
    if(config.recBubbles.stopping) {
        return;
    }
    let posFound = false;
    let newRandomPoint;
    let tries = 0;
    do {
        // this tries any random point within the circle
        newRandomPoint = randomPointInCircle(circle);
        tries++;
        // if it collides with any other point already present, this checks only the top level circles, as the rest would be contained anyway
        if (!collidesWithOtherCircle(newRandomPoint, circle)) {
            posFound = true;
        }
    } while(tries < config.recBubbles.maxTries && !posFound);
    if(posFound) {
        newRandomPoint.radius = getAvailableRadius(newRandomPoint, circle, config.size.width, true);
        if(newRandomPoint.radius > config.recBubbles.minRadius){
            // create a new circle object
            newRandomPoint.circles = [];
            newRandomPoint.parent = circle;
            circle.circles.push(newRandomPoint);
            let distance = pointDistance(newRandomPoint, rootCircle)
            // select a color which is relatively appropriate according to how far out we are
            let colorIndex = ((distance / max * rainbow.length) << 0) % rainbow.length;
            let color = rainbow[colorIndex];
            color.a = 255;
            ctx.strokeStyle = color.styleRGB;
            paintCircle(newRandomPoint);
        } else {
            posFound = false
        }
    }
    if(posFound){
        // continue on with our  journey
        setTimeout(function () {
            addCirclesInCircle(circle)
        }, 1000 / config.recBubbles.fps)
    } else {
        // if we ended up not finding a position, lets see if we filled the circle
        setTimeout(function () {
            let filledCircle = false;
            for(let i = 0; i < circle.circles.length; i++){
                // if a child circle did not receive any child circles yet, but the size of the circle is above the minimum radius
                // we are going add more circles to that circle
                // the children check is if we already filled that circle
                if(circle.circles[i].circles.length === 0 && circle.circles[i].radius > config.recBubbles.splitMinSize){
                    addCirclesInCircle(circle.circles[i]);
                    filledCircle = true;
                    break;
                }
            }
            // if we didnt find a child circle to fill (because too small, or already "all" filled, we continue own with the parent
            // if we continue with the parent, that could create new children circles for the parent
            // here we are basically going up in the recursion one level, and then creating new sub levels of recursion
            if(!filledCircle && circle.parent){
                addCirclesInCircle(circle.parent);
            }
        }, 1000 / config.recBubbles.fps)
    }
}


/**
 * this method gets the maximum radius possible within the given circle. it also checks any potential circles which are already
 * present within the circle
 * @param point the point we are trying to find the radius for
 * @param circle the circle to check against for
 * @param currentMax the currently maximum possible radius
 * @param checkChildren whether or not to check the children of the circle, this is important, because, in the first iteration we are interested in checking against the circle
 * the point will be contained in, and only _those_ children. The children of the children are not interesting, because the parent defines the bounding box
 * @returns {number} the found maximum circle
 */
function getAvailableRadius(point, circle, currentMax, checkChildren){
    let distanceToCenter = pointDistance(point, circle);
    let distance = Math.abs(circle.radius - distanceToCenter)
    if(distance < currentMax && distance > 0){
        currentMax = Math.min(distance, config.recBubbles.maxRadius);
    }
    if(checkChildren) { // only check for the children, if we are currently checking within the parent circle
        for(let i = 0; i < circle.circles.length; i++){
            currentMax = getAvailableRadius(point, circle.circles[i], currentMax, false);
        }
    }
    return currentMax;
}

function collidesWithOtherCircle(point, superCircle){
    for(let superCircleIndex = 0; superCircleIndex < superCircle.circles.length; superCircleIndex++){
        if(isInCircle(point, superCircle.circles[superCircleIndex])){
            return true;
        }
    }
    return false;
}

function isInCircle(point, circle){
    return pointDistance(point, circle) < circle.radius;
}

function randomPointInCircle(circle){
    let randomDistance = Math.random() * circle.radius;
    let randomArc = 2 * Math.PI * Math.random();
    return {
        x: circle.x + Math.cos(randomArc) * randomDistance,
        y: circle.y + Math.sin(randomArc) * randomDistance
    };
}



function paintCircle(circle){
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.stroke();
}


