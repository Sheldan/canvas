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


/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                // We're using "expires" because "max-age" is not supported by IE
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                var stringifiedAttributes = '';

                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));
