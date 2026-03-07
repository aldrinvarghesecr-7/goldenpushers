'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  title: string;
  className?: string;
}

export default function SceneTitle({ title, className = "" }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`mb-16 ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-2xl md:text-4xl font-serif font-bold tracking-widest text-text-primary uppercase"
      >
        {title}
      </motion.h2>
    </div>
  );
}
