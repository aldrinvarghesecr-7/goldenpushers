'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ContentReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.05
      }}
    >
      {children}
    </motion.div>
  );
}
