'use client';

import type { CSSProperties } from 'react';

// ═══════════════════════════════════════════════════════════════
// MARQUEE — Editorial ticker on stone background
// ═══════════════════════════════════════════════════════════════

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Marquee({
  text,
  speed = 30,
  className = '',
  style,
}: MarqueeProps) {
  const doubled = `${text}  —  ${text}  —  `;
  const textStyle = { ...style, animationDuration: `${speed}s` };

  return (
    <div className="relative overflow-hidden w-full flex">
      <div
        className={`animate-marquee whitespace-nowrap flex-shrink-0 ${className}`}
        style={textStyle}
      >
        {doubled}
      </div>
      <div
        className={`animate-marquee whitespace-nowrap flex-shrink-0 ${className}`}
        style={textStyle}
        aria-hidden
      >
        {doubled}
      </div>
    </div>
  );
}
