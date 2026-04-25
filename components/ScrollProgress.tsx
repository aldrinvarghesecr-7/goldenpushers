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
      className="fixed top-0 left-0 right-0 h-[1px] bg-accent z-[999] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}