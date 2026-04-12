'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CursorTrailer() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Cinematic heavy spring physics
  const springX = useSpring(cursorX, { stiffness: 100, damping: 25, mass: 0.8 });
  const springY = useSpring(cursorY, { stiffness: 100, damping: 25, mass: 0.8 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };
    const leave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? (isHovering ? 1.6 : 1) : 0.5
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
    >
      <div 
        className="w-full h-full rounded-full transition-all duration-300" 
        style={{ 
          border: isHovering ? '1.5px solid var(--color-accent, #D4AF77)' : '1px solid rgba(255,255,255,0.8)',
          boxShadow: isHovering ? '0 0 15px rgba(212,175,119,0.3)' : 'none'
        }} 
      />
    </motion.div>
  );
}