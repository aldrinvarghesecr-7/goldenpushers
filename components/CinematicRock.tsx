'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CinematicRockProps {
  className?: string;
  seed?: number;
  scale?: number;
  rotation?: number;
  glow?: boolean;
}

export default function CinematicRock({
  className = '',
  seed = 1,
  scale = 1,
  rotation = 0,
  glow = false,
}: CinematicRockProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect — float slightly faster or slower than scroll
  const yParallax = useTransform(scrollYProgress, [0, 1], [-80 * seed, 80 * seed]);

  // Different paths for varied rock shapes
  const paths = [
    "M 40,60 L 100,20 L 160,50 L 180,120 L 150,220 L 170,280 L 100,320 L 30,280 L 10,180 L 20,100 Z", // default rock
    "M 60,30 L 130,20 L 180,70 L 160,160 L 190,250 L 120,310 L 40,290 L 20,200 L 10,110 L 30,60 Z",  // taller rock
    "M 30,70 L 90,30 L 170,40 L 190,130 L 150,200 L 160,290 L 80,310 L 20,260 L 30,170 L 10,120 Z"   // wider rock
  ];

  const rockPath = paths[(seed - 1) % paths.length] || paths[0];

  return (
    <motion.div
      ref={ref}
      style={{ y: yParallax, rotate: rotation, scale }}
      className={`absolute pointer-events-none select-none z-0 ${className}`}
    >
      <svg
        viewBox="0 0 200 340"
        className="w-full h-full filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background glow behind the rock */}
        {glow && (
          <path
            d={rockPath}
            fill="none"
            stroke="#8B1E1F"
            strokeWidth="30"
            className="opacity-[0.12] blur-2xl"
          />
        )}

        {/* The solid charcoal rock body */}
        <path
          d={rockPath}
          fill="#1A1A18"
          stroke="#262624"
          strokeWidth="1.5"
        />

        {/* Cinematic Crimson Guideline / Laser vein */}
        <motion.path
          d={seed % 2 === 0 
            ? "M 100,20 L 100,320" 
            : "M 40,120 Q 100,170 160,220"}
          stroke="#8B1E1F"
          strokeWidth="1.5"
          fill="none"
          className="opacity-40"
          strokeDasharray="4 4"
        />

        {/* Subtle highlights / rocky ridges */}
        <path
          d="M 100,20 L 70,120 L 100,220 L 80,310"
          stroke="#2A2A28"
          strokeWidth="2"
          fill="none"
          className="opacity-75"
        />
        
        <path
          d="M 160,50 L 130,150 L 150,220"
          stroke="#2A2A28"
          strokeWidth="1"
          fill="none"
          className="opacity-60"
        />

        {/* Small plus marks / crosshairs for tech vibe */}
        <g stroke="#8B1E1F" strokeWidth="1" className="opacity-60">
          <line x1="100" y1="165" x2="100" y2="175" />
          <line x1="95" y1="170" x2="105" y2="170" />
          
          <line x1="50" y1="245" x2="50" y2="255" />
          <line x1="45" y1="250" x2="55" y2="250" />
        </g>
      </svg>
    </motion.div>
  );
}
