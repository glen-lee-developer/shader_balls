import * as THREE from "three";
import { createCamera } from "./camera";
import { addLights } from "./lights";
import { setupControls } from "./controls";
import { setupResize } from "./resize";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

function init(): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setClearColor(0x000000, 1);
  //  Setup
  addLights(scene);
  const camera = createCamera();
  setupControls(camera, renderer);
  const { width, height } = setupResize(camera, renderer);

  //  Obects
  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshNormalMaterial();
  function getBall(pos: any) {
    const size = 0.5;
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = pos.x;
    mesh.position.y = pos.y;
    mesh.scale.setScalar(size);
    function update() {
      mesh.rotation.x += Math.random() * 0.01;
      mesh.rotation.y += Math.random() * 0.02;
    }

    return { mesh, update };
  }
  const gridSIze = 5;
  const balls: any = [];
  const startpos = {
    x: -2,
    y: -2,
  };
  for (let x = 0; x < gridSIze; x++) {
    for (let y = 0; y < gridSIze; y++) {
      let pos = { x: startpos.x + x, y: startpos.y + y };
      let ball = getBall(pos);
      balls.push(ball);
      scene.add(ball.mesh);
    }
  }

  //  Animate
  function animateFrame(): void {
    requestAnimationFrame(animateFrame);
    balls.forEach((ball: any) => ball.update());
    renderer.render(scene, camera);
  }
  animateFrame();
}
init();
