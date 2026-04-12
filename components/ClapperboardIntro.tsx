'use client';

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useCinematicStore } from '@/lib/store';

const GOLD = '#D4AF77';
const DARK_WOOD = '#0A0A0A';

// ═══════════════════════════════════════════════════════════════
// CLAPPERBOARD ASSET (High-Fidelity Procedural)
// ═══════════════════════════════════════════════════════════════

const ClapperAsset = () => {
  const groupRef = useRef<THREE.Group>(null);
  const armPivotRef = useRef<THREE.Group>(null);
  const sparkRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const setIntroStage = useCinematicStore((state) => state.setIntroStage);
  
  // High-End Materials
  const boardMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: DARK_WOOD, 
    roughness: 0.6, 
    metalness: 0.2 
  }), []);

  const goldMetallicMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: GOLD, 
    metalness: 1, 
    roughness: 0.1,
    envMapIntensity: 2
  }), []);

  const fontMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: GOLD, 
    emissive: GOLD, 
    emissiveIntensity: 0.4 
  }), []);

  // Dimensions
  const WIDTH = 1.6;
  const HEIGHT = 1.1;
  const DEPTH = 0.12;

  // Impact Sparks Data
  const sparkParticles = useMemo(() => {
    const pos = new Float32Array(80 * 3);
    for(let i=0; i<80; i++) {
        pos[i*3] = (Math.random()-0.5) * 0.5;
        pos[i*3+1] = (Math.random()-0.5) * 0.3;
        pos[i*3+2] = (Math.random()-0.5) * 0.2;
    }
    return pos;
  }, []);

  const runIntroSequence = useCallback(() => {
    if (!armPivotRef.current || !groupRef.current) return;
    
    // Initial State: Arm raised upward
    gsap.set(armPivotRef.current.rotation, { z: -0.75 });
    
    const tl = gsap.timeline({ delay: 0.5 });

    // 1. Dramatic Pause & Subtle Float
    tl.to(groupRef.current.position, { y: 0, duration: 0.8, ease: "power2.out" })
    
    // 2. The High-Budget SNAP
    .to(armPivotRef.current.rotation, {
      z: 0.03, // Slight overlap for mechanical feel
      duration: 0.12,
      ease: "power4.in",
      onComplete: () => {
        // Impact FX: Light Flash
        if (lightRef.current) {
          gsap.fromTo(lightRef.current, { intensity: 0 }, { intensity: 30, duration: 0.08, yoyo: true, repeat: 1 });
        }
        
        // Impact FX: Particle Burst
        if (sparkRef.current) {
          gsap.fromTo(sparkRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 2.5, y: 2.5, z: 2.5, duration: 0.4, ease: "expo.out" });
          gsap.to(sparkRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.3, delay: 0.2 });
        }

        // Kinetic Shock (Impact Bounce)
        gsap.to(groupRef.current!.position, {
          y: "-=0.08",
          duration: 0.06,
          yoyo: true,
          repeat: 3,
          ease: "sine.inOut"
        });
      }
    })
    // 3. Elegant Exit
    .to(groupRef.current.position, {
      z: -5,
      y: -2,
      opacity: 0,
      duration: 1.2,
      ease: "power2.inOut",
      delay: 0.6
    })
    .to(groupRef.current.rotation, {
      x: -1.2,
      duration: 1.2,
      ease: "power2.inOut"
    }, "<")
    .add(() => {
      setIntroStage('ready');
    }, "-=0.4");

  }, [setIntroStage]);

  useEffect(() => {
    runIntroSequence();
  }, [runIntroSequence]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Breathing motion
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 2.5]}>
      {/* High-intensity impact flash light */}
      <pointLight ref={lightRef} color={GOLD} intensity={0} distance={10} position={[0, 0.6, 0.5]} />
      
      {/* Main Body */}
      <mesh castShadow>
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <primitive object={boardMat} attach="material" />
      </mesh>

      {/* Gold Rim Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[WIDTH + 0.05, HEIGHT + 0.05, DEPTH - 0.02]} />
        <primitive object={goldMetallicMat} attach="material" />
      </mesh>

      {/* Production Details */}
      <group position={[0, 0, DEPTH / 2 + 0.01]}>
        <Text position={[-0.6, 0.4, 0]} fontSize={0.045} material={fontMat} anchorX="left" font="/fonts/Inter-Bold.woff">PROD.</Text>
        <Text position={[0.6, 0.4, 0]} fontSize={0.045} material={fontMat} anchorX="right" font="/fonts/Inter-Bold.woff">GOLDEN PUSHERS</Text>
        
        <group position={[0, 0.1, 0]}>
            <Text position={[-0.4, 0, 0]} fontSize={0.035} material={fontMat}>ROLL</Text>
            <Text position={[0, 0, 0]} fontSize={0.035} material={fontMat}>SCENE</Text>
            <Text position={[0.4, 0, 0]} fontSize={0.035} material={fontMat}>TAKE</Text>
            <Text position={[-0.4, -0.15, 0]} fontSize={0.08} material={fontMat}>01</Text>
            <Text position={[0, -0.15, 0]} fontSize={0.08} material={fontMat}>24</Text>
            <Text position={[0.4, -0.15, 0]} fontSize={0.08} material={fontMat}>A</Text>
        </group>

        <Text position={[0, -0.35, 0]} fontSize={0.15} material={fontMat} letterSpacing={0.2} font="/fonts/Inter-Black.woff">ACTION!</Text>
      </group>

      {/* The Clapper Arm (Pivot at top-left hinge) */}
      <group ref={armPivotRef} position={[-WIDTH/2, HEIGHT/2, 0]}>
        <group position={[WIDTH/2, 0.08, 0]}>
            <mesh>
                <boxGeometry args={[WIDTH, 0.16, DEPTH]} />
                <primitive object={boardMat} attach="material" />
            </mesh>
            {/* Gold stripes on arm */}
            {[ -0.4, -0.1, 0.2, 0.5 ].map((x, i) => (
                <mesh key={i} position={[x, 0, DEPTH/2 + 0.01]} rotation={[0, 0, Math.PI / 4]}>
                    <boxGeometry args={[0.08, 0.2, 0.001]} />
                    <primitive object={goldMetallicMat} attach="material" />
                </mesh>
            ))}
        </group>
      </group>

      {/* Industrial Hinge Hardware */}
      <mesh position={[-WIDTH/2, HEIGHT/2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, DEPTH + 0.04, 32]} />
        <primitive object={goldMetallicMat} attach="material" />
      </mesh>

      {/* Impact Spark Particles */}
      <points ref={sparkRef} scale={[0,0,0]} position={[0, HEIGHT/2, DEPTH/2]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sparkParticles, 3]} />
        </bufferGeometry>
        <pointsMaterial color={GOLD} size={0.025} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </points>

      {/* Floating Atmosphere Sparkles */}
      <Sparkles count={40} scale={4} size={1} speed={0.4} color={GOLD} />
    </group>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT EXPORT
// ═══════════════════════════════════════════════════════════════

export default function ClapperboardIntro() {
  const introStage = useCinematicStore((state) => state.introStage);
  const setIntroStage = useCinematicStore((state) => state.setIntroStage);
  
  if (introStage !== 'clapper') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-[#030303] overflow-hidden"
      >
        <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
          <color attach="background" args={['#030303']} />
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={30} />
          
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 10, 10]} angle={0.15} penumbra={1} intensity={1} color={GOLD} castShadow />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
          
          <ClapperAsset />
          
          <Environment preset="studio" />
        </Canvas>

        {/* Cinematic Film Burn / Light Leak Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ delay: 0.62, duration: 0.4 }}
          className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-[#D4AF77]/40 via-transparent to-transparent mix-blend-screen"
        />

        {/* Global Film Grain */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 bg-repeat"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Skip Button - Hidden by default, appears after 1.5s */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setIntroStage('ready')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/30 uppercase font-sans hover:text-[#D4AF77] transition-all duration-500 z-50"
        >
          Skip Intro
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
