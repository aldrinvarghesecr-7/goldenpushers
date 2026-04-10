'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  { id: 1, title: 'TEMPLE SCALE', category: 'HERITAGE FILM', image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, title: 'INTIMATE FRAME', category: 'MODERN ROMANCE', image: 'https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, title: 'TROPICAL CUTS', category: 'COMMERCIAL AD', image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, title: 'BTS TECHNICAL', category: 'STUDIO GEAR', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop' },
];

export default function ProjectFrames({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const activeStage = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));

  useFrame(() => {
    if (!groupRef.current) return;
    const scrollX = THREE.MathUtils.lerp(10, -20, activeStage);
    groupRef.current.position.x = scrollX;
    groupRef.current.visible = activeStage > 0 && activeStage < 1;
  });

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {projects.map((project, i) => (
        <group key={i} position={[i * 12, 0, 0]}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Cinematic Frame */}
            <mesh position={[0, 0, -0.1]}>
              <boxGeometry args={[8.5, 4.8, 0.1]} />
              <meshStandardMaterial color="#000" metalness={1} roughness={0} />
            </mesh>
            
            <Image 
              url={project.image} 
              scale={[8, 4.5]} 
              transparent 
              opacity={0.9}
            />

            {/* Gold Border */}
            <mesh position={[0, 0, 0.05]}>
              <boxGeometry args={[8.2, 4.7, 0.02]} />
              <meshStandardMaterial color="#D4AF77" wireframe />
            </mesh>

            <Text
              position={[-3.8, -2.8, 0.1]}
              fontSize={0.3}
              color="#D4AF77"
              font="/fonts/Inter-Bold.ttf"
              anchorX="left"
            >
              {project.category}
            </Text>
            <Text
              position={[-3.8, -3.5, 0.1]}
              fontSize={0.8}
              color="white"
              font="/fonts/Inter-Bold.ttf"
              anchorX="left"
            >
              {project.title}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
}
