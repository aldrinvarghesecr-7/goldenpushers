'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useCinematicStore } from '@/lib/store';

const SERVICES = [
  { id: '01', title: 'CINEMATIC ADVERTISING', desc: 'High-budget commercial storytelling.' },
  { id: '02', title: 'BRAND NARRATIVES', desc: 'Documentary-style ethos films.' },
  { id: '03', title: 'STUDIO PRODUCTIONS', desc: 'Full-scale VFX & set design.' },
  { id: '04', title: 'AERIAL & ACTION', desc: 'Precision high-speed cinematography.' },
];

const GOLD = '#D4AF77';

export default function FilmCarousel3D({ tier }: { tier: 'mobile' | 'tablet' | 'desktop' }) {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const setActiveCraftIndex = useCinematicStore((state) => state.setActiveCraftIndex);

  const canisterMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111',
    metalness: 0.9,
    roughness: 0.2,
  }), []);

  const goldDetailMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: GOLD,
    metalness: 1,
    roughness: 0.2,
    emissive: GOLD,
    emissiveIntensity: 0.2,
  }), []);

  const spacing = 4;

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // The Craft section occupies ~ page 2 to 3 (scroll ranges approx 0.3 to 0.5)
    // We get the local scroll just for this sequence by reading global scroll and mapping it.
    // Drei's useScroll().curve acts nicely if we track it globally.
    const scrollOffset = scroll.offset; 
    
    // Animate the X position to slide through the carousel
    // The carousel appears globally fixed in Z, but scrolls X.
    // However, the `ScrollControls` dolly might move the camera in Z. 
    // We'll anchor the carousel at a specific Z and let the camera pass, or keep it fixed relative to camera while active.
    
    const craftStart = 0.35;
    const craftEnd = 0.55;
    
    if (scrollOffset >= craftStart && scrollOffset <= craftEnd) {
      const localProgress = (scrollOffset - craftStart) / (craftEnd - craftStart);
      const targetX = THREE.MathUtils.lerp(spacing, -spacing * (SERVICES.length - 1), localProgress);
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.1);
      groupRef.current.visible = true;

      // Update active state for light sweeps
      const activeIndex = Math.round(localProgress * (SERVICES.length - 1));
      setActiveCraftIndex(activeIndex);

    } else {
      groupRef.current.visible = false;
    }
  });

  if (tier === 'mobile') {
    // 3D is heavily disabled/hidden for this section on mobile to favor the HTML stack
    return null;
  }

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      {SERVICES.map((srv, i) => (
        <group key={srv.id} position={[i * spacing, 0, 0]}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* The Canister */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
              <primitive object={canisterMat} attach="material" />
            </mesh>
            
            {/* Gold Lid Details */}
            <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.9, 1.1, 32]} />
              <primitive object={goldDetailMat} attach="material" />
            </mesh>
            <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.9, 1.1, 32]} />
              <primitive object={goldDetailMat} attach="material" />
            </mesh>
            
            {/* 3D Typography */}
            <Text position={[0, 1.2, 0]} fontSize={0.3} color={GOLD} anchorX="center">
              {srv.id}
            </Text>
            <Text position={[0, -1.2, 0]} fontSize={0.15} color="#ffffff" anchorX="center">
              {srv.title}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
}
