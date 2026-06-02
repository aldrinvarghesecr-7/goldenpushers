'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface JaggedDividerProps {
  type: 'top-to-bottom' | 'bottom-to-top'; // top-to-bottom: dark on top, light below | bottom-to-top: light on top, dark below
  fillColor?: string; // hex fill for the solid portion (default matches page bg)
  className?: string;
}

export default function JaggedDivider({
  type,
  fillColor = '#FAF8F5',
  className = '',
}: JaggedDividerProps) {
  // A highly detailed jagged path mimicking a natural, volcanic rock edge.
  // ViewBox: 0 0 1440 120
  const path = type === 'top-to-bottom'
    ? "M0,60 L24,48 C48,36 96,12 144,24 C192,36 240,84 288,96 C336,108 384,84 432,68 C480,52 528,44 576,56 C624,68 672,100 720,104 C768,108 816,84 864,68 C912,52 960,44 1008,52 C1056,60 1104,84 1152,92 C1200,100 1248,92 1296,80 C1344,68 1392,52 1416,44 L1440,36 L1440,120 L1416,120 C1392,120 1344,120 1296,120 C1248,120 1200,120 1152,120 C1104,120 1056,120 1008,120 C960,120 912,120 864,120 C816,120 768,120 720,120 C672,120 624,120 576,120 C528,120 480,120 432,120 C384,120 336,120 288,120 C240,120 192,120 144,120 C96,120 48,120 24,120 L0,120 Z"
    : "M0,60 L24,72 C48,84 96,108 144,96 C192,84 240,36 288,24 C336,12 384,36 432,52 C480,68 528,76 576,64 C624,52 672,20 720,16 C768,12 816,36 864,52 C912,68 960,76 1008,68 C1056,60 1104,36 1152,28 C1200,20 1248,28 1296,40 C1344,52 1392,68 1416,76 L1440,84 L1440,0 L1416,0 C1392,0 1344,0 1296,0 C1248,0 1200,0 1152,0 C1104,0 1056,0 1008,0 C960,0 912,0 864,0 C816,0 768,0 720,0 C672,0 624,0 576,0 C528,0 480,0 432,0 C384,0 336,0 288,0 C240,0 192,0 144,0 C96,0 48,0 24,0 L0,0 Z";

  return (
    <div className={`relative w-full overflow-hidden leading-none z-20 ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        className="relative block w-full h-[60px] md:h-[100px]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={path}
          fill={fillColor}
          initial={{ y: type === 'top-to-bottom' ? 40 : -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        />
      </svg>
    </div>
  );
}
