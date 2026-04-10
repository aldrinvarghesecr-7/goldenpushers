'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

const team = [
  { id: 1, name: 'AVRIL JOHN VARGHESE', role: 'Founder', image: '/team/founder.jpg' },
  { id: 2, name: 'JERRY ABRAHAM JOHNSON', role: 'Co-Founder', image: '/team/co-founder.jpg' },
  { id: 3, name: 'DANISH MACKENZIE', role: 'DOP', image: '/team/danish.jpg' },
  { id: 4, name: 'BHANUNNI', role: 'Director', image: '/team/bhanunni.jpg' },
  { id: 5, name: 'ARJUNAN', role: 'DOP', image: '/team/arjunan.jpg' },
  { id: 6, name: 'JYOTHI PRAKASH', role: 'Designer', image: '/team/jyothi.jpg' }
];

export default function ArchitectFrames({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const activeStage = Math.max(0, Math.min(1, (progress - 0.8) / 0.15));

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    
    // Fan-out effect as we scroll
    groupRef.current.children.forEach((child, i) => {
      const angle = (i / team.length) * Math.PI * 2 + t * 0.1;
      const radius = THREE.MathUtils.lerp(10, 5, activeStage);
      child.position.x = Math.cos(angle) * radius;
      child.position.y = Math.sin(angle) * (radius * 0.5);
      child.lookAt(0, 0, 0);
    });

    groupRef.current.visible = activeStage > 0 && activeStage < 1;
    groupRef.current.scale.setScalar(activeStage * 1.2);
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {team.map((member, i) => (
        <group key={i}>
          <Float speed={3} rotationIntensity={0.2} floatIntensity={0.2}>
            {/* Portrait Frame */}
            <mesh>
              <planeGeometry args={[2, 2.8]} />
              <meshStandardMaterial color="#000" />
            </mesh>
            
            <Image 
              url={member.image} 
              scale={[1.9, 2.7]} 
              transparent 
              opacity={0.8}
            />

            {/* Gold Ring around frame */}
            <mesh position={[0, 0, -0.05]}>
              <ringGeometry args={[1.5, 1.6, 64]} />
              <meshStandardMaterial color="#D4AF77" emissive="#D4AF77" emissiveIntensity={0.5} />
            </mesh>

            <Text
              position={[0, -1.8, 0.1]}
              fontSize={0.2}
              color="white"
              textAlign="center"
              maxWidth={2}
            >
              {member.name}
            </Text>
            <Text
              position={[0, -2.1, 0.1]}
              fontSize={0.12}
              color="#D4AF77"
              textAlign="center"
            >
              {member.role}
            </Text>
          </Float>
        </group>
      ))}
    </group>
  );
}
