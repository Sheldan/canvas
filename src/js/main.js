import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'
import Stats from 'three/addons/libs/stats.module.js';
import createSpheres from './setup'
import spheresAct from './physics'
import {FontLoader} from "three/addons";

const loader = new FontLoader();


const config = {
    gravitationalConstant: 6.67430e-11,
    timeStep: 1 * 3600,
    AU: 149_597_870_700,
    lines: true
}

const maxPoints = 100_000;
const scene = new THREE.Scene();
const container = document.getElementById( 'container' );
const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);
const stats = new Stats();
container.appendChild( stats.dom );
const camera = new THREE.PerspectiveCamera( 45, container.offsetWidth / container.offsetHeight, config.AU / 25, 150 * config.AU);

const controls = new OrbitControls(camera, renderer.domElement);
const texts = [];
const lines = {}

let axesHelper;
const spheres = createSpheres()
loader.load(
    // resource URL
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function(font) {
        initScene(font);
        animate()
    })


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    stats.update();
    render();
}

function render() {
    act()
    renderer.render(scene, camera);
}

function act() {
    spheresAct(spheres.spheres, config.timeStep)
    if(config.lines) {
        spheres.spheres.forEach(sphere => {
            if(!(sphere.name in lines)) {
                lines[sphere.name] = []
                const positions = new Float32Array(maxPoints * 3); // 3 vertices per point
                const geometry = new THREE.BufferGeometry();
                geometry.setDrawRange(0, 0);
                geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                const material = new THREE.LineBasicMaterial( { color: getSphereColor(sphere) } );
                const line = new THREE.Line(geometry, material);
                scene.add(line);
                sphere.line = line;
            }
            const pos = {
                x: sphere.x,
                y: sphere.y,
                z: sphere.z
            }
            const positionAttribute = sphere.line.geometry.getAttribute( 'position' );
            lines[sphere.name].push(pos);
            let currentLength = lines[sphere.name].length - 1;
            positionAttribute.setXYZ(currentLength, sphere.x, sphere.y, sphere.z);
            sphere.line.geometry.setDrawRange(0, currentLength);
            positionAttribute.needsUpdate = true;
        })
    }
    spheres.spheres.forEach(sphere => {
        sphere.group.position.x = sphere.x;
        sphere.group.position.y = sphere.y;
        sphere.group.position.z = sphere.z;
    })
    texts.forEach(text => {
        text.lookAt(camera.position)
    })
    axesHelper.position.copy(controls.target);
}


function getSphereColor(sphereConfig) {
    return new THREE.Color(sphereConfig.color.r / 255, sphereConfig.color.g / 255, sphereConfig.color.b / 255);
}

function initScene(font) {
    const geometry = new THREE.SphereGeometry(0.5, 24, 12);
    let scale = config.AU / 10;
    spheres.spheres.forEach(sphereConfig => {

        let sphereColor = getSphereColor(sphereConfig);
        const material = new THREE.MeshBasicMaterial({color: sphereColor});

        const sphere = new THREE.Mesh(geometry, material);
        const group = new THREE.Group();
        group.position.x = sphereConfig.x;
        group.position.y = sphereConfig.y;
        group.position.z = sphereConfig.z;
        let objectRadius = Math.log(sphereConfig.radius) * 100000000 / 5;
        sphere.scale.multiplyScalar(objectRadius)
        group.add(sphere);

        const label = new TextGeometry(sphereConfig.name, {
            size: 0.25,
            font: font,
            height: 0.25
        });

        let textDistance = 2;
        if (sphereConfig.isMoon) {
           textDistance = 5;
        }
        const textMesh = new THREE.Mesh(label, material);
        textMesh.scale.set( scale, scale, scale );
        textMesh.position.x = textDistance * objectRadius * (Math.random() * textDistance -  textDistance);
        textMesh.position.y = textDistance * objectRadius * (Math.random() * textDistance -  textDistance);
        texts.push(textMesh)
        group.add(textMesh);
        sphereConfig.group = group;

        const labelLine = [];
        labelLine.push(new THREE.Vector3(textMesh.position.x, textMesh.position.y, textMesh.position.z));
        labelLine.push(new THREE.Vector3(0, 0, 0 ));
        const lineMaterial = new THREE.LineBasicMaterial({color: sphereColor});
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(labelLine);
        const line = new THREE.Line( lineGeometry, lineMaterial);
        group.add(line);
        scene.add(group);
    })

    scene.add(new THREE.AmbientLight( 0x777777 ) );

    const light = new THREE.DirectionalLight( 0xffffff, 3 );
    const sun = spheres.sphereObj.sun
    light.position.set(sun.x, sun.y, sun.z);
    scene.add(light);
    scene.position.set(sun.x, sun.y, sun.z)
    camera.position.set(sun.x, sun.y, sun.z + config.AU)
    camera.lookAt(sun.x, sun.y, sun.z)
    controls.update();
    axesHelper = new THREE.AxesHelper(config.AU / 5);
    axesHelper.position.copy(controls.target);
    scene.add(axesHelper)
}

