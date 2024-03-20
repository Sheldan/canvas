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
    let spheres = []
    let sun = generateBasicPlanet();
    sun.name = 'sun'
    sun.radius = 695700 * 1000;
    sun.mass = 1988500 * Math.pow(10, 24);
    sun.x = -7.577189629307818E-03 * config.AU;
    sun.y = -3.420054015754318E-03 * config.AU;
    sun.z = 2.062676576101573E-04 * config.AU;

    sun.vx = auPerDayToMPerSecond(5.426634415919629E-06);
    sun.vy = auPerDayToMPerSecond(-6.475170768987241E-06);
    sun.vz = auPerDayToMPerSecond(-6.299868606630686E-08);
    let mercury = generateBasicPlanet();
    mercury.name = 'mercury'
    mercury.radius = 2439 * 1000;
    mercury.mass = 3.302 * Math.pow(10, 23);
    mercury.x = 8.256843552486795E-02 * config.AU;
    mercury.y = 2.903037148394667E-01 * config.AU;
    mercury.z = 1.594120399193073E-02 * config.AU;

    mercury.vx = auPerDayToMPerSecond(-3.252787956859120E-02);
    mercury.vy = auPerDayToMPerSecond(9.311356719181202E-03);
    mercury.vz = auPerDayToMPerSecond(3.745461829055633E-03);
    let io = generateBasicPlanet();
    io.name = 'io'
    io.radius = 1821 * 1000;
    io.mass = 8.931938 * Math.pow(10, 22);
    io.x = 3.045257656465551E+00 * config.AU;
    io.y = 3.952988471661503E+00 * config.AU;
    io.z = -8.467448818258004E-02 * config.AU;

    io.vx = auPerDayToMPerSecond(3.045283490361494E-03);
    io.vy = auPerDayToMPerSecond(8.249925603587586E-04);
    io.vz = auPerDayToMPerSecond(1.023891470938110E-04);
    io.isMoon = true;
    let europa = generateBasicPlanet();
    europa.name = 'europa'
    europa.radius = 1560 * 1000;
    europa.mass = 4.79984 * Math.pow(10, 22);
    europa.x = 3.044443711206144E+00 * config.AU;
    europa.y = 3.959541248303633E+00 * config.AU;
    europa.z = -8.447684744361743E-02 * config.AU;

    europa.vx = auPerDayToMPerSecond(-1.317583525972777E-02);
    europa.vy = auPerDayToMPerSecond(1.354436425512521E-03);
    europa.vz = auPerDayToMPerSecond(-1.659527091698417E-04);
    europa.isMoon = true;
    let atlas = generateBasicPlanet();
    atlas.name = 'atlas'
    atlas.radius = 20.5 * 1000;
    atlas.mass = 5.490 * Math.pow(10, 15);
    atlas.x = 9.118534347237434E+00 * config.AU;
    atlas.y = -3.325538939241388E+00 * config.AU;
    atlas.z = -3.048691719235289E-01 * config.AU;

    atlas.vx = auPerDayToMPerSecond(1.029051492291125E-02);
    atlas.vy = auPerDayToMPerSecond(8.429352222497549E-03);
    atlas.vz = auPerDayToMPerSecond(-2.672909679782244E-03);
    atlas.isMoon = true;
    let cordelia = generateBasicPlanet();
    cordelia.name = 'cordelia'
    cordelia.radius = 13 * 1000;
    cordelia.mass = 6.08 * Math.pow(10, 16);
    cordelia.x = 1.202610334692100E+01 * config.AU;
    cordelia.y = 1.546874734925943E+01 * config.AU;
    cordelia.z = -9.804548174178303E-02 * config.AU;

    cordelia.vx = auPerDayToMPerSecond(2.573488390743416E-03);
    cordelia.vy = auPerDayToMPerSecond(1.301669442983582E-03);
    cordelia.vz = auPerDayToMPerSecond(2.397349360385772E-03);
    cordelia.isMoon = true;
    let venus = generateBasicPlanet();
    venus.name = 'venus'
    venus.radius = 6051 * 1000;
    venus.mass = 48.685 * Math.pow(10, 23);
    venus.x = 4.325281397909347E-01 * config.AU;
    venus.y = -5.826104280739627E-01 * config.AU;
    venus.z = -3.314247694719329E-02 * config.AU;

    venus.vx = auPerDayToMPerSecond(1.597624320838894E-02);
    venus.vy = auPerDayToMPerSecond(1.215882949002014E-02);
    venus.vz = auPerDayToMPerSecond(-7.545201235617505E-04);
    let earth = generateBasicPlanet();
    earth.name = 'earth'
    earth.radius = 6371 * 1000;
    earth.mass = 5.97219 * Math.pow(10, 24);
    earth.x = -1.000794677435791E+00 * config.AU;
    earth.y = 5.635596743548544E-02 * config.AU;
    earth.z = 2.061098973285846E-04 * config.AU;

    earth.vx = auPerDayToMPerSecond(-1.301287525499020E-03);
    earth.vy = auPerDayToMPerSecond(-1.724567306734189E-02);
    earth.vz = auPerDayToMPerSecond(6.335519318540921E-07);
    let thebe = generateBasicPlanet();
    thebe.name = 'thebe'
    thebe.radius = 49 * 1000;
    thebe.mass = 4.3 * Math.pow(10, 17);
    thebe.x = 3.047871983659116E+00 * config.AU;
    thebe.y = 3.955987751997244E+00 * config.AU;
    thebe.z = -8.452532534290566E-02 * config.AU;

    thebe.vx = auPerDayToMPerSecond(-1.018432666328773E-02);
    thebe.vy = auPerDayToMPerSecond(1.796035933041871E-02);
    thebe.vz = auPerDayToMPerSecond(2.696319153737251E-04);
    thebe.isMoon = true;
    let juliet = generateBasicPlanet();
    juliet.name = 'juliet'
    juliet.radius = 42 * 1000;
    juliet.mass = 3.871 * Math.pow(10, 17);
    juliet.x = 1.202595770270131E+01 * config.AU;
    juliet.y = 1.546868826894987E+01 * config.AU;
    juliet.z = -9.869282403898311E-02 * config.AU;

    juliet.vx = auPerDayToMPerSecond(-7.344912471338696E-03);
    juliet.vy = auPerDayToMPerSecond(3.604665312583214E-03);
    juliet.vz = auPerDayToMPerSecond(3.286878864632380E-03);
    juliet.isMoon = true;
    let caliban = generateBasicPlanet();
    caliban.name = 'caliban'
    caliban.radius = 30 * 1000;
    caliban.mass = 2.5 * Math.pow(10, 17);
    caliban.x = 1.204080648312407E+01 * config.AU;
    caliban.y = 1.550429541282110E+01 * config.AU;
    caliban.z = -6.716138276419442E-02 * config.AU;

    caliban.vx = auPerDayToMPerSecond(-2.645746781833649E-03);
    caliban.vy = auPerDayToMPerSecond(2.127813373129267E-03);
    caliban.vz = auPerDayToMPerSecond(-6.018982978126972E-06);
    caliban.isMoon = true;
    let adrastea = generateBasicPlanet();
    adrastea.name = 'adrastea'
    adrastea.radius = 49 * 1000;
    adrastea.mass = 2 * Math.pow(10, 15);
    adrastea.x = 3.047871983659116E+00 * config.AU;
    adrastea.y = 3.955987751997244E+00 * config.AU;
    adrastea.z = -8.452532534290566E-02 * config.AU;

    adrastea.vx = auPerDayToMPerSecond(-1.018432666328773E-02);
    adrastea.vy = auPerDayToMPerSecond(1.796035933041871E-02);
    adrastea.vz = auPerDayToMPerSecond(2.696319153737251E-04);
    adrastea.isMoon = true;
    let triton = generateBasicPlanet();
    triton.name = 'triton'
    triton.radius = 1352 * 1000;
    triton.mass = 2.1389 * Math.pow(10, 22);
    triton.x = 2.984843718233790E+01 * config.AU;
    triton.y = -1.554557354452041E+00 * config.AU;
    triton.z = -6.575198724321076E-01 * config.AU;

    triton.vx = auPerDayToMPerSecond(-1.129457120285340E-03);
    triton.vy = auPerDayToMPerSecond(1.114229216436171E-03);
    triton.vz = auPerDayToMPerSecond(-8.739052649758250E-04);
    triton.isMoon = true;
    let puck = generateBasicPlanet();
    puck.name = 'puck'
    puck.radius = 77 * 1000;
    puck.mass = 1.91 * Math.pow(10, 18);
    puck.x = 1.202637062413694E+01 * config.AU;
    puck.y = 1.546872473072478E+01 * config.AU;
    puck.z = -9.779832679706565E-02 * config.AU;

    puck.vx = auPerDayToMPerSecond(1.331228474474280E-03);
    puck.vy = auPerDayToMPerSecond(1.113049324888690E-03);
    puck.vz = auPerDayToMPerSecond(-1.093696137724142E-03);
    puck.isMoon = true;
    let phobos = generateBasicPlanet();
    phobos.name = 'phobos'
    phobos.radius = 13.1 * 1000;
    phobos.mass = 1.06 * Math.pow(10, 16);
    phobos.x = 7.587749821255644E-01 * config.AU;
    phobos.y = -1.175213578909629E+00 * config.AU;
    phobos.z = -4.316357393458079E-02 * config.AU;

    phobos.vx = auPerDayToMPerSecond(1.324655707122446E-02);
    phobos.vy = auPerDayToMPerSecond(9.464334071768891E-03);
    phobos.vz = auPerDayToMPerSecond(-5.517320223304464E-04);
    phobos.isMoon = true;
    let jupiter = generateBasicPlanet();
    jupiter.name = 'jupiter'
    jupiter.radius = 69911 * 1000;
    jupiter.mass = 189818.722 * Math.pow(10, 22);
    jupiter.x = 3.046434809710982E+00 * config.AU;
    jupiter.y = 3.955550953658615E+00 * config.AU;
    jupiter.z = -8.456720104862854E-02 * config.AU;

    jupiter.vx = auPerDayToMPerSecond(-6.062264249802511E-03);
    jupiter.vy = auPerDayToMPerSecond(4.963087612853924E-03);
    jupiter.vz = auPerDayToMPerSecond(1.150670851699106E-04);
    let uranus = generateBasicPlanet();
    uranus.name = 'uranus'
    uranus.radius = 25362 * 1000;
    uranus.mass = 86.813 * Math.pow(10, 24);
    uranus.x = 1.202621748354450E+01 * config.AU;
    uranus.y = 1.546867962187796E+01 * config.AU;
    uranus.z = -9.835098230836571E-02 * config.AU;

    uranus.vx = auPerDayToMPerSecond(-3.134006229451117E-03);
    uranus.vy = auPerDayToMPerSecond(2.230804226578676E-03);
    uranus.vz = auPerDayToMPerSecond(4.897818862086593E-05);
    let neptune = generateBasicPlanet();
    neptune.name = 'neptune'
    neptune.radius = 24624 * 1000;
    neptune.mass = 102.409 * Math.pow(10, 24);
    neptune.x = 2.984679943709407E+01 * config.AU;
    neptune.y = -1.554195925006188E+00 * config.AU;
    neptune.z = -6.558427144952861E-01 * config.AU;

    neptune.vx = auPerDayToMPerSecond(1.425456665284993E-04);
    neptune.vy = auPerDayToMPerSecond(3.153668198324230E-03);
    neptune.vz = auPerDayToMPerSecond(-6.811518037631484E-05);
    let carme = generateBasicPlanet();
    carme.name = 'carme'
    carme.radius = 15 * 1000;
    carme.mass = 1 * Math.pow(10, 20);
    carme.x = 2.916177478834650E+00 * config.AU;
    carme.y = 3.845845367673296E+00 * config.AU;
    carme.z = -8.297430315599200E-02 * config.AU;

    carme.vx = auPerDayToMPerSecond(-6.664537268478028E-03);
    carme.vy = auPerDayToMPerSecond(6.014717797795010E-03);
    carme.vz = auPerDayToMPerSecond(4.359279426025868E-04);
    carme.isMoon = true;
    let enceladus = generateBasicPlanet();
    enceladus.name = 'enceladus'
    enceladus.radius = 252 * 1000;
    enceladus.mass = 10.8 * Math.pow(10, 19);
    enceladus.x = 9.116561993831164E+00 * config.AU;
    enceladus.y = -3.324665071664688E+00 * config.AU;
    enceladus.z = -3.051359225646553E-01 * config.AU;

    enceladus.vx = auPerDayToMPerSecond(1.296069943361288E-03);
    enceladus.vy = auPerDayToMPerSecond(-1.197811561701619E-03);
    enceladus.vz = auPerDayToMPerSecond(3.241855995180087E-03);
    enceladus.isMoon = true;
    let iapetus = generateBasicPlanet();
    iapetus.name = 'iapetus'
    iapetus.radius = 734.5 * 1000;
    iapetus.mass = 180.5 * Math.pow(10, 19);
    iapetus.x = 9.139269315119112E+00 * config.AU;
    iapetus.y = -3.317456228620696E+00 * config.AU;
    iapetus.z = -3.111767849643537E-01 * config.AU;

    iapetus.vx = auPerDayToMPerSecond(9.111717220108410E-04);
    iapetus.vy = auPerDayToMPerSecond(7.022043133548319E-03);
    iapetus.vz = auPerDayToMPerSecond(-4.298002569335243E-04);
    iapetus.isMoon = true;
    let desdemona = generateBasicPlanet();
    desdemona.name = 'desdemona'
    desdemona.radius = 29 * 1000;
    desdemona.mass = 1.237 * Math.pow(10, 17);
    desdemona.x = 1.202662622034629E+01 * config.AU;
    desdemona.y = 1.546858702348570E+01 * config.AU;
    desdemona.z = -9.836626871092910E-02 * config.AU;

    desdemona.vx = auPerDayToMPerSecond(-3.499326666356157E-03);
    desdemona.vy = auPerDayToMPerSecond(1.553374241455201E-03);
    desdemona.vz = auPerDayToMPerSecond(-5.452141228019573E-03);
    desdemona.isMoon = true;
    let saturn = generateBasicPlanet();
    saturn.name = 'saturn'
    saturn.radius = 58232 * 1000;
    saturn.mass = 5.6834 * Math.pow(10, 26);
    saturn.x = 9.118150584141549E+00 * config.AU;
    saturn.y = -3.324782337333880E+00 * config.AU;
    saturn.z = -3.052286523649955E-01 * config.AU;

    saturn.vx = auPerDayToMPerSecond(1.599363698277643E-03);
    saturn.vy = auPerDayToMPerSecond(5.229810209691781E-03);
    saturn.vz = auPerDayToMPerSecond(-1.543725298817018E-04);
    let ganymede = generateBasicPlanet();
    ganymede.name = 'ganymede'
    ganymede.radius = 2631 * 1000;
    ganymede.mass = 1.4819 * Math.pow(10, 23);
    ganymede.x = 3.040690752999485E+00 * config.AU;
    ganymede.y = 3.959846238659248E+00 * config.AU;
    ganymede.z = -8.448443227044387E-02 * config.AU;

    ganymede.vx = auPerDayToMPerSecond(-9.818101759238631E-03);
    ganymede.vy = auPerDayToMPerSecond(-4.992643838538633E-05);
    ganymede.vz = auPerDayToMPerSecond(-1.290575923375866E-04);
    ganymede.isMoon = true;
    let despina = generateBasicPlanet();
    despina.name = 'despina'
    despina.radius = 74 * 1000;
    despina.mass = 0.7 * Math.pow(10, 18);
    despina.x = 2.984705942278039E+01 * config.AU;
    despina.y = -1.553963600536985E+00 * config.AU;
    despina.z = -6.558670225485701E-01 * config.AU;

    despina.vx = auPerDayToMPerSecond(-3.581294949255940E-03);
    despina.vy = auPerDayToMPerSecond(7.609299679903482E-03);
    despina.vz = auPerDayToMPerSecond(3.052243842473257E-03);
    despina.isMoon = true;
    let galatea = generateBasicPlanet();
    galatea.name = 'galatea'
    galatea.radius = 79 * 1000;
    galatea.mass = 1.94 * Math.pow(10, 18);
    galatea.x = 2.984704447060084E+01 * config.AU;
    galatea.y = -1.553864720946944E+00 * config.AU;
    galatea.z = -6.558258540083790E-01 * config.AU;

    galatea.vx = auPerDayToMPerSecond(-4.223730754134592E-03);
    galatea.vy = auPerDayToMPerSecond(6.223232901385595E-03);
    galatea.vz = auPerDayToMPerSecond(2.818951586990335E-03);
    galatea.isMoon = true;
    let charon = generateBasicPlanet();
    charon.name = 'charon'
    charon.radius = 603.6 * 1000;
    charon.mass = 1.5 * Math.pow(10, 21);
    charon.x = 1.741529367905759E+01 * config.AU;
    charon.y = -3.027564048482287E+01 * config.AU;
    charon.z = -1.797806956578021E+00 * config.AU;

    charon.vx = auPerDayToMPerSecond(2.842064163949556E-03);
    charon.vy = auPerDayToMPerSecond(9.601700923545320E-04);
    charon.vz = auPerDayToMPerSecond(-8.372253291390538E-04);
    charon.isMoon = true;
    let pluto = generateBasicPlanet();
    pluto.name = 'pluto'
    pluto.radius = 1188 * 1000;
    pluto.mass = 1.307 * Math.pow(10, 22);
    pluto.x = 1.741537895557906E+01 * config.AU;
    pluto.y = -3.027560581102193E+01 * config.AU;
    pluto.z = -1.797900156927030E+00 * config.AU;

    pluto.vx = auPerDayToMPerSecond(2.798155716989571E-03);
    pluto.vy = auPerDayToMPerSecond(8.653833258541239E-04);
    pluto.vz = auPerDayToMPerSecond(-9.126612360528768E-04);
    let luna = generateBasicPlanet();
    luna.name = 'luna'
    luna.radius = 1737 * 1000;
    luna.mass = 7.349 * Math.pow(10, 22);
    luna.x = -1.000546038356176E+00 * config.AU;
    luna.y = 5.892260366779448E-02 * config.AU;
    luna.z = 4.278288822462746E-04 * config.AU;

    luna.vx = auPerDayToMPerSecond(-1.877379282748234E-03);
    luna.vy = auPerDayToMPerSecond(-1.715317499262588E-02);
    luna.vz = auPerDayToMPerSecond(2.298548578778105E-05);
    luna.isMoon = true;
    let titan = generateBasicPlanet();
    titan.name = 'titan'
    titan.radius = 2575 * 1000;
    titan.mass = 13455.3 * Math.pow(10, 19);
    titan.x = 9.123334016260872E+00 * config.AU;
    titan.y = -3.330365620158605E+00 * config.AU;
    titan.z = -3.028655717423935E-01 * config.AU;

    titan.vx = auPerDayToMPerSecond(4.050454881945360E-03);
    titan.vy = auPerDayToMPerSecond(7.077426191998711E-03);
    titan.vz = auPerDayToMPerSecond(-1.351420352073495E-03);
    titan.isMoon = true;
    let janus = generateBasicPlanet();
    janus.name = 'janus'
    janus.radius = 101.7 * 1000;
    janus.mass = 1.89388 * Math.pow(10, 20);
    janus.x = 9.118039361290178E+00 * config.AU;
    janus.y = -3.323893879208220E+00 * config.AU;
    janus.z = -3.056864262747936E-01 * config.AU;

    janus.vx = auPerDayToMPerSecond(-7.531339011246679E-03);
    janus.vy = auPerDayToMPerSecond(4.679699673390042E-03);
    janus.vz = auPerDayToMPerSecond(1.011122551127797E-03);
    janus.isMoon = true;
    let umbriel = generateBasicPlanet();
    umbriel.name = 'umbriel'
    umbriel.radius = 584.7 * 1000;
    umbriel.mass = 11.7 * Math.pow(10, 20);
    umbriel.x = 1.202532518411944E+01 * config.AU;
    umbriel.y = 1.546907893033010E+01 * config.AU;
    umbriel.z = -9.687309161813763E-02 * config.AU;

    umbriel.vx = auPerDayToMPerSecond(-8.679032302729979E-04);
    umbriel.vy = auPerDayToMPerSecond(1.937231784644946E-03);
    umbriel.vz = auPerDayToMPerSecond(1.496123072819717E-03);
    umbriel.isMoon = true;
    let miranda = generateBasicPlanet();
    miranda.name = 'miranda'
    miranda.radius = 240 * 1000;
    miranda.mass = 0.6 * Math.pow(10, 20);
    miranda.x = 1.202539743611257E+01 * config.AU;
    miranda.y = 1.546892593973828E+01 * config.AU;
    miranda.z = -9.821514790651621E-02 * config.AU;

    miranda.vx = auPerDayToMPerSecond(-2.344124755714323E-03);
    miranda.vy = auPerDayToMPerSecond(2.797180764585740E-03);
    miranda.vz = auPerDayToMPerSecond(3.787635006572353E-03);
    miranda.isMoon = true;
    let halimede = generateBasicPlanet();
    halimede.name = 'halimede'
    halimede.radius = 1 * 1000;
    halimede.mass = 0;
    halimede.x = 2.981900289634169E+01 * config.AU;
    halimede.y = -1.630653750470919E+00 * config.AU;
    halimede.z = -7.591588209857619E-01 * config.AU;

    halimede.vx = auPerDayToMPerSecond(-1.087702453053518E-04);
    halimede.vy = auPerDayToMPerSecond(3.010951166735021E-03);
    halimede.vz = auPerDayToMPerSecond(3.556083322570714E-05);
    halimede.isMoon = true;
    let psamathe = generateBasicPlanet();
    psamathe.name = 'psamathe'
    psamathe.radius = 1 * 1000;
    psamathe.mass = 0;
    psamathe.x = 3.010738262683592E+01 * config.AU;
    psamathe.y = -1.536159771937663E+00 * config.AU;
    psamathe.z = -9.279865111130756E-01 * config.AU;

    psamathe.vx = auPerDayToMPerSecond(2.406962865421947E-04);
    psamathe.vy = auPerDayToMPerSecond(3.015710859656221E-03);
    psamathe.vz = auPerDayToMPerSecond(-1.218784528772400E-06);
    psamathe.isMoon = true;
    let callisto = generateBasicPlanet();
    callisto.name = 'callisto'
    callisto.radius = 2410 * 1000;
    callisto.mass = 1.075938 * Math.pow(10, 23);
    callisto.x = 3.058927799792611E+00 * config.AU;
    callisto.y = 3.955478230808057E+00 * config.AU;
    callisto.z = -8.440246513596142E-02 * config.AU;

    callisto.vx = auPerDayToMPerSecond(-6.042435408137762E-03);
    callisto.vy = auPerDayToMPerSecond(9.732422981422247E-03);
    callisto.vz = auPerDayToMPerSecond(2.647168258816008E-04);
    callisto.isMoon = true;
    let himalia = generateBasicPlanet();
    himalia.name = 'himalia'
    himalia.radius = 85 * 1000;
    himalia.mass = 4.2 * Math.pow(10, 18);
    himalia.x = 2.978809759008421E+00 * config.AU;
    himalia.y = 3.902594193487404E+00 * config.AU;
    himalia.z = -8.397638774885566E-02 * config.AU;

    himalia.vx = auPerDayToMPerSecond(-5.294835379310222E-03);
    himalia.vy = auPerDayToMPerSecond(3.695106852504183E-03);
    himalia.vz = auPerDayToMPerSecond(-7.299522489118194E-04);
    himalia.isMoon = true;
    let sinope = generateBasicPlanet();
    sinope.name = 'sinope'
    sinope.radius = 14 * 1000;
    sinope.mass = 0 * Math.pow(10, 20);
    sinope.x = 2.985397386434592E+00 * config.AU;
    sinope.y = 3.842757216977271E+00 * config.AU;
    sinope.z = -6.917367022274271E-02 * config.AU;

    sinope.vx = auPerDayToMPerSecond(-7.614043393190821E-03);
    sinope.vy = auPerDayToMPerSecond(5.213325723305759E-03);
    sinope.vz = auPerDayToMPerSecond(-2.988838328706093E-04);
    sinope.isMoon = true;
    let pasiphae = generateBasicPlanet();
    pasiphae.name = 'pasiphae'
    pasiphae.radius = 18 * 1000;
    pasiphae.mass = 0 * Math.pow(10, 20);
    pasiphae.x = 3.165272281742773E+00 * config.AU;
    pasiphae.y = 3.776805163586147E+00 * config.AU;
    pasiphae.z = -5.629304010329678E-03 * config.AU;

    pasiphae.vx = auPerDayToMPerSecond(-6.789197532552247E-03);
    pasiphae.vy = auPerDayToMPerSecond(4.852928537329076E-03);
    pasiphae.vz = auPerDayToMPerSecond(-1.775399313307015E-04);
    pasiphae.isMoon = true;
    let mars = generateBasicPlanet();
    mars.name = 'mars'
    mars.radius = 3389 * 1000;
    mars.mass = 6.4171 * Math.pow(10, 23);
    mars.x = 7.587495931229030E-01 * config.AU;
    mars.y = -1.175159748683399E+00 * config.AU;
    mars.z = -4.314709603203211E-02 * config.AU;

    mars.vx = auPerDayToMPerSecond(1.224497961584462E-02);
    mars.vy = auPerDayToMPerSecond(8.851853299264183E-03);
    mars.vz = auPerDayToMPerSecond(-1.146354735967068E-04);
    let elara = generateBasicPlanet();
    elara.name = 'elara'
    elara.radius = 40 * 1000;
    elara.mass = 0 * Math.pow(10, 20);
    elara.x = 3.008425668232462E+00 * config.AU;
    elara.y = 3.900203151955902E+00 * config.AU;
    elara.z = -6.619292559552481E-02 * config.AU;

    elara.vx = auPerDayToMPerSecond(-4.470432268443124E-03);
    elara.vy = auPerDayToMPerSecond(3.938751735259350E-03);
    elara.vz = auPerDayToMPerSecond(-8.554604307192225E-04);
    elara.isMoon = true;
    let amalthea = generateBasicPlanet();
    amalthea.name = 'amalthea'
    amalthea.radius = 83 * 1000;
    amalthea.mass = 2.08 * Math.pow(10, 18);
    amalthea.x = 3.046641290655529E+00 * config.AU;
    amalthea.y = 3.954357447783229E+00 * config.AU;
    amalthea.z = -8.460767904171593E-02 * config.AU;

    amalthea.vx = auPerDayToMPerSecond(9.001207418704407E-03);
    amalthea.vy = auPerDayToMPerSecond(7.612412064047957E-03);
    amalthea.vz = auPerDayToMPerSecond(3.296953374510347E-04);
    amalthea.isMoon = true;
    let deimos = generateBasicPlanet();
    deimos.name = 'deimos'
    deimos.radius = 7.8 * 1000;
    deimos.mass = 1.8 * Math.pow(10, 20);
    deimos.x = 7.586813695853714E-01 * config.AU;
    deimos.y = -1.175024557892905E+00 * config.AU;
    deimos.z = -4.310652081868782E-02 * config.AU;

    deimos.vx = auPerDayToMPerSecond(1.161784725881572E-02);
    deimos.vy = auPerDayToMPerSecond(8.460276750599767E-03);
    deimos.vz = auPerDayToMPerSecond(1.357538511418949E-04);
    deimos.isMoon = true;
    let ananke = generateBasicPlanet();
    ananke.name = 'ananke'
    ananke.radius = 5 * 1000;
    ananke.mass = 0 * Math.pow(10, 20);
    ananke.x = 3.039536181667691E+00 * config.AU;
    ananke.y = 3.888089352692946E+00 * config.AU;
    ananke.z = -4.907694464378390E-02 * config.AU;

    ananke.vx = auPerDayToMPerSecond(-4.219786768628813E-03);
    ananke.vy = auPerDayToMPerSecond(4.635650421033859E-03);
    ananke.vz = auPerDayToMPerSecond(4.228065394234422E-04);
    ananke.isMoon = true;
    let nemausa = generateBasicPlanet();
    nemausa.name = 'nemausa'
    nemausa.radius = 10 * 1000;
    nemausa.mass = 3.9 * Math.pow(10, 18);
    nemausa.x = 3.136749766039815E+00 * config.AU;
    nemausa.y = 4.016894650554748E+00 * config.AU;
    nemausa.z = -1.954667223339418E-02 * config.AU;

    nemausa.vx = auPerDayToMPerSecond(-5.504539933046626E-03);
    nemausa.vy = auPerDayToMPerSecond(3.501986816851405E-03);
    nemausa.vz = auPerDayToMPerSecond(2.384281408007608E-04);
    nemausa.isMoon = true;
    let dione = generateBasicPlanet();
    dione.name = 'dione'
    dione.radius = 562 * 1000;
    dione.mass = 109.5 * Math.pow(10, 19);
    dione.x = 9.117127404465210E+00 * config.AU;
    dione.y = -3.322698706551144E+00 * config.AU;
    dione.z = -3.062199184382934E-01 * config.AU;

    dione.vx = auPerDayToMPerSecond(-3.674563589879509E-03);
    dione.vy = auPerDayToMPerSecond(3.363888215183650E-03);
    dione.vz = auPerDayToMPerSecond(1.334452366458849E-03);
    dione.isMoon = true;
    let rhea = generateBasicPlanet();
    rhea.name = 'rhea'
    rhea.radius = 764 * 1000;
    rhea.mass = 230.9 * Math.pow(10, 19);
    rhea.x = 9.116522871626787E+00 * config.AU;
    rhea.y = -3.327483102879959E+00 * config.AU;
    rhea.z = -3.036556265957120E-01 * config.AU;

    rhea.vx = auPerDayToMPerSecond(5.928883173693154E-03);
    rhea.vy = auPerDayToMPerSecond(3.061832857152611E-03);
    rhea.vz = auPerDayToMPerSecond(5.923146830644473E-04);
    rhea.isMoon = true;
    let oberon = generateBasicPlanet();
    oberon.name = 'oberon'
    oberon.radius = 761.4 * 1000;
    oberon.mass = 30.1 * Math.pow(10, 20);
    oberon.x = 1.202774090080390E+01 * config.AU;
    oberon.y = 1.546785180272868E+01 * config.AU;
    oberon.z = -1.018392875189547E-01 * config.AU;

    oberon.vx = auPerDayToMPerSecond(-4.766206018301265E-03);
    oberon.vy = auPerDayToMPerSecond(2.476486038123523E-03);
    oberon.vz = auPerDayToMPerSecond(-7.231913561193932E-04);
    oberon.isMoon = true;
    let titania = generateBasicPlanet();
    titania.name = 'titania'
    titania.radius = 788.9 * 1000;
    titania.mass = 35.2 * Math.pow(10, 20);
    titania.x = 1.202791750655064E+01 * config.AU;
    titania.y = 1.546863789726340E+01 * config.AU;
    titania.z = -9.598097723202298E-02 * config.AU;

    titania.vx = auPerDayToMPerSecond(-1.485123797982077E-03);
    titania.vy = auPerDayToMPerSecond(1.702224740385175E-03);
    titania.vz = auPerDayToMPerSecond(-1.146919604643178E-03);
    titania.isMoon = true;
    let mimas = generateBasicPlanet();
    mimas.name = 'mimas'
    mimas.radius = 198 * 1000;
    mimas.mass = 3.7 * Math.pow(10, 19);
    mimas.x = 9.117323343917123E+00 * config.AU;
    mimas.y = -3.323956929555484E+00 * config.AU;
    mimas.z = -3.055642817459119E-01 * config.AU;

    mimas.vx = auPerDayToMPerSecond(-4.522521531066720E-03);
    mimas.vy = auPerDayToMPerSecond(4.748934929066169E-04);
    mimas.vz = auPerDayToMPerSecond(3.166393033208495E-03);
    mimas.isMoon = true;
    let tethys = generateBasicPlanet();
    tethys.name = 'tethys'
    tethys.radius = 536 * 1000;
    tethys.mass = 61.7 * Math.pow(10, 19);
    tethys.x = 9.116722419138361E+00 * config.AU;
    tethys.y = -3.323516845337742E+00 * config.AU;
    tethys.z = -3.057183107899077E-01 * config.AU;

    tethys.vx = auPerDayToMPerSecond(-2.864417221905184E-03);
    tethys.vy = auPerDayToMPerSecond(1.207375241070822E-03);
    tethys.vz = auPerDayToMPerSecond(2.465968585698774E-03);
    tethys.isMoon = true;
    let prometheus = generateBasicPlanet();
    prometheus.name = 'prometheus'
    prometheus.radius = 68.2 * 1000;
    prometheus.mass = 1.59720 * Math.pow(10, 17);
    prometheus.x = 9.118423563130170E+00 * config.AU;
    prometheus.y = -3.324005298405396E+00 * config.AU;
    prometheus.z = -3.056619939143135E-01 * config.AU;

    prometheus.vx = auPerDayToMPerSecond(-7.506670754814214E-03);
    prometheus.vy = auPerDayToMPerSecond(8.093300651995105E-03);
    prometheus.vz = auPerDayToMPerSecond(-7.736294934446884E-04);
    prometheus.isMoon = true;
    let lysithea = generateBasicPlanet();
    lysithea.name = 'lysithea'
    lysithea.radius = 12 * 1000;
    lysithea.mass = 0 * Math.pow(10, 20);
    lysithea.x = 3.076253944710646E+00 * config.AU;
    lysithea.y = 4.008810470675135E+00 * config.AU;
    lysithea.z = -5.475052811788562E-02 * config.AU;

    lysithea.vx = auPerDayToMPerSecond(-8.010657045149494E-03);
    lysithea.vy = auPerDayToMPerSecond(5.919820588786170E-03);
    lysithea.vz = auPerDayToMPerSecond(1.810699470961628E-04);
    lysithea.isMoon = true;
    let telesto = generateBasicPlanet();
    telesto.name = 'telesto'
    telesto.radius = 16.3 * 1000;
    telesto.mass = 4 * Math.pow(10, 15);
    telesto.x = 9.116285722972307E+00 * config.AU;
    telesto.y = -3.325236808948388E+00 * config.AU;
    telesto.z = -3.047849431297088E-01 * config.AU;

    telesto.vx = auPerDayToMPerSecond(3.604104384007613E-03);
    telesto.vy = auPerDayToMPerSecond(-4.252516972574899E-04);
    telesto.vz = auPerDayToMPerSecond(2.485726949455874E-03);
    telesto.isMoon = true;
    let phoebe = generateBasicPlanet();
    phoebe.name = 'phoebe'
    phoebe.radius = 106.6 * 1000;
    phoebe.mass = 0.8 * Math.pow(10, 19);
    phoebe.x = 9.037368341125891E+00 * config.AU;
    phoebe.y = -3.305597970697780E+00 * config.AU;
    phoebe.z = -2.951256116399240E-01 * config.AU;

    phoebe.vx = auPerDayToMPerSecond(1.660273132631272E-03);
    phoebe.vy = auPerDayToMPerSecond(6.251781994699702E-03);
    phoebe.vz = auPerDayToMPerSecond(-1.618918829518826E-04);
    phoebe.isMoon = true;
    let ariel = generateBasicPlanet();
    ariel.name = 'ariel'
    ariel.radius = 581.1 * 1000;
    ariel.mass = 13.5 * Math.pow(10, 20);
    ariel.x = 1.202737972503779E+01 * config.AU;
    ariel.y = 1.546836718257161E+01 * config.AU;
    ariel.z = -9.877402682790670E-02 * config.AU;

    ariel.vx = auPerDayToMPerSecond(-4.260251210208968E-03);
    ariel.vy = auPerDayToMPerSecond(2.065519117891362E-03);
    ariel.vz = auPerDayToMPerSecond(-2.923707326959595E-03);
    ariel.isMoon = true;
    let bianca = generateBasicPlanet();
    bianca.name = 'bianca'
    bianca.radius = 22 * 1000;
    bianca.mass = 6.38 * Math.pow(10, 16);
    bianca.x = 1.202648777522790E+01 * config.AU;
    bianca.y = 1.546858176623923E+01 * config.AU;
    bianca.z = -9.862309231714374E-02 * config.AU;

    bianca.vx = auPerDayToMPerSecond(-7.138762521980637E-03);
    bianca.vy = auPerDayToMPerSecond(2.551601467214587E-03);
    bianca.vz = auPerDayToMPerSecond(-4.025173604140387E-03);
    bianca.isMoon = true;
    let hyperion = generateBasicPlanet();
    hyperion.name = 'hyperion'
    hyperion.radius = 133 * 1000;
    hyperion.mass = 5.5510 * Math.pow(10, 18);
    hyperion.x = 9.116188091280131E+00 * config.AU;
    hyperion.y = -3.332471755918359E+00 * config.AU;
    hyperion.z = -3.011858691881938E-01 * config.AU;

    hyperion.vx = auPerDayToMPerSecond(4.767389908952711E-03);
    hyperion.vy = auPerDayToMPerSecond(4.596232737187168E-03);
    hyperion.vz = auPerDayToMPerSecond(-1.353500413823235E-04);
    hyperion.isMoon = true;
    let naiad = generateBasicPlanet();
    naiad.name = 'naiad'
    naiad.radius = 29 * 1000;
    naiad.mass = 1.2 * Math.pow(10, 17);
    naiad.x = 2.984650711660756E+01 * config.AU;
    naiad.y = -1.554202186686891E+00 * config.AU;
    naiad.z = -6.557062516792322E-01 * config.AU;

    naiad.vx = auPerDayToMPerSecond(-8.690503837244501E-04);
    naiad.vy = auPerDayToMPerSecond(-3.230347690261108E-03);
    naiad.vz = auPerDayToMPerSecond(-2.423540870188404E-03);
    naiad.isMoon = true;
    let calypso = generateBasicPlanet();
    calypso.name = 'calypso'
    calypso.radius = 15.3 * 1000;
    calypso.mass = 2 * Math.pow(10, 15);
    calypso.x = 9.118716634390184E+00 * config.AU;
    calypso.y = -3.323158050794820E+00 * config.AU;
    calypso.z = -3.061865693061674E-01 * config.AU;

    calypso.vx = auPerDayToMPerSecond(-4.645521684230479E-03);
    calypso.vy = auPerDayToMPerSecond(7.206136486094631E-03);
    calypso.vz = auPerDayToMPerSecond(-4.964462239664254E-04);
    calypso.isMoon = true;
    let helene = generateBasicPlanet();
    helene.name = 'helene'
    helene.radius = 16 * 1000;
    helene.mass = 7.1 * Math.pow(10, 15);
    helene.x = 9.115637897371668E+00 * config.AU;
    helene.y = -3.324970169639905E+00 * config.AU;
    helene.z = -3.048976468431989E-01 * config.AU;

    helene.vx = auPerDayToMPerSecond(2.318280903126200E-03);
    helene.vy = auPerDayToMPerSecond(1.508400428757107E-04);
    helene.vz = auPerDayToMPerSecond(2.440316148942578E-03);
    helene.isMoon = true;
    let sycorax = generateBasicPlanet();
    sycorax.name = 'sycorax'
    sycorax.radius = 60 * 1000;
    sycorax.mass = 2.5 * Math.pow(10, 18)
    sycorax.x = 1.210249906437523E+01 * config.AU;
    sycorax.y = 1.555176592155493E+01 * config.AU;
    sycorax.z = -1.274650112589694E-01 * config.AU;

    sycorax.vx = auPerDayToMPerSecond(-3.013172891015943E-03);
    sycorax.vy = auPerDayToMPerSecond(2.021975135357511E-03);
    sycorax.vz = auPerDayToMPerSecond(-2.646409883723349E-05);
    sycorax.isMoon = true;
    let epimetheus = generateBasicPlanet();
    epimetheus.name = 'epimetheus'
    epimetheus.radius = 64.9 * 1000;
    epimetheus.mass = 5.25607 * Math.pow(10, 17);
    epimetheus.x = 9.118051645906791E+00 * config.AU;
    epimetheus.y = -3.325664511727341E+00 * config.AU;
    epimetheus.z = -3.047535243492993E-01 * config.AU;

    epimetheus.vx = auPerDayToMPerSecond(1.072261188820617E-02);
    epimetheus.vy = auPerDayToMPerSecond(4.014653407130849E-03);
    epimetheus.vz = auPerDayToMPerSecond(-3.436436804558274E-04);
    epimetheus.isMoon = true;
    let cressida = generateBasicPlanet();
    cressida.name = 'cressida'
    cressida.radius = 33 * 1000;
    cressida.mass = 1.839 * Math.pow(10, 17);
    cressida.x = 1.202662010865638E+01 * config.AU;
    cressida.y = 1.546859640942281E+01 * config.AU;
    cressida.z = -9.830764112812003E-02 * config.AU;

    cressida.vx = auPerDayToMPerSecond(-2.717683447922231E-03);
    cressida.vy = auPerDayToMPerSecond(1.374142142866634E-03);
    cressida.vz = auPerDayToMPerSecond(-5.466772386327647E-03);
    cressida.isMoon = true;
    let ophelia = generateBasicPlanet();
    ophelia.name = 'ophelia'
    ophelia.radius = 16 * 1000;
    ophelia.mass = 3.57 * Math.pow(10, 16);
    ophelia.x = 1.202603975356832E+01 * config.AU;
    ophelia.y = 1.546876026303609E+01 * config.AU;
    ophelia.z = -9.804550196835013E-02 * config.AU;

    ophelia.vx = auPerDayToMPerSecond(1.879668057513447E-03);
    ophelia.vy = auPerDayToMPerSecond(1.565224735158004E-03);
    ophelia.vz = auPerDayToMPerSecond(3.210655173342504E-03);
    ophelia.isMoon = true;
    let rosalind = generateBasicPlanet();
    rosalind.name = 'rosalind'
    rosalind.radius = 29 * 1000;
    rosalind.mass = 3.57 * Math.pow(10, 16);
    rosalind.x = 1.202578444052900E+01 * config.AU;
    rosalind.y = 1.546879251101753E+01 * config.AU;
    rosalind.z = -9.821703935233636E-02 * config.AU;

    rosalind.vx = auPerDayToMPerSecond(-1.508074075975188E-03);
    rosalind.vy = auPerDayToMPerSecond(2.563294993476808E-03);
    rosalind.vz = auPerDayToMPerSecond(5.039623729870354E-03);
    rosalind.isMoon = true;
    let thalassa = generateBasicPlanet();
    thalassa.name = 'thalassa';
    thalassa.radius = 40 * 1000;
    thalassa.mass = 3.54 * Math.pow(10, 17);
    thalassa.x = 2.984710908428911E+01 * config.AU;
    thalassa.y = -1.554189140525946E+00 * config.AU;
    thalassa.z = -6.559686031788007E-01 * config.AU;

    thalassa.vx = auPerDayToMPerSecond(7.753101274291644E-04);
    thalassa.vy = auPerDayToMPerSecond(9.570229190871334E-03);
    thalassa.vz = auPerDayToMPerSecond(1.941842126570872E-03);
    thalassa.isMoon = true;
    let proteus = generateBasicPlanet();
    proteus.name = 'proteus'
    proteus.radius = 208 * 1000;
    proteus.mass = 1.2 * Math.pow(10, 19);
    proteus.x = 2.984672491202255E+01 * config.AU;
    proteus.y = -1.554942183144947E+00 * config.AU;
    proteus.z = -6.560860409319601E-01 * config.AU;

    proteus.vx = auPerDayToMPerSecond(4.220494466993234E-03);
    proteus.vy = auPerDayToMPerSecond(3.290330417872553E-03);
    proteus.vz = auPerDayToMPerSecond(-1.722064545672136E-03);
    proteus.isMoon = true;
    let nereid = generateBasicPlanet();
    nereid.name = 'nereid'
    nereid.radius = 170 * 1000;
    nereid.mass = 3.57 * Math.pow(10, 19);
    nereid.x = 2.987809479864142E+01 * config.AU;
    nereid.y = -1.528809991020147E+00 * config.AU;
    nereid.z = -6.523441376676499E-01 * config.AU;

    nereid.vx = auPerDayToMPerSecond(2.310655617242043E-04);
    nereid.vy = auPerDayToMPerSecond(3.728312106743516E-03);
    nereid.vz = auPerDayToMPerSecond(-2.458956524212706E-05);
    nereid.isMoon = true;
    let portia = generateBasicPlanet();
    portia.name = 'portia'
    portia.radius = 55 * 1000;
    portia.mass = 1.1671 * Math.pow(10, 18);
    portia.x = 1.202617129102754E+01 * config.AU;
    portia.y = 1.546874907597843E+01 * config.AU;
    portia.z = -9.791695668101712E-02 * config.AU;

    portia.vx = auPerDayToMPerSecond(2.122606621761457E-03);
    portia.vy = auPerDayToMPerSecond(1.184193485732152E-03);
    portia.vz = auPerDayToMPerSecond(7.839371058933997E-04);
    portia.isMoon = true;
    let belinda = generateBasicPlanet();
    belinda.name = 'belinda'
    belinda.radius = 34 * 1000;
    belinda.mass = 1.7 * Math.pow(10, 17);
    belinda.x = 1.202576121423072E+01 * config.AU;
    belinda.y = 1.546875137213733E+01 * config.AU;
    belinda.z = -9.854916531260241E-02 * config.AU;

    belinda.vx = auPerDayToMPerSecond(-4.972483575608170E-03);
    belinda.vy = auPerDayToMPerSecond(3.271653481497950E-03);
    belinda.vz = auPerDayToMPerSecond(4.656389925108991E-03);
    belinda.isMoon = true;
    let larissa = generateBasicPlanet();
    larissa.name = 'larissa';
    larissa.radius = 96 * 1000;
    larissa.mass = 0.5 * Math.pow(10, 18);
    larissa.x = 2.984653544921244E+01 * config.AU;
    larissa.y = -1.554611704730008E+00 * config.AU;
    larissa.z = -6.558817806318490E-01 * config.AU;

    larissa.vx = auPerDayToMPerSecond(4.382094034839831E-03);
    larissa.vy = auPerDayToMPerSecond(6.967477769164574E-04);
    larissa.vz = auPerDayToMPerSecond(-2.703295937616484E-03);
    larissa.isMoon = true;



    spheres.push(sun);
    spheres.push(mercury);
    spheres.push(venus);
    spheres.push(earth);
    spheres.push(luna);
    spheres.push(mars);

    spheres.push(jupiter);
    spheres.push(io);
    spheres.push(europa);
    spheres.push(ganymede);
    spheres.push(callisto);
    // works, but might be irrelevant
    spheres.push(amalthea);
    spheres.push(himalia);
    spheres.push(elara);
    spheres.push(pasiphae)
    spheres.push(sinope)
    spheres.push(lysithea)
    spheres.push(carme)
    spheres.push(nemausa)
    spheres.push(ananke)
    //spheres.push(thebe)
    spheres.push(adrastea)

    spheres.push(saturn);
    spheres.push(mimas);
    spheres.push(enceladus);
    spheres.push(tethys);
    spheres.push(dione);
    spheres.push(rhea);
    spheres.push(titan);
    spheres.push(hyperion);
    spheres.push(iapetus);
    spheres.push(phoebe);
    spheres.push(janus);
    spheres.push(epimetheus);
    spheres.push(helene);
    spheres.push(telesto);
    spheres.push(calypso);
    spheres.push(atlas);
    spheres.push(prometheus);

    spheres.push(uranus);
    spheres.push(ariel);
    spheres.push(umbriel);
    spheres.push(titania);
    spheres.push(oberon);
    spheres.push(miranda);
    // spheres.push(cordelia); flys away
    spheres.push(bianca);
    spheres.push(cressida);
    spheres.push(desdemona);
    spheres.push(juliet);
    spheres.push(portia);
    spheres.push(rosalind);
    spheres.push(belinda);
    spheres.push(puck);
    spheres.push(caliban);
    spheres.push(sycorax);

    spheres.push(neptune);
    spheres.push(triton);
    spheres.push(nereid);
    //spheres.push(naiad); flys away
    //spheres.push(thalassa); flys away
    //spheres.push(despina); flys away
    spheres.push(galatea);
    spheres.push(larissa);
    spheres.push(proteus);
    spheres.push(halimede);
    spheres.push(psamathe);


    spheres.push(pluto);
    spheres.push(charon);
    //
    //spheres.push(halley);
    // hale-bopp moves inwards...
    // spheres.push(hale);

    spheres = spheres.filter(sphere => sphere.mass > 0)
    const colorCount = spheres.length;
    const dh = 1 / colorCount;
    let colors = [];
    for(let i=0;i< colorCount;i++) {
        let rgb = HSVtoRGB(dh*i,1,1);
        colors.push(rgb);
    }
    shuffleArray(colors)
    for (let i = 0; i < spheres.length; i++) {
        spheres[i].color = {
            r: colors[i].r,
            g: colors[i].g,
            b: colors[i].b
        }
    }

    return {
        spheres: spheres,
        sphereObj: {
            sun: sun,
            earth: earth
        }
    };
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// https://stackoverflow.com/questions/70420753/getting-multiple-distinct-colors
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

export default createSpheres