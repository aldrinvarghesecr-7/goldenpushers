'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
    
    setRipples((prev: { x: number, y: number, id: number }[]) => [...prev, newRipple]);
    
    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prev: { x: number, y: number, id: number }[]) => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const base = "group px-12 py-5 text-sm tracking-[3px] font-medium border transition-all duration-700 relative overflow-hidden flex items-center justify-center rounded-sm";
  const styles = variant === 'primary'
    ? "bg-accent text-primary border-accent hover:shadow-[0_0_40px_rgba(212,175,119,0.8)]"
    : "border-accent text-accent hover:shadow-[inset_0_0_30px_rgba(212,175,119,0.2),0_0_25px_rgba(212,175,119,0.3)] hover:border-[#D4AF77] bg-black/20 hover:bg-[#D4AF77]/10";

  const content = (
    <MagneticWrap strength={0.2} className="block">
      <motion.button
        type={type}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
        className={`${base} ${styles} ${className}`}
      >
        {ripples.map((r: { x: number, y: number, id: number }) => (
          <span 
            key={r.id} 
            className="absolute border-radius-50 pointer-events-none"
            style={{
              left: r.x, 
              top: r.y,
              width: 150,
              height: 150,
              marginLeft: -75,
              marginTop: -75,
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(212,175,119,0.4) 40%, rgba(212,175,119,0) 70%)',
              borderRadius: '50%',
              transform: 'scale(0)',
              animation: 'ripple-anim 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
              mixBlendMode: 'screen'
            }}
          />
        ))}
        
        {/* Sweeping Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0" />
        
        {/* Added z-10 so text stays above ripple */}
        <span className="relative z-10 drop-shadow-md group-hover:text-gold-glow transition-all duration-300">{children}</span>
      </motion.button>
    </MagneticWrap>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}