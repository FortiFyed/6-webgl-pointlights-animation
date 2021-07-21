import '../css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from './GLTFLoader.js';

/**
 * Variables
 */
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Canvas
const canvas = document.querySelector('canvas#model')

// Scene
const scene = new THREE.Scene()
scene.add(new THREE.AmbientLight(0x000828));

/**
 * Objects
 */
const loader =  new THREE.GLTFLoader()
loader.load('./models/scene.glb', function(glb){
    const model = glb.scene
    model.scale.set(1, 1, 1)
    model.position.set(0, -5, -20)
    scene.add(model)

    console.log('loaded glb:', glb)
    animate()
}, function(xhr){
    console.log('progress xhr:',xhr)
}, function(error){
    console.log("error:",error)
});

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xfc0067, .1)
ambientLight.position.set(0,0,0)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xfc0067, .1)
directionalLight.position.set(0,0,0)
scene.add(directionalLight)

// PointLight 1
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// PointLight 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
// const pointLight2 = new THREE.PointLight(0xfc0067, 2)
pointLight2.position.set(-1.86, 1, -1.65)
pointLight2.intensity = 10
scene.add(pointLight2)

// PointLight 3
const pointLight3 = new THREE.PointLight(0xf0ff, 2)
// const pointLight3 = new THREE.PointLight(0x8500fc, 2)
pointLight3.position.set(5.83, -2.51, -3)
pointLight3.intensity = 10
scene.add(pointLight3)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 1, 1000);
camera.position.set(0, 10, 40);
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);

/**
 * Animate
 */
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
    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}
animate()

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
    renderer.setPixelRatio(window.devicePixelRatio)
})