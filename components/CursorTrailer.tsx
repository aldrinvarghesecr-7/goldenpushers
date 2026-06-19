'use client';

// ═══════════════════════════════════════════════════════════════
// CURSOR TRAILER — Editorial olive/copper dot
// ═══════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from 'react';

export default function CursorTrailer() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isHover, setIsHover] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      const el = e.target as HTMLElement;
      const hovered = el.closest('[data-cursor-hover]');
      const text = (hovered as HTMLElement | null)?.dataset?.cursorText ?? '';
      setIsHover(!!hovered);
      setLabel(text);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animateRing = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
        style={{ top: 0, left: 0 }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: isHover ? '6px' : '4px',
            height: isHover ? '6px' : '4px',
            background: isHover ? '#A66B45' : '#39463A',
          }}
        />
      </div>

      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
        style={{ top: 0, left: 0 }}
      >
        <div
          className="rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            width: isHover ? (label ? '72px' : '36px') : '28px',
            height: isHover ? (label ? '72px' : '36px') : '28px',
            borderColor: isHover ? '#A66B45' : 'rgba(57,70,58,0.35)',
            background: isHover && label ? 'rgba(57,70,58,0.08)' : 'transparent',
          }}
        >
          {label && (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '7px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#39463A',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}