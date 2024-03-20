const config = {
    gravitationalConstant: 6.67428e-11
}

function attraction(sphere1, sphere2) {
    const dx = sphere1.x - sphere2.x;
    const dy = sphere1.y - sphere2.y;
    const dz = sphere1.z - sphere2.z;
    const direction = {
        dx:  sphere1.x - sphere2.x,
        dy : sphere1.y - sphere2.y,
        dz : sphere1.z - sphere2.z
    };
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dist === 0) {
        return;
    }
    const force = config.gravitationalConstant * sphere2.mass * sphere1.mass / (dist * dist * dist);
    return {fx: direction.dx * force, fy: direction.dy * force, fz: direction.dz * force}
}

function sphereAct(spheres, sphere, parentIndex) {
    let totalForce = {
        fx: 0, fy: 0, fz: 0
    };
    for (let sphereI = 0; sphereI < spheres.length; sphereI++) {
        if (sphereI === parentIndex) {
            continue;
        }
        let forces = attraction(spheres[sphereI], sphere);
        if (forces) {
            totalForce.fx += forces.fx;
            totalForce.fy += forces.fy;
            totalForce.fz += forces.fz;
        }
    }
    sphere.force = totalForce;
}

function spheresAct(spheres, step) {
    for (let sphereI = 0; sphereI < spheres.length; sphereI++) {
        sphereAct(spheres, spheres[sphereI], sphereI);
    }
    for (let sphere2I = 0; sphere2I < spheres.length; sphere2I++) {
        const sphere = spheres[sphere2I];
        sphere.vx += sphere.force.fx / sphere.mass * step;
        sphere.vy += sphere.force.fy / sphere.mass * step;
        sphere.vz += sphere.force.fz / sphere.mass * step;

        sphere.x += sphere.vx * step;
        sphere.y += sphere.vy * step;
        sphere.z += sphere.vz * step;
    }
}


export default spheresAct