'use client';

// ═══════════════════════════════════════════════════════════════
// THE ETHOS — The Manifesto Reveal
// Scroll-driven reveals with massive typography and stat cards.
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedText from './AnimatedText';

function Counter({ value, suffix, gold = false }: { value: number; suffix: string; gold?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(springValue, (v: number) => Math.floor(v));

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="font-display font-bold tracking-tight tabular-nums text-[#E8ECF4]">
      <motion.span>{displayValue}</motion.span>
      <span className={gold ? 'text-[#D4AF77] text-glow-gold' : 'text-[#00E5FF]'}>{suffix}</span>
    </span>
  );
}

const stats = [
  { value: 50, suffix: '+', label: 'Professional Brand & Event', sub: 'Films Crafted' },
  { value: 15, suffix: '+', label: 'Luxury & Lifestyle', sub: 'Brand Partnerships' },
  { value: 10, suffix: 'M+', label: 'Organic Views', sub: 'Across Digital Platforms' },
];

export default function EthosSection() {
  const container = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const yStats = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useGSAP(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    
    if (bodyRef.current) {
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' }
        }
      );
    }
  }, { scope: container, dependencies: [mounted] });

  return (
    <section ref={container} id="ethos" className="relative w-full py-32 md:py-48 bg-[#0F1128] overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />

      {mounted && (
        <div className="max-w-[90vw] mx-auto px-0 relative z-10">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="text-[#00E5FF] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">The Ethos</span>
            <div className="h-px flex-1 bg-gradient-to-r from-[#00E5FF]/20 to-transparent" />
            <span className="text-[#5A6285] text-[9px] tracking-[0.4em] font-mono hidden md:block">02 / Ethos</span>
          </motion.div>

          {/* Big heading */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13vw] sm:text-[10vw] md:text-[9vw] font-display font-bold text-[#E8ECF4] uppercase tracking-[-0.03em] leading-[0.9] mb-16 cursor-default"
          >
            The <span className="text-cyan-gradient">Ethos</span>
          </motion.h2>

          {/* Two-column editorial layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 items-center">
            {/* Quote */}
            <div className="lg:col-span-7 text-xl sm:text-2xl md:text-3xl font-display text-[#E8ECF4] leading-[1.4] cursor-default font-medium">
              <AnimatedText text="We don't just capture light. We architect moments of visceral truth. Every frame is meticulously crafted — a symphony of shadow, organic rock, and raw velocity." />
            </div>

            {/* Body text */}
            <p
              ref={bodyRef}
              className="lg:col-span-5 text-base md:text-lg text-[#5A6285] font-sans font-light tracking-wide leading-[1.8] opacity-0 lg:translate-y-8"
            >
              GoldenPushers is a cinematic production house that brings stories to life through professional video production. From brand films and corporate videos to event coverage and creative visual storytelling, we craft high-quality cinematic experiences that captivate audiences and elevate your vision.
            </p>
          </div>

          {/* Full-width divider */}
          <div className="section-divider mb-24" />

          {/* Stats — glowing cards */}
          <motion.div
            style={{ y: yStats }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 will-change-transform"
            ref={statsRef}
          >
            {stats.map((stat, i) => {
              const isGold = i === 1;
              const offsetClass = i === 0 
                ? 'lg:translate-y-8' 
                : i === 1 
                  ? 'lg:-translate-y-6' 
                  : 'lg:translate-y-0';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`${
                    isGold 
                      ? 'glass-premium-gold border-[#D4AF77]/30 shadow-[0_15px_35px_rgba(212,175,119,0.08)]' 
                      : 'glass-premium border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)]'
                  } p-10 relative overflow-hidden group rounded-sm ${offsetClass} transition-all duration-500`}
                >
                  {/* Glowing left border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${
                    isGold 
                      ? 'bg-[#D4AF77] shadow-[0_0_15px_rgba(212,175,119,0.8)]' 
                      : 'bg-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.8)]'
                  }`} />
                  
                  {/* Scan line effect on hover */}
                  <div className="scan-line hidden group-hover:block transition-all duration-700 ease-out animate-[scan-sweep_2s_ease-in-out_infinite]" />

                  <div className="text-[64px] md:text-[72px] lg:text-[80px] leading-none mb-4 relative z-10">
                    <Counter value={stat.value} suffix={stat.suffix} gold={isGold} />
                  </div>
                  <h4 className={`text-[#E8ECF4]/80 text-[10px] tracking-[0.4em] uppercase font-sans font-bold mb-2 relative z-10 ${
                    isGold ? 'text-[#D4AF77] drop-shadow-[0_0_8px_rgba(212,175,119,0.3)]' : ''
                  }`}>
                    {stat.label}
                  </h4>
                  <p className="text-[#5A6285] text-[9px] tracking-[0.2em] uppercase font-mono relative z-10">
                    {stat.sub}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      )}
    </section>
  );
}
