'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const chapters = [
  {
    id: "01",
    title: "The Spark",
    category: "Creative Development",
    items: "Ideation • Strategy • Script • Direction"
  },
  {
    id: "02",
    title: "The Blueprint",
    category: "Pre-Production",
    items: "Budget • Locations • Casting • Planning"
  },
  {
    id: "03",
    title: "The Shoot",
    category: "Production",
    items: "Cinematography • Directing • Aerial • Lighting"
  },
  {
    id: "04",
    title: "The Magic",
    category: "Post-Production",
    items: "Editing • Grading • VFX • Sound Design"
  },
  {
    id: "05",
    title: "The Reach",
    category: "Specialized Content",
    items: "Social • Product • Digital • Podcasting"
  },
  {
    id: "06",
    title: "The Legacy",
    category: "Distribution",
    items: "Mastering • Marketing • Rollout • Archive"
  }
];

export default function CraftCarousel({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const activeStage = Math.max(0, Math.min(1, (progress - 0.35) / 0.25));

  useFrame(() => {
    if (!groupRef.current) return;
    const xPos = THREE.MathUtils.lerp(15, -25, activeStage);
    groupRef.current.position.x = xPos;
    groupRef.current.visible = activeStage > 0 && activeStage < 1;
  });

  return (
    <group ref={groupRef} position={[0, -2, -5]}>
      {chapters.map((chapter, i) => (
        <group key={i} position={[i * 7, 0, 0]}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {/* Card Base */}
            <mesh castShadow>
              <boxGeometry args={[5, 6.5, 0.2]} />
              <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.3} />
            </mesh>
            
            {/* Metallic Rim */}
            <mesh position={[0, 0, 0.11]}>
              <boxGeometry args={[5.2, 6.7, 0.05]} />
              <meshStandardMaterial color="#D4AF77" metalness={1} roughness={0.1} />
            </mesh>

            {/* Glass Front */}
            <mesh position={[0, 0, 0.15]}>
              <boxGeometry args={[4.8, 6.3, 0.05]} />
              <MeshTransmissionMaterial 
                backside 
                thickness={0.2} 
                chromaticAberration={0.02} 
                color="#D4AF77" 
                transmission={0.9} 
              />
            </mesh>

            {/* Text Content */}
            <Text
              position={[0, 2.5, 0.2]}
              fontSize={0.5}
              color="#D4AF77"
              anchorX="center"
              anchorY="middle"
            >
              {chapter.id}
            </Text>
            <Text
              position={[0, 1.2, 0.2]}
              fontSize={0.7}
              color="white"
              maxWidth={4}
              textAlign="center"
              anchorX="center"
            >
              {chapter.title.toUpperCase()}
            </Text>
            <Text
              position={[0, -0.2, 0.2]}
              fontSize={0.3}
              color="#D4AF77"
              maxWidth={4}
              textAlign="center"
            >
              {chapter.category}
            </Text>
            
            <mesh position={[0, -1.2, 0.2]}>
               <planeGeometry args={[3, 0.02]} />
               <meshStandardMaterial color="#D4AF77" opacity={0.3} transparent />
            </mesh>

            <Text
              position={[0, -2.5, 0.2]}
              fontSize={0.22}
              color="white"
              fillOpacity={0.6}
              maxWidth={3.5}
              textAlign="center"
            >
              {chapter.items}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
}
