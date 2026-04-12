'use client';

/**
 * CinematicStoryScene — Living Film Studio Experience
 * ==================================================
 * 
 * Rebuilt as a reactive, persistent narrative studio that maps 
 * specific 3D props and lighting changes gracefully to the 
 * exact scroll depth of the corresponding DOM sections.
 */

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, AdaptiveDpr, Text, SoftShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useCinematicStore } from '@/lib/store';
import gsap from 'gsap';

// ═══════════════════════════════════════════════════════════════
// SHARED MATERIALS & UTILS
// ═══════════════════════════════════════════════════════════════
const GOLD = '#D4AF77';
const DARK = '#050505';

type DeviceTier = 'mobile' | 'tablet' | 'desktop';

const SECTIONS = {
  hero:    { s: 0.00, e: 0.15 },
  ethos:   { s: 0.15, e: 0.30 },
  craft:   { s: 0.30, e: 0.55 },
  work:    { s: 0.55, e: 0.75 },
  team:    { s: 0.75, e: 0.90 },
  contact: { s: 0.90, e: 1.00 },
};

function getSectionWeight(p: number, s: number, e: number): number {
  // Peak weight is when scroll is perfectly inside the section, trailing off smoothly
  if (p < s - 0.1 || p > e + 0.1) return 0;
  const mid = (s + e) / 2;
  const dist = Math.abs(p - mid) / ((e - s) / 2 + 0.1);
  return Math.max(0, 1 - dist);
}

function useSharedMaterials() {
  const mDark = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0A0A0A', roughness: 0.3, metalness: 0.9 }), []);
  const mGold = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2 }), []);
  const matteBlack = useMemo(() => new THREE.MeshStandardMaterial({ color: '#030303', roughness: 0.8, metalness: 0.2 }), []);
  return { mDark, mGold, matteBlack };
}

// ═══════════════════════════════════════════════════════════════
// CLAPPERBOARD & INTRO
// ═══════════════════════════════════════════════════════════════
const ClapperAsset = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
  const groupRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  
  const introStage = useCinematicStore((state) => state.introStage);
  const setIntroStage = useCinematicStore((state) => state.setIntroStage);
  const clapTrigger = useCinematicStore((state) => state.clapTrigger);
  const { mDark, mGold } = useSharedMaterials();
  const fontMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.2 }), []);
  
  const [hasRunIntro, setHasRunIntro] = useState(false);
  const ethosClapDone = useRef(false);

  const WIDTH = 1.4;
  const HEIGHT = 1.0;

  // Intro Sequence
  useEffect(() => {
    if (introStage === 'clapper' && !hasRunIntro && armRef.current && groupRef.current) {
      setHasRunIntro(true);
      gsap.set(armRef.current.rotation, { z: -0.8 }); 
      
      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(armRef.current.rotation, {
        z: 0.02, duration: 0.15, ease: "power4.in",
        onComplete: () => {
          gsap.fromTo(groupRef.current!.position, { y: 3 }, { y: 2.95, duration: 0.05, yoyo: true, repeat: 1 });
        }
      })
      .to(groupRef.current.position, { z: -8, y: 5, duration: 1.0, ease: "power2.inOut", delay: 0.4 })
      .add(() => setIntroStage('ready'), "-=0.2");
    }
  }, [introStage, hasRunIntro, setIntroStage]);

  // Form Submission Sequence
  useEffect(() => {
    if (clapTrigger > 0 && groupRef.current && armRef.current) {
       gsap.set(groupRef.current.position, { x: 0, y: 4, z: 1 });
       gsap.set(groupRef.current.rotation, { x: 0.2, y: 0, z: 0 });
       gsap.set(armRef.current.rotation, { z: -0.8 });
       const tl = gsap.timeline();
       tl.to(groupRef.current.position, { y: 0, duration: 0.5, ease: "power2.out" })
         .to(armRef.current.rotation, { z: 0.02, duration: 0.15, ease: "power4.in" })
         .to(groupRef.current.position, { y: -3, duration: 0.8, ease: "power2.in", delay: 1 });
    }
  }, [clapTrigger]);

  useFrame((state, delta) => {
    if (!groupRef.current || introStage !== 'ready' || clapTrigger > 0) return;
    const p = scrollRef.current;
    const ethosWeight = getSectionWeight(p, SECTIONS.ethos.s, SECTIONS.ethos.e);
    
    // Position Clapperboard deep in scene during Ethos
    const targetY = THREE.MathUtils.lerp(-3, -0.5, ethosWeight);
    const targetX = THREE.MathUtils.lerp(3, 2, ethosWeight);
    const targetZ = THREE.MathUtils.lerp(-5, -2, ethosWeight);
    const targetRotX = THREE.MathUtils.lerp(1, 0, ethosWeight);
    const targetRotY = THREE.MathUtils.lerp(1, -0.2, ethosWeight);

    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 4 * delta);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 4 * delta);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 4 * delta);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 4 * delta);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 4 * delta);

    // Elegant slow snap during Ethos
    if (ethosWeight > 0.8 && !ethosClapDone.current && armRef.current) {
        ethosClapDone.current = true;
        gsap.to(armRef.current.rotation, { z: -0.8, duration: 0.8, ease: "power2.out" });
        gsap.to(armRef.current.rotation, { z: 0.02, duration: 0.1, ease: "power4.in", delay: 1 });
    } else if (ethosWeight < 0.2) {
        ethosClapDone.current = false; // reset
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 2]}>
      <mesh><boxGeometry args={[WIDTH, HEIGHT, 0.1]} /><primitive object={mDark} attach="material" /></mesh>
      <group position={[0, 0, 0.06]}>
        <Text position={[-0.5, 0.35, 0]} fontSize={0.04} material={fontMat} anchorX="left">PROD.</Text>
        <Text position={[0, -0.2, 0]} fontSize={0.12} material={fontMat}>ACTION!</Text>
        <Text position={[0.4, 0.35, 0]} fontSize={0.04} material={fontMat} anchorX="right">GOLDEN PUSHERS</Text>
      </group>
      <group ref={armRef} position={[-WIDTH/2, HEIGHT/2, 0]}>
        <mesh position={[WIDTH/2, 0.05, 0]}><boxGeometry args={[WIDTH, 0.1, 0.1]} /><primitive object={mDark} attach="material" /></mesh>
        <mesh position={[WIDTH/2, 0.05, 0.051]}><boxGeometry args={[WIDTH, 0.1, 0.001]} /><primitive object={mGold} attach="material" /></mesh>
      </group>
      <mesh position={[-WIDTH/2, HEIGHT/2, 0]} rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[0.04, 0.04, 0.15, 12]} /><primitive object={mGold} attach="material" /></mesh>
    </group>
  );
};

// ═══════════════════════════════════════════════════════════════
// BOOM MICROPHONE (Ethos)
// ═══════════════════════════════════════════════════════════════
const BoomMic = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
   const groupRef = useRef<THREE.Group>(null);
   const { matteBlack, mGold } = useSharedMaterials();

   useFrame((state, delta) => {
     if(!groupRef.current) return;
     const p = scrollRef.current;
     const weight = getSectionWeight(p, SECTIONS.ethos.s, SECTIONS.ethos.e + 0.1);
     
     const targetY = THREE.MathUtils.lerp(5, 1.8, weight);
     const rotZ = THREE.MathUtils.lerp(Math.PI/4, 0.2, weight);
     
     groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 4 * delta);
     groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, rotZ, 4 * delta);
   });

   return (
       <group ref={groupRef} position={[-2, 5, -2]} rotation={[0.2, -0.4, 0.2]}>
          {/* Pole */}
          <mesh position={[0, 2, 0]}><cylinderGeometry args={[0.02, 0.02, 4]} /><primitive object={matteBlack} attach="material" /></mesh>
          {/* Blimp Box / Capsule */}
          <mesh position={[0, 0, 0]}><capsuleGeometry args={[0.15, 0.6, 4, 16]} /><primitive object={matteBlack} attach="material" /></mesh>
          {/* Gold rings */}
          <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.16, 0.16, 0.03, 16]} /><primitive object={mGold} attach="material" /></mesh>
          <mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.16, 0.16, 0.03, 16]} /><primitive object={mGold} attach="material" /></mesh>
       </group>
   );
};

// ═══════════════════════════════════════════════════════════════
// VINTAGE CAMERA (The Reels)
// ═══════════════════════════════════════════════════════════════
const VintageCamera = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
    const groupRef = useRef<THREE.Group>(null);
    const lensRef = useRef<THREE.Group>(null);
    const { mDark, mGold, matteBlack } = useSharedMaterials();
 
    useFrame((state, delta) => {
      if(!groupRef.current || !lensRef.current) return;
      const p = scrollRef.current;
      const weight = getSectionWeight(p, SECTIONS.work.s, SECTIONS.work.e);
      
      const targetX = THREE.MathUtils.lerp(-5, -1.8, weight);
      const targetZ = THREE.MathUtils.lerp(-8, -1.5, weight);
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 2 * delta);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 2 * delta);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0.4, 2 * delta);
 
      // Rack Focus Twist
      lensRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI * 2, weight);
      lensRef.current.position.z = THREE.MathUtils.lerp(0.5, 0.65, weight); // lens expands
    });
 
    return (
        <group ref={groupRef} position={[-5, -0.4, -8]}>
           {/* Body */}
           <mesh><boxGeometry args={[1, 1.2, 1]} /><primitive object={mDark} attach="material" /></mesh>
           <mesh position={[0, 0.7, 0]}><cylinderGeometry args={[0.4, 0.4, 0.6]} rotation={[0,0,Math.PI/2]} /><primitive object={mDark} attach="material" /></mesh>
           
           {/* Lens Group */}
           <group ref={lensRef} position={[0, 0, 0.5]}>
              <mesh position={[0,0,0]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.3, 0.35, 0.4, 24]} /><primitive object={matteBlack} attach="material" /></mesh>
              <mesh position={[0,0,0.2]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.31, 0.31, 0.05, 24]} /><primitive object={mGold} attach="material" /></mesh>
              {/* Glass Element */}
              <mesh position={[0,0,0.25]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.25, 0.25, 0.02, 24]} />
                 <meshStandardMaterial color="#0A0A0A" metalness={1} roughness={0} />
              </mesh>
           </group>
        </group>
    );
};

// ═══════════════════════════════════════════════════════════════
// DIRECTOR CHAIR (The Architects)
// ═══════════════════════════════════════════════════════════════
const DirectorChair = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
    const groupRef = useRef<THREE.Group>(null);
    const { mGold, matteBlack } = useSharedMaterials();
 
    useFrame((state, delta) => {
      if(!groupRef.current) return;
      const p = scrollRef.current;
      const weight = getSectionWeight(p, SECTIONS.team.s, SECTIONS.team.e);
      
      const targetX = THREE.MathUtils.lerp(5, 2.5, weight);
      const targetZ = THREE.MathUtils.lerp(-8, -2, weight);
      // Gentle rotation tracking the user scrolling
      const targetRotY = THREE.MathUtils.lerp(-1.5, -0.4, weight);
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 2 * delta);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 2 * delta);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 3 * delta);
    });
 
    return (
        <group ref={groupRef} position={[5, -1.2, -8]}>
           {/* Legs */}
           <mesh position={[-0.4, 0.5, 0.4]}><boxGeometry args={[0.05, 1, 0.05]} /><primitive object={matteBlack} attach="material" /></mesh>
           <mesh position={[0.4, 0.5, 0.4]}><boxGeometry args={[0.05, 1, 0.05]} /><primitive object={matteBlack} attach="material" /></mesh>
           <mesh position={[-0.4, 0.9, -0.4]}><boxGeometry args={[0.05, 1.8, 0.05]} /><primitive object={matteBlack} attach="material" /></mesh>
           <mesh position={[0.4, 0.9, -0.4]}><boxGeometry args={[0.05, 1.8, 0.05]} /><primitive object={matteBlack} attach="material" /></mesh>
           {/* Seat & Backrest Canvas */}
           <mesh position={[0, 1.0, 0]}><boxGeometry args={[0.8, 0.02, 0.8]} /><primitive object={matteBlack} attach="material" /></mesh>
           <mesh position={[0, 1.6, -0.4]}><boxGeometry args={[0.8, 0.3, 0.02]} /><primitive object={matteBlack} attach="material" /></mesh>
           {/* Gold Hinges */}
           <mesh position={[-0.4, 0.5, 0]}><boxGeometry args={[0.06, 0.06, 0.8]} /><primitive object={mGold} attach="material" /></mesh>
           <mesh position={[0.4, 0.5, 0]}><boxGeometry args={[0.06, 0.06, 0.8]} /><primitive object={mGold} attach="material" /></mesh>
        </group>
    );
};

// ═══════════════════════════════════════════════════════════════
// GOLDEN REELS & DUST
// ═══════════════════════════════════════════════════════════════
const SpinningReels = ({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) => {
    const groupRef = useRef<THREE.Group>(null);
    const { mDark, mGold } = useSharedMaterials();
 
    useFrame((state, delta) => {
      if(!groupRef.current) return;
      const p = scrollRef.current;
    const activeCraft = getSectionWeight(p, SECTIONS.craft.s, SECTIONS.craft.e);
    const activeWork = getSectionWeight(p, SECTIONS.work.s, SECTIONS.work.e);
      
    // Base spin vs accelerated spin during the Craft section
    const speed = THREE.MathUtils.lerp(0.01, 1.5, activeCraft + activeWork);
      
    groupRef.current.children.forEach((child, i) => {
        child.rotation.y += speed * delta * (i % 2 === 0 ? 1 : -1);
        
        if (activeWork > 0.1) {
            // Orbiting motion during portfolio/work section
            const orbitSpeed = state.clock.elapsedTime * 0.2;
            const radius = 4 + i;
            child.position.x = Math.cos(orbitSpeed + i) * radius;
            child.position.z = Math.sin(orbitSpeed + i) * radius - 5;
            child.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 2;
        } else {
            // Standard background positioning
            const targetX = (i - 1) * 3;
            const targetZ = -4 - (i % 2 === 0 ? 1 : 0);
            child.position.x = THREE.MathUtils.lerp(child.position.x, targetX, 2 * delta);
            child.position.z = THREE.MathUtils.lerp(child.position.z, targetZ, 2 * delta);
            child.position.y = THREE.MathUtils.lerp(child.position.y, Math.sin(state.clock.elapsedTime + i) * 0.1, 2 * delta);
        }
    });
    });
 
    return (
        <group ref={groupRef} position={[0, 0, -4]}>
            {[-1, 0, 1].map((pos, i) => (
                <group key={i} position={[pos * 3, Math.sin(i), -pos * 2]}>
                    <mesh rotation={[Math.PI/2, 0, 0]}><cylinderGeometry args={[1.5, 1.5, 0.05, 32]} /><primitive object={mDark} attach="material" /></mesh>
                    <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0.05, 0]}><cylinderGeometry args={[1.51, 1.51, 0.02, 32]} /><primitive object={mGold} attach="material" /></mesh>
                </group>
            ))}
        </group>
    );
};

const CinematicDust = React.memo(({ scrollRef, count, tier }: { scrollRef: React.MutableRefObject<number>, count: number, tier: DeviceTier }) => {
    const pointsRef = useRef<THREE.Points>(null);
    
    // Performance optimization: Significantly lower count on mobile
    const actualCount = useMemo(() => tier === 'mobile' ? Math.floor(count * 0.3) : count, [tier, count]);

    const positions = useMemo(() => {
      const pos = new Float32Array(actualCount * 3);
      for (let i = 0; i < actualCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 15;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      }
      return pos;
    }, [actualCount]);
  
    const particleMat = useMemo(() => new THREE.PointsMaterial({
      color: GOLD, size: 0.04, transparent: true, opacity: 0.2, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }), []);

    // Cleanup for disposal
    useEffect(() => {
      return () => {
        particleMat.dispose();
      };
    }, [particleMat]);
  
    useFrame((state) => {
      if (!pointsRef.current) return;
      const p = scrollRef.current;
      const t = state.clock.elapsedTime;
      
      // Dust swirling faster during interaction
      pointsRef.current.rotation.y = t * 0.01;
      pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.02;

      // Glow brighter at perfectly dark spots or ends
      const intensity = Math.abs(Math.sin(p * Math.PI));
      particleMat.opacity = 0.1 + intensity * 0.3;
    });
  
    return (
      <points ref={pointsRef} material={particleMat}>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      </points>
    );
});

// ═══════════════════════════════════════════════════════════════
// SCENE ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════
const SceneOrchestrator = ({ tier }: { tier: DeviceTier }) => {
  const scrollRef = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentLookAt = useMemo(() => new THREE.Vector3(0, 0, -3), []);
  const introStage = useCinematicStore((state) => state.introStage);
  
  const mainSpotLight = useRef<THREE.SpotLight>(null);
  const ambientLight = useRef<THREE.AmbientLight>(null);

  useEffect(() => {
    const onScroll = () => {
      // Calculate true 0 to 1 progress
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) scrollRef.current = Math.max(0, Math.min(1, window.scrollY / total));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    const p = scrollRef.current;

    // ----- CAMERA LOGIC -----
    if (introStage === 'clapper') {
      cameraRef.current.position.lerp(new THREE.Vector3(0, 0.2, 5), 0.05);
      currentLookAt.lerp(new THREE.Vector3(0, 0, 3), 0.05);
      cameraRef.current.lookAt(currentLookAt);
    } else {
      // Deep Cinematic Forward Dolly mapping from z = 6 at top to z = 1 at bottom
      const baseZ = THREE.MathUtils.lerp(6, 1, p);
      
      // Slight pan corresponding to the layout structure
      const panX = Math.sin(p * Math.PI * 3) * 0.4;
      const panY = 0.2 + Math.sin(p * Math.PI) * 0.1;

      // Contact Pull-back (End of page)
      const contactWeight = getSectionWeight(p, SECTIONS.contact.s, SECTIONS.contact.e);
      const targetZ = baseZ + contactWeight * 2; // pulls back slightly
      
      cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, panX, 2 * delta);
      cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, panY, 2 * delta);
      cameraRef.current.position.z = THREE.MathUtils.lerp(cameraRef.current.position.z, targetZ, 2 * delta);

      currentLookAt.x = THREE.MathUtils.lerp(currentLookAt.x, panX * 0.4, 2 * delta);
      currentLookAt.z = THREE.MathUtils.lerp(currentLookAt.z, -2, 2 * delta);
      cameraRef.current.lookAt(currentLookAt);
    }

    // ----- LIGHTING ATMOSPHERE -----
    if (ambientLight.current && mainSpotLight.current) {
        const contactWeight = getSectionWeight(p, SECTIONS.contact.s, SECTIONS.contact.e);
        const heroWeight = getSectionWeight(p, SECTIONS.hero.s, SECTIONS.hero.e);
        
        // Volumetric buildup at top, warm dim down at bottom
        ambientLight.current.intensity = THREE.MathUtils.lerp(0.05, 0.2, contactWeight);
        
        // Main Spot tracks scene selectively
        mainSpotLight.current.intensity = THREE.MathUtils.lerp(8, 2, contactWeight + heroWeight);
        mainSpotLight.current.position.x = THREE.MathUtils.lerp(0, -2, p);
    }
  });

  const particleCount = tier === 'mobile' ? 40 : tier === 'tablet' ? 80 : 150;

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.2, 6]} fov={tier === 'mobile' ? 55 : 40} />
      
      {/* Lighting Base */}
      <ambientLight ref={ambientLight} intensity={0.05} />
      <directionalLight position={[0, 5, 2]} intensity={0.3} color={GOLD} />
      <spotLight 
         ref={mainSpotLight}
         position={[0, 5, 5]} 
         angle={0.6} 
         penumbra={1} 
         intensity={5} 
         color="#ffffff" 
         castShadow={tier !== 'mobile'} 
      />
      {tier === 'desktop' && <Environment preset="night" />}
      
      {/* Dynamic Sequenced Studio Props */}
      <ClapperAsset scrollRef={scrollRef} />
      <BoomMic scrollRef={scrollRef} />
      {tier !== 'mobile' && <VintageCamera scrollRef={scrollRef} />}
      {tier !== 'mobile' && <DirectorChair scrollRef={scrollRef} />}
      
      {/* Persistent Background Motion */}
      <SpinningReels scrollRef={scrollRef} />
      <CinematicDust scrollRef={scrollRef} count={particleCount} tier={tier} />
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// EXPORT CANVAS WRAPPER
// ═══════════════════════════════════════════════════════════════
export default function CinematicStoryScene() {
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
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#030303] w-full h-[100dvh] overflow-hidden">
      <Canvas
        dpr={tier === 'mobile' ? [0.75, 1] : tier === 'tablet' ? [1, 1.25] : [1, 1.5]}
        gl={{ antialias: tier === 'desktop', powerPreference: 'high-performance', alpha: false }}
        performance={{ min: 0.5 }}
      >
        <React.Suspense fallback={null}>
          <color attach="background" args={[DARK]} />
          <SceneOrchestrator tier={tier} />
          <AdaptiveDpr pixelated />
          {tier === 'desktop' && <SoftShadows size={20} samples={10} focus={0.5} />}
        </React.Suspense>
      </Canvas>

      {/* Extreme Cinematic Edge Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(3,3,3,1)]" />
    </div>
  );
}
