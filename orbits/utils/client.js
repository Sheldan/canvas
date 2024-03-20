var https = require("https");
const fs = require('fs');

var parameter = [
    { key: 'COMMAND', value: '\'506\''},
    { key: 'CENTER', value: '\'500@0\''},
    { key: 'MAKE_EPHEM', value: '\'YES\''},
    { key: 'TABLE_TYPE', value: '\'VECTORS\''},
    { key: 'START_TIME', value: '\'2024-03-17\''},
    { key: 'STOP_TIME', value: '\'2024-03-18\''},
    { key: 'STEP_SIZE', value: '\'1 d\''},
    { key: 'OUT_UNITS', value: '\'AU-D\''},
    { key: 'REF_PLANE', value: '\'ECLIPTIC\''},
    { key: 'REF_SYSTEM', value: '\'J2000\''},
    { key: 'VECT_CORR', value: '\'NONE\''},
    { key: 'VEC_LABELS', value: '\'YES\''},
    { key: 'VEC_DELTA_T', value: '\'NO\''},
    { key: 'CSV_FORMAT', value: '\'YES\''},
    { key: 'OBJ_DATA', value: '\'YES\''},
    { key: 'VEC_TABLE', value: '\'3\''}
    ];

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}


var fetched = {}
var toFetch = []

function moonformat(name, object){
    planetformat(object, name)
    fs.appendFileSync('planets.js', `${name}.isMoon = true; \n`);
}

function planetformat(values, planetName){
    var x = 'let {0} = generateBasicPlanet();\n \
    {0}.radius = {1} * 1000; \n \
    {0}.name = \'{0}\'; \n \
    {0}.mass = {2}; \n \
    {0}.x = {3} * config.AU; \n \
    {0}.y = {4} * config.AU; \n \
    {0}.z = {5} * config.AU; \n \
    \n \
    {0}.vx = auPerDayToMPerSecond({6}); \n \
    {0}.vy = auPerDayToMPerSecond({7}); \n \
    {0}.vz = auPerDayToMPerSecond({8}); \n \
    ';
    fs.appendFileSync('planets.js', x.format(planetName, values.radius, values.mass, values.x, values.y, values.z, values.vx, values.vy, values.vz));
}

function getObjectIndex(planet, moonIndex) {
    return '\'' + (planets.indexOf(planet)) + ((moonIndex > 9) ? '' : '0') + moonIndex + '\'';
}

function getPlanetIndex(planet){
    if(planet === 'sun') {
        return '10'
    } else {
        let index = '\'' + (planets.indexOf(planet)) + '99' + '\'';
        console.log(`name: ${planet} index ${index}`)
        return index;
    }
}

function fetchMoonOfPlanet(planetName, moonIndex, moonName, callback){
    parameter[0].value = getObjectIndex(planetName, moonIndex);
    var url = '/horizons_batch.cgi?batch=l';

    parameter.forEach(function(param){
        url += '&' + param.key +  '=' + encodeURIComponent(param.value).replace(/'/g, '%27');
    });

    var options = {
        host: 'ssd.jpl.nasa.gov',
        path: url
    };
    var req = https.get(options, function(res){
        var body = [];
        res.on('data', function(chunk){
            body.push(chunk);
        });
        res.on('end', function(){
            try {
                var responseString = Buffer.concat(body).toString('binary');
                if(responseString.includes('There was an unexpected problem with server')) {
                    // console.log(moonName + ' failed')
                    return;
                }
                var lines = responseString.split(/\r?\n/);
                var vectorLine = '';
                var radiusRegex = /Radius\s*\(km\)\s*=\s*~?(\d*\.?\d?)/;
                let otherRadiusRegex = /Radius\s*\(gravity\),\s*km\s*=\s*~?(\d*\.?\d?)/;
                let volRadiusRegex = /mean\s*radius,?\s*\(?km\)?\s*=\s*~?(\d*)/i;
                let meanRadius = /Radius\s*\(km\),\s*mean\s*=\s*~?(\d*\.?\d?)/;
                var massRegex = /Mass,?\s*\(?10\^(\d*)\s*kg\s*\)?\s*=\s*~?(\d*\.?\d?)/;
                var otherMassRegex = /Mass,?\s*x10\^(\d*)\s*\(?kg\)?\s*\s*=\s*~?(\d*\.?\d*)/;
                var gramRegex = /Mass,?\s*\(?10\^(\d*\s*)\s*g\s*\)?\s*=\s*~?(\d*\.?\d*)/;
                var gramRegexPara = /Mass,?\s*x\s*10\^(\d*)\s*\(g\)\s*=\s*~?(\d*)/;
                var mass = 0;
                var radius = 0;
                lines.forEach(function(line, index, array){
                    // moon and planes return two radius, just take the first one
                    if(line.toUpperCase().indexOf('RADIUS') !== -1 && radius === 0 && line.indexOf('Equat. radius') === -1 && line.indexOf('PHYSICAL') === -1){
                        var radiusMatch;
                        if(line.indexOf('gravity') !== -1){
                            radiusMatch = otherRadiusRegex.exec(line);
                        } else if(line.toUpperCase().indexOf('MEAN RADIUS') !==-1) {
                            radiusMatch = volRadiusRegex.exec(line);
                        } else if(line.indexOf('mean') !== -1){
                            radiusMatch = meanRadius.exec(line);
                        } else {
                            radiusMatch = radiusRegex.exec(line);
                        }
                        radius = radiusMatch[1];
                    }
                    if(line.indexOf('Mass') !== -1 && mass === 0 && line.indexOf('Mass ratio') === -1){
                        var massMatch;
                        if(line.indexOf('x10') !== -1){
                            massMatch = otherMassRegex.exec(line);
                            mass = massMatch[2] + ' * Math.pow(10, ' + massMatch[1] + ')'
                        } else if(line.indexOf('kg') !== -1){
                            massMatch = massRegex.exec(line);
                            mass = massMatch[2] + ' * Math.pow(10, ' + massMatch[1] + ')'
                        } else if(line.indexOf('(g)') !== -1) {
                            massMatch = gramRegexPara.exec(line);
                            mass = (parseInt(massMatch[2]) / 1000)  + ' * Math.pow(10, ' + (parseInt(massMatch[1])) + ')';
                        } else {
                            massMatch = gramRegex.exec(line);
                            mass = (parseInt(massMatch[2]) / 1000)  + ' * Math.pow(10, ' + (parseInt(massMatch[1])) + ')';
                        }
                    }
                    if(line.indexOf('$$SOE') !== -1) {
                        vectorLine = array[index + 1];
                    }
                });
                var values = vectorLine.split(',');
                var x = values[2];
                var y = values[3];
                var z = values[4];
                var vx = values[5];
                var vy = values[6];
                var vz = values[7];

                var moonStats = {
                    x: x,
                    y: y,
                    z: z,
                    vx: vx,
                    vy: vy,
                    vz: vz,
                    radius: radius,
                    mass: mass
                };
                fetched[moonName] = 1
                callback(moonName, moonStats);
            } catch (e) {
                console.log(responseString)
                console.log(e)
            }
        })
    });


    req.on('error', function(e){
        console.log(e)
    });
}


function fetchPlanet(planetName, callback){
    parameter[0].value = getPlanetIndex(planetName);
    var url = '/horizons_batch.cgi?batch=l';

    parameter.forEach(function(param){
        url += '&' + param.key +  '=' + encodeURIComponent(param.value).replace(/'/g, '%27');
    });

    var options = {
        host: 'ssd.jpl.nasa.gov',
        path: url
    };
    var req = https.get(options, function(res){
        var body = [];
        res.on('data', function(chunk){
            body.push(chunk);
        });
        res.on('end', function(){
            try {
                var responseString = Buffer.concat(body).toString('binary');
                if(responseString.includes('There was an unexpected problem with server')) {
                    // console.log(planetName + ' failed')
                    return;
                }
                var lines = responseString.split(/\r?\n/);
                var vectorLine = '';
                var radiusRegex = /Radius\s*\(km\)\s*=\s*(\d*\.?\d?)/;
                let otherRadiusRegex = /Radius\s*\(gravity\),\s*km\s*=\s*~?(\d*\.?\d?)/;
                let volRadiusRegex = /mean\s*radius,?\s*\(?km\)?\s*=\s*~?(\d*)/i;
                var massRegex = /Mass,?\s*\(?10\^(\d*)\s*kg\s*\)?\s*=\s*~?(\d*\.?\d?)/;
                var otherMassRegex = /Mass,?\s*x10\^(\d*)\s*\(?kg\)?\s*\s*=\s*~?(\d*\.?\d*)/;
                var gramRegex = /Mass,?\s*\(?10\^(\d*\s*)\s*g\s*\)?\s*=\s*~?(\d*\.?\d*)/;
                var gramRegexPara = /Mass,?\s*x\s*10\^(\d*)\s\(g\)\s*=\s*~?(\d*)/;
                var mass = 0;
                var radius = 0;
                lines.forEach(function(line, index, array){
                    // moon and planes return two radius, just take the first one
                    if(line.toUpperCase().indexOf('RADIUS') !== -1 && radius === 0 && line.indexOf('Equat. radius') === -1 && line.indexOf('PHYSICAL') === -1){
                        var radiusMatch;
                        try {
                            if (line.indexOf('gravity') !== -1) {
                                radiusMatch = otherRadiusRegex.exec(line);
                            } else if (line.toUpperCase().indexOf('MEAN RADIUS') !== -1) {
                                radiusMatch = volRadiusRegex.exec(line);
                            } else {
                                radiusMatch = radiusRegex.exec(line);
                            }
                            radius = radiusMatch[1];
                        } catch (e) {
                            console.log(e)
                            console.log(line)
                            console.log(responseString)
                        }
                    }
                    if(line.indexOf('Mass') !== -1 && mass === 0 && line.indexOf('Mass ratio') === -1){
                        if(planetName == 'sun') {
                            console.log(line)
                        }
                        var massMatch;
                            if(line.indexOf('x10') !== -1){
                                massMatch = otherMassRegex.exec(line);
                                mass = massMatch[2] + ' * Math.pow(10, ' + massMatch[1] + ')'
                            } else if(line.indexOf('kg') !== -1){
                                massMatch = massRegex.exec(line);
                                mass = massMatch[2] + ' * Math.pow(10, ' + massMatch[1] + ')'
                            } else if(line.indexOf('(g)') !== -1) {
                                massMatch = gramRegexPara.exec(line);
                                mass = (parseInt(massMatch[2]) / 1000)  + ' * Math.pow(10, ' + (parseInt(massMatch[1])) + ')';
                            } else {
                                massMatch = gramRegex.exec(line);
                                mass = (parseInt(massMatch[2]) / 1000)  + ' * Math.pow(10, ' + (parseInt(massMatch[1])) + ')';
                            }

                    }
                    if(line.indexOf('$$SOE') !== -1) {
                        vectorLine = array[index + 1];
                    }
                });
                var values = vectorLine.split(',');
                var x = values[2];
                var y = values[3];
                var z = values[4];
                var vx = values[5];
                var vy = values[6];
                var vz = values[7];

                var planet = {
                    x: x,
                    y: y,
                    z: z,
                    vx: vx,
                    vy: vy,
                    vz: vz,
                    radius: radius,
                    mass: mass
                };
                fetched[planetName] = 1
                callback(planet, planetName);
            } catch (e) {
                console.log(responseString)
                console.log(e)
            }
        })
    });


    req.on('error', function(e){
        console.log(e)
    });
}

var planets = ['sun','mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
let planetsToDo = []
planets.forEach(plan => planetsToDo.push(plan))

var moons = {
        'luna': () => fetchMoonOfPlanet('earth', 1, 'luna', moonformat),

        'phobos': () => fetchMoonOfPlanet('mars', 1, 'phobos', moonformat),
        'deimos': () => fetchMoonOfPlanet('mars', 2, 'deimos', moonformat),

        'io': () => fetchMoonOfPlanet('jupiter', 1, 'io', moonformat),
        'europa': () => fetchMoonOfPlanet('jupiter', 2, 'europa', moonformat),
        'ganymede': () => fetchMoonOfPlanet('jupiter', 3, 'ganymede', moonformat),
        'callisto': () => fetchMoonOfPlanet('jupiter', 4, 'callisto', moonformat),
        'amalthea': () => fetchMoonOfPlanet('jupiter', 5, 'amalthea', moonformat),
        'himalia': () => fetchMoonOfPlanet('jupiter', 6, 'himalia', moonformat),
        'elara': () => fetchMoonOfPlanet('jupiter', 7, 'elara', moonformat),
        'pasiphae': () => fetchMoonOfPlanet('jupiter', 8, 'pasiphae', moonformat),
        'sinope': () => fetchMoonOfPlanet('jupiter', 9, 'sinope', moonformat),
        'lysithea': () => fetchMoonOfPlanet('jupiter', 10, 'lysithea', moonformat),
        'carme': () => fetchMoonOfPlanet('jupiter', 11, 'carme', moonformat),
        'nemausa': () => fetchMoonOfPlanet('jupiter', 12, 'nemausa', moonformat),
        'ananke': () => fetchMoonOfPlanet('jupiter', 13, 'ananke', moonformat),
        'thebe': () => fetchMoonOfPlanet('jupiter', 14, 'thebe', moonformat),
        'adrastea': () => fetchMoonOfPlanet('jupiter', 14, 'adrastea', moonformat),

        'mimas': () => fetchMoonOfPlanet('saturn', 1, 'mimas', moonformat),
        'enceladus': () => fetchMoonOfPlanet('saturn', 2, 'enceladus', moonformat),
        'tethys': () => fetchMoonOfPlanet('saturn', 3, 'tethys', moonformat),
        'dione': () => fetchMoonOfPlanet('saturn', 4, 'dione', moonformat),
        'rhea': () => fetchMoonOfPlanet('saturn', 5, 'rhea', moonformat),
        'titan': () => fetchMoonOfPlanet('saturn', 6, 'titan', moonformat),
        'hyperion': () => fetchMoonOfPlanet('saturn', 7, 'hyperion', moonformat),
        'iapetus': () => fetchMoonOfPlanet('saturn', 8, 'iapetus', moonformat),
        'phoebe': () => fetchMoonOfPlanet('saturn', 9, 'phoebe', moonformat),
        'janus': () => fetchMoonOfPlanet('saturn', 10, 'janus', moonformat),
        'epimetheus': () => fetchMoonOfPlanet('saturn', 11, 'epimetheus', moonformat),
        'helene': () => fetchMoonOfPlanet('saturn', 12, 'helene', moonformat),
        'telesto': () => fetchMoonOfPlanet('saturn', 13, 'telesto', moonformat),
        'calypso': () => fetchMoonOfPlanet('saturn', 14, 'calypso', moonformat),
        'atlas': () => fetchMoonOfPlanet('saturn', 15, 'atlas', moonformat),
        'prometheus': () => fetchMoonOfPlanet('saturn', 16, 'prometheus', moonformat),

        'ariel': () => fetchMoonOfPlanet('uranus', 1, 'ariel', moonformat),
        'umbriel': () => fetchMoonOfPlanet('uranus', 2, 'umbriel', moonformat),
        'titania': () => fetchMoonOfPlanet('uranus', 3, 'titania', moonformat),
        'oberon': () => fetchMoonOfPlanet('uranus', 4, 'oberon', moonformat),
        'miranda': () => fetchMoonOfPlanet('uranus', 5, 'miranda', moonformat),
        'cordelia': () => fetchMoonOfPlanet('uranus', 6, 'cordelia', moonformat),
        'ophelia': () => fetchMoonOfPlanet('uranus', 7, 'ophelia', moonformat),
        'bianca': () => fetchMoonOfPlanet('uranus', 8, 'bianca', moonformat),
        'cressida': () => fetchMoonOfPlanet('uranus', 9, 'cressida', moonformat),
        'desdemona': () => fetchMoonOfPlanet('uranus', 10, 'desdemona', moonformat),
        'juliet': () => fetchMoonOfPlanet('uranus', 11, 'juliet', moonformat),
        'portia': () => fetchMoonOfPlanet('uranus', 12, 'portia', moonformat),
        'rosalind': () => fetchMoonOfPlanet('uranus', 13, 'rosalind', moonformat),
        'belinda': () => fetchMoonOfPlanet('uranus', 14, 'belinda', moonformat),
        'puck': () => fetchMoonOfPlanet('uranus', 15, 'puck', moonformat),
        'caliban': () => fetchMoonOfPlanet('uranus', 16, 'caliban', moonformat),
        'sycorax': () => fetchMoonOfPlanet('uranus', 17, 'sycorax', moonformat),

        'triton': () => fetchMoonOfPlanet('neptune', 1, 'triton', moonformat),
        'nereid': () => fetchMoonOfPlanet('neptune', 2, 'nereid', moonformat),
        'naiad': () => fetchMoonOfPlanet('neptune', 3, 'naiad', moonformat),
        'thalassa': () => fetchMoonOfPlanet('neptune', 4, 'thalassa', moonformat),
        'despina': () => fetchMoonOfPlanet('neptune', 5, 'despina', moonformat),
        'galatea': () => fetchMoonOfPlanet('neptune', 6, 'galatea', moonformat),
        'larissa': () => fetchMoonOfPlanet('neptune', 7, 'larissa', moonformat),
        'proteus': () => fetchMoonOfPlanet('neptune', 8, 'proteus', moonformat),
        'halimede': () => fetchMoonOfPlanet('neptune', 9, 'halimede', moonformat),
        'psamathe': () => fetchMoonOfPlanet('neptune', 10, 'psamathe', moonformat),

        'charon': () => fetchMoonOfPlanet('pluto', 1, 'charon', moonformat)
    }

let moonNames = []
for (const [key, value] of Object.entries(moons)) {
    moonNames.push(key)
}

let totalToDo = moonNames.length + planets.length;
console.log(`Todo ${totalToDo}`)
const intervalObj = setInterval(() => {
    //console.log('triggering retry')
    // console.log(fetched)
    planetsToDo.forEach(planetName => {
        if(!(planetName in fetched)) {
            // console.log('retrying planet ' + planetName)
            fetchPlanet(planetName, planetformat)
        } else {
            var index = planetsToDo.indexOf(planetName);
            if (index !== -1) {
                planetsToDo.splice(index, 1);
            }
        }
    })
    moonNames.forEach(moonName => {
        if(!(moonName in fetched)) {
            // console.log('retrying moon ' + moonName)
            moons[moonName]()
        } else {
            var index = moonNames.indexOf(moonName);
            if (index !== -1) {
                moonNames.splice(index, 1);
            }
        }
    })
    let currentlyFetched = Object.keys(fetched).length;
    console.log(`Progress ${ currentlyFetched}/${totalToDo}`)
    console.log(fetched)
    if(currentlyFetched === totalToDo) {
        clearInterval(intervalObj)
    }
}, 5000 * 2)



