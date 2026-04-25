'use client';

// ═══════════════════════════════════════════════════════════════
// CINEMATIC LIGHTING ENGINE
// Ultra-performant 2D interactive lighting.
// Features mouse-tracking spotlights and slow-moving film-burn light leaks.
// OPTIMIZED: Reduced blur sizes, removed redundant layers, added will-change.
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useScrollStore } from '@/components/scrollstore';

export default function CinematicBackground() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-smooth springs for the premium heavy feel
  const springX = useSpring(mouseX, { stiffness: 30, damping: 30, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30, mass: 1 });

  // Global scroll state to trigger intensity changes
  const scrollProgress = useScrollStore((state) => state.progress);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Set initial position to center
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      className={`fixed inset-0 w-full h-full bg-[#020202] z-0 overflow-hidden pointer-events-none selection-none transition-opacity duration-[2000ms] ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      
      {/* ─── LAYER 1: DEEP VOLUMETRIC BASE ─── */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(45, 30, 15, 1) 0%, rgba(5, 5, 5, 1) 80%)' }}
      />

      {/* ─── LAYER 2: SLOW-MOVING ORB ─── */}
      <motion.div
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }}
        className="absolute -top-[10%] -left-[5%] w-[80vw] h-[80vw] rounded-full blur-[80px] mix-blend-screen will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(212,175,119,0.5) 0%, transparent 70%)' }}
      />

      {/* ─── LAYER 3: INTERACTIVE MOUSE REVEAL ─── */}
      <motion.div
        className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full blur-[60px] mix-blend-screen will-change-transform"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(212,175,119,0.4) 0%, rgba(212,175,119,0.1) 40%, transparent 80%)',
          opacity: Math.max(0.4, 1 - scrollProgress * 0.4)
        }}
      />

      {/* ─── LAYER 4: MICRO-TEXTURE (ANTI-BANDING) ─── */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── LAYER 5: EXTREME VIGNETTE ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,2,2,0.98)_100%)] pointer-events-none" />
      
    </div>
  );
}
