'use client';

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, PerspectiveCamera, Environment, useScroll, Preload, AdaptiveDpr, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useCinematicStore } from '@/lib/store';

import FilmCarousel3D from './FilmCarousel3D';
import HTMLOverlay from './HTMLOverlay';
import ProjectFrames from './ProjectFrames'; // Keeping this if needed, or we can use the carousel for reels.

const GOLD = '#D4AF77';
const DARK = '#050505';

type DeviceTier = 'mobile' | 'tablet' | 'desktop';

// ═══════════════════════════════════════════════════════════════
// CLAPPERBOARD INTRO 
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

  // Particle burst
  const sparkParticles = useMemo(() => {
    const pos = new Float32Array(100 * 3);
    for(let i=0; i<100; i++) {
      pos[i*3] = (Math.random()-0.5)*0.6;
      pos[i*3+1] = (Math.random()-0.5)*0.6;
      pos[i*3+2] = (Math.random()-0.5)*0.6;
    }
    return pos;
  }, []);

  const runClapSequence = useCallback(() => {
    if (!armRef.current || !groupRef.current) return;
    
    const tl = gsap.timeline({ delay: 0.5 });
    // Initial state: ARM RAISED
    gsap.set(armRef.current.rotation, { z: -0.8 }); 

    tl.to(armRef.current.rotation, {
      z: 0.02,
      duration: 0.12,
      ease: "power4.in",
      onComplete: () => {
        // Flash & Particles
        if (lightRef.current) gsap.fromTo(lightRef.current, { intensity: 0 }, { intensity: 25, duration: 0.08, yoyo: true, repeat: 1 });
        if (sparkRef.current) {
          gsap.fromTo(sparkRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 2.5, y: 2.5, z: 2.5, duration: 0.4, ease: "expo.out" });
          gsap.to(sparkRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.3, delay: 0.2 });
        }
        // Mechanical Bounce
        gsap.to(groupRef.current!.position, {
          y: "-=0.06",
          duration: 0.04,
          yoyo: true,
          repeat: 2,
          ease: "bounce.out"
        });
      }
    })
    // Hide
    .to(groupRef.current.position, {
      z: -4,
      y: -2,
      duration: 1.0,
      ease: "power2.inOut",
      delay: 0.6
    })
    .to(groupRef.current.rotation, {
      x: -1,
      duration: 1.0,
      ease: "power2.inOut"
    }, "<")
    .add(() => {
      setIntroStage('ready');
    }, "-=0.3");
  }, [setIntroStage]);

  // Handle contact form clap trigger
  useEffect(() => {
    if (clapTrigger > 0 && groupRef.current && armRef.current) {
       gsap.set(groupRef.current.position, { x: 0, y: 4, z: 1 });
       gsap.set(groupRef.current.rotation, { x: 0.2, y: 0, z: 0 });
       gsap.set(armRef.current.rotation, { z: -0.8 });

       const tl = gsap.timeline();
       tl.to(groupRef.current.position, { y: 0, duration: 0.5, ease: "power2.out" })
         .to(armRef.current.rotation, {
            z: 0.02, duration: 0.15, ease: "power4.in",
            onComplete: () => {
              if (lightRef.current) gsap.fromTo(lightRef.current, { intensity: 0 }, { intensity: 30, duration: 0.05, yoyo: true, repeat: 1 });
              if (sparkRef.current) {
                gsap.fromTo(sparkRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 3, y: 3, z: 3, duration: 0.4, ease: "expo.out" });
                gsap.to(sparkRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.3, delay: 0.1 });
              }
            }
         })
         .to(groupRef.current.position, { y: -4, duration: 0.8, ease: "power2.in", delay: 1.5 });
    }
  }, [clapTrigger]);

  useEffect(() => {
    if (introStage === 'clapper' && !hasRun) {
      setHasRun(true);
      runClapSequence();
    } else if (introStage === 'ready' && !hasRun) {
      if (groupRef.current) groupRef.current.visible = false;
    }
  }, [introStage, hasRun, runClapSequence]);

  return (
    <group ref={groupRef} position={[0, -0.2, 3]}>
      <pointLight ref={lightRef} color={GOLD} intensity={0} distance={8} position={[0, 0.5, 0.5]} />
      
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
        <pointsMaterial color={GOLD} size={0.04} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
};


// ═══════════════════════════════════════════════════════════════
// GOLDEN FILM STRIP
// ═══════════════════════════════════════════════════════════════
const FilmStripEnv = React.memo(({ tier }: { tier: DeviceTier }) => {
  const stripRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const stripMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#080808',
    metalness: 0.9,
    roughness: 0.3,
    side: THREE.DoubleSide,
  }), []);

  const edgeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: GOLD,
    metalness: 1,
    roughness: 0.2,
    emissive: GOLD,
    emissiveIntensity: 0.05,
  }), []);

  const stripLength = 40;
  const stripGeo = useMemo(() => new THREE.PlaneGeometry(stripLength, 1.8), [stripLength]);
  const edgeGeo = useMemo(() => new THREE.PlaneGeometry(stripLength, 0.03), [stripLength]);

  useFrame((state) => {
    if (!stripRef.current) return;
    const p = scroll.offset; // 0 to 1
    // The strip maps the whole scroll uniformly
    stripRef.current.position.x = THREE.MathUtils.lerp(10, -25, p);
    stripRef.current.position.y = Math.sin(p * Math.PI * 4) * 0.2;
    stripRef.current.rotation.z = Math.sin(p * Math.PI) * 0.05;
    stripRef.current.rotation.x = 0.05;
  });

  return (
    <group ref={stripRef} position={[0, 0, -4]}>
      <mesh geometry={stripGeo} material={stripMaterial} />
      <mesh geometry={edgeGeo} material={edgeMaterial} position={[0, 0.9, 0.01]} />
      <mesh geometry={edgeGeo} material={edgeMaterial} position={[0, -0.9, 0.01]} />
    </group>
  );
});
FilmStripEnv.displayName = 'FilmStripEnv';

// ═══════════════════════════════════════════════════════════════
// DUST PARTICLES & DOLLY
// ═══════════════════════════════════════════════════════════════
const SceneOrchestrator = ({ tier }: { tier: DeviceTier }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const scroll = useScroll();
  const introStage = useCinematicStore((state) => state.introStage);
  
  const currentLookAt = useMemo(() => new THREE.Vector3(0, 0, -3), []);
  const pointsRef = useRef<THREE.Points>(null);

  // Dust
  const particleCount = tier === 'mobile' ? 40 : 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; 
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; 
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;
    }
    return pos;
  }, [particleCount]);

  const particleMat = useMemo(() => new THREE.PointsMaterial({
    color: GOLD, size: 0.04, transparent: true, opacity: 0.4, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!cameraRef.current) return;
    const p = scroll.offset;
    const t = state.clock.elapsedTime;

    // Dust animation
    if (pointsRef.current) {
        pointsRef.current.rotation.y = t * 0.003;
        pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.02;
    }

    if (introStage === 'clapper') {
      cameraRef.current.position.lerp(new THREE.Vector3(0, 0.2, 5), 0.05);
      currentLookAt.lerp(new THREE.Vector3(0, 0, 3), 0.05);
      cameraRef.current.lookAt(currentLookAt);
    } else {
      // Dolly Camera using scroll logic explicitly
      const targetZ = THREE.MathUtils.lerp(5, 1, p);
      const targetX = Math.sin(p * Math.PI * 2) * 0.5;
      const targetY = 0.2 + Math.sin(p * Math.PI) * 0.2;

      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.02);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.02);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 0.02);

      currentLookAt.x = THREE.MathUtils.lerp(currentLookAt.x, targetX * 0.3, 0.05);
      currentLookAt.z = THREE.MathUtils.lerp(currentLookAt.z, -3, 0.05);
      cameraRef.current.lookAt(currentLookAt);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.2, 6]} fov={tier === 'mobile' ? 60 : 45} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 5, 2]} intensity={0.4} color={GOLD} />
      {tier === 'desktop' && <Environment preset="night" />}

      <points ref={pointsRef} material={particleMat}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      </points>

      <FilmStripEnv tier={tier} />
      <FilmCarousel3D tier={tier} />
      {/* Remove previous ProjectFrames from here and embed it inside The Reels logic if preferred, or keep as carousel HTML */}
      <ClapperAsset />
    </>
  );
};


// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function CinematicCanvas() {
  const [tier, setTier] = useState<DeviceTier>('desktop');
  const set3DLoaded = useCinematicStore((state) => state.set3DLoaded);

  const detectTier = useCallback(() => {
    const w = window.innerWidth;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (w < 768 || (isTouch && w < 1024)) setTier('mobile');
    else if (w < 1280 || isTouch) setTier('tablet');
    else setTier('desktop');
  }, []);

  useEffect(() => {
    detectTier();
    window.addEventListener('resize', detectTier);
    set3DLoaded(true);
    return () => window.removeEventListener('resize', detectTier);
  }, [detectTier, set3DLoaded]);

  return (
    <div className="fixed inset-0 z-0 bg-primary w-full h-[100dvh] overflow-hidden">
      <Canvas
        dpr={tier === 'mobile' ? [0.75, 1] : tier === 'tablet' ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: tier === 'desktop', powerPreference: 'high-performance', alpha: false }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={[DARK]} />
        
        {/* ScrollControls manages Lenis-like damping entirely within R3F */}
        <ScrollControls pages={6} damping={0.15} distance={1.2}>
          
          {/* 3D Scene */}
          <SceneOrchestrator tier={tier} />

          {/* Connected HTML DOM */}
          <Scroll html style={{ width: '100vw' }}>
            <HTMLOverlay />
          </Scroll>

        </ScrollControls>

        <AdaptiveDpr pixelated />
        <Preload all />
      </Canvas>
    </div>
  );
}
