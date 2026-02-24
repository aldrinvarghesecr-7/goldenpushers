'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CursorTrailer() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      setIsVisible(true);
    };
    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[200] mix-blend-difference hidden md:block"
      animate={{ opacity: isVisible ? 0.6 : 0, scale: isVisible ? 1 : 0.6 }}
    >
      <div className="w-6 h-6 border border-accent/70 rounded-full" />
      <div className="absolute inset-0 bg-accent/10 rounded-full -translate-x-1/2 -translate-y-1/2 scale-75" />
    </motion.div>
  );
}