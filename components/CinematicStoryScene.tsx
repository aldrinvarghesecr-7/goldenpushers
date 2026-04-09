'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  Float, 
  SpotLight, 
  useDepthBuffer,
  Stars,
  Sparkles,
  ScrollControls,
  useScroll
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// --- Shared Constants ---
const GOLD_COLOR = "#D4AF77";
const DARK_METAL = "#111111";

// --- Internal Scene Components (Unified) ---

const StudioElements = ({ progress }: { progress: number }) => {
  const projectorRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.Group>(null);
  const clapperRef = useRef<THREE.Group>(null);
  const chairRef = useRef<THREE.Group>(null);
  const micRef = useRef<THREE.Group>(null);
  const reelRef = useRef<THREE.Group>(null);
  const lightGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // --- Phase 1: HERO (0.0 - 0.2) ---
    const heroProgress = Math.max(0, Math.min(1, (progress - 0) / 0.2));
    if (projectorRef.current) {
      projectorRef.current.position.z = THREE.MathUtils.lerp(-10, -2, heroProgress);
      projectorRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      // Reel spinning logic
      projectorRef.current.children.forEach((child, i) => {
        if (child.name === "reel") child.rotation.z += 0.05 * (1 + heroProgress * 2);
      });
    }

    // --- Phase 2: ETHOS (0.2 - 0.4) ---
    const ethosProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.2));
    if (micRef.current) {
        micRef.current.position.y = THREE.MathUtils.lerp(10, 4, ethosProgress);
    }
    if (clapperRef.current) {
        clapperRef.current.position.x = THREE.MathUtils.lerp(10, 5, ethosProgress);
        // Snapping logic on entry
        const snap = Math.sin(time * 4) > 0.8;
        const top = clapperRef.current.getObjectByName("top");
        if (top) top.rotation.z = THREE.MathUtils.lerp(top.rotation.z, snap ? -0.5 : 0, 0.2);
    }

    // --- Phase 3: CRAFT (0.4 - 0.6) ---
    const craftProgress = Math.max(0, Math.min(1, (progress - 0.4) / 0.2));
    if (chairRef.current) {
        chairRef.current.position.x = THREE.MathUtils.lerp(-10, -5, craftProgress);
        chairRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI * 0.5, craftProgress);
    }
    
    // Sequential Lights logic
    if (lightGroupRef.current) {
        lightGroupRef.current.children.forEach((light, i) => {
            const threshold = 0.4 + (i * 0.03);
            const intensity = Math.max(0, Math.min(1, (progress - threshold) / 0.05));
            (light as any).intensity = intensity * 15;
        });
    }

    // --- Phase 4: WORK (0.6 - 0.8) ---
    const workProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));
    // Wide projector sweep?
    
    // --- Phase 5: TEAM (0.8 - 0.9) ---
    const teamProgress = Math.max(0, Math.min(1, (progress - 0.8) / 0.1));
    if (cameraRef.current) {
        cameraRef.current.position.z = THREE.MathUtils.lerp(5, 0, teamProgress);
        cameraRef.current.lookAt(0, 0, 0);
    }

    // --- Phase 6: CONTACT (0.9 - 1.0) ---
    const contactProgress = Math.max(0, Math.min(1, (progress - 0.9) / 0.1));
    if (reelRef.current) {
        reelRef.current.scale.setScalar(contactProgress);
        reelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Projector Component */}
      <group ref={projectorRef} position={[0, 0, -10]}>
        <mesh castShadow>
          <boxGeometry args={[1, 0.8, 1.2]} />
          <meshStandardMaterial color={DARK_METAL} metalness={0.9} />
        </mesh>
        <mesh name="reel" position={[-0.4, 0.6, -0.2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.05, 16]} />
          <meshStandardMaterial color={GOLD_COLOR} wireframe />
        </mesh>
        <mesh name="reel" position={[0.4, 0.8, -0.4]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 16]} />
          <meshStandardMaterial color={GOLD_COLOR} wireframe />
        </mesh>
      </group>

      {/* Clapperboard */}
      <group ref={clapperRef} position={[10, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1, 0.7, 0.05]} />
          <meshStandardMaterial color="#050505" />
        </mesh>
        <group name="top" position={[-0.5, 0.35, 0]}>
          <mesh position={[0.5, 0.05, 0]}>
            <boxGeometry args={[1, 0.12, 0.06]} />
            <meshStandardMaterial color={DARK_METAL} />
          </mesh>
        </group>
      </group>

      {/* Boom Mic */}
      <group ref={micRef} position={[0, 10, 0]}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
           <cylinderGeometry args={[0.02, 0.02, 10]} />
           <meshStandardMaterial color={DARK_METAL} />
         </mesh>
         <mesh position={[0, -5, 0]}>
           <cylinderGeometry args={[0.08, 0.08, 0.4]} />
           <meshStandardMaterial color={DARK_METAL} />
         </mesh>
      </group>

      {/* Director Chair */}
      <group ref={chairRef} position={[-10, -2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.05, 0.8]} />
          <meshStandardMaterial color={DARK_METAL} />
        </mesh>
        <mesh position={[0, 0.4, -0.4]}>
          <boxGeometry args={[0.8, 0.6, 0.05]} />
          <meshStandardMaterial color={GOLD_COLOR} />
        </mesh>
        {/* Legs */}
        {[[-0.3, -0.4, 0.3], [0.3, -0.4, 0.3], [-0.3, -0.4, -0.3], [0.3, -0.4, -0.3]].map((p, i) => (
          <mesh key={i} position={p as any}>
            <boxGeometry args={[0.05, 0.8, 0.05]} />
            <meshStandardMaterial color={DARK_METAL} />
          </mesh>
        ))}
      </group>

      {/* Sequential Lights */}
      <group ref={lightGroupRef}>
        {[...Array(6)].map((_, i) => (
          <SpotLight 
            key={i} 
            position={[(i - 2.5) * 3, 6, -1]} 
            intensity={0} 
            color={GOLD_COLOR} 
            distance={15} 
            angle={0.4} 
            scale={[1, 1, 1]}
          />
        ))}
      </group>

      {/* Final Gold Reel */}
      <group ref={reelRef} scale={0} position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.1, 16, 100]} />
          <meshStandardMaterial color={GOLD_COLOR} metalness={1} roughness={0.1} emissive={GOLD_COLOR} emissiveIntensity={0.5} />
        </mesh>
      </group>

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={20} size={2} speed={0.5} color={GOLD_COLOR} />
    </group>
  );
};

const SceneOrchestrator = ({ isMobile }: { isMobile: boolean }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const depthBuffer = useDepthBuffer();

  useEffect(() => {
    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(window.scrollY / totalHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!cameraRef.current) return;
    
    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    if (scrollProgress < 0.2) {
        targetPos.set(0, 0, THREE.MathUtils.lerp(18, 10, scrollProgress / 0.2));
    } else if (scrollProgress < 0.4) {
        targetPos.set(THREE.MathUtils.lerp(0, 6, (scrollProgress - 0.2) / 0.2), 2, 12);
        targetLookAt.set(2, 0, 0);
    } else if (scrollProgress < 0.6) {
        targetPos.set(4, THREE.MathUtils.lerp(2, -4, (scrollProgress - 0.4) / 0.2), 10);
    } else if (scrollProgress < 0.8) {
        targetPos.set(THREE.MathUtils.lerp(4, -6, (scrollProgress - 0.6) / 0.2), -4, 12);
    } else {
        targetPos.set(0, 0, THREE.MathUtils.lerp(12, 25, (scrollProgress - 0.8) / 0.2));
    }

    cameraRef.current.position.lerp(targetPos, 0.04);
    cameraRef.current.lookAt(targetLookAt);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 20]} fov={isMobile ? 65 : 45} />
      <ambientLight intensity={0.15} />
      <Environment preset="night" />
      
      <StudioElements progress={scrollProgress} />

      {/* Volumetric Global Light */}
      <SpotLight
        depthBuffer={depthBuffer}
        position={[0, 15, -5]}
        distance={30}
        angle={0.6}
        attenuation={8}
        anglePower={5}
        color={GOLD_COLOR}
        intensity={scrollProgress > 0.8 ? 25 : 8}
      />
    </>
  );
};

export default function CinematicStoryScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none bg-[#0A0A0A] h-screen w-screen overflow-hidden">
      <Canvas shadows dpr={isMobile ? [1, 1] : [1, 2]}>
        <SceneOrchestrator isMobile={isMobile} />
      </Canvas>
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
    </div>
  );
}
