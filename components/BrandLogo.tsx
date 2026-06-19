'use client';

// ═══════════════════════════════════════════════════════════════
// BRAND LOGO — Editorial wordmark: GP monogram + text
// ═══════════════════════════════════════════════════════════════

import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
  inverted?: boolean; // For dark backgrounds
}

export default function BrandLogo({ className = '', showText = true, size = 32, inverted = false }: BrandLogoProps) {
  const primary = inverted ? '#F8F4EE' : '#39463A';
  const secondary = inverted ? 'rgba(248,244,238,0.5)' : '#A66B45';

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* GP Monogram */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 40 40"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer thin square */}
          <rect x="1" y="1" width="38" height="38" stroke={primary} strokeWidth="0.75" opacity="0.3" />
          {/* GP text */}
          <text
            x="50%"
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={primary}
            style={{
              fontFamily: 'serif',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            GP
          </text>
          {/* Bottom thin rule */}
          <line x1="8" y1="34" x2="32" y2="34" stroke={secondary} strokeWidth="0.75" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="uppercase tracking-[0.18em] leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 600,
              color: primary,
              letterSpacing: '0.2em',
            }}
          >
            Golden Pushers
          </span>
          <span
            className="uppercase tracking-[0.25em] mt-1"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '8px',
              fontWeight: 400,
              color: secondary,
              letterSpacing: '0.25em',
            }}
          >
            Production
          </span>
        </div>
      )}
    </div>
  );
}
