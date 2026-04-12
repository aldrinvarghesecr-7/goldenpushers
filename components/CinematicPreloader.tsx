'use client';

/**
 * CinematicPreloader — Film countdown intro
 * ==========================================
 * PERF: No 3D, no heavy libraries. Pure CSS animations + lightweight React state.
 * Auto-dismisses after 3.5s (reduced from original 4s for snappier UX).
 * Uses requestAnimationFrame for the counter instead of setInterval.
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCinematicStore } from '@/lib/store';

export default function CinematicPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const setIntroStage = useCinematicStore((state) => state.setIntroStage);
  const [percent, setPercent] = useState(0);
  const [count, setCount] = useState(5);
  const startTime = useRef(0);
  const rafId = useRef(0);

  const DURATION = 3500; // Total preloader duration in ms

  const animate = useCallback((timestamp: number) => {
    if (!startTime.current) startTime.current = timestamp;
    const elapsed = timestamp - startTime.current;
    const progress = Math.min(elapsed / DURATION, 1);
    
    setPercent(Math.round(progress * 100));
    setCount(Math.max(1, 5 - Math.floor(progress * 5)));
    
    if (progress < 1) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      // Small delay before dismissing for polish
      setTimeout(() => {
        setIsVisible(false);
        setIntroStage('clapper');
      }, 300);
    }

  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    
    // Safety exit: If for any reason the RAF hang, dismiss anyway after 4s
    const safetyExit = setTimeout(() => {
      setIsVisible(false);
      setIntroStage('clapper');
    }, DURATION + 500);

    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(safetyExit);
    };
  }, [animate, setIntroStage]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
        >
          {/* Film Grain — inline SVG data URI (no external fetch) */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
            style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}
          />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

          <div className="relative flex flex-col items-center">
            {/* Film Countdown Circle */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 border-2 border-white/10 rounded-full flex items-center justify-center mb-10">
               {/* Spinning ring */}
               <div className="absolute inset-0 border-t-2 border-[#D4AF77] rounded-full opacity-40 animate-spin" style={{animationDuration: '1.5s'}} />
               
               {/* Countdown number */}
               <motion.span 
                 key={count}
                 initial={{ scale: 1.4, opacity: 0 }}
                 animate={{ scale: 1, opacity: 0.7 }}
                 transition={{ duration: 0.3 }}
                 className="text-white font-sans text-7xl md:text-8xl font-black italic pr-6"
               >
                 {count}
               </motion.span>
               
               {/* Crosshair */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10" />
               <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-white/10" />
            </div>

            {/* Progress */}
            <div className="text-center">
              <p className="text-[#D4AF77] font-sans text-xs tracking-[0.6em] uppercase mb-4">
                Initializing Gold...
              </p>
              <div className="w-48 md:w-64 h-[2px] bg-white/5 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#D4AF77] shadow-[0_0_12px_#D4AF77] transition-[width] duration-100"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="mt-3 text-white/20 font-sans text-[10px] tracking-widest uppercase">
                {percent}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
