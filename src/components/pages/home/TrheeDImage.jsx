/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import cristianoImage from '../../../images/Cristiano.png'; // Reemplaza con la ruta correcta de tu imagen

import * as THREE from 'three';

function ThreeDImage() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(5, 5); // Tamaño del plano
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(cristianoImage);

    const material = new THREE.MeshBasicMaterial({ map: texture }); // Usar la imagen como textura
    const plane = new THREE.Mesh(geometry, material);

    scene.add(plane);

    camera.position.z = 5;

    const animate = () => {
      // Eliminamos la rotación para mantener la imagen estática
      renderer.render(scene, camera);
    };

    animate();

  }, []);

  return <div />;
}

export default ThreeDImage;
