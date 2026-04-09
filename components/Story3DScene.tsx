'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  SpotLight, 
  useDepthBuffer,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';

// --- Shared Constants & Materials ---
const GOLD_COLOR = "#D4AF77";
const DARK_METAL = "#111111";

interface StageProps {
  progress: number;
  isMobile?: boolean;
}

// --- Individual Stage Components ---

const Projector = ({ progress }: StageProps) => {
  const group = useRef<THREE.Group>(null);
  const reel1 = useRef<THREE.Mesh>(null);
  const reel2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current || !reel1.current || !reel2.current) return;
    
    // Stage 1 Visibility (0.0 - 0.2)
    const visibility = Math.max(0, 1 - Math.abs(progress - 0.1) * 10);
    group.current.position.y = THREE.MathUtils.lerp(-5, 0, visibility);
    group.current.rotation.y = state.clock.elapsedTime * 0.2;
    
    // Reels spin faster based on progress
    const spinSpeed = 1 + progress * 5;
    reel1.current.rotation.z += 0.05 * spinSpeed;
    reel2.current.rotation.z += 0.05 * spinSpeed;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 0.8, 1.2]} />
        <meshStandardMaterial color={DARK_METAL} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Gold Accents */}
      <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color={GOLD_COLOR} emissive={GOLD_COLOR} emissiveIntensity={0.5} />
      </mesh>
      {/* Reels */}
      <mesh ref={reel1} position={[-0.4, 0.6, -0.2]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.05, 16]} />
        <meshStandardMaterial color={DARK_METAL} metalness={1} wireframe />
      </mesh>
      <mesh ref={reel2} position={[0.4, 0.8, -0.4]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
        <meshStandardMaterial color={GOLD_COLOR} metalness={1} wireframe />
      </mesh>
    </group>
  );
};

const Clapperboard = ({ progress, isMobile }: StageProps) => {
  const group = useRef<THREE.Group>(null);
  const topPart = useRef<THREE.Group>(null);
  const chairRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current || !topPart.current || !chairRef.current) return;
    
    // Stage 2 Visibility (0.2 - 0.4)
    const visibility = Math.max(0, 1 - Math.abs(progress - 0.25) * 8);
    group.current.position.x = THREE.MathUtils.lerp(10, 2, visibility);
    group.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Snapping logic
    const snap = Math.sin(state.clock.elapsedTime * 4) > 0.8;
    topPart.current.rotation.z = THREE.MathUtils.lerp(topPart.current.rotation.z, snap ? -0.5 : 0, 0.2);

    chairRef.current.position.y = THREE.MathUtils.lerp(-10, -2, visibility);
    chairRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group ref={group} position={[2, 0, 0]}>
      {/* Clapperboard */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 1.2, 0.1]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <group ref={topPart} position={[-0.75, 0.6, 0]}>
        <mesh position={[0.75, 0.1, 0]}>
          <boxGeometry args={[1.5, 0.2, 0.12]} />
          <meshStandardMaterial color={DARK_METAL} />
        </mesh>
      </group>

      {/* Director Chair */}
      <group ref={chairRef} position={[-4, -2, -2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color={DARK_METAL} />
        </mesh>
        <mesh position={[0, 0.8, -0.45]}>
          <boxGeometry args={[1, 0.8, 0.05]} />
          <meshStandardMaterial color={GOLD_COLOR} />
        </mesh>
        {[[-0.4, -0.5, 0.4], [0.4, -0.5, 0.4], [-0.4, -0.5, -0.4], [0.4, -0.5, -0.4]].map((p, i) => (
          <mesh key={i} position={p as any}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial color={DARK_METAL} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const CameraRig = ({ progress, isMobile }: StageProps) => {
  const group = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current || !spotlightRef.current) return;
    
    // Stage 3 Visibility (0.4 - 0.6)
    const visibility = Math.max(0, 1 - Math.abs(progress - 0.5) * 8);
    group.current.position.z = THREE.MathUtils.lerp(10, 0, visibility);
    group.current.position.x = THREE.MathUtils.lerp(-5, -2, visibility);
    
    const bob = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    group.current.position.y = bob;

    spotlightRef.current.position.y = THREE.MathUtils.lerp(10, 4, visibility);
  });

  return (
    <group>
      <group ref={group}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.6, 1.5]} />
          <meshStandardMaterial color={DARK_METAL} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.6, 32]} />
          <meshStandardMaterial color="#222" metalness={1} roughness={0.1} />
        </mesh>

        {/* Boom Mic */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color={DARK_METAL} />
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.4]} />
            <meshStandardMaterial color={DARK_METAL} />
          </mesh>
        </mesh>
      </group>

      {/* Studio Lights */}
      <group ref={spotlightRef} position={[2, 4, -2]}>
        <mesh rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 0.6, 16]} />
          <meshStandardMaterial color={DARK_METAL} emissive={GOLD_COLOR} emissiveIntensity={progress > 0.4 && progress < 0.6 ? 2 : 0} />
          <SpotLight position={[0, 0, 0]} color={GOLD_COLOR} intensity={5} distance={10} angle={0.4} />
        </mesh>
      </group>
    </group>
  );
};

const Particles = ({ progress, isMobile }: StageProps) => {
  const points = useRef<THREE.Points>(null);
  
  const count = isMobile ? 400 : 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.05;
    points.current.rotation.x = state.clock.elapsedTime * 0.02;
    
    // Intensity based on progress (peaks at stage 4 - The Magic)
    const intensity = Math.max(0.2, 1 - Math.abs(progress - 0.7) * 2);
    points.current.scale.setScalar(intensity);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color={GOLD_COLOR} 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
};

const MagicVFX = ({ progress }: StageProps) => {
  const group = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current || !ringRef.current) return;
    
    // Stage 4 Visibility (0.6 - 0.8)
    const visibility = Math.max(0, 1 - Math.abs(progress - 0.65) * 8);
    group.current.scale.setScalar(visibility);
    group.current.rotation.y = state.clock.elapsedTime * 0.5;
    
    ringRef.current.rotation.x += 0.02;
    ringRef.current.rotation.y += 0.03;
  });

  return (
    <group ref={group}>
      <mesh ref={ringRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color={GOLD_COLOR} 
          metalness={1} 
          roughness={0} 
          emissive={GOLD_COLOR} 
          emissiveIntensity={1}
          wireframe 
        />
      </mesh>
      <SpotLight 
        position={[0, 0, 2]} 
        color={GOLD_COLOR} 
        intensity={10} 
        distance={10} 
        angle={0.5} 
      />
    </group>
  );
};

const DigitalFrames = ({ progress, isMobile }: StageProps) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    
    // Stage 5 Visibility (0.75 - 0.95)
    const visibility = Math.max(0, 1 - Math.abs(progress - 0.85) * 8);
    group.current.position.y = THREE.MathUtils.lerp(-10, 0, visibility);
    
    group.current.children.forEach((child, i) => {
      child.rotation.y = Math.sin(state.clock.elapsedTime + i) * 0.2;
      child.position.y = Math.cos(state.clock.elapsedTime + i) * 0.2;
    });
  });

  return (
    <group ref={group}>
      {[...Array(isMobile ? 3 : 5)].map((_, i) => (
        <mesh key={i} position={[(i - (isMobile ? 1 : 2)) * 1.5, 0, -2]}>
          <planeGeometry args={[1, 1.8]} />
          <meshStandardMaterial color={DARK_METAL} metalness={0.8} roughness={0.2} emissive={GOLD_COLOR} emissiveIntensity={0.1} />
        </mesh>
      ))}
    </group>
  );
};

const CentralGoldReel = ({ progress }: StageProps) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Legacy Stage (0.9 - 1.0)
    const visibility = Math.max(0, (progress - 0.9) * 10);
    ref.current.scale.setScalar(visibility);
    ref.current.rotation.y += 0.01;
    ref.current.rotation.z += 0.005;
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <torusGeometry args={[1.2, 0.15, 16, 100]} />
          <meshStandardMaterial 
            color={GOLD_COLOR} 
            metalness={1} 
            roughness={0.05} 
            emissive={GOLD_COLOR} 
            emissiveIntensity={0.5} 
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.08, 32]} />
          <meshStandardMaterial color={GOLD_COLOR} metalness={1} roughness={0.1} transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
};

// --- Main Scene Component ---

export default function Story3DScene({ progress, isMobile }: { progress: number, isMobile: boolean }) {
  return (
    <group>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color={GOLD_COLOR} />
      
      <Stars radius={100} depth={50} count={isMobile ? 1000 : 3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Stage 1-2: Projector & Clapper */}
      <Projector progress={progress} isMobile={isMobile} />
      <Clapperboard progress={progress} isMobile={isMobile} />
      
      {/* Stage 3: Camera */}
      <CameraRig progress={progress} isMobile={isMobile} />
 
      {/* Stage 4: Magic (Post-Prod) */}
      <MagicVFX progress={progress} isMobile={isMobile} />
 
      {/* Stage 5: Reach (Digital) */}
      <DigitalFrames progress={progress} isMobile={isMobile} />
      
      {/* Particles (Persistent but reacts to progress) */}
      <Particles progress={progress} isMobile={isMobile} />
      
      {/* Stage 6: The Legacy */}
      <CentralGoldReel progress={progress} isMobile={isMobile} />

      {/* Background Volumetric Lighting */}
      <SpotLight
        position={[0, 10, -5]}
        distance={20}
        angle={0.5}
        attenuation={5}
        anglePower={4}
        color={GOLD_COLOR}
        intensity={progress > 0.9 ? 20 : 5}
      />
    </group>
  );
}
