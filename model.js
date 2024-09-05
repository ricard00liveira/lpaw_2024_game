import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const container = document.getElementById("modelContainer");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70, // Campo de visão
  container.clientWidth / container.clientHeight, // Aspect ratio
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(container.clientWidth, container.clientHeight); // Ajustar tamanho do renderer
container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const diffuseTexture = textureLoader.load("/2k_earth_daymap.jpg");

let earth;

const objLoader = new OBJLoader();
objLoader.load(
  "/earth1.obj",
  function (object) {
    object.traverse(function (child) {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          map: diffuseTexture,
        });
      }
    });

    object.position.set(0, -6, 8); // centraliza
    object.scale.set(1, 1, 1); // escala

    earth = object;
    scene.add(earth);
    console.log("Modelo carregado:", earth);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% carregado");
  },
  function (error) {
    console.error("Erro ao carregar o .obj", error);
  }
);

// Posição da câmera
camera.position.set(0, 0, 20);

// animação
function animate() {
  requestAnimationFrame(animate);
  if (earth) {
    earth.rotation.y += 0.001;
  }

  renderer.render(scene, camera);
}
animate();
