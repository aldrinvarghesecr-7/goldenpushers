'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCinematicStore } from '@/lib/store';

export default function ContentReveal({ children }: { children: React.ReactNode }) {
  const introStage = useCinematicStore((state) => state.introStage);
  const isReady = introStage === 'ready';

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ 
        opacity: isReady ? 1 : 0,
        filter: isReady ? 'blur(0px)' : 'blur(10px)',
        y: isReady ? 0 : 20
      }}
      transition={{ 
        duration: 2, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 // Slight delay after snap for cinematic breathing room
      }}
      style={{ pointerEvents: isReady ? 'auto' : 'none' }}
    >
      {children}
    </motion.div>
  );
}
