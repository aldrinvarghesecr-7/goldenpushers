'use client';

import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] z-[999] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}