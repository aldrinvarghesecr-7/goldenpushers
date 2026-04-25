'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef1.current) {
      meshRef1.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef1.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = -state.clock.elapsedTime * 0.05;
      meshRef2.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef1} position={[3, 1, -2]} scale={1.5}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#D4AF77"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef2} position={[-4, -1, -5]} scale={2}>
          <icosahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#111111"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.2}
            metalness={0.8}
            roughness={0.3}
            distort={0.4}
            speed={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#D4AF77" />
    </>
  );
}

export default function Floating3DScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
