'use client';

// ═══════════════════════════════════════════════════════════════
// AWARD-WINNING LIQUID GOLD CANVAS
// Abstract organic 3D centerpiece featuring MeshDistortMaterial.
// Responds to scroll and mouse for an unparalleled luxury feel.
// ═══════════════════════════════════════════════════════════════

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Sparkles,
  Environment,
  MeshDistortMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { useScrollStore } from '@/components/scrollstore';

// ─── THE LIQUID MONOLITH ───
// A highly metallic, distorted shape that twists and breathes.
function LiquidMonolith() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Initial shape is a complex mathematical knot to provide
  // a rich, twisting silhouette that catches light impeccably.
  const geometry = useMemo(() => new THREE.SphereGeometry(3, 128, 128), []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;
    
    const progress = useScrollStore.getState().progress; // 0 to 1
    const t = state.clock.elapsedTime;

    // 1. Organic Breathing & Rotation
    // Moves gracefully over time
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    meshRef.current.rotation.y += 0.005; 
    meshRef.current.rotation.z = Math.cos(t * 0.1) * 0.2;

    // 2. Scroll Interaction
    // Scale and stretch the object dynamically based on scroll depth
    const scaleTension = Math.sin(progress * Math.PI); // Peaks at middle of page
    meshRef.current.scale.set(
      1 + progress * 0.5,
      1 + scaleTension * 0.6,
      1 + progress * 0.3
    );

    // Distortion intensity ramps up as you scroll deep into the site
    materialRef.current.distort = THREE.MathUtils.lerp(
      0.3,
      0.8,
      progress
    );

    // 3. Mouse Parallax Subtlety
    // Let the monolith "look" slightly toward the mouse
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, pointerX * 1.5, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, pointerY * 1.5, 0.05);
  });

  return (
    <Float floatIntensity={1.5} rotationIntensity={0.5} speed={1.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#15120e"         // Deep, dark gold base
          envMapIntensity={2.5}   // Explosive reflections
          clearcoat={1}           // Creates a liquid wet look
          clearcoatRoughness={0}
          metalness={1.0}
          roughness={0.15}
          distort={0.4}
          speed={1.5}             // Speed of the liquid morphing
        />
      </mesh>
    </Float>
  );
}

// ─── CAMERA RIG ───
// Handles the slow, cinematic push-ins and atmospheric parallax.
function CinematicRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const progress = useScrollStore.getState().progress;
    
    // Dolly in gracefully as user scrolls to the bottom
    const targetZ = THREE.MathUtils.lerp(12, 5, progress);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03);

    // Add a very microscopic, handheld "breathe" to the camera
    const t = state.clock.elapsedTime;
    camera.position.y = Math.sin(t * 0.5) * 0.1;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── AMBIENT MAGIC ───
// Rich golden dust motes floating in the depth of field.
function GoldenDust() {
  return (
    <Float floatIntensity={0.5} speed={0.5}>
      <Sparkles
        count={600}
        scale={20}
        size={2.5}
        speed={0.2}
        opacity={0.3}
        color="#D4AF77"
        noise={0.1}
      />
    </Float>
  );
}

// ─── SCENE COMPOSITION ───
function LiquidScene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 8, 30]} />

      {/* Dramatic Studio Lighting */}
      <ambientLight intensity={0.1} color="#ffffff" />
      
      {/* Warm fill light */}
      <pointLight 
        position={[10, 10, -5]} 
        intensity={2.5} 
        color="#D4AF77" 
        distance={40}
      />
      
      {/* Cool contrasting backlight */}
      <pointLight 
        position={[-10, -10, -15]} 
        intensity={1} 
        color="#1A202C" 
        distance={30}
      />

      {/* The metallic sphere will reflect this studio env map natively */}
      <Environment preset="studio" />

      {/* Rigs & Meshes */}
      <CinematicRig />
      <LiquidMonolith />
      <GoldenDust />
    </>
  );
}

// ─── R3F CANVAS ROOT ───
export default function LuxuryCanvas() {
  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]} // High DPI scaling for retina screens
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <Suspense fallback={null}>
          <LiquidScene />
        </Suspense>
      </Canvas>
      
      {/* Heavy vignette overlay to push the edges deeper into black */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-80" />
    </div>
  );
}
