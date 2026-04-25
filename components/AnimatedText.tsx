'use client';

// ═══════════════════════════════════════════════════════════════
// ANIMATED TEXT — $50k Scroll-Linked Word Reveal
// Words reveal with opacity + blur + Y-transform as you scroll.
// Uses Framer Motion's useScroll for buttery smooth tracking.
// ═══════════════════════════════════════════════════════════════

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: any }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blurValue = useTransform(progress, range, [6, 0]);
  const y = useTransform(progress, range, [10, 0]);
  
  // Use a motion template for the filter string to ensure Framer Motion tracks it correctly
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter,
      }}
      className="inline-block mr-[0.25em] will-change-[opacity,transform,filter]"
    >
      {word}
    </motion.span>
  );
}

export default function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.4"],
  });

  return (
    <div ref={containerRef} className={`${className}`}>
      {words.map((word: string, i: number) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}