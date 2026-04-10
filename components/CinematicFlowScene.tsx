'use client';

/**
 * CinematicFlowScene — Golden Film Strip Background
 * ==================================================
 * 
 * CONCEPT: A single horizontal golden film strip stretches across the void.
 * As the user scrolls, the strip slowly unspools forward. Individual frames
 * on the strip subtly glow to match the current section. A slow, continuous
 * camera dolly creates the feeling of moving through a cinematic story.
 * 
 * PERFORMANCE:
 * - All geometry/materials memoized (zero allocations per frame)
 * - Scroll stored in useRef (zero React re-renders)
 * - Three device tiers: desktop / tablet / mobile
 * - Mobile: simplified strip, fewer particles, no Environment HDR
 * - No volumetric lights, no depth passes, no transmission materials
 */

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, AdaptiveDpr, Preload, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useCinematicStore } from '@/lib/store';

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const GOLD = '#D4AF77';
const GOLD_WARM = '#C5A059';
const DARK = '#050505';

type DeviceTier = 'mobile' | 'tablet' | 'desktop';

// Section mapping: each section maps to a "frame" on the strip
const SECTIONS = [
  { name: 'hero',    start: 0.00, end: 0.15, color: '#D4AF77' },
  { name: 'ethos',   start: 0.15, end: 0.30, color: '#E8C87A' },
  { name: 'craft',   start: 0.30, end: 0.55, color: '#D4AF77' },
  { name: 'work',    start: 0.55, end: 0.75, color: '#C5A059' },
  { name: 'team',    start: 0.75, end: 0.90, color: '#D4AF77' },
  { name: 'contact', start: 0.90, end: 1.00, color: '#E8C87A' },
];

function sectionProgress(scroll: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (scroll - start) / (end - start)));
}

// ═══════════════════════════════════════════════════════════════
// GOLDEN FILM STRIP — The core visual element
// A horizontal strip of connected frames that unspools with scroll.
// Each frame subtly glows when its section is active.
// ═══════════════════════════════════════════════════════════════

const FilmStrip = React.memo(({ scrollRef, tier }: { 
  scrollRef: React.MutableRefObject<number>, 
  tier: DeviceTier 
}) => {
  const stripRef = useRef<THREE.Group>(null);
  const frameCount = tier === 'mobile' ? 12 : tier === 'tablet' ? 18 : 24;
  const frameSpacing = 1.8;
  const stripLength = frameCount * frameSpacing;

  // PERF: Memoize all shared materials — never recreated
  const stripMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0A0A0A',
    metalness: 0.8,
    roughness: 0.4,
    side: THREE.DoubleSide,
  }), []);

  const perforationMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#000000',
  }), []);

  const stripGeo = useMemo(() => new THREE.PlaneGeometry(stripLength, 1.6), [stripLength]);
  const frameGeo = useMemo(() => new THREE.PlaneGeometry(1.2, 0.8), []);
  const perfGeo = useMemo(() => new THREE.CircleGeometry(0.04, 6), []);

  // Load cinematic textures for the frames
  const textures = useTexture([
    '/work/ig-1.jpg',
    '/work/ig-2.jpg',
    '/work/ig-3.jpg',
    '/work/ig-4.jpg',
    '/work/ig-5.jpg',
    '/work/ig-6.jpg',
  ]);

  // Per-frame emissive materials with textures
  const frameMaterials = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => new THREE.MeshStandardMaterial({
      map: textures[i % textures.length],
      color: '#ffffff', // Full brightness for the texture
      emissive: GOLD,
      emissiveIntensity: 0.1, // Slightly higher emissive for a premium glow
      metalness: 0.4,
      roughness: 0.6,
      transparent: true,
      opacity: 0.8, // More visible but still subtle
    }));
  }, [frameCount, textures]);

  // Gold edge material for the strip border
  const edgeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: GOLD_WARM,
    metalness: 1,
    roughness: 0.15,
    emissive: GOLD,
    emissiveIntensity: 0.05,
  }), []);

  const edgeGeo = useMemo(() => new THREE.PlaneGeometry(stripLength, 0.03), [stripLength]);

  useFrame(() => {
    if (!stripRef.current) return;
    const p = scrollRef.current;

    // ANIMATION: Strip slides leftward with scroll — "unspooling"
    // The strip moves from right to left, like film through a projector
    stripRef.current.position.x = THREE.MathUtils.lerp(stripLength * 0.3, -stripLength * 0.4, p);

    // Gentle vertical breathing
    stripRef.current.position.y = Math.sin(p * Math.PI * 2) * 0.15;
    
    // Very subtle rotation — strip is never perfectly flat
    stripRef.current.rotation.z = Math.sin(p * Math.PI) * 0.02;
    stripRef.current.rotation.x = 0.1; // Slight perspective tilt

    // Per-frame glow: frames light up when their section is active
    frameMaterials.forEach((mat, i) => {
      const frameProgress = i / frameCount; // 0 to 1 across the strip
      
      // Find which section this frame belongs to
      const section = SECTIONS.find(s => frameProgress >= s.start && frameProgress < s.end);
      if (!section) return;

      // Glow when the scroll is within this section's range
      const sectionActive = sectionProgress(p, section.start, section.end);
      const isCurrentFrame = Math.abs(frameProgress - p) < 0.08;
      
      // Smooth glow transition
      const targetGlow = isCurrentFrame ? 0.6 : sectionActive > 0 && sectionActive < 1 ? 0.15 : 0.02;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetGlow, 0.05);
    });
  });

  return (
    <group ref={stripRef} position={[0, 0, -3]}>
      {/* Main strip body */}
      <mesh geometry={stripGeo} material={stripMaterial} />

      {/* Gold edge lines (top and bottom of strip) */}
      <mesh geometry={edgeGeo} material={edgeMaterial} position={[0, 0.8, 0.01]} />
      <mesh geometry={edgeGeo} material={edgeMaterial} position={[0, -0.8, 0.01]} />

      {/* Individual frames on the strip */}
      {frameMaterials.map((mat, i) => {
        const x = (i - frameCount / 2) * frameSpacing + frameSpacing / 2;
        return (
          <group key={i} position={[x, 0, 0.01]}>
            {/* Frame window */}
            <mesh geometry={frameGeo} material={mat} />
            
            {/* Sprocket holes (top row) */}
            {tier !== 'mobile' && (
              <>
                <mesh geometry={perfGeo} material={perforationMaterial} position={[-0.5, 0.65, 0.01]} />
                <mesh geometry={perfGeo} material={perforationMaterial} position={[0, 0.65, 0.01]} />
                <mesh geometry={perfGeo} material={perforationMaterial} position={[0.5, 0.65, 0.01]} />
                <mesh geometry={perfGeo} material={perforationMaterial} position={[-0.5, -0.65, 0.01]} />
                <mesh geometry={perfGeo} material={perforationMaterial} position={[0, -0.65, 0.01]} />
                <mesh geometry={perfGeo} material={perforationMaterial} position={[0.5, -0.65, 0.01]} />
              </>
            )}
          </group>
        );
      })}
    </group>
  );
});
FilmStrip.displayName = 'FilmStrip';


// ═══════════════════════════════════════════════════════════════
// GOLDEN DUST — Gentle floating particles that drift with scroll
// Much subtler than sparkles — like dust caught in projector light
// ═══════════════════════════════════════════════════════════════

const GoldenDust = React.memo(({ scrollRef, count }: { 
  scrollRef: React.MutableRefObject<number>, 
  count: number 
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  }, [count]);

  const particleMat = useMemo(() => new THREE.PointsMaterial({
    color: GOLD,
    size: 0.03,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const p = scrollRef.current;
    const t = state.clock.elapsedTime;

    // Particles drift very slowly — like real dust
    pointsRef.current.rotation.y = t * 0.003;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.02;
    
    // Intensity follows the story — brighter during active sections
    const intensity = p < 0.05 ? p * 8 : p > 0.95 ? (1 - p) * 20 : 0.5;
    particleMat.opacity = 0.2 + intensity * 0.3;
  });

  return (
    <points ref={pointsRef} material={particleMat}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
    </points>
  );
});
GoldenDust.displayName = 'GoldenDust';


// ═══════════════════════════════════════════════════════════════
// LIGHT LEAK — A soft golden light that sweeps across with scroll
// Creates the feeling of projector light sweeping across frames
// ═══════════════════════════════════════════════════════════════

const ProjectorLight = React.memo(({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { activeCraftIndex } = useCinematicStore();

  useFrame(() => {
    if (!lightRef.current) return;
    const p = scrollRef.current;

    // Light behavior depends on the section
    // In THE CRAFT (0.30 - 0.55), the light sweeps to the active card
    const isCraftSection = p >= 0.25 && p <= 0.6;
    
    let targetX = THREE.MathUtils.lerp(8, -8, p);
    
    if (isCraftSection) {
      // Sync with the carousel's active index
      // Map index 0-5 to X position relative to current strip position
      const craftProgress = activeCraftIndex / 5;
      targetX = THREE.MathUtils.lerp(2, -2, craftProgress);
    }

    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.1);
    lightRef.current.position.y = 0;
    lightRef.current.position.z = 2;

    // Intensity pulses gently — like projector flicker
    const intensity = isCraftSection ? 8 : 4;
    const flicker = 1 + Math.sin(p * 50) * 0.03;
    lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, intensity * flicker, 0.1);
  });

  return <pointLight ref={lightRef} color={GOLD} distance={12} decay={2} />;
});
ProjectorLight.displayName = 'ProjectorLight';


// ═══════════════════════════════════════════════════════════════
// SCENE ORCHESTRATOR — Camera dolly + scene assembly
// ═══════════════════════════════════════════════════════════════

const SceneOrchestrator = ({ tier }: { tier: DeviceTier }) => {
  const scrollRef = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentLookAt = useMemo(() => new THREE.Vector3(0, 0, -3), []);

  // PERF: Scroll to ref, not state — zero re-renders
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) scrollRef.current = window.scrollY / total;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    if (!cameraRef.current) return;
    const p = scrollRef.current;

    // CAMERA: Continuous slow forward dolly — never static
    // Starts far, ends close. Very subtle lateral drift per section.
    const z = THREE.MathUtils.lerp(6, 2.5, p);
    const x = Math.sin(p * Math.PI * 2) * 0.3; // Very gentle side-to-side
    const y = 0.2 + Math.sin(p * Math.PI) * 0.15; // Slight rise and fall

    cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, x, 0.015);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, y, 0.015);
    cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, z, 0.015);

    // Look slightly ahead of center — following the strip
    currentLookAt.x = THREE.MathUtils.lerp(currentLookAt.x, x * 0.5, 0.02);
    cameraRef.current.lookAt(currentLookAt);
  });

  const particleCount = tier === 'mobile' ? 30 : tier === 'tablet' ? 60 : 120;

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0.2, 6]}
        fov={tier === 'mobile' ? 55 : 40}
      />

      {/* Ambient — very dim base light */}
      <ambientLight intensity={0.06} />
      
      {/* Key light from above — warm gold wash */}
      <directionalLight position={[0, 5, 3]} intensity={0.3} color={GOLD} />

      {/* Environment HDR — desktop only for reflections */}
      {tier === 'desktop' && <Environment preset="night" />}

      {/* The golden film strip — the hero element */}
      <FilmStrip scrollRef={scrollRef} tier={tier} />

      {/* Floating golden dust */}
      <GoldenDust scrollRef={scrollRef} count={particleCount} />

      {/* Projector light sweep — desktop/tablet only */}
      {tier !== 'mobile' && <ProjectorLight scrollRef={scrollRef} />}
    </>
  );
};


// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════

export default function CinematicFlowScene() {
  const [tier, setTier] = useState<DeviceTier>('desktop');

  const detectTier = useCallback(() => {
    const w = window.innerWidth;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (w < 768 || (isTouch && w < 1024)) setTier('mobile');
    else if (w < 1280 || isTouch) setTier('tablet');
    else setTier('desktop');
  }, []);

  const set3DLoaded = useCinematicStore((state) => state.set3DLoaded);

  useEffect(() => {
    detectTier();
    window.addEventListener('resize', detectTier);
    // Signal that 3D is initializing (textures start loading)
    set3DLoaded(true);
    return () => window.removeEventListener('resize', detectTier);
  }, [detectTier, set3DLoaded]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505] w-full h-screen overflow-hidden">
      <Canvas
        dpr={tier === 'mobile' ? [0.75, 1] : tier === 'tablet' ? [1, 1.25] : [1, 1.5]}
        gl={{
          antialias: tier === 'desktop',
          powerPreference: 'high-performance',
          alpha: false,
        }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={[DARK]} />
        <SceneOrchestrator tier={tier} />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>

      {/* Cinematic overlays — pure CSS */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/50" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
