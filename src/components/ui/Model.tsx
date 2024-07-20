import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader, AnimationMixer, MeshStandardMaterial, MeshPhysicalMaterial } from 'three';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const Model = (props) => {
  const gltf = useLoader(GLTFLoader, '/models/scene.gltf'); 
  const texture1 = useLoader(TextureLoader, '/models/textures/texture1.png'); 
  const texture2 = useLoader(TextureLoader, '/models/textures/texture2.png'); 

  const mixer = useRef();
  const modelRef = useRef();

  useEffect(() => {
    if (gltf.animations.length > 0) {
      mixer.current = new AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
      });
    }
  }, [gltf]);

  useEffect(() => {
    // Define materials using provided material data
    const material1 = new MeshStandardMaterial({
      map: texture1,
      color: new THREE.Color(3355184),
      roughness: 0,
      metalness: 0.5796635712843354,
      emissive: new THREE.Color(0),
      envMapIntensity: 1,
      side: THREE.DoubleSide
    });
    
    const material2 = new MeshPhysicalMaterial({
      map: texture2,
      color: new THREE.Color(15968122),
      roughness: 0.3858028965280244,
      metalness: 1,
      emissive: new THREE.Color(0),
      specularIntensity: 1,
      specularColor: new THREE.Color(16777215),
      envMapIntensity: 1,
      side: THREE.DoubleSide
    });
    
    const material3 = new MeshPhysicalMaterial({
      color: new THREE.Color(15160832),
      roughness: 1,
      metalness: 0,
      emissive: new THREE.Color(16711682),
      emissiveIntensity: 10,
      specularColor: new THREE.Color(16777215),
      envMapIntensity: 1,
      side: THREE.DoubleSide
    });

    // Traverse the scene graph and assign materials
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.name.includes('box_out')) {
          child.material = material1;
        } else if (child.name.includes('inner')) {
          child.material = material2;
        } else if (child.name.includes('inner.001')) {
          child.material = material3;
        }
      }
    });
  }, [gltf, texture1, texture2]);

  // Add spinning effect with random speed and direction
  const speedX = Math.random() * 0.01 - 0.008;
  const speedY = Math.random() * 0.01 - 0.008;

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.x += speedX;
      modelRef.current.rotation.y += speedY;
    }
    if (mixer.current) mixer.current.update(delta);
  });

  // Add entrance animation
  const { scale } = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [2, 2, 2] },
    config: { duration: 1000 },
  });

  return (
    <animated.group ref={modelRef} scale={scale} {...props}>
      <primitive object={gltf.scene} />
    </animated.group>
  );
};

export default Model;
