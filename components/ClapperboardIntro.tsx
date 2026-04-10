'use client';

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { useCinematicStore } from '@/lib/store';

const GOLD = '#D4AF77';

// ═══════════════════════════════════════════════════════════════
// CLAPPERBOARD ASSET
// ═══════════════════════════════════════════════════════════════

const ClapperAsset = () => {
  const groupRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const sparkRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const setIntroStage = useCinematicStore((state) => state.setIntroStage);
  
  // Materials
  const boardMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0A0A0A', roughness: 0.4, metalness: 0.1 }), []);
  const goldDetailMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2 }), []);
  const fontMat = useMemo(() => new THREE.MeshStandardMaterial({ color: GOLD, emissive: GOLD, emissiveIntensity: 0.3 }), []);

  // Geometry
  const WIDTH = 1.4;
  const HEIGHT = 1.0;

  // Particle burst logic
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
    
    // Initial state: ARM RAISED
    gsap.set(armRef.current.rotation, { z: -0.8 }); // ~45 deg open

    // 1. The SNAP DOWN
    tl.to(armRef.current.rotation, {
      z: 0.02,
      duration: 0.15,
      ease: "power4.in",
      onComplete: () => {
        // Impact FX
        if (lightRef.current) {
          gsap.fromTo(lightRef.current, { intensity: 0 }, { intensity: 15, duration: 0.05, yoyo: true, repeat: 1 });
        }
        
        if (sparkRef.current) {
          gsap.fromTo(sparkRef.current.scale, { x: 0, y: 0, z: 0 }, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, ease: "expo.out" });
          gsap.to(sparkRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.2, delay: 0.1 });
        }

        // Mechanical Bounce
        gsap.to(groupRef.current!.position, {
          y: "-=0.04",
          duration: 0.04,
          yoyo: true,
          repeat: 2,
          ease: "bounce.out"
        });
      }
    })
    // 2. The SEAMLESS FADE
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

  useEffect(() => {
    runClapSequence();
  }, [runClapSequence]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow cinematic drift
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 2]}>
      <pointLight ref={lightRef} color={GOLD} intensity={0} distance={5} position={[0, 0.5, 0.5]} />
      
      {/* Main Board */}
      <mesh>
        <boxGeometry args={[WIDTH, HEIGHT, 0.1]} />
        <primitive object={boardMat} attach="material" />
      </mesh>
      
      {/* Labels */}
      <group position={[0, 0, 0.06]}>
        <Text position={[-0.5, 0.35, 0]} fontSize={0.04} material={fontMat} anchorX="left">PROD.</Text>
        <Text position={[-0.5, 0.1, 0]} fontSize={0.04} material={fontMat} anchorX="left">SCENE</Text>
        <Text position={[0, 0.1, 0]} fontSize={0.04} material={fontMat} anchorX="left">TAKE</Text>
        <Text position={[0.4, 0.35, 0]} fontSize={0.04} material={fontMat} anchorX="right">GOLDEN PUSHERS</Text>
        
        <Text position={[0, -0.2, 0]} fontSize={0.12} material={fontMat}>ACTION!</Text>
      </group>

      {/* The Arm (Hinged top-left) */}
      <group ref={armRef} position={[-WIDTH/2, HEIGHT/2, 0]}>
        <mesh position={[WIDTH/2, 0.05, 0]}>
          <boxGeometry args={[WIDTH, 0.1, 0.1]} />
          <primitive object={boardMat} attach="material" />
        </mesh>
        {/* Chevron Stripes */}
        <mesh position={[WIDTH/2, 0.05, 0.051]}>
          <boxGeometry args={[WIDTH, 0.1, 0.001]} />
          <primitive object={goldDetailMat} attach="material" />
        </mesh>
      </group>
      
      {/* Gold Hinge */}
      <mesh position={[-WIDTH/2, HEIGHT/2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 12]} />
        <primitive object={goldDetailMat} attach="material" />
      </mesh>

      {/* Spark Burst */}
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
// MAIN INTRO COMPONENT
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
        className="fixed inset-0 z-[10000] bg-[#050505] overflow-hidden"
      >
        <Canvas gl={{ antialias: true, alpha: true }}>
          <color attach="background" args={['#050505']} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 5, 5]} intensity={1} color={GOLD} />
          
          <ClapperAsset />
          
          <Environment preset="night" />
        </Canvas>

        {/* Cinematic Film Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
          style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}
        />

        {/* Skip Button */}
        <button 
          onClick={() => setIntroStage('ready')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] text-white/20 uppercase font-sans hover:text-white/60 transition-colors"
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
