'use client';

// ═══════════════════════════════════════════════════════════════
// CURSOR TRAILER — $50K Custom Cursor System
// Layered dot + ring with spring physics, text-pill mode,
// and smooth scale transitions. Hidden on mobile.
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorTrailer() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring — heavier, laggy spring (cinematic drag)
  const ringX = useSpring(cursorX, { stiffness: 80, damping: 25, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 80, damping: 25, mass: 0.8 });

  // Inner dot — snappy, responsive
  const dotX = useSpring(cursorX, { stiffness: 300, damping: 28, mass: 0.3 });
  const dotY = useSpring(cursorY, { stiffness: 300, damping: 28, mass: 0.3 });

  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [mounted, setMounted] = useState(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const hoverTarget = target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover]');
    
    if (hoverTarget) {
      setIsHovering(true);
      const text = hoverTarget.getAttribute('data-cursor-text');
      setCursorText(text || '');
    } else {
      setIsHovering(false);
      setCursorText('');
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY, handleMouseOver]);

  if (!mounted) return null;

  const ringSize = cursorText ? 80 : isHovering ? 50 : 32;

  return (
    <>
      {/* Outer Ring — follows with lag for cinematic feel */}
      <motion.div
        style={{ 
          x: ringX, 
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          width: { type: 'spring', stiffness: 200, damping: 20 },
          height: { type: 'spring', stiffness: 200, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      >
        <div 
          className="absolute inset-0 rounded-full transition-all duration-300 ease-out flex items-center justify-center overflow-hidden" 
          style={{ 
            border: cursorText 
              ? 'none' 
              : isHovering 
                ? '1px solid rgba(212,175,119,0.6)' 
                : '1px solid rgba(255,255,255,0.15)',
            background: cursorText 
              ? 'rgba(212,175,119,0.95)' 
              : 'transparent',
          }} 
        >
          {cursorText && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[#0A0A0A] font-sans font-bold text-[9px] tracking-[0.15em] uppercase whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Inner Dot — snappy, always tracks precisely */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
        animate={{
          opacity: isVisible && !cursorText ? 1 : 0,
          scale: isHovering && !cursorText ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div 
          className="w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px] bg-[#D4AF77] rounded-full"
          style={{ 
            boxShadow: '0 0 6px rgba(212,175,119,0.5)' 
          }} 
        />
      </motion.div>
    </>
  );
}