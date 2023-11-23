import * as THREE from "three";

export function setupResize(
  camera: THREE.OrthographicCamera | THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
): { width: number; height: number } {
  function resize(): { width: number; height: number } {
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = width / height;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    return { width, height };
  }

  window.addEventListener("resize", resize);
  return resize();
}
