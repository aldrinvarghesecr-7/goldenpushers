'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function CinematicPreloader() {
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [countDown, setCountDown] = useState(8);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
      }
    });

    // Simulate loading progress
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Film Countdown effect
    const countInterval = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(countInterval);
          return 1;
        }
        return prev - 1;
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(countInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
        >
          {/* Film Grain/Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

          <div className="relative flex flex-col items-center">
            {/* Film Countdown Circle */}
            <div className="relative w-64 h-64 border-2 border-white/10 rounded-full flex items-center justify-center mb-12">
               <motion.div 
                 initial={{ rotate: 0 }}
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                 className="absolute inset-0 border-t-2 border-accent rounded-full opacity-40"
               />
               <motion.span 
                 key={countDown}
                 initial={{ scale: 1.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 0.8 }}
                 className="text-white font-sans text-8xl font-black italic"
               >
                 {countDown}
               </motion.span>
               
               {/* Crosshair lines */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10" />
               <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-white/10" />
            </div>

            <div className="text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#D4AF77] font-sans text-xs tracking-[0.8em] uppercase mb-4"
              >
                Initializing Gold...
              </motion.h2>
              
              {/* Progress Bar Container */}
              <div className="w-64 h-[2px] bg-white/5 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_#D4AF77]"
                  style={{ width: `${percent}%` }}
                />
              </div>
              
              <div className="mt-4 text-white/20 font-sans text-[10px] tracking-widest uppercase">
                {percent}%
              </div>
            </div>
          </div>

          {/* Cinematic Flicker Overlay */}
          <motion.div 
             animate={{ opacity: [0, 0.05, 0, 0.02, 0] }}
             transition={{ repeat: Infinity, duration: 0.2 }}
             className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
