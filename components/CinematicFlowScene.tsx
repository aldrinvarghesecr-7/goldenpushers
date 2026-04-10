'use client';

/**
 * CinematicFlowScene — The Golden Pushers Unified 3D Cinema Engine
 * ================================================================
 * 
 * PERFORMANCE ARCHITECTURE:
 * ─────────────────────────
 * 1. Scroll progress stored in useRef (NOT useState) — eliminates 60fps React re-renders
 * 2. All geometries & materials memoized via useMemo — zero per-frame allocations
 * 3. Three-tier device detection: DESKTOP / TABLET / MOBILE
 *    - Desktop: Full scene, volumetric lights, transmission materials, all objects
 *    - Tablet:  Simplified materials, fewer particles, no transmission, no shadows
 *    - Mobile:  Minimal scene — only reel + particles + ambient light (2D-quality perf)
 * 4. Section-based visibility culling — objects only render when their section is active
 * 5. AdaptiveDpr for automatic quality scaling under load
 * 6. No ContactShadows (expensive blur pass), no useDepthBuffer (extra render pass)
 * 
 * ANIMATION ARCHITECTURE:
 * ───────────────────────
 * The scroll range [0.0 → 1.0] maps to 6 cinematic chapters:
 * 
 *   0.00–0.15  HERO:     Studio awakens. Reel dormant. Single golden spotlight fades in.
 *   0.15–0.35  ETHOS:    Clapperboard snaps ONCE. Boom mic lowers. Reel begins slow spin.
 *   0.35–0.60  CRAFT:    Studio lights sequence on (L→R). Reel accelerates. Camera orbits.
 *   0.60–0.80  WORK:     Camera pulls back wide. Reel at full speed. Particles intensify.
 *   0.80–0.95  TEAM:     Warm spotlight. Reel slows. Camera settles center.
 *   0.95–1.00  CONTACT:  Fade to warm gold. Reel stops. Final frame.
 * 
 * Every animation is tied to scroll position — nothing moves randomly.
 */

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  AdaptiveDpr,
  Preload
} from '@react-three/drei';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const GOLD = '#D4AF77';
const GOLD_EMISSIVE = '#C5A059';
const DARK = '#050505';

type DeviceTier = 'mobile' | 'tablet' | 'desktop';

// ═══════════════════════════════════════════════════════════════
// UTILITY: Smooth step for section transitions (no sudden jumps)
// ═══════════════════════════════════════════════════════════════

function sectionProgress(scroll: number, start: number, end: number): number {
  return Math.max(0, Math.min(1, (scroll - start) / (end - start)));
}

function smoothStep(x: number): number {
  return x * x * (3 - 2 * x);
}

// ═══════════════════════════════════════════════════════════════
// GOLDEN FILM REEL — The persistent hero object
// Spins proportionally to scroll speed, not randomly.
// ═══════════════════════════════════════════════════════════════

const GoldenReel = React.memo(({ scrollRef, tier }: { scrollRef: React.MutableRefObject<number>, tier: DeviceTier }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // PERF: Memoize all geometries and materials — created once, reused forever
  const spokeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: GOLD_EMISSIVE, metalness: 1, roughness: 0.2 
  }), []);
  
  const hubMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: GOLD, metalness: 1, roughness: 0.1 
  }), []);
  
  const rimMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: GOLD, metalness: 1, roughness: 0.05, 
    emissive: GOLD_EMISSIVE, emissiveIntensity: 0.15 
  }), []);

  const hubGeo = useMemo(() => new THREE.CylinderGeometry(0.3, 0.3, 0.4, tier === 'mobile' ? 16 : 32), [tier]);
  const spokeGeo = useMemo(() => new THREE.BoxGeometry(0.1, 2.4, 0.05), []);
  const rimGeo = useMemo(() => new THREE.TorusGeometry(2.5, 0.08, 8, tier === 'mobile' ? 48 : 80), [tier]);

  // Spoke angles — static, computed once
  const spokeAngles = useMemo(() => [0, 60, 120, 180, 240, 300], []);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = scrollRef.current;
    
    // ANIMATION: Reel spin speed maps to narrative pace
    // Hero: dormant. Ethos: waking up. Craft: working speed. Work: full speed. Team→Contact: slowing to rest.
    let spinSpeed = 0;
    if (p < 0.15) spinSpeed = p * 0.5;                          // Dormant → barely turning
    else if (p < 0.35) spinSpeed = 0.075 + sectionProgress(p, 0.15, 0.35) * 0.3;  // Waking up
    else if (p < 0.6) spinSpeed = 0.4 + sectionProgress(p, 0.35, 0.6) * 0.6;      // Working speed
    else if (p < 0.8) spinSpeed = 1.0;                          // Full creative speed
    else spinSpeed = 1.0 - sectionProgress(p, 0.8, 1.0) * 0.8;  // Slowing to final frame

    groupRef.current.rotation.z += spinSpeed * 0.02;
    
    // Subtle breathing — keeps it alive but not random
    groupRef.current.rotation.x = Math.sin(p * Math.PI) * 0.08;
    groupRef.current.rotation.y = Math.cos(p * Math.PI * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef} scale={2}>
      {/* Central Hub */}
      <mesh geometry={hubGeo} material={hubMaterial} />

      {/* Spokes — radiating outward */}
      {spokeAngles.map((deg) => (
        <group key={deg} rotation={[0, 0, THREE.MathUtils.degToRad(deg)]}>
          <mesh position={[0, 1.2, 0]} geometry={spokeGeo} material={spokeMaterial} />
        </group>
      ))}

      {/* Rim rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.15]} geometry={rimGeo} material={rimMaterial} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.15]} geometry={rimGeo} material={rimMaterial} />

      {/* Film strip ring — simple wireframe instead of expensive MeshTransmissionMaterial */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.25, tier === 'mobile' ? 6 : 12, tier === 'mobile' ? 48 : 80]} />
        <meshStandardMaterial 
          color={GOLD} 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
});
GoldenReel.displayName = 'GoldenReel';


// ═══════════════════════════════════════════════════════════════
// STUDIO PROPS — Clapperboard + Boom Mic
// Only rendered on desktop/tablet. Culled by section.
// ═══════════════════════════════════════════════════════════════

const StudioPropsOptimized = React.memo(({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  const clapperRef = useRef<THREE.Group>(null);
  const clapperTopRef = useRef<THREE.Group>(null);
  const micRef = useRef<THREE.Group>(null);
  const hasSnapped = useRef(false);

  // PERF: Shared materials
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0a0a0a' }), []);
  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111' }), []);

  useFrame(() => {
    const p = scrollRef.current;
    
    // SECTION: Ethos (0.15–0.35) — Clapperboard enters and snaps ONCE
    const ethosIn = smoothStep(sectionProgress(p, 0.15, 0.25));
    const ethosOut = 1 - smoothStep(sectionProgress(p, 0.50, 0.60));
    const visible = ethosIn * ethosOut;
    
    if (clapperRef.current) {
      clapperRef.current.visible = visible > 0.01;
      clapperRef.current.position.y = THREE.MathUtils.lerp(-8, 0, visible);
      clapperRef.current.position.x = 4;
      clapperRef.current.position.z = -2;
    }

    // ANIMATION: Clapperboard snaps once at ethos entry, not continuously
    if (clapperTopRef.current) {
      if (p > 0.18 && p < 0.22 && !hasSnapped.current) {
        hasSnapped.current = true;
        clapperTopRef.current.rotation.z = -0.5;
      } else if (p > 0.22 && hasSnapped.current) {
        clapperTopRef.current.rotation.z = THREE.MathUtils.lerp(clapperTopRef.current.rotation.z, 0, 0.1);
      }
      if (p < 0.15) hasSnapped.current = false; // Reset on scroll back
    }

    // SECTION: Boom mic lowers during ethos, stays until craft ends
    if (micRef.current) {
      micRef.current.visible = visible > 0.01;
      micRef.current.position.y = THREE.MathUtils.lerp(12, 5, visible);
      micRef.current.position.z = -3;
    }
  });

  return (
    <group>
      {/* Clapperboard */}
      <group ref={clapperRef} visible={false}>
        <mesh material={darkMat}>
          <boxGeometry args={[1.5, 1, 0.1]} />
        </mesh>
        <group ref={clapperTopRef} position={[-0.75, 0.5, 0]}>
          <mesh position={[0.75, 0.1, 0]} material={metalMat}>
            <boxGeometry args={[1.5, 0.2, 0.12]} />
          </mesh>
        </group>
        {/* Gold accent stripe */}
        <mesh position={[0, 0.3, 0.06]}>
          <boxGeometry args={[1.3, 0.05, 0.01]} />
          <meshStandardMaterial color={GOLD} />
        </mesh>
      </group>

      {/* Boom Mic */}
      <group ref={micRef} visible={false}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={metalMat}>
          <cylinderGeometry args={[0.02, 0.02, 8]} />
        </mesh>
        <mesh position={[4, 0, 0]} material={darkMat}>
          <cylinderGeometry args={[0.1, 0.1, 0.5]} />
        </mesh>
      </group>
    </group>
  );
});
StudioPropsOptimized.displayName = 'StudioPropsOptimized';


// ═══════════════════════════════════════════════════════════════
// STUDIO LIGHTS — Sequential golden spots that illuminate with scroll
// Desktop only. Each light "turns on" as you scroll through Craft section.
// ═══════════════════════════════════════════════════════════════

const StudioLights = React.memo(({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  const lightsRef = useRef<THREE.Group>(null);
  
  // PERF: Simple point lights instead of expensive volumetric SpotLights
  // No depthBuffer, no anglePower, no attenuation passes
  const lightPositions = useMemo(() => [
    [-6, 7, -1], [-2, 8, -1], [2, 7, -1], [6, 8, -1]
  ] as [number, number, number][], []);

  useFrame(() => {
    if (!lightsRef.current) return;
    const p = scrollRef.current;

    lightsRef.current.children.forEach((light, i) => {
      // ANIMATION: Lights turn on sequentially during Craft section (0.35–0.60)
      // Each light has a staggered threshold — they "cascade" left to right
      const threshold = 0.35 + (i * 0.06);
      const targetIntensity = smoothStep(sectionProgress(p, threshold, threshold + 0.08)) * 12;
      
      // Lights dim back down after Work section
      const dimAfter = 1 - smoothStep(sectionProgress(p, 0.85, 0.95));
      
      (light as THREE.PointLight).intensity = THREE.MathUtils.lerp(
        (light as THREE.PointLight).intensity,
        targetIntensity * dimAfter,
        0.08
      );
    });
  });

  return (
    <group ref={lightsRef}>
      {lightPositions.map((pos, i) => (
        <pointLight key={i} position={pos} color={GOLD} intensity={0} distance={20} decay={2} />
      ))}
    </group>
  );
});
StudioLights.displayName = 'StudioLights';


// ═══════════════════════════════════════════════════════════════
// DUST PARTICLES — Lightweight procedural particles via BufferGeometry
// No drei Sparkles (creates internal state). Pure buffer attributes.
// ═══════════════════════════════════════════════════════════════

const DustParticles = React.memo(({ scrollRef, count }: { scrollRef: React.MutableRefObject<number>, count: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  const particleMaterial = useMemo(() => new THREE.PointsMaterial({
    color: GOLD,
    size: 0.08,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const p = scrollRef.current;
    
    // ANIMATION: Particles become more visible as the studio "heats up"
    // Barely visible in Hero, full density during Craft/Work, fading in Contact
    const density = p < 0.15 ? p * 3 : p > 0.9 ? (1 - p) * 10 : 1;
    particleMaterial.opacity = 0.3 * density;
    
    // Gentle upward drift — like dust in a real studio under lights
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
  });

  return (
    <points ref={pointsRef} material={particleMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
    </points>
  );
});
DustParticles.displayName = 'DustParticles';


// ═══════════════════════════════════════════════════════════════
// SCENE ORCHESTRATOR — The brain. Manages camera + assembles scene.
// Uses useRef for scroll — zero React re-renders from scroll events.
// ═══════════════════════════════════════════════════════════════

const SceneOrchestrator = ({ tier }: { tier: DeviceTier }) => {
  const scrollRef = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  // PERF: Reusable vectors — allocated once, mutated in useFrame
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);

  // PERF: Scroll listener writes to ref, not state — no re-renders
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

    // ─── CAMERA DOLLY PATH ───
    // Each section has a specific camera position that serves the content:
    
    if (p < 0.15) {
      // HERO: Start far, slowly push in toward the reel
      const t = sectionProgress(p, 0, 0.15);
      targetPos.set(0, 0.5, THREE.MathUtils.lerp(14, 10, smoothStep(t)));
      targetLookAt.set(0, 0, 0);
    } 
    else if (p < 0.35) {
      // ETHOS: Slight orbit left to reveal clapperboard + mic entering frame
      const t = sectionProgress(p, 0.15, 0.35);
      targetPos.set(
        THREE.MathUtils.lerp(0, 3, smoothStep(t)),
        THREE.MathUtils.lerp(0.5, 1.5, t),
        THREE.MathUtils.lerp(10, 9, t)
      );
      targetLookAt.set(1, 0, 0);
    }
    else if (p < 0.6) {
      // CRAFT: Camera orbits to show the studio lighting up — sweeping motion
      const t = sectionProgress(p, 0.35, 0.6);
      const angle = t * Math.PI * 0.3;
      targetPos.set(
        Math.sin(angle) * 10,
        THREE.MathUtils.lerp(1.5, 2, t),
        Math.cos(angle) * 10
      );
      targetLookAt.set(0, 0, 0);
    }
    else if (p < 0.8) {
      // WORK: Pull back wide — revealing the full reel in its glory
      const t = sectionProgress(p, 0.6, 0.8);
      targetPos.set(
        THREE.MathUtils.lerp(3, -2, smoothStep(t)),
        THREE.MathUtils.lerp(2, 1, t),
        THREE.MathUtils.lerp(10, 12, smoothStep(t))
      );
      targetLookAt.set(0, 0, 0);
    }
    else {
      // TEAM + CONTACT: Settle center, slowly pull back to a respectful distance
      const t = sectionProgress(p, 0.8, 1.0);
      targetPos.set(
        THREE.MathUtils.lerp(-2, 0, smoothStep(t)),
        THREE.MathUtils.lerp(1, 0.5, t),
        THREE.MathUtils.lerp(12, 16, smoothStep(t))
      );
      targetLookAt.set(0, THREE.MathUtils.lerp(0, -0.5, t), 0);
    }

    // Smooth interpolation — never jumps, always glides
    cameraRef.current.position.lerp(targetPos, 0.03);
    currentLookAt.lerp(targetLookAt, 0.03);
    cameraRef.current.lookAt(currentLookAt);
  });

  // Particle count scales with device capability
  const particleCount = tier === 'mobile' ? 40 : tier === 'tablet' ? 80 : 150;

  return (
    <>
      <PerspectiveCamera 
        ref={cameraRef} 
        makeDefault 
        position={[0, 0.5, 14]} 
        fov={tier === 'mobile' ? 60 : 42} 
      />
      
      {/* 
        LIGHTING: Minimal ambient + one key directional.
        No Environment HDR on mobile (saves ~200KB + GPU texture lookup).
      */}
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color={GOLD} />
      
      {tier === 'desktop' && <Environment preset="night" />}
      
      {/* The persistent golden reel — always visible, always telling the story */}
      <GoldenReel scrollRef={scrollRef} tier={tier} />
      
      {/* Dust particles — lightweight procedural, scales with tier */}
      <DustParticles scrollRef={scrollRef} count={particleCount} />
      
      {/* Studio props — only on desktop/tablet (culled internally by section) */}
      {tier !== 'mobile' && <StudioPropsOptimized scrollRef={scrollRef} />}
      
      {/* Sequential lights — desktop only (4 point lights) */}
      {tier === 'desktop' && <StudioLights scrollRef={scrollRef} />}
      
      {/* Dark studio enclosure sphere */}
      <mesh>
        <sphereGeometry args={[25, tier === 'mobile' ? 8 : 16, tier === 'mobile' ? 8 : 16]} />
        <meshBasicMaterial color={DARK} side={THREE.BackSide} />
      </mesh>
    </>
  );
};


// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT — Canvas wrapper with device detection
// ═══════════════════════════════════════════════════════════════

export default function CinematicFlowScene() {
  const [tier, setTier] = useState<DeviceTier>('desktop');

  const detectTier = useCallback(() => {
    const w = window.innerWidth;
    // Also check for touch as a tablet indicator
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (w < 768 || (isTouch && w < 1024)) setTier('mobile');
    else if (w < 1280 || isTouch) setTier('tablet');
    else setTier('desktop');
  }, []);

  useEffect(() => {
    detectTier();
    window.addEventListener('resize', detectTier);
    return () => window.removeEventListener('resize', detectTier);
  }, [detectTier]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-black w-full h-screen overflow-hidden">
      <Canvas
        /**
         * PERFORMANCE CONFIG:
         * - dpr: Mobile gets 1x, desktop up to 1.5x (not 2x — diminishing returns)
         * - antialias: Off on mobile (saves significant GPU fill rate)
         * - powerPreference: Always high-performance
         * - shadows: Completely disabled (ContactShadows removed)
         * - alpha: false (no compositing overhead)
         */
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
      
      {/* Cinematic vignette overlay — pure CSS, zero GPU cost */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
