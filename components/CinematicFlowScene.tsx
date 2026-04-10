'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  Float, 
  SpotLight, 
  ContactShadows,
  Sparkles,
  Preload,
  AdaptiveDpr,
  useDepthBuffer,
  MeshTransmissionMaterial
} from '@react-three/drei';
import * as THREE from 'three';
import CraftCarousel from './3d/CraftCarousel';
import ProjectFrames from './3d/ProjectFrames';
import ArchitectFrames from './3d/ArchitectFrames';
import StudioProps from './3d/StudioProps';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Colors & Materials ---
const GOLD = "#D4AF77";
const GOLD_DEEP = "#C5A059";
const STUDIO_DARK = "#050505";

// --- 3D Components ---

const GiantGoldenReel = ({ progress }: { progress: number }) => {
  const reelGroup = useRef<THREE.Group>(null);
  const outerRing = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!reelGroup.current) return;
    const t = state.clock.elapsedTime;
    
    // Rotation based on scroll speed + ambient rotation
    reelGroup.current.rotation.z = progress * Math.PI * 10 + t * 0.1;
    reelGroup.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    reelGroup.current.rotation.y = Math.cos(t * 0.3) * 0.1;

    // Wobble effect
    if (outerRing.current) {
        outerRing.current.rotation.y = Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group ref={reelGroup} scale={2}>
      {/* Central Hub */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.1} />
      </mesh>
      
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <group key={deg} rotation={[0, 0, THREE.MathUtils.degToRad(deg)]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[0.1, 2.4, 0.05]} />
            <meshStandardMaterial color={GOLD_DEEP} metalness={1} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Primary Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.15]} castShadow>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.05} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.15]} castShadow>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshStandardMaterial color={GOLD} metalness={1} roughness={0.05} />
      </mesh>

      {/* Film Strip (Outer) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} ref={outerRing}>
        <torusGeometry args={[2.4, 0.3, 16, 100]} />
        <MeshTransmissionMaterial 
           backside 
           samples={4} 
           thickness={0.5} 
           chromaticAberration={0.05} 
           anisotropy={0.1} 
           distortion={0.1} 
           distortionScale={0.3} 
           temporalDistortion={0.5} 
           clearcoat={1} 
           color={GOLD}
        />
      </mesh>
    </group>
  );
};

const CinematicLights = ({ progress }: { progress: number }) => {
  const depthBuffer = useDepthBuffer();
  
  // Ignite logic: darkness (0) to brilliance (1)
  const ignition = Math.max(0, Math.min(1, (progress - 0.02) / 0.1));
  const lightIntensity = ignition * 10;

  return (
    <>
      <ambientLight intensity={0.05 + ignition * 0.15} />
      
      <SpotLight
        depthBuffer={depthBuffer}
        position={[5, 10, 5]}
        angle={0.3}
        attenuation={5}
        anglePower={4}
        intensity={lightIntensity * 2}
        color={GOLD}
      />

      <SpotLight
        depthBuffer={depthBuffer}
        position={[-10, 5, -5]}
        angle={0.5}
        attenuation={10}
        anglePower={5}
        intensity={lightIntensity}
        color="#ffffff"
      />

      {/* Floating particles */}
      <Sparkles 
        count={200} 
        scale={20} 
        size={2} 
        speed={0.2} 
        opacity={ignition} 
        color={GOLD} 
      />
    </>
  );
};

const SceneContent = ({ progress }: { progress: number }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame(() => {
    if (!cameraRef.current) return;

    // Dolly path logic
    // We move the camera in a subtle arc as we scroll
    const zPos = THREE.MathUtils.lerp(12, -20, progress);
    const xPos = Math.sin(progress * Math.PI) * 4;
    const yPos = 0.5 + Math.cos(progress * Math.PI * 0.5) * 2;

    cameraRef.current.position.set(xPos, yPos, zPos);
    
    // LookAt follows the reel mostly, but shifts at the end
    const lookAtTarget = new THREE.Vector3(0, 0, 0);
    if (progress > 0.8) {
        lookAtTarget.y = THREE.MathUtils.lerp(0, -2, (progress - 0.8) / 0.2);
    }
    cameraRef.current.lookAt(lookAtTarget);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={40} />
      <Environment preset="night" />
      
      {!progress && progress === 0 && (
         <Sparkles count={50} scale={10} color={GOLD} speed={0.1} />
      )}

      <GiantGoldenReel progress={progress} />
      <CinematicLights progress={progress} />
      
      {/* 3D Content Groups with conditional rendering for performance */}
      <CraftCarousel progress={progress} />
      <ProjectFrames progress={progress} />
      <ArchitectFrames progress={progress} />
      <StudioProps progress={progress} />

      {/* Soft Ground for shadows - disabled on low-power mobile */}
      <ContactShadows 
         opacity={0.4} 
         scale={20} 
         blur={2.4} 
         far={4.5} 
         color="#000000" 
         position={[0, -4, 0]} 
      />
    </>
  );
};

export default function CinematicFlowScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <div 
        ref={containerRef}
        className="fixed inset-0 z-[-1] pointer-events-none bg-black w-full h-screen overflow-hidden"
    >
      <Canvas 
        shadows 
        dpr={[0.8, 2]} 
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[STUDIO_DARK]} />
        <SceneContent progress={scrollProgress} />
        <Preload all />
        <AdaptiveDpr pixelated />
      </Canvas>
      
      {/* Global Grain/Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
    </div>
  );
}
