'use client';

/**
 * CinematicStoryScene — Golden Film Strip & Unified Experience
 * ==================================================
 * 
 * Rebuilt as a Single, Persistent R3F Canvas.
 * Handles the Clapperboard intro sequence, the continuous Film Strip dolly,
 * and background atmospheric elements (lights, dust).
 */

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, AdaptiveDpr, Preload, useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useCinematicStore } from '@/lib/store';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const GOLD = '#D4AF77';
const GOLD_WARM = '#C5A059';
const DARK = '#050505';

type DeviceTier = 'mobile' | 'tablet' | 'desktop';

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
// CLAPPERBOARD ASSET (Merged into global scene)
// ═══════════════════════════════════════════════════════════════
const ClapperAsset = () => {
  const groupRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const sparkRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const introStage = useCinematicStore((state) => state.introStage);
  const setIntroStage = useCinematicStore((state) => state.setIntroStage);
  const clapTrigger = useCinematicStore((state) => state.clapTrigger);
  const [hasRun, setHasRun] = useState(false);

  // Materials
  const boardMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0A0A0A', roughness: 0.4, metalness: 0.1 }), []);
  const goldDetailMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2 }), []);
  const fontMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.3 }), []);

  const WIDTH = 1.4;
  const HEIGHT = 1.0;

  const sparkParticles = useMemo(() => {
    const pos = new Float32Array(50 * 3);
    for(let i=0; i<50; i++) {
      pos[i*3] = (Math.random()-0.5)*0.4;
      pos[i*3+1] = (Math.random()-0.5)*0.4;
      pos[i*3+2] = (Math.random()-0.5)*0.4;
    }
    return pos;
  }, []);

  const runClapSequence = useCallback(() => {
    if (!armRef.current || !groupRef.current) return;
    
    const tl = gsap.timeline({ delay: 0.6 });
    gsap.set(armRef.current.rotation, { z: -0.8 }); 

    tl.to(armRef.current.rotation, {
      z: 0.02,
      duration: 0.15,
      ease: "power4.in",
      onComplete: () => {
        if (lightRef.current) gsap.fromTo(lightRef.current, { intensity: 0 }, { intensity: 15, duration: 0.05, yoyo: true, repeat: 1 });
        if (sparkRef.current) {
          gsap.fromTo(sparkRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, ease: "expo.out" });
          gsap.to(sparkRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.2, delay: 0.1 });
        }
        gsap.to(groupRef.current!.position, {
          y: "-=0.04",
          duration: 0.04,
          yoyo: true,
          repeat: 2,
          ease: "bounce.out"
        });
      }
    })
    .to(groupRef.current.position, {
      z: -4,
      y: -2,
      duration: 1.2,
      ease: "power2.in",
      delay: 0.5
    })
    .to(groupRef.current.rotation, {
      x: -1,
      duration: 1.2,
      ease: "power2.in"
    }, "<")
    .add(() => {
      setIntroStage('ready');
    }, "-=0.4");
  }, [setIntroStage]);

  // Handle contact form clap trigger
  useEffect(() => {
    if (clapTrigger > 0 && groupRef.current && armRef.current) {
       // Reset position quickly behind camera or drop it in
       gsap.set(groupRef.current.position, { x: 0, y: 3, z: 2 });
       gsap.set(groupRef.current.rotation, { x: 0.2, y: 0, z: 0 });
       gsap.set(armRef.current.rotation, { z: -0.8 });

       const tl = gsap.timeline();
       tl.to(groupRef.current.position, { y: 0, duration: 0.5, ease: "power2.out" })
         .to(armRef.current.rotation, {
            z: 0.02, duration: 0.15, ease: "power4.in",
            onComplete: () => {
              if (lightRef.current) gsap.fromTo(lightRef.current, { intensity: 0 }, { intensity: 20, duration: 0.05, yoyo: true, repeat: 1 });
              if (sparkRef.current) {
                gsap.fromTo(sparkRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 2, duration: 0.3, ease: "expo.out" });
                gsap.to(sparkRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.2, delay: 0.1 });
              }
            }
         })
         .to(groupRef.current.position, { y: -3, duration: 0.8, ease: "power2.in", delay: 1 });
    }
  }, [clapTrigger]);

  useEffect(() => {
    if (introStage === 'clapper' && !hasRun) {
      setHasRun(true);
      runClapSequence();
    } else if (introStage === 'ready' && !hasRun) {
      // If skipped, move out immediately
      if (groupRef.current) groupRef.current.visible = false;
    }
  }, [introStage, hasRun, runClapSequence]);

  useFrame((state) => {
    if (!groupRef.current || introStage === 'ready') return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 3]}>
      <pointLight ref={lightRef} color={GOLD} intensity={0} distance={5} position={[0, 0.5, 0.5]} />
      
      <mesh>
        <boxGeometry args={[WIDTH, HEIGHT, 0.1]} />
        <primitive object={boardMat} attach="material" />
      </mesh>
      
      <group position={[0, 0, 0.06]}>
        <Text position={[-0.5, 0.35, 0]} fontSize={0.04} material={fontMat} anchorX="left">PROD.</Text>
        <Text position={[-0.5, 0.1, 0]} fontSize={0.04} material={fontMat} anchorX="left">SCENE</Text>
        <Text position={[0, 0.1, 0]} fontSize={0.04} material={fontMat} anchorX="left">TAKE</Text>
        <Text position={[0.4, 0.35, 0]} fontSize={0.04} material={fontMat} anchorX="right">GOLDEN PUSHERS</Text>
        <Text position={[0, -0.2, 0]} fontSize={0.12} material={fontMat}>ACTION!</Text>
      </group>

      <group ref={armRef} position={[-WIDTH/2, HEIGHT/2, 0]}>
        <mesh position={[WIDTH/2, 0.05, 0]}>
          <boxGeometry args={[WIDTH, 0.1, 0.1]} />
          <primitive object={boardMat} attach="material" />
        </mesh>
        <mesh position={[WIDTH/2, 0.05, 0.051]}>
          <boxGeometry args={[WIDTH, 0.1, 0.001]} />
          <primitive object={goldDetailMat} attach="material" />
        </mesh>
      </group>
      
      <mesh position={[-WIDTH/2, HEIGHT/2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} />
        <primitive object={goldDetailMat} attach="material" />
      </mesh>

      <points ref={sparkRef} scale={[0,0,0]} position={[0, HEIGHT/2, 0.1]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparkParticles, 3]} />
        </bufferGeometry>
        <pointsMaterial color={GOLD} size={0.03} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
};


// ═══════════════════════════════════════════════════════════════
// GOLDEN FILM STRIP
// ═══════════════════════════════════════════════════════════════
const FilmStrip = React.memo(({ scrollRef, tier }: { scrollRef: React.MutableRefObject<number>, tier: DeviceTier }) => {
  const stripRef = useRef<THREE.Group>(null);
  const frameCount = tier === 'mobile' ? 12 : tier === 'tablet' ? 18 : 24;
  const frameSpacing = 1.8;
  const stripLength = frameCount * frameSpacing;

  const stripMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0A0A0A',
    metalness: 0.8,
    roughness: 0.4,
    side: THREE.DoubleSide,
  }), []);

  const perforationMaterial = useMemo(() => new THREE.MeshBasicMaterial({ color: '#000000' }), []);
  const stripGeo = useMemo(() => new THREE.PlaneGeometry(stripLength, 1.6), [stripLength]);
  const frameGeo = useMemo(() => new THREE.PlaneGeometry(1.2, 0.8), []);
  const perfGeo = useMemo(() => new THREE.CircleGeometry(0.04, 6), []);

  const proxyTextures = useTexture([
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop'
  ]);

  const frameMaterials = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => new THREE.MeshStandardMaterial({
      map: proxyTextures[i % proxyTextures.length],
      color: '#ffffff',
      emissive: GOLD,
      emissiveIntensity: 0.1,
      metalness: 0.4,
      roughness: 0.6,
      transparent: true,
      opacity: 0.8,
    }));
  }, [frameCount, proxyTextures]);

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
    stripRef.current.position.x = THREE.MathUtils.lerp(stripLength * 0.3, -stripLength * 0.4, p);
    stripRef.current.position.y = Math.sin(p * Math.PI * 2) * 0.15;
    stripRef.current.rotation.z = Math.sin(p * Math.PI) * 0.02;
    stripRef.current.rotation.x = 0.1;

    frameMaterials.forEach((mat, i) => {
      const frameProgress = i / frameCount;
      const section = SECTIONS.find(s => frameProgress >= s.start && frameProgress < s.end);
      if (!section) return;
      const sectionActive = sectionProgress(p, section.start, section.end);
      const isCurrentFrame = Math.abs(frameProgress - p) < 0.08;
      const targetGlow = isCurrentFrame ? 0.6 : sectionActive > 0 && sectionActive < 1 ? 0.15 : 0.02;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetGlow, 0.05);
    });
  });

  return (
    <group ref={stripRef} position={[0, 0, -3]}>
      <mesh geometry={stripGeo} material={stripMaterial} />
      <mesh geometry={edgeGeo} material={edgeMaterial} position={[0, 0.8, 0.01]} />
      <mesh geometry={edgeGeo} material={edgeMaterial} position={[0, -0.8, 0.01]} />
      {frameMaterials.map((mat, i) => {
        const x = (i - frameCount / 2) * frameSpacing + frameSpacing / 2;
        return (
          <group key={i} position={[x, 0, 0.01]}>
            <mesh geometry={frameGeo} material={mat} />
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
// GOLDEN DUST & PROJECTOR LIGHT
// ═══════════════════════════════════════════════════════════════
const GoldenDust = React.memo(({ scrollRef, count }: { scrollRef: React.MutableRefObject<number>, count: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; pos[i * 3 + 1] = (Math.random() - 0.5) * 8; pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  }, [count]);
  const particleMat = useMemo(() => new THREE.PointsMaterial({
    color: GOLD, size: 0.03, transparent: true, opacity: 0.35, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const p = scrollRef.current;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.003;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.02;
    const intensity = p < 0.05 ? p * 8 : p > 0.95 ? (1 - p) * 20 : 0.5;
    particleMat.opacity = 0.2 + intensity * 0.3;
  });

  return (
    <points ref={pointsRef} material={particleMat}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    </points>
  );
});
GoldenDust.displayName = 'GoldenDust';

const ProjectorLight = React.memo(({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  const lightRef = useRef<THREE.PointLight>(null);
  const { activeCraftIndex } = useCinematicStore();

  useFrame(() => {
    if (!lightRef.current) return;
    const p = scrollRef.current;
    const isCraftSection = p >= 0.25 && p <= 0.6;
    let targetX = THREE.MathUtils.lerp(8, -8, p);
    if (isCraftSection) {
      const craftProgress = activeCraftIndex / 5;
      targetX = THREE.MathUtils.lerp(2, -2, craftProgress);
    }
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.1);
    lightRef.current.position.y = 0;
    lightRef.current.position.z = 2;

    const intensity = isCraftSection ? 8 : 4;
    const flicker = 1 + Math.sin(p * 50) * 0.03;
    lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, intensity * flicker, 0.1);
  });

  return <pointLight ref={lightRef} color={GOLD} distance={12} decay={2} />;
});
ProjectorLight.displayName = 'ProjectorLight';

// ═══════════════════════════════════════════════════════════════
// SCENE ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════
const SceneOrchestrator = ({ tier }: { tier: DeviceTier }) => {
  const scrollRef = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentLookAt = useMemo(() => new THREE.Vector3(0, 0, -3), []);
  const introStage = useCinematicStore((state) => state.introStage);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) scrollRef.current = window.scrollY / total;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state) => {
    if (!cameraRef.current) return;
    const p = scrollRef.current;
    const t = state.clock.elapsedTime;

    if (introStage === 'clapper') {
      // Focus on clapperboard initially
      cameraRef.current.position.lerp(new THREE.Vector3(0, 0.2, 5), 0.05);
      currentLookAt.lerp(new THREE.Vector3(0, 0, 3), 0.05);
      cameraRef.current.lookAt(currentLookAt);
    } else {
      // Continuous slow semantic forward dolly for scroll
      const timeDrift = t * 0.05;
      const z = THREE.MathUtils.lerp(6, 2.5, p) - (timeDrift % 1); 
      
      const x = Math.sin(p * Math.PI * 2) * 0.3;
      const y = 0.2 + Math.sin(p * Math.PI) * 0.15;

      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, x, 0.015);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, y, 0.015);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, z, 0.015);

      currentLookAt.x = THREE.MathUtils.lerp(currentLookAt.x, x * 0.5, 0.02);
      currentLookAt.z = THREE.MathUtils.lerp(currentLookAt.z, -3, 0.05);
      cameraRef.current.lookAt(currentLookAt);
    }
  });

  const particleCount = tier === 'mobile' ? 30 : tier === 'tablet' ? 60 : 120;

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.2, 6]} fov={tier === 'mobile' ? 55 : 40} />
      <ambientLight intensity={0.06} />
      <directionalLight position={[0, 5, 3]} intensity={0.3} color={GOLD} />
      {tier === 'desktop' && <Environment preset="night" />}
      
      {/* Background Film strip element */}
      <FilmStrip scrollRef={scrollRef} tier={tier} />
      
      <GoldenDust scrollRef={scrollRef} count={particleCount} />
      {tier !== 'mobile' && <ProjectorLight scrollRef={scrollRef} />}
      
      {/* The Clapperboard runs the intro and disappears into the background */}
      <ClapperAsset />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// EXPORT CANVAS
// ═══════════════════════════════════════════════════════════════
export default function CinematicStoryScene() {
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
    set3DLoaded(true);
    return () => window.removeEventListener('resize', detectTier);
  }, [detectTier, set3DLoaded]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#0A0A0A] w-full h-screen overflow-hidden">
      <Canvas
        dpr={tier === 'mobile' ? [0.75, 1] : tier === 'tablet' ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: tier === 'desktop', powerPreference: 'high-performance', alpha: false }}
        performance={{ min: 0.5 }}
      >
        <React.Suspense fallback={null}>
          <color attach="background" args={[DARK]} />
          <SceneOrchestrator tier={tier} />
          <AdaptiveDpr pixelated />
        </React.Suspense>
      </Canvas>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
