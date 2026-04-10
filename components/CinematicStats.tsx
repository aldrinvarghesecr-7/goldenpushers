'use client';

/**
 * CinematicStats — Animated Agency Credibility Row
 * ===============================================
 * Clean, bold typography with animated counters and 
 * subtle golden accents. Inspired by high-end agency polish.
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const stats = [
  { value: 50, suffix: '+', label: 'Films Crafted', sub: 'Global Projects' },
  { value: 15, suffix: '+', label: 'Luxury Brands', sub: 'Partnerships' },
  { value: 10, suffix: 'M+', label: 'Organic Views', sub: 'Digital Reach' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
  });

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="text-white font-sans font-black tracking-tighter tabular-nums">
      <motion.span>{displayValue}</motion.span>
      <span className="text-[#D4AF77]">{suffix}</span>
    </span>
  );
}

export default function CinematicStats() {
  return (
    <section className="relative py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative flex flex-col items-start"
            >
              {/* Animated Number */}
              <div className="text-5xl md:text-7xl lg:text-8xl mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              
              {/* Label & Subtext */}
              <div className="space-y-1">
                <h4 className="text-white text-xs tracking-[0.4em] uppercase font-bold">
                  {stat.label}
                </h4>
                <p className="text-[#D4AF77]/40 text-[10px] tracking-[0.2em] uppercase font-mono italic">
                  {stat.sub}
                </p>
              </div>

              {/* Subtle underline accent */}
              <div className="absolute -bottom-4 left-0 w-0 h-[1px] bg-gradient-to-r from-[#D4AF77] to-transparent group-hover:w-full transition-all duration-700 opacity-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
