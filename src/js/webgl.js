import '../css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { LinearToneMapping } from 'three'

/**
 * Variables
 */
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// Maps
// other maps: 'RoundedMap', 'RoundedMap', 
const maps = ['DropsMap']

// Canvas
const canvas = document.querySelector('canvas#webgl')

// Debug
// const gui = new dat.GUI()

// Scene
const scene = new THREE.Scene()
scene.add(new THREE.AmbientLight(0x000828));

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(40, 30, 30);
const material = new THREE.MeshPhongMaterial({
    color: 0xa0adaf,
    shininess: 10,
    specular: 0x111111,
    side: THREE.BackSide,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.scale.set(1.3, 1.3, 1.3)
mesh.position.y = 10;
mesh.receiveShadow = true;
scene.add(mesh);

/**
 * Lights
 */
var lightBalls = [], shadowLights = [], ballsMaterial = []
const createLight = color => {
    const intensity = 1.5;

    const light = new THREE.PointLight(color, intensity, 20);
    light.castShadow = true;
    light.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects
    shadowLights.push(light)

    let geometry = new THREE.SphereGeometry(0.3, 12, 6);
    let material = new THREE.MeshBasicMaterial({color: color});
    material.color.multiplyScalar(intensity);
    ballsMaterial.push(material)
    let sphere = new THREE.Mesh(geometry, material);
    light.add(sphere);

    const texture = new THREE.TextureLoader().load(
        `./${maps[Math.floor(Math.random() * maps.length)]}.png`
    )
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(1, 4.5);

    geometry = new THREE.SphereGeometry(2, 32, 8);
    material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        alphaMap: texture,
        alphaTest: 0.5
    });

    sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    light.add(sphere);

    // custom distance material
    const distanceMaterial = new THREE.MeshDistanceMaterial({
        alphaMap: material.alphaMap,
        alphaTest: material.alphaTest
    });
    sphere.customDistanceMaterial = distanceMaterial;

    lightBalls.push(light)
    return light;
}
// 0x0088ff, 0xff8888
const pointLight = createLight(0x03ddf1); // blue
scene.add(pointLight);
const pointLight2 = createLight(0x9529ad); // purple
scene.add(pointLight2);
const pointLight3 = createLight(0xffffff); // white
scene.add(pointLight3);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000);
camera.position.set(0, 10, 40);
scene.add(camera)

/**
 * Controls
 */
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);

/**
 * Animate
 */
let rmapped = 1
const animateColors = () => {
    const colors = [0xAB52DB, 0xffffff, 0x03ddf1, 0xf10303]
    var h = rmapped * 0.01 % 1;
    var s = 0.5;
    var l = 0.5;
    for(let i=0; i < ballsMaterial.length; i++){
        const color = colors[Math.floor(Math.random() * 4)]
        ballsMaterial[i].color.set(color)
        // ballsMaterial[i].color.setHSL(h, s, l)
        shadowLights[i].color.set(color)
        // shadowLights[i].color.setHSL(h, s, l)
        lightBalls[i].color.set(color)
        // lightBalls[i].color.setHSL(h, s, l)
        
        rmapped++;
    }
}

const lightAnimation = () => {
    let time = performance.now() * 0.001;

    pointLight.position.x = Math.sin(time * 0.6) * 15;
    pointLight.position.y = Math.sin(time * 0.7) * 9 + 6;
    pointLight.position.z = Math.sin(time * 0.8) * 9;

    pointLight.rotation.x = time;
    pointLight.rotation.z = time;

    time += 10000;
    
    pointLight2.position.x = Math.sin(time * 0.6) * 15;
    pointLight2.position.y = Math.sin(time * 0.7) * 9 + 6;
    pointLight2.position.z = Math.sin(time * 0.8) * 9;
    
    pointLight2.rotation.x = time;
    pointLight2.rotation.z = time;
    
    time += 10000;
    
    pointLight3.position.x = Math.cos(time * 0.6) * 15;
    pointLight3.position.y = Math.cos(time * 0.7) * 9 + 6;
    pointLight3.position.z = Math.cos(time * 0.8) * 9;

    pointLight3.rotation.x = time;
    pointLight3.rotation.z = time;

    // Blink animation
    // const timeout = setTimeout(() => {
        // animateColors()
    // }, 2000);

}

const animate = () => {
    // Animate objects
    lightAnimation()

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate()

/**
 * Mouse move animation
 */
let mouseX = 0, mouseY = 0
document.addEventListener('mousemove', event => {
    mouseX = event.clientX
    mouseY = event.clientY
    
    camera.position.x = -mouseX * 0.005
    camera.position.y = mouseY * 0.005
})

/**
 * Scroll animation
 */
document.addEventListener('scroll', event => {
    
})

/**
 * Window resize
 */
window.addEventListener('resize', () => {
// Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})