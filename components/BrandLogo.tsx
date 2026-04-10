'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
}

const GOLD = '#D4AF77';

export default function BrandLogo({ className = '', showText = true, size = 100 }: BrandLogoProps) {
  return (
    <div 
      className={`relative flex items-center gap-4 ${className}`}
      style={{ scale: size / 100 }}
    >
      <motion.div 
        className="relative"
        initial={{ rotate: -5, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100"
          height="100"
          className="text-accent"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Outer Circular Wave */}
          <motion.path
            d="M82.5 35C85 45 85 55 82.5 65C78 78 65 88 50 88C30 88 12 72 12 50C12 28 28 12 50 12C62 12 73 18 80 28"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Inner Wave Layers */}
          <motion.path
            d="M18 55C25 45 35 48 45 58C55 68 65 65 75 55"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="opacity-60"
          />
          <motion.path
            d="M22 65C30 58 40 60 48 68C56 76 66 74 74 66"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-40"
          />

          {/* Sharp Decorative Wave Peaks (at bottom-right) */}
          <path
            d="M45 78L50 72L55 78L60 74L65 78"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            className="opacity-30"
          />

          {/* Shimmer Effect Gradient */}
          <defs>
            <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="logo-mask">
               <circle cx="50" cy="50" r="50" fill="white" />
            </mask>
          </defs>

          {/* Animated Glint */}
          <motion.rect
            width="200"
            height="10"
            fill="url(#shimmer)"
            rotate={45}
            y="-50"
            animate={{ 
              x: [-100, 200],
              y: [-100, 200]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 5,
              ease: "linear" 
            }}
            style={{ pointerEvents: 'none' }}
          />
        </svg>

        {/* Cinematic Glow Background */}
        <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full -z-10 animate-pulse" />
      </motion.div>

      {showText && (
        <div className="flex flex-col">
          <motion.span 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl font-serif font-black tracking-[0.2em] text-white uppercase leading-none"
          >
            Golden Pushers
          </motion.span>
          <motion.span 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-[9px] tracking-[0.5em] text-accent font-sans font-light mt-1.5 uppercase"
          >
            Productions LLP
          </motion.span>
        </div>
      )}
    </div>
  );
}
