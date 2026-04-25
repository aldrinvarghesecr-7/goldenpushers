'use client';

// ═══════════════════════════════════════════════════════════════
// MARQUEE — Infinite horizontal scrolling text ticker
// Used between sections for that high-end editorial feel.
// Pure CSS animation for zero JS overhead.
// ═══════════════════════════════════════════════════════════════

import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: number; // seconds for one full loop
  className?: string;
  separator?: string;
  reverse?: boolean;
}

export default function Marquee({ 
  text, 
  speed = 30, 
  className = '', 
  separator = '  ✦  ',
  reverse = false 
}: MarqueeProps) {
  const content = `${text}${separator}`.repeat(8);
  
  return (
    <div className={`overflow-hidden whitespace-nowrap pointer-events-none select-none ${className}`}>
      <div 
        className={`inline-flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4" aria-hidden>{content}</span>
      </div>
    </div>
  );
}
