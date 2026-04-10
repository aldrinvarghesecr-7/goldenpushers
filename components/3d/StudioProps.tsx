'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StudioProps({ progress }: { progress: number }) {
  const clapperRef = useRef<THREE.Group>(null);
  const micRef = useRef<THREE.Group>(null);
  
  const ethosStage = Math.max(0, Math.min(1, (progress - 0.15) / 0.2));

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Clapperboard animation
    if (clapperRef.current) {
        clapperRef.current.position.y = THREE.MathUtils.lerp(-10, 0, ethosStage);
        clapperRef.current.position.x = Math.sin(t * 0.5) * 0.5 + 4;
        
        // Snapping effect
        const top = clapperRef.current.children[1] as THREE.Group;
        if (top) {
            top.rotation.z = Math.sin(t * 5) > 0.8 ? -0.3 : 0;
        }
    }

    // Boom mic animation
    if (micRef.current) {
        micRef.current.position.y = THREE.MathUtils.lerp(10, 4, ethosStage);
        micRef.current.rotation.z = Math.sin(t) * 0.1;
    }
  });

  return (
    <group>
      {/* Clapperboard */}
      <group ref={clapperRef} position={[4, -10, -2]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 1, 0.1]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        <group position={[-0.75, 0.5, 0]}>
          <mesh position={[0.75, 0.1, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.12]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        </group>
      </group>

      {/* Boom Mic */}
      <group ref={micRef} position={[0, 10, -3]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 10]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[5, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.5]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
      </group>
    </group>
  );
}
