import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//import Pat03 from '../assets/Kennon_DoorPattern-03-215x300.jpg';
import Pat03 from '../assets/Kennon_DoorPattern-03-215x300.jpg';

//Define model URLs
const Door2225URL = new URL('../assets/Door22-25.obj', import.meta.url);
const Bind2225URL = new URL('../assets/Bind22-25.obj', import.meta.url);
const DoorE2225URL = new URL('../assets/DoorE22-25.obj', import.meta.url);
const BindE2225URL = new URL('../assets/BindE22-25.obj', import.meta.url);
const Door2528URL = new URL('../assets/Door25-28.obj', import.meta.url);
const Bind2528URL = new URL('../assets/Bind25-28.obj', import.meta.url);
const DoorE2528URL = new URL('../assets/DoorE25-28.obj', import.meta.url);
const BindE2528URL = new URL('../assets/BindE25-28.obj', import.meta.url);
const Door2831URL = new URL('../assets/Door28-31.obj', import.meta.url);
const Bind2831URL = new URL('../assets/Bind28-31.obj', import.meta.url);
const DoorE2831URL = new URL('../assets/DoorE28-31.obj', import.meta.url);
const BindE2831URL = new URL('../assets/BindE28-31.obj', import.meta.url);
const Door3134URL = new URL('../assets/Door31-34.obj', import.meta.url);
const Bind3134URL = new URL('../assets/Bind31-34.obj', import.meta.url);
const DoorE3134URL = new URL('../assets/DoorE31-34.obj', import.meta.url);
const BindE3134URL = new URL('../assets/BindE31-34.obj', import.meta.url);

const widths = [0.7,0.9,1.1,1.2]

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

const geometry = new THREE.BoxGeometry( 2, doorHeight+2, 1 );
let params1 = {
	color: "#e0e0e0", 
	roughness: 0.5,
	metalness: 0.1,
	};
const material1 = new THREE.MeshStandardMaterial( params1 );
const strut1 = new THREE.Mesh( geometry, material1 );
scene.add( strut1 );
strut1.position.x = -doorWidth/2 - 1
strut1.position.y = 1
strut1.castShadow = true;
strut1.receiveShadow = true;
	
const strut2 = new THREE.Mesh( geometry, material1 );
scene.add( strut2 );
strut2.position.x = doorWidth/2 + 1
strut2.position.y = 1
strut2.receiveShadow = true;
strut2.castShadow = true;
			
const geometry2 = new THREE.BoxGeometry( doorWidth + 2*2, 2, 1 );
const rail = new THREE.Mesh( geometry2, material1 );
scene.add( rail );
rail.position.y = doorHeight/2 + 2;
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
floor.position.z -= 30
floor.receiveShadow = true;
floor.castShadow = true;

var doorMat = new THREE.MeshStandardMaterial({roughness: 0.5})
var doorBindMat = new THREE.MeshStandardMaterial({color: "#000000"})
const TexPat03 = textureloader.load(Pat03);

TexPat03.wrapS = THREE.RepeatWrapping;
TexPat03.wrapT = THREE.RepeatWrapping;
TexPat03.offset.set(-0.2,-0.2)
TexPat03.rotation = Math.PI/2
TexPat03.repeat.set( widths[3]	, 2 );

doorMat.map = TexPat03;

var DoorURL = Door3134URL;

let Door;
let DoorMirror;
objloader.load(DoorURL.href, function(obj){
	Door = obj;
	scene.add(Door);
	Door.rotation.x += Math.PI/2;
	Door.position.set(-doorWidth/2 - 1.8,-28,0.85)
	Door.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
		  	child.material = doorMat
			
			child.castShadow = true;
		}
	  });
	  if (Bind){
		renderer.render(scene, camera);	
	  }
}, undefined, function (error) {
	console.error(error)
});

var SingleSaloon = "standard"
var CurrentSize = 3
var Extended = false

var BindURL = Bind3134URL;

let Bind;
let BindMirror;
objloader.load(BindURL.href, function(obj){
	Bind = obj;
	scene.add(Bind);
	Bind.rotation.x += Math.PI/2;
	Bind.position.set(-doorWidth/2 - 1.8,-28,0.85)
	Bind.scale.set(1,1.01,1)
	Bind.traverse(function (child) {
		if (child instanceof THREE.Mesh) {
		  	child.material = doorBindMat
			child.castShadow = true;
		}
	  });
	if (Door){
	  renderer.render(scene, camera);	
	}
},  undefined, function (error) {
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
	renderer.render(scene, camera);
})

const URLFinder = function (){
	if (doorWidth <= 25){
		if (document.getElementById("extended").checked){
			return [DoorE2225URL, BindE2225URL, "standard", 0]
		} else{
			return [Door2225URL, Bind2225URL, "standard", 0]
		}
	} else if (doorWidth <= 28){
		if (document.getElementById("extended").checked){
			return [DoorE2528URL, BindE2528URL, "standard", 1]
		} else{
			return [Door2528URL, Bind2528URL, "standard", 1]
		}
	} else if (doorWidth <= 31){
		if (document.getElementById("extended").checked){
			return [DoorE2831URL, BindE2831URL, "standard", 2]
		} else{
			return [Door2831URL, Bind2831URL, "standard", 2]
		}
	} else if (doorWidth <= 34){
		if (document.getElementById("extended").checked){
			return [DoorE3134URL, BindE3134URL, "standard", 3]
		} else{
			return [Door3134URL, Bind3134URL, "standard", 3]
		}
	} else if (doorWidth <= 54){
		if (document.getElementById("extended").checked){
			return [DoorE2225URL, BindE2225URL, "saloon", 0]
		} else{
			return [Door2225URL, Bind2225URL, "saloon", 0]
		}
	} else if (doorWidth <= 60){
		if (document.getElementById("extended").checked){
			return [DoorE2528URL, BindE2528URL, "saloon", 1]
		} else{
			return [Door2528URL, Bind2528URL, "saloon", 1]
		}
	} else if (doorWidth <= 66){
		if (document.getElementById("extended").checked){
			return [DoorE2831URL, BindE2831URL, "saloon", 2]
		} else{
			return [Door2831URL, Bind2831URL, "saloon", 2]
		}
	} else{
		if (document.getElementById("extended").checked){
			return [DoorE3134URL, BindE3134URL, "saloon", 3]
		} else{
			return [Door3134URL, Bind3134URL, "saloon", 3]
		}
	}
}

const Update = function () {
   	doorWidth = parseFloat(document.getElementById("doorWidth").value);
   	doorHeight = parseFloat(document.getElementById("doorHeight").value);
	if (document.getElementById("inmm").value == "mm"){
		doorWidth = Math.round(doorWidth/25.4*100)/100;
		doorHeight = Math.round(doorHeight/25.4*100)/100;
	}
   	strut1.scale.y = doorHeight/80;
	strut2.scale.y = doorHeight/80;
	rail.scale.x = (doorWidth+4)/(38);
	strut1.position.x += -(doorWidth - CurrentdoorWidth)/2;
	Door.position.x += -(doorWidth - CurrentdoorWidth)/2;
	Bind.position.x += -(doorWidth - CurrentdoorWidth)/2;
	if (DoorMirror){
		DoorMirror.position.x += (doorWidth - CurrentdoorWidth)/2;
		BindMirror.position.x += (doorWidth - CurrentdoorWidth)/2;
	}
	strut2.position.x += (doorWidth - CurrentdoorWidth)/2;
	strut1.position.y += (doorHeight - CurrentdoorHeight)/2;
	strut2.position.y += (doorHeight - CurrentdoorHeight)/2;
	rail.position.y += (doorHeight - CurrentdoorHeight);
	Door.position.y += (doorHeight - CurrentdoorHeight)/2;
	Bind.position.y += (doorHeight - CurrentdoorHeight)/2;
	if (DoorMirror){
		DoorMirror.position.y += (doorHeight - CurrentdoorHeight)/2;
		BindMirror.position.y += (doorHeight - CurrentdoorHeight)/2;
	}
	wall1.position.x += -(doorWidth - CurrentdoorWidth)/2;
	wall2.position.x += (doorWidth - CurrentdoorWidth)/2;
	wall3.position.y += (doorHeight - CurrentdoorHeight);
			
	CurrentdoorHeight = doorHeight;
   	CurrentdoorWidth = doorWidth;
	
	console.log(URLFinder()[3])
	if (CurrentSize != URLFinder()[3] || SingleSaloon != URLFinder()[2] || Extended != document.getElementById("extended").checked){
		scene.remove(Door);
		scene.remove(DoorMirror);
		scene.remove(Bind);
		scene.remove(BindMirror);
		TexPat03.repeat.set( widths[URLFinder()[3]]	, 2 );

		objloader.load(URLFinder()[0].href, function(obj){
			Door = obj;
			scene.add(Door);
			Door.rotation.x += Math.PI/2;
			Door.position.set(-doorWidth/2 - 1.8,-28 + (doorHeight-80)/2,0.85)
			Door.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					  child.material = doorMat
					
					child.castShadow = true;
				}
			  });
			  if (Bind && DoorMirror && BindMirror){
				renderer.render(scene, camera);	
			  }
		}, undefined, function (error) {
			console.error(error)
		});

		objloader.load(URLFinder()[1].href, function(obj){
			Bind = obj;
			scene.add(Bind);
			Bind.rotation.x += Math.PI/2;
			Bind.position.set(-doorWidth/2 - 1.8,-28 + (doorHeight-80)/2,0.85)
			Bind.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					  child.material = doorBindMat
					child.castShadow = true;
				}
			  });
			if (Door && DoorMirror && BindMirror){
			  renderer.render(scene, camera);	
			}
		},  undefined, function (error) {
			console.error(error)
		});		
		if (URLFinder()[2] == "saloon"){
			objloader.load(URLFinder()[0].href, function(obj){
				DoorMirror = obj;
				scene.add(DoorMirror);
				DoorMirror.rotation.x += Math.PI/2;
				DoorMirror.rotation.z += Math.PI;
				DoorMirror.position.set(doorWidth/2 + 1.8,-28 + (doorHeight-80)/2,0.85)
				DoorMirror.traverse(function (child) {
					if (child instanceof THREE.Mesh) {
						  child.material = doorMat
						
						child.castShadow = true;
					}
				  });
				  if (Bind && DoorMirror && Door){
					renderer.render(scene, camera);	
				  }
			}, undefined, function (error) {
				console.error(error)
			});
	
			objloader.load(URLFinder()[1].href, function(obj){
				BindMirror = obj;
				scene.add(BindMirror);
				BindMirror.rotation.x += Math.PI/2;
				BindMirror.rotation.z += Math.PI;
				BindMirror.position.set(doorWidth/2 + 1.8,-28 + (doorHeight-80)/2,0.85)
				BindMirror.traverse(function (child) {
					if (child instanceof THREE.Mesh) {
						  child.material = doorBindMat
						child.castShadow = true;
					}
				  });
				if (Bind && Door && BindMirror){
				  renderer.render(scene, camera);	
				}
			},  undefined, function (error) {
				console.error(error)
			});	
		}
		Extended = document.getElementById("extended").checked
		CurrentSize = URLFinder()[3]
		SingleSaloon = URLFinder()[2]
	} else{
		renderer.render(scene, camera);
	}

};

const intomm = function() {
	if (document.getElementById("inmm").value == "mm"){
		document.getElementById("doorWidth").value = Math.ceil(CurrentdoorWidth*25.4);
		document.getElementById("doorHeight").value = Math.ceil(CurrentdoorHeight*25.4);
	} else {
		document.getElementById("doorWidth").value = CurrentdoorWidth;
		document.getElementById("doorHeight").value = CurrentdoorHeight;
	}
	Update
}
	
//document.getElementById("updateDoor").addEventListener("click", Update);
document.getElementById("doorWidth").addEventListener("change", Update);
document.getElementById("doorHeight").addEventListener("change", Update);
document.getElementById("extended").addEventListener("change", Update);
document.getElementById("inmm").addEventListener("change", intomm);

const animate = function () {
   	requestAnimationFrame(animate);
   	renderer.render(scene, camera);
};
		
animate();