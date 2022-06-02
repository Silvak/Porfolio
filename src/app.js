import * as THREE from 'three';
import Stats from 'stats-js';
import "./style.css";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
//bloom
/*
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
*/

const objectSpacing = 6;
const params = {
  exposure: 1,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0
};

//draw fps graph in the DOM
let stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );


//-------------------------------------MAIN-----------------------------------
const scene = new THREE.Scene();
//scene.background = new THREE.Color('#18113b');//<<<<<<<<<<<<<<<<<<<<<<<<
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
cameraGroup.add(camera);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMappingExposure = Math.pow(params.exposure, 4.0);
//renderer.setClearColor(0x000000);

//-----------------------------------boom light-----------------------------------------
// LIGHT
scene.add(new THREE.AmbientLight('#080D19', 1));//#fc4c39 #8787ff
const light = new THREE.PointLight('#FF4343', .78);
light.position.set(20, 20, 20);
scene.add(light);

/*
//bloom
const renderScene = new RenderPass( scene, camera );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

let composer = new EffectComposer( renderer );
//composer.renderToScreen = false;
composer.addPass( renderScene );
composer.addPass( bloomPass );
*/

//-------------------------------------scene-----------------------------------
//OBJ Sphere 
const groupPlanet = new THREE.Object3D();

const plannet = new THREE.Mesh(
  new THREE.IcosahedronBufferGeometry(1.2, 10), //2,60  o 1.6, 40
  new THREE.MeshStandardMaterial({color:'#ffffff', wireframe: false})
);
const sphere = new THREE.Mesh(
  new THREE.IcosahedronBufferGeometry(1.8, 1), //2,60  o 1.6, 40
  new THREE.MeshStandardMaterial({color:'#83f381', wireframe: true})
);

const sateliteOrbit = new THREE.Object3D();
const satelite = new THREE.Mesh(
  new THREE.IcosahedronBufferGeometry(0.08, 2), //2,60  o 1.6, 40
  new THREE.MeshStandardMaterial({color:'#03DAC6', wireframe:false})
);
satelite.position.set(0,0,2);
sateliteOrbit.add(satelite);

groupPlanet.position.x = 1.8;
groupPlanet.add(sphere);
groupPlanet.add(plannet);
groupPlanet.add(sateliteOrbit);
scene.add(groupPlanet);

//obj mesh Octaedro
const octa = new THREE.Mesh(
  new THREE.OctahedronGeometry(1.2),
  new THREE.MeshStandardMaterial({color:"#fff"})
)
scene.add(octa);
octa.position.x = 1.8;

//obj mesh Octaedro copia
const copia = new THREE.Mesh(
  new THREE.OctahedronGeometry(1.2),
  new THREE.MeshStandardMaterial({color:"#fff"})
)
scene.add(copia);
copia.position.y = - objectSpacing * 6;
copia.position.x = - 2;


//group constellation obj
const constelation = new THREE.Object3D()


//load OBJ model
const modelURL = new URL('./models/face.obj', import.meta.url);
let ObjFace;

const loader = new  OBJLoader();
loader.load(
	// resource URL
	`${modelURL}`,
	// called when the resource is loaded
	function ( obj ) {
    ObjFace = obj;
    ObjFace.position.y= - objectSpacing * 1;
    ObjFace.position.x = -2.2;
    ObjFace.position.z = 0;
    ObjFace.rotation.y = 0.50;
    ObjFace.scale.set(0.024,0.024,0.024);
    //ObjFace.scale.set(0.6,0.6,0.6);
    ObjFace.traverse(function(child) {

      if (child.isMesh) {
        //child.material.side = false;
        child.material.wireframe = true;
        //child.material.color = "#ff2"
        //console.log(child);
      }
  })

		scene.add(ObjFace);
    //console.log("modelo cargado!")
	},
	// called while loading is progressing
	function ( xhr ) {
		//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log(error);
	}
);


//------------------------------------events----------------------------------
//event scroll
let scrollY = window.scrollY;
window.addEventListener('scroll', () =>
{
    //set scroll y position
    scrollY = window.scrollY
})

//event mouse - parallax effect
const cursor = {}
cursor.x = 0
cursor.y = 0
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / window.innerWidth - 0.5
    cursor.y = event.clientY / window.innerHeight - 0.5
})

//rezise canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}, { passive: true });

//Raycast
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
window.addEventListener( 'pointermove', ( event ) => {
	// calculate pointer position in normalized device coordinates
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});


//-------------------------------------render-----------------------------------
//render escene
const clock = new THREE.Clock()
let  previousTime = 0;

const render = () => {
  stats.begin();
    //set delta time
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    /*
    //RAYCASTER obj
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children );
    for ( let i = 0; i < intersects.length; i ++ ) {
      //if(intersects.length == 1  & vaporSphereMat.uniforms.uNoiseScaleVert.value < 0.8){
      //  console.log(intersects[0].object)
      //  vaporSphereMat.uniforms.uNoiseScaleVert.value += 0.02; 
      //}
      console.log("sphera hover clic")
    }
    */

    //animated
    sateliteOrbit.rotation.y += 0.02;
    groupPlanet.rotation.z += 0.01;
    groupPlanet.rotation.x += 0.01;
    groupPlanet.position.y = - objectSpacing * 0.03 +  Math.cos( elapsedTime ) * 0.14;
    octa.position.y = - objectSpacing * 2 +  Math.cos( elapsedTime ) * 0.14;
    //objs.rotation.x = 2;
    //scroll camera
    camera.position.y = - scrollY / window.innerHeight * objectSpacing
    // Animate parallax camera
    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime


    //render bloom past 
    //composer.render();

    //render
    renderer.render(scene, camera);
    window.requestAnimationFrame(render)
  stats.end();
}

render()
