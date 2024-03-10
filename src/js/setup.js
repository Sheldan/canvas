const config = {
    AU: 149.6e6 * 1000
}

function auPerDayToMPerSecond(value) {
    return value / 24 / 3600 * config.AU;
}

function generateBasicPlanet() {
    const basePlanet = {};
    basePlanet.mass = 0;
    basePlanet.name = '';
    basePlanet.x = 0;
    basePlanet.y = 0;
    basePlanet.z = 0;
    basePlanet.vx = 0;
    basePlanet.vy = 0;
    basePlanet.vz = 0;
    basePlanet.labelPosition = 0;
    basePlanet.trail = {};
    basePlanet.start = 0;
    basePlanet.isMoon = false;
    return basePlanet;
}

function createSpheres() {
    const spheres = []
    //var increment = 2 * Math.PI / config.orbitingSpheres.amount;
    //var currentArc = 0;
    //for (var i = 0; i < config.orbitingSpheres.amount; i++) {
    //    var sphere = {};
    //    sphere.arc = currentArc;
    //    sphere.mass = 100;
    //    sphere.vx = 0;
    //    sphere.vy = 0;
    //    sphere.x = mousePos.x + config.orbitingSpheres.spread * Math.cos(sphere.arc);
    //    sphere.y = mousePos.y + config.orbitingSpheres.spread * Math.sin(sphere.arc);
    //    spheres.push(sphere);
    //    currentArc += increment;
    //}
    // used is data from 6.6.2017 0:00
    // commented out is data of 1.1.1970 00:00

    const sun = generateBasicPlanet();
    sun.name = 'sun';
    sun.color = {
        r: 0xfc, g: 0x92, b: 0x01
    };
    sun.radius = 696342 * 1000;
    sun.mass = 1.98892 * Math.pow(10, 30);
    sun.x = 2.850766546470957E-03 * config.AU;
    sun.y = 4.956963665727667E-03 * config.AU;
    sun.z = -1.444369038454740E-04 * config.AU;
    sun.vx = auPerDayToMPerSecond(-4.226964281155967E-06);
    sun.vy = auPerDayToMPerSecond(6.171203031582879E-06);
    sun.vz = auPerDayToMPerSecond(9.439081475650780E-08);

    const merkur = generateBasicPlanet();
    merkur.name = 'mercury';
    merkur.color = {
        r: 0x8c, g: 0x86, b: 0x88
    };
    merkur.radius = 4879.4 * 1000;
    merkur.mass = 3.3011 * Math.pow(10, 23);
    merkur.x = 3.563920740763323E-01 * config.AU;
    merkur.y = 5.717187678804200E-03 * config.AU;
    merkur.z = -3.251628630906487E-02 * config.AU;
    merkur.vx = auPerDayToMPerSecond(-5.498625279495372E-03);
    merkur.vy = auPerDayToMPerSecond(2.939907891055230E-02);
    merkur.vz = auPerDayToMPerSecond(2.905916882777411E-03);

    const venus = generateBasicPlanet();
    venus.name = 'venus';
    venus.color = {
        r: 0xde, g: 0xde, b: 0xd6
    };
    venus.radius = 12103.6 * 1000;
    venus.mass = 4.8675 * Math.pow(10, 24);
    venus.x = 3.714287363667594E-01 * config.AU;
    venus.y = -6.223065873025234E-01 * config.AU;
    venus.z = -3.001784089847719E-02 * config.AU;
    venus.vx = auPerDayToMPerSecond(1.729787164697147E-02);
    venus.vy = auPerDayToMPerSecond(1.018360946690303E-02);
    venus.vz = auPerDayToMPerSecond(-8.587441076085737E-04);

    const earth = generateBasicPlanet();
    earth.name = 'earth';
    earth.color = {
        r: 0x37, g: 0x43, b: 0x5d
    };
    earth.radius = 12756.32 * 1000;
    earth.mass = 5.97237 * Math.pow(10, 24);
    earth.x = -2.553538585508089E-01 * config.AU;
    earth.y = -9.763411304535361E-01 * config.AU;
    earth.z = -1.052513783569142E-04 * config.AU;
    earth.vx = auPerDayToMPerSecond(1.635001487036944E-02);
    earth.vy = auPerDayToMPerSecond(-4.430797621704561E-03);
    earth.vz = auPerDayToMPerSecond(-2.101776519643229E-08);
    earth.link = venus;

    const mars = generateBasicPlanet();
    mars.name = 'mars';
    mars.color = {
        r: 0x8d, g: 0x5f, b: 0x3b
    };
    mars.radius = 6792.4 * 1000;
    mars.mass = 6.4171 * Math.pow(10, 23);
    mars.x = -2.841551665529732E-01 * config.AU;
    mars.y = 1.572607284356505E+00 * config.AU;
    mars.z = 3.975013478435811E-02 * config.AU;
    mars.vx = auPerDayToMPerSecond(-1.323899118392277E-02);
    mars.vy = auPerDayToMPerSecond(-1.324079074777860E-03);
    mars.vz = auPerDayToMPerSecond(2.970233768304195E-04);

    const jupiter = generateBasicPlanet();
    jupiter.name = 'jupiter';
    jupiter.color = {
        r: 0xa7, g: 0x8c, b: 0x77
    };
    jupiter.radius = 142984 * 1000;
    jupiter.mass = 1.8986 * Math.pow(10, 27);
    jupiter.x = -5.035296751383366E+00 * config.AU;
    jupiter.y = -2.079389405758550E+00 * config.AU;
    jupiter.z = 1.212458388046286E-01 * config.AU;
    jupiter.vx = auPerDayToMPerSecond(2.792948935544964E-03);
    jupiter.vy = auPerDayToMPerSecond(-6.616959801585691E-03);
    jupiter.vz = auPerDayToMPerSecond(-3.497144769094454E-05);

    const saturn = generateBasicPlanet();
    saturn.name = 'saturn';
    saturn.color = {
        r: 0xbf, g: 0xaa, b: 0x8d
    };
    saturn.radius = 120536 * 1000;
    saturn.mass = 568.34 * Math.pow(10, 24);
    saturn.x = -1.052026933700409E+00 * config.AU;
    saturn.y = -9.994978492278472E+00 * config.AU;
    saturn.z = 2.156536677039137E-01 * config.AU;
    saturn.vx = auPerDayToMPerSecond(5.241668381800872E-03);
    saturn.vy = auPerDayToMPerSecond(-6.012163316021670E-04);
    saturn.vz = auPerDayToMPerSecond(-1.984428527740341E-04);

    const uranus = generateBasicPlanet();
    uranus.name = 'uranus';
    uranus.color = {
        r: 0xaf, g: 0xd6, b: 0xdb
    };
    uranus.radius = 26000 * 1000;
    uranus.mass = 8.6810 * Math.pow(10, 25);
    uranus.x = 1.808894256948102E+01 * config.AU;
    uranus.y = 8.362208575257883E+00 * config.AU;
    uranus.z = -2.032877227125995E-01 * config.AU;
    uranus.vx = auPerDayToMPerSecond(-1.679096933165243E-03);
    uranus.vy = auPerDayToMPerSecond(3.386709085903006E-03);
    uranus.vz = auPerDayToMPerSecond(3.424044542155598E-05);

    const neptune = generateBasicPlanet();
    neptune.name = 'neptune';
    neptune.color = {
        r: 0x49, g: 0x79, b: 0xfd
    };
    neptune.radius = 49528 * 1000;
    neptune.mass = 1.0243 * Math.pow(10, 26);
    neptune.x = 2.849083024398218E+01 * config.AU;
    neptune.y = -9.221924603790701E+00 * config.AU;
    neptune.z = -4.666923015623424E-01 * config.AU;
    neptune.vx = auPerDayToMPerSecond(9.453663134275120E-04);
    neptune.vy = auPerDayToMPerSecond(3.005146529509257E-03);
    neptune.vz = auPerDayToMPerSecond(-8.341370560621744E-05);

    const moon = generateBasicPlanet();
    moon.name = 'moon';
    moon.color = {
        r: 0x51, g: 0x4d, b: 0x4a
    };
    moon.radius = 1738 * 1000;
    moon.mass = 7.342 * Math.pow(10, 22);
    moon.labelPosition = -1;
    moon.isMoon = true;
    moon.x = -2.575166907126450E-01 * config.AU;
    moon.y = -9.779348173678579E-01 * config.AU;
    moon.z = 1.160472013440968E-04 * config.AU;
    moon.vx = auPerDayToMPerSecond(1.667315603093720E-02);
    moon.vy = auPerDayToMPerSecond(-4.891796261925801E-03);
    moon.vz = auPerDayToMPerSecond(1.856253978047449E-05);

    const halley = generateBasicPlanet();
    halley.name = 'halley';
    halley.radius = 15.3 * 1000;
    halley.mass = 2.2 * Math.pow(10, 14);
    halley.color = {
        r: 0xff, g: 0xff, b: 0xff
    };
    halley.x = -2.045192296457553E+01 * config.AU;
    halley.y = 2.596711161357241E+01 * config.AU;
    halley.z = -9.905915924770314E+00 * config.AU;
    halley.vx = auPerDayToMPerSecond(8.168960874672513E-05);
    halley.vy = auPerDayToMPerSecond(7.556015133006348E-04);
    halley.vz = auPerDayToMPerSecond(-1.028407459053017E-04);

    const hale = generateBasicPlanet();
    hale.name = 'hale-bopp';
    hale.radius = 60 * 1000;
    hale.mass = 1.3 * Math.pow(10, 16);
    hale.color = {
        r: 0xff, g: 0xff, b: 0xff
    };
    hale.x = 3.147734450822550E+00 * config.AU;
    hale.y = -1.599685285595860E+01 * config.AU;
    hale.z = -3.631228356343570E+01 * config.AU;
    hale.vx = auPerDayToMPerSecond(4.025449982019777E-04);
    hale.vy = auPerDayToMPerSecond(-1.963599893518909E-03);
    hale.vz = auPerDayToMPerSecond(-3.035345413770859E-03);
    hale.start = 844819200;

    const pluto = generateBasicPlanet();
    pluto.name = 'pluto';
    pluto.radius = 60 * 1000;
    pluto.mass = 1.303 * Math.pow(10, 22);
    pluto.color = {
        r: 0xb2, g: 0xaa, b: 0x9d
    };
    pluto.x = 1.014124003514971E+01 * config.AU;
    pluto.y = -3.175483419042463E+01 * config.AU;
    pluto.z = 4.645108131789219E-01 * config.AU;
    pluto.vx = auPerDayToMPerSecond(3.051988326221818E-03);
    pluto.vy = auPerDayToMPerSecond(3.040012335837204E-04);
    pluto.vz = auPerDayToMPerSecond(-9.034090662794829E-04);

    const ganymede = generateBasicPlanet();
    ganymede.name = 'ganymede';
    ganymede.radius = 2410.3 * 1000;
    ganymede.mass = 1.4819 * Math.pow(10, 23);
    ganymede.color = {
        r: 0x8c, g: 0x7c, b: 0x6c
    };
    ganymede.x = -5.038545162105024E+00 * config.AU;
    ganymede.y = -2.073001766415427E+00 * config.AU;
    ganymede.z = 1.214444510403471E-01 * config.AU;
    ganymede.vx = auPerDayToMPerSecond(-2.802399876020957E-03);
    ganymede.vy = auPerDayToMPerSecond(-9.445554901806956E-03);
    ganymede.vz = auPerDayToMPerSecond(-2.158793174958044E-04);
    ganymede.labelPosition = -2;
    ganymede.isMoon = true;

    const callisto = generateBasicPlanet();
    callisto.name = 'callisto';
    callisto.radius = 2410.3 * 1000;
    callisto.mass = 1.075938 * Math.pow(10, 23);
    callisto.color = {
        r: 0xaa, g: 0xa1, b: 0x92
    };
    callisto.x = -5.043546136432461E+00 * config.AU;
    callisto.y = -2.088970248927962E+00 * config.AU;
    callisto.z = 1.208319766139647E-01 * config.AU;
    callisto.vx = auPerDayToMPerSecond(6.380893216887173E-03);
    callisto.vy = auPerDayToMPerSecond(-9.672660525049762E-03);
    callisto.vz = auPerDayToMPerSecond(-8.392504518043012E-05);
    callisto.labelPosition = -1;
    callisto.isMoon = true;

    const io = generateBasicPlanet();
    io.name = 'io';
    io.radius = 1821.6 * 1000;
    io.mass = 8.931938 * Math.pow(10, 22);
    io.color = {
        r: 0xfc, g: 0xfc, b: 0x8c
    };
    io.x = -5.033395021092241E+00 * config.AU;
    io.y = -2.077324466186377E+00 * config.AU;
    io.z = 1.213462690631602E-01 * config.AU;
    io.vx = auPerDayToMPerSecond(-4.588618536023535E-03);
    io.vy = auPerDayToMPerSecond(2.016343119445475E-04);
    io.vz = auPerDayToMPerSecond(1.026701978370372E-04);
    io.labelPosition = 1;
    io.isMoon = true;

    const europa = generateBasicPlanet();
    europa.name = 'europa';
    europa.radius = 1560.8 * 1000;
    europa.mass = 4.799844 * Math.pow(10, 22);
    europa.color = {
        r: 0xbc, g: 0x94, b: 0x61
    };
    europa.x = -5.031515268951983E+00 * config.AU;
    europa.y = -2.076909297177093E+00 * config.AU;
    europa.z = 1.214212115321035E-01 * config.AU;
    europa.vx = auPerDayToMPerSecond(-1.539101640693913E-03);
    europa.vy = auPerDayToMPerSecond(-5.365528961176684E-05);
    europa.vz = auPerDayToMPerSecond(1.724641804134938E-04);
    europa.labelPosition = 2;
    europa.isMoon = true;

    const amalthea = generateBasicPlanet();
    amalthea.name = 'amalthea';
    amalthea.radius = 83 * 1000;
    amalthea.mass = 2.07 * Math.pow(10, 18);
    amalthea.color = {
        r: 0xbc, g: 0x94, b: 0x61
    };
    amalthea.x = -5.035827467478209E+00 * config.AU;
    amalthea.y = -2.080474247795096E+00 * config.AU;
    amalthea.z = 1.212064605253680E-01 * config.AU;
    amalthea.vx = auPerDayToMPerSecond(1.657996095034024E-02);
    amalthea.vy = auPerDayToMPerSecond(-1.334482721782156E-02);
    amalthea.vz = auPerDayToMPerSecond(-3.237861792010454E-05);
    amalthea.labelPosition = -2;
    amalthea.isMoon = true;


    const himalia = generateBasicPlanet();
    himalia.name = 'himalia';
    himalia.radius = 65 * 1000;
    himalia.mass = 6.7 * Math.pow(10, 18);
    himalia.color = {
        r: 0xbc, g: 0x94, b: 0x61
    };
    himalia.x = -5.072371995431338E+00 * config.AU;
    himalia.y = -2.156554393560907E+00 * config.AU;
    himalia.z = 1.050266303022453E-01 * config.AU;
    himalia.vx = auPerDayToMPerSecond(4.193659551801877E-03);
    himalia.vy = auPerDayToMPerSecond(-7.097916485160895E-03);
    himalia.vz = auPerDayToMPerSecond(-8.080490186851024E-04);
    himalia.labelPosition = 3;
    himalia.isMoon = true;

    const elara = generateBasicPlanet();
    elara.name = 'elara';
    elara.radius = 40 * 1000;
    elara.mass = 0.866 * Math.pow(10, 17);
    elara.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    elara.x = -5.014621175337712E+00 * config.AU;
    elara.y = -1.969506299365096E+00 * config.AU;
    elara.z = 1.000787752262437E-01 * config.AU;
    elara.vx = auPerDayToMPerSecond(1.524659277582985E-03);
    elara.vy = auPerDayToMPerSecond(-5.651897335601934E-03);
    elara.vz = auPerDayToMPerSecond(6.325379271585594E-04);
    elara.labelPosition = -1;
    elara.isMoon = true;


    const titan = generateBasicPlanet();
    titan.name = 'titan';
    titan.radius = 2575.5 * 1000;
    titan.mass = 1.3452 * Math.pow(10, 23);
    titan.color = {
        r: 0xe1, g: 0xc4, b: 0x71
    };
    titan.x = -1.059235736139216E+00 * config.AU;
    titan.y = -9.998348099923559E+00 * config.AU;
    titan.z = 2.181058505306635E-01 * config.AU;
    titan.vx = auPerDayToMPerSecond(6.853875311363549E-03);
    titan.vy = auPerDayToMPerSecond(-3.075089450150591E-03);
    titan.vz = auPerDayToMPerSecond(9.166319520668074E-04);
    titan.labelPosition = 1;
    titan.isMoon = true;

    const rhea = generateBasicPlanet();
    rhea.name = 'rhea';
    rhea.radius = 763.8 * 1000;
    rhea.mass = 2.306518 * Math.pow(10, 21);
    rhea.color = {
        r: 0xa0, g: 0xa0, b: 0xa0
    };
    rhea.x = -1.055074560884458E+00 * config.AU;
    rhea.y = -9.996421454730990E+00 * config.AU;
    rhea.z = 2.166812678080307E-01 * config.AU;
    rhea.vx = auPerDayToMPerSecond(7.673546925478059E-03);
    rhea.vy = auPerDayToMPerSecond(-4.462020056778185E-03);
    rhea.vz = auPerDayToMPerSecond(1.581959501854047E-03);
    rhea.labelPosition = -1;
    rhea.isMoon = true;

    const dione = generateBasicPlanet();
    dione.name = 'dione';
    dione.radius = 561.4 * 1000;
    dione.mass = 1.095452 * Math.pow(10, 21);
    dione.color = {
        r: 0x88, g: 0x88, b: 0x88
    };
    dione.x = -1.053520439143635E+00 * config.AU;
    dione.y = -9.996714998865288E+00 * config.AU;
    dione.z = 2.167075374650221E-01 * config.AU;
    dione.vx = auPerDayToMPerSecond(9.877997376464179E-03);
    dione.vy = auPerDayToMPerSecond(-3.845177625540359E-03);
    dione.vz = auPerDayToMPerSecond(1.054513452173930E-03);
    dione.labelPosition = 2;
    dione.isMoon = true;


    const tethys = generateBasicPlanet();
    tethys.name = 'tethys';
    tethys.radius = 530 * 1000;
    tethys.mass = 6.17449 * Math.pow(10, 20);
    tethys.color = {
        r: 0x9e, g: 0x9e, b: 0x9e
    };
    tethys.x = -1.051406948047674E+00 * config.AU;
    tethys.y = -9.996641909835828E+00 * config.AU;
    tethys.z = 2.165065785911795E-01 * config.AU;
    tethys.vx = auPerDayToMPerSecond(1.144551147694172E-02);
    tethys.vy = auPerDayToMPerSecond(9.911242134414222E-04);
    tethys.vz = auPerDayToMPerSecond(-1.602194758400593E-03);
    tethys.labelPosition = 3;
    tethys.isMoon = true;

    const iapetus = generateBasicPlanet();
    iapetus.name = 'iapetus';
    iapetus.radius = 718 * 1000;
    iapetus.mass = 1.6 * Math.pow(10, 21);
    iapetus.color = {
        r: 0x9e, g: 0x9e, b: 0x9e
    };
    iapetus.x = -1.039798919596755E+00 * config.AU;
    iapetus.y = -1.001499652938064E+01 * config.AU;
    iapetus.z = 2.178171743017579E-01 * config.AU;
    iapetus.vx = auPerDayToMPerSecond(6.801709156549861E-03);
    iapetus.vy = auPerDayToMPerSecond(3.515761783623368E-04);
    iapetus.vz = auPerDayToMPerSecond(-7.338084599493610E-04);
    iapetus.labelPosition = -2;
    iapetus.isMoon = true;

    const enceladus = generateBasicPlanet();
    enceladus.name = 'enceladus';
    enceladus.radius = 252.3 * 1000;
    enceladus.mass = 10.8 * Math.pow(10, 19);
    enceladus.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    enceladus.x = -1.053601858437706E+00 * config.AU;
    enceladus.y = -9.994727231233696E+00 * config.AU;
    enceladus.z = 2.156744511259708E-01 * config.AU;
    enceladus.vx = auPerDayToMPerSecond(4.303390304261761E-03);
    enceladus.vy = auPerDayToMPerSecond(-6.957422208421091E-03);
    enceladus.vz = auPerDayToMPerSecond(3.222260486782469E-03);
    enceladus.labelPosition = -3;
    enceladus.isMoon = true;

    const mimas = generateBasicPlanet();
    mimas.name = 'mimas';
    mimas.radius = 198.8 * 1000;
    mimas.mass = 3.7 * Math.pow(10, 19);
    mimas.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    mimas.x = -1.051097033660872E+00 * config.AU;
    mimas.y = -9.994279866295026E+00 * config.AU;
    mimas.z = 2.151842450207443E-01 * config.AU;
    mimas.vx = auPerDayToMPerSecond(-2.688204734439949E-04);
    mimas.vy = auPerDayToMPerSecond(5.032177205046214E-03);
    mimas.vz = auPerDayToMPerSecond(-2.376124558320961E-03);
    mimas.labelPosition = 4;
    mimas.isMoon = true;

    const hyperion = generateBasicPlanet();
    hyperion.name = 'hyperion';
    hyperion.radius = 133 * 1000;
    hyperion.mass = 1.0 * Math.pow(10, 19);
    hyperion.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    hyperion.x = -1.060513451833684E+00 * config.AU;
    hyperion.y = -9.989423421224648E+00 * config.AU;
    hyperion.z = 2.136932183869545E-01 * config.AU;
    hyperion.vx = auPerDayToMPerSecond(3.417004051701451E-03);
    hyperion.vy = auPerDayToMPerSecond(-2.425119131929547E-03);
    hyperion.vz = auPerDayToMPerSecond(8.905694619089313E-04);
    hyperion.labelPosition = -4;
    hyperion.isMoon = true;

    const phoebe = generateBasicPlanet();
    phoebe.name = 'phoebe';
    phoebe.radius = 106.6 * 1000;
    phoebe.mass = 0.8 * Math.pow(10, 19);
    phoebe.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    phoebe.x = -9.670449012509922E-01 * config.AU;
    phoebe.y = -9.960191664237993E+00 * config.AU;
    phoebe.z = 2.055106996099396E-01 * config.AU;
    phoebe.vx = auPerDayToMPerSecond(5.471959543691085E-03);
    phoebe.vy = auPerDayToMPerSecond(-1.494403482116299E-03);
    phoebe.vz = auPerDayToMPerSecond(-2.291404274739634E-04);
    phoebe.labelPosition = 5;
    phoebe.isMoon = true;

    const janus = generateBasicPlanet();
    janus.name = 'janus';
    janus.radius = 97 * 1000;
    janus.mass = 1.9 * Math.pow(10, 18);
    janus.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    janus.x = -1.052684481244160E+00 * config.AU;
    janus.y = -9.995640125766046E+00 * config.AU;
    janus.z = 2.160643033994895E-01 * config.AU;
    janus.vx = auPerDayToMPerSecond(1.214894764904130E-02);
    janus.vy = auPerDayToMPerSecond(-6.082872077136453E-03);
    janus.vz = auPerDayToMPerSecond(2.034204390268128E-03);
    janus.labelPosition = -5;
    janus.isMoon = true;

    const epimetheus = generateBasicPlanet();
    epimetheus.name = 'epimetheus';
    epimetheus.radius = 69 * 1000;
    epimetheus.mass = 5.3 * Math.pow(10, 17);
    epimetheus.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    epimetheus.x = -1.051734384264487E+00 * config.AU;
    epimetheus.y = -9.995852716719028E+00 * config.AU;
    epimetheus.z = 2.160861601481482E-01 * config.AU;
    epimetheus.vx = auPerDayToMPerSecond(1.395403327303425E-02);
    epimetheus.vy = auPerDayToMPerSecond(1.339509758459710E-03);
    epimetheus.vz = auPerDayToMPerSecond(-2.000491791292513E-03);
    epimetheus.labelPosition = 6;
    epimetheus.isMoon = true;

    const prometheus = generateBasicPlanet();
    prometheus.name = 'prometheus';
    prometheus.radius = 74 * 1000;
    prometheus.mass = 1.6 * Math.pow(10, 17);
    prometheus.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    prometheus.x = -1.051117237760504E+00 * config.AU;
    prometheus.y = -9.995173259076218E+00 * config.AU;
    prometheus.z = 2.156677382792762E-01 * config.AU;
    prometheus.vx = auPerDayToMPerSecond(7.058855061642105E-03);
    prometheus.vy = auPerDayToMPerSecond(7.641250840679847E-03);
    prometheus.vz = auPerDayToMPerSecond(-4.693622819460640E-03);
    prometheus.labelPosition = -6;
    prometheus.isMoon = true;

    const ariel = generateBasicPlanet();
    ariel.name = 'ariel';
    ariel.radius = 578.9 * 1000;
    ariel.mass = 1.353 * Math.pow(10, 21);
    ariel.color = {
        r: 0x50, g: 0x50, b: 0x50
    };
    ariel.x = 1.808831648922740E+01 * config.AU;
    ariel.y = 8.362494656383751E+00 * config.AU;
    ariel.z = -2.022127758948894E-01 * config.AU;
    ariel.vx = auPerDayToMPerSecond(1.010872487068684E-03);
    ariel.vy = auPerDayToMPerSecond(3.027332203470256E-03);
    ariel.vz = auPerDayToMPerSecond(1.694227127778885E-03);
    ariel.labelPosition = -1;
    ariel.isMoon = true;

    const umbriel = generateBasicPlanet();
    umbriel.name = 'umbriel';
    umbriel.radius = 584.7 * 1000;
    umbriel.mass = 1.172 * Math.pow(10, 21);
    umbriel.color = {
        r: 0x4f, g: 0x4f, b: 0x4f
    };
    umbriel.x = 1.808949676684078E+01 * config.AU;
    umbriel.y = 8.361857990316176E+00 * config.AU;
    umbriel.z = -2.049473517530728E-01 * config.AU;
    umbriel.vx = auPerDayToMPerSecond(-4.169953929379627E-03);
    umbriel.vy = auPerDayToMPerSecond(3.804026654898817E-03);
    umbriel.vz = auPerDayToMPerSecond(-8.792604644083235E-04);
    umbriel.labelPosition = 1;
    umbriel.isMoon = true;

    const titania = generateBasicPlanet();
    titania.name = 'titania';
    titania.radius = 788.4 * 1000;
    titania.mass = 3.527 * Math.pow(10, 21);
    titania.color = {
        r: 0xa8, g: 0x8c, b: 0x74
    };
    titania.x = 1.808624856063241E+01 * config.AU;
    titania.y = 8.362655567513061E+00 * config.AU;
    titania.z = -2.043179982156845E-01 * config.AU;
    titania.vx = auPerDayToMPerSecond(-2.356911137729173E-03);
    titania.vy = auPerDayToMPerSecond(3.807804255730864E-03);
    titania.vz = auPerDayToMPerSecond(1.980010647572579E-03);
    titania.labelPosition = 2;
    titania.isMoon = true;

    const oberon = generateBasicPlanet();
    oberon.name = 'oberon';
    oberon.radius = 761.4 * 1000;
    oberon.mass = 3.014 * Math.pow(10, 21);
    oberon.color = {
        r: 0x82, g: 0x6f, b: 0x72
    };
    oberon.x = 1.808831342811963E+01 * config.AU;
    oberon.y = 8.361801527957326E+00 * config.AU;
    oberon.z = -2.071134351399648E-01 * config.AU;
    oberon.vx = auPerDayToMPerSecond(-3.435128721007176E-03);
    oberon.vy = auPerDayToMPerSecond(3.803281925853312E-03);
    oberon.vz = auPerDayToMPerSecond(2.773607861591100E-04);
    oberon.labelPosition = -2;
    oberon.isMoon = true;

    const miranda = generateBasicPlanet();
    miranda.name = 'miranda';
    miranda.radius = 235 * 1000;
    miranda.mass = 6.59 * Math.pow(10, 19);
    miranda.color = {
        r: 0xd3, g: 0xd3, b: 0xd3
    };
    miranda.x = 1.808936919466282E+01 * config.AU;
    miranda.y = 8.362238476399092E+00 * config.AU;
    miranda.z = -2.025317713000837E-01 * config.AU;
    miranda.vx = auPerDayToMPerSecond(1.634329599010024E-03);
    miranda.vy = auPerDayToMPerSecond(2.699427288374493E-03);
    miranda.vz = auPerDayToMPerSecond(-1.814058428868515E-03);
    miranda.labelPosition = -3;
    miranda.isMoon = true;

    const portia = generateBasicPlanet();
    portia.name = 'portia';
    portia.radius = 55 * 1000;
    portia.mass = 1.7 * Math.pow(10, 18);
    portia.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    portia.x = 1.808934165455596E+01 * config.AU;
    portia.y = 8.362097681542858E+00 * config.AU;
    portia.z = -2.034540065554775E-01 * config.AU;
    portia.vx = auPerDayToMPerSecond(-3.740968579934781E-03);
    portia.vy = auPerDayToMPerSecond(3.137859391220525E-03);
    portia.vz = auPerDayToMPerSecond(-4.961139296322638E-03);
    portia.labelPosition = -4;
    portia.isMoon = true;


    const puck = generateBasicPlanet();
    puck.name = 'puck';
    puck.radius = 77 * 1000;
    puck.mass = 2.89 * Math.pow(10, 18);
    puck.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    puck.x = 1.808889362787234E+01 * config.AU;
    puck.y = 8.362296493929728E+00 * config.AU;
    puck.z = -2.027217985017210E-01 * config.AU;
    puck.vx = auPerDayToMPerSecond(2.932221092639868E-03);
    puck.vy = auPerDayToMPerSecond(2.425000072226604E-03);
    puck.vz = auPerDayToMPerSecond(5.828152995737249E-04);
    puck.labelPosition = -5;
    puck.isMoon = true;

    const sycorax = generateBasicPlanet();
    sycorax.name = 'sycorax';
    sycorax.radius = 75 * 1000;
    sycorax.mass = 5.4 * Math.pow(10, 18);
    sycorax.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    sycorax.x = 1.817163460993754E+01 * config.AU;
    sycorax.y = 8.423724557379055E+00 * config.AU;
    sycorax.z = -2.378397729538305E-01 * config.AU;
    sycorax.vx = auPerDayToMPerSecond(-1.632185549719217E-03);
    sycorax.vy = auPerDayToMPerSecond(3.112812345066134E-03);
    sycorax.vz = auPerDayToMPerSecond(-1.513934846397857E-05);
    sycorax.labelPosition = -3;
    sycorax.isMoon = true;


    const triton = generateBasicPlanet();
    triton.name = 'triton';
    triton.radius = 1353.4 * 1000;
    triton.mass = 2.14 * Math.pow(10, 22);
    triton.color = {
        r: 0xaf, g: 0xab, b: 0xe3
    };
    triton.x = 2.849129239336669E+01 * config.AU;
    triton.y = -9.220048242622250E+00 * config.AU;
    triton.z = -4.653178012067880E-01 * config.AU;
    triton.vx = auPerDayToMPerSecond(3.083992998882498E-03);
    triton.vy = auPerDayToMPerSecond(3.426928820254996E-03);
    triton.vz = auPerDayToMPerSecond(-1.378249499923859E-03);
    triton.labelPosition = -1;
    triton.isMoon = true;

    const nereid = generateBasicPlanet();
    nereid.name = 'nereid';
    nereid.radius = 340 * 1000;
    nereid.mass = 3.1 * Math.pow(10, 19);
    nereid.color = {
        r: 0x9e, g: 0x9e, b: 0x9e
    };
    nereid.x = 2.852086320067444E+01 * config.AU;
    nereid.y = -9.176009765312331E+00 * config.AU;
    nereid.z = -4.618798644280574E-01 * config.AU;
    nereid.vx = auPerDayToMPerSecond(8.366386632931686E-04);
    nereid.vy = auPerDayToMPerSecond(3.362641681679426E-03);
    nereid.vz = auPerDayToMPerSecond(-6.593772982006257E-05);
    nereid.labelPosition = 1;
    nereid.isMoon = true;

    const proteus = generateBasicPlanet();
    proteus.name = 'proteus';
    proteus.radius = 240 * 1000;
    proteus.mass = 5.0 * Math.pow(10, 19);
    proteus.color = {
        r: 0x9e, g: 0x9e, b: 0x9e
    };
    proteus.x = 2.849018707166290E+01 * config.AU;
    proteus.y = -9.222363533798239E+00 * config.AU;
    proteus.z = -4.665845482348466E-01 * config.AU;
    proteus.vx = auPerDayToMPerSecond(2.902002136722940E-03);
    proteus.vy = auPerDayToMPerSecond(-3.672610457205283E-04);
    proteus.vz = auPerDayToMPerSecond(-2.132453046264509E-03);
    proteus.labelPosition = 2;
    proteus.isMoon = true;

    const despina = generateBasicPlanet();
    despina.name = 'despina';
    despina.radius = 74 * 1000;
    despina.mass = 2.1 * Math.pow(10, 18);
    despina.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    despina.x = 2.849051826897423E+01 * config.AU;
    despina.y = -9.221864195276225E+00 * config.AU;
    despina.z = -4.665430551804957E-01 * config.AU;
    despina.vx = auPerDayToMPerSecond(-9.313272061117672E-04);
    despina.vy = auPerDayToMPerSecond(-3.151554422448465E-03);
    despina.vz = auPerDayToMPerSecond(-1.512013981530722E-03);
    despina.labelPosition = -2;
    despina.isMoon = true;


    const galatea = generateBasicPlanet();
    galatea.name = 'galatea';
    galatea.radius = 79 * 1000;
    galatea.mass = 2.12 * Math.pow(10, 18);
    galatea.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    galatea.x = 2.849108387897671E+01 * config.AU;
    galatea.y = -9.221597436980554E+00 * config.AU;
    galatea.z = -4.666798836162322E-01 * config.AU;
    galatea.vx = auPerDayToMPerSecond(-3.323050699691327E-03);
    galatea.vy = auPerDayToMPerSecond(6.204830067197430E-03);
    galatea.vz = auPerDayToMPerSecond(2.809777100289867E-03);
    galatea.labelPosition = -3;
    galatea.isMoon = true;

    const larissa = generateBasicPlanet();
    larissa.name = 'larissa';
    larissa.radius = 104 * 1000;
    larissa.mass = 4.2 * Math.pow(10, 18);
    larissa.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    larissa.x = 2.849046269263223E+01 * config.AU;
    larissa.y = -9.222248388731462E+00 * config.AU;
    larissa.z = -4.666582953137307E-01 * config.AU;
    larissa.vx = auPerDayToMPerSecond(4.045531340065713E-03);
    larissa.vy = auPerDayToMPerSecond(-7.971376445715124E-04);
    larissa.vz = auPerDayToMPerSecond(-2.734583790774436E-03);
    larissa.labelPosition = -4;
    larissa.isMoon = true;


    const charon = generateBasicPlanet();
    charon.name = 'charon';
    charon.radius = 604 * 1000;
    charon.mass = 1.586 * Math.pow(10, 21);
    charon.color = {
        r: 0xc2, g: 0xb3, b: 0xbb
    };
    charon.x = 1.014132655226556E+01 * config.AU;
    charon.y = -3.175473606652909E+01 * config.AU;
    charon.z = 4.645172733977511E-01 * config.AU;
    charon.vx = auPerDayToMPerSecond(3.093514414021587E-03);
    charon.vy = auPerDayToMPerSecond(2.751871734440477E-04);
    charon.vz = auPerDayToMPerSecond(-1.021966349205112E-03);
    charon.labelPosition = -1;
    charon.isMoon = true;

    spheres.push(sun);
    spheres.push(merkur);
    spheres.push(venus);
    spheres.push(earth);
    spheres.push(moon);
    spheres.push(mars);

    spheres.push(jupiter);
    spheres.push(callisto);
    spheres.push(ganymede);
    spheres.push(io);
    spheres.push(europa);
    // works, but might be irrelevant
    spheres.push(amalthea);
    spheres.push(himalia);
    spheres.push(elara);

    spheres.push(saturn);
    spheres.push(titan);
    spheres.push(rhea);
    spheres.push(dione);
    spheres.push(tethys);
    spheres.push(iapetus);
    spheres.push(enceladus);
    spheres.push(mimas);
    spheres.push(hyperion);
    spheres.push(phoebe);
    spheres.push(janus);
    spheres.push(epimetheus);
    spheres.push(prometheus);

    spheres.push(uranus);
    spheres.push(ariel);
    spheres.push(umbriel);
    spheres.push(titania);
    spheres.push(oberon);
    spheres.push(miranda);
    spheres.push(portia);
    spheres.push(puck);
    spheres.push(sycorax);

    spheres.push(neptune);
    spheres.push(triton);
    spheres.push(nereid);
    spheres.push(proteus);
    spheres.push(despina);
    spheres.push(galatea);
    spheres.push(larissa);


    spheres.push(pluto);
    spheres.push(charon);
    //
    spheres.push(halley);
    // hale-bopp moves inwards...
    spheres.push(hale);

    /*
    spheres.forEach(pl => {
        pl.x = pl.x / config.AU * 100;
        pl.y = pl.y / config.AU * 100;
        pl.z = pl.z / config.AU * 100;
    })
    */

    return {
        spheres: spheres,
        sphereObj: {
            sun: sun,
            earth: earth
        }
    };
}

export default createSpheres