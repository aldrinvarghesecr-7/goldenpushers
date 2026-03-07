'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';   // ← This was missing
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'outline',
  className = "",
  type = 'button'
}: ButtonProps) {

  const base = "px-12 py-5 text-sm tracking-[3px] font-medium border transition-all duration-300 relative overflow-hidden";
  const styles = variant === 'primary'
    ? "bg-accent text-primary hover:bg-white border-accent"
    : "border-accent text-accent hover:bg-accent hover:text-primary";

  const content = (
    <motion.button
      type={type}                    // ← Forwarded to real <button>
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.985 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.button>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}