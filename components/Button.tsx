'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import MagneticWrap from './MagneticWrap';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'outline',
  className = "",
  type = 'button'
}: ButtonProps) {

  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Clean up ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const base = "px-12 py-5 text-sm tracking-[3px] font-medium border transition-all duration-300 relative overflow-hidden flex items-center justify-center";
  const styles = variant === 'primary'
    ? "bg-accent text-primary border-accent hover:shadow-[0_0_20px_rgba(198,169,94,0.4)]"
    : "border-accent text-accent hover:shadow-[inset_0_0_20px_rgba(198,169,94,0.2)]";

  const content = (
    <MagneticWrap strength={0.2} className="block">
      <motion.button
        type={type}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={`${base} ${styles} ${className}`}
      >
        {ripples.map(r => (
          <span 
            key={r.id} 
            className="ripple" 
            style={{ 
               left: r.x, 
               top: r.y, 
               width: 100, 
               height: 100,
               marginLeft: -50,
               marginTop: -50
            }} 
          />
        ))}
        {/* Added z-10 so text stays above ripple */}
        <span className="relative z-10">{children}</span>
      </motion.button>
    </MagneticWrap>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}