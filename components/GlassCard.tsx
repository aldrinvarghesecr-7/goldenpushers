'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode, useRef, useState, useEffect } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Track mouse relative position for the refraction light
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
    
    // Light reflection
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePosition({ x: -100, y: -100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`glass glass-hover relative overflow-hidden rounded-xl ${className}`}
    >
      {/* Light Refraction orb that follows the mouse */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-[60px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
          width: '300px',
          height: '300px',
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          opacity: mousePosition.x === -100 ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {/* Content wrapper moved forward in 3D space */}
      <div className="relative z-10 w-full h-full preserve-3d" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
