import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//import Pat03 from '../assets/Kennon_DoorPattern-03-215x300.jpg';
import Pat03 from '../assets/Kennon_DoorPattern-03-215x300.jpg';
const DoorSmallURL = new URL('../assets/DoorSmall.obj', import.meta.url);
const DoorSmallBindURL = new URL('../assets/DoorSmallBind.obj', import.meta.url);

const box = new THREE.Box3();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

var doorWidth = parseFloat(document.getElementById("doorWidth").value);
var doorHeight = parseFloat(document.getElementById("doorHeight").value);
	
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
			
const objloader = new OBJLoader();
const textureloader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry( 3.5, doorHeight + 3.5/2, 1 );
let params1 = {
	color: "#e0e0e0", 
	roughness: 0.5,
	metalness: 0.1,
	};
const material1 = new THREE.MeshStandardMaterial( params1 );
const strut1 = new THREE.Mesh( geometry, material1 );
scene.add( strut1 );
strut1.position.x = -doorWidth/2 - 3.5/2
strut1.castShadow = true;
strut1.receiveShadow = true;
	
const strut2 = new THREE.Mesh( geometry, material1 );
scene.add( strut2 );
strut2.position.x = doorWidth/2 + 3.5/2
strut2.receiveShadow = true;
strut2.castShadow = true;
			
const geometry2 = new THREE.BoxGeometry( doorWidth + 3.5*2, 3.5, 1 );
const rail = new THREE.Mesh( geometry2, material1 );
scene.add( rail );
rail.position.y = doorHeight/2 + 3.5/2;
rail.receiveShadow = true;
rail.castShadow = true;
			
const wallgeo = new THREE.BoxGeometry( 300, 300, 1 );
let wallparams = {
	color: "#ffffff", 
	roughness: 1.0,
	metalness: 0.0,
	};
const wallmat = new THREE.MeshStandardMaterial( wallparams );
const wall1 = new THREE.Mesh( wallgeo, wallmat );
scene.add( wall1 );
wall1.position.x += -150 - doorWidth/2
wall1.position.z += -1
wall1.receiveShadow = true;
wall1.castShadow = true;
						
const wall2 = new THREE.Mesh( wallgeo, wallmat );
scene.add( wall2 );
wall2.position.x += 150 + doorWidth/2
wall2.position.z += -1
wall2.receiveShadow = true;
wall2.castShadow = true;
			
const wall3 = new THREE.Mesh( wallgeo, wallmat );
scene.add( wall3 );
wall3.position.y += 150 + doorHeight/2 + 1
wall3.position.z += -1
wall3.receiveShadow = true;
wall3.castShadow = true;
		
const wall4 = new THREE.Mesh( wallgeo, wallmat );
scene.add( wall4 );
wall4.position.z += -180
wall4.receiveShadow = true;
wall4.castShadow = true;
	
let floorparams = {
	color: "#f0f0f0", 
	roughness: 0.2,
	metalness: 0.0,
	};
const floormat = new THREE.MeshStandardMaterial( floorparams );			
const floorgeo = new THREE.BoxGeometry( 300, 1, 300 );
const floor = new THREE.Mesh( floorgeo, floormat );
scene.add( floor );
floor.position.y += -doorHeight/2
floor.receiveShadow = true;
floor.castShadow = true;

var doorMat = new THREE.MeshStandardMaterial({roughness: 0.5})
var doorBindMat = new THREE.MeshStandardMaterial({color: "#000000"})
const TexPat03 = textureloader.load(Pat03);

TexPat03.wrapS = THREE.RepeatWrapping;
TexPat03.wrapT = THREE.RepeatWrapping;
TexPat03.rotation = -Math.PI/2
TexPat03.repeat.set( 0.75	, 2 );

doorMat.map = TexPat03;

let DoorSmall;
objloader.load(DoorSmallURL.href, function(obj){
	DoorSmall = obj;
	scene.add(DoorSmall);
	DoorSmall.rotation.x += -Math.PI/2;
	DoorSmall.position.set(-doorWidth/2 - 3.5,30,0.6)
	DoorSmall.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
		  	child.material = doorMat
			
			child.castShadow = true;
		}
	  });
}, undefined, function (error) {
	console.error(error)
});

let DoorSmallBind;
objloader.load(DoorSmallBindURL.href, function(obj){
	DoorSmallBind = obj;
	scene.add(DoorSmallBind);
	DoorSmallBind.rotation.x += -Math.PI/2;
	DoorSmallBind.position.set(-doorWidth/2 - 3.5,30,1)
	DoorSmallBind.scale.set(1,1.01,1)
	DoorSmallBind.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
		  	child.material = doorBindMat
			child.castShadow = true;
		}
	  });
}, undefined, function (error) {
	console.error(error)
});

camera.position.z = 200;
const orbit = new OrbitControls(camera, renderer.domElement)

const light = new THREE.PointLight(0xffffff, 1, 800);
light.position.set(75, 60, 200);
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 2048; // default
light.shadow.mapSize.height = 2048; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
		
const amblight = new THREE.AmbientLight( 0xFFF6ED, 0.5 ); // soft white light
scene.add( amblight );
		
//const directionalLight = new THREE.DirectionalLight( 0xe3dcc8, 0.8);
//scene.add( directionalLight );
//directionalLight.position.x +=1
//directionalLight.position.z +=1	
//directionalLight.castShadow = true;
		
var CurrentdoorWidth = doorWidth
var CurrentdoorHeight = doorHeight
		
		
		
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize( window.innerWidth, window.innerHeight );
})
		
const Update = function () {
   	doorWidth = parseFloat(document.getElementById("doorWidth").value);
   	doorHeight = parseFloat(document.getElementById("doorHeight").value);
   	strut1.scale.y = doorHeight/80;
	strut2.scale.y = doorHeight/80;
	rail.scale.x = (doorWidth+3.5*2)/(36+3.5*2);
	strut1.position.x += -(doorWidth - CurrentdoorWidth)/2;
	DoorSmall.position.x += -(doorWidth - CurrentdoorWidth)/2;
	DoorSmallBind.position.x += -(doorWidth - CurrentdoorWidth)/2;
	strut2.position.x += (doorWidth - CurrentdoorWidth)/2;
	strut1.position.y += (doorHeight - CurrentdoorHeight)/2;
	strut2.position.y += (doorHeight - CurrentdoorHeight)/2;
	rail.position.y += (doorHeight - CurrentdoorHeight);
	DoorSmall.position.y += (doorHeight - CurrentdoorHeight)/2;
	DoorSmallBind.position.y += (doorHeight - CurrentdoorHeight)/2;
	wall1.position.x += -(doorWidth - CurrentdoorWidth)/2;
	wall2.position.x += (doorWidth - CurrentdoorWidth)/2;
	wall3.position.y += (doorHeight - CurrentdoorHeight);
			
	CurrentdoorHeight = doorHeight;
   	CurrentdoorWidth = doorWidth;
};
		
document.getElementById("updateDoor").addEventListener("click", Update);

const animate = function () {
	if (DoorSmallBind){
		
	}
   	requestAnimationFrame(animate);
   	renderer.render(scene, camera);
};
		
animate();