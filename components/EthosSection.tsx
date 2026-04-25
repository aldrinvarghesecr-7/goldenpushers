'use client';

// ═══════════════════════════════════════════════════════════════
// THE ETHOS — $50K Editorial Storytelling Section
// Scroll-linked word reveal, animated counters with parallax,
// and premium editorial layout with generous whitespace.
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedText from './AnimatedText';

// ─── ANIMATED COUNTER ───
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(springValue, (v: number) => Math.floor(v));

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="text-white font-sans font-black tracking-tighter tabular-nums">
      <motion.span>{displayValue}</motion.span>
      <span className="text-[#D4AF77]">{suffix}</span>
    </span>
  );
}

const stats = [
  { value: 50, suffix: '+', label: 'Films Crafted', sub: 'Global Projects' },
  { value: 15, suffix: '+', label: 'Luxury Brands', sub: 'Partnerships' },
  { value: 10, suffix: 'M+', label: 'Organic Views', sub: 'Digital Reach' },
];

export default function EthosSection() {
  const container = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const yGlow = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yStats = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useGSAP(
    () => {
      if (!mounted) return;
      gsap.registerPlugin(ScrollTrigger);

      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bodyRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: container, dependencies: [mounted] }
  );

  return (
    <section ref={container} id="ethos" className="relative w-full py-40 md:py-56 overflow-hidden">
      {mounted && (
        <>
          {/* Subtle background glow (Parallax) */}
          <motion.div 
            style={{ y: yGlow }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[#D4AF77]/[0.02] blur-[80px] pointer-events-none will-change-transform" 
          />

          <div className="max-w-6xl mx-auto px-6 md:px-12 relative">
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex items-center gap-4 mb-20"
            >
              <div className="h-px w-16 bg-[#D4AF77]/30" />
              <span className="text-[#D4AF77] text-[10px] md:text-xs tracking-[0.5em] uppercase font-sans font-bold" data-cursor-hover>
                The Ethos
              </span>
            </motion.div>

            {/* Large Quote — Scroll-Linked Word-by-Word Reveal */}
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-serif text-white/90 leading-[1.5] md:leading-[1.6] max-w-5xl mb-20 cursor-default" data-cursor-hover>
              <AnimatedText text="We don't just capture light. We architect moments of visceral truth. Every frame is meticulously crafted — a symphony of shadow, gold, and gravity." />
            </div>

            {/* Body Text — with blur dissolve entrance */}
            <p
              ref={bodyRef}
              className="text-base md:text-lg text-white/35 font-sans font-light tracking-wide leading-[1.9] max-w-2xl mb-32 md:mb-40 opacity-0"
            >
              Golden Pushers isn't an agency. It's a sanctuary for cinematic obsession.
              From breathtaking brand films to bespoke luxury productions, we forge
              visual gold with unrelenting precision and artistic truth.
            </p>

            {/* Gold divider line */}
            <div className="section-divider mb-20" />

            {/* Stats Row (Parallax) */}
            <motion.div 
              style={{ y: yStats }}
              className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-8 will-change-transform"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1, delay: i * 0.2, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative flex flex-col items-start cursor-default"
                  data-cursor-hover
                >
                  <div className="text-6xl md:text-7xl lg:text-8xl mb-4 transition-transform duration-700 group-hover:translate-x-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <h4 className="text-white/70 text-[10px] tracking-[0.4em] uppercase font-sans font-bold mb-1 transition-colors duration-500 group-hover:text-white">
                    {stat.label}
                  </h4>
                  <p className="text-[#D4AF77]/30 text-[9px] tracking-[0.2em] uppercase font-sans italic transition-colors duration-500 group-hover:text-[#D4AF77]/70">
                    {stat.sub}
                  </p>
                  {/* Underline sweep */}
                  <div className="absolute -bottom-6 left-0 w-0 h-px bg-gradient-to-r from-[#D4AF77]/50 to-transparent group-hover:w-full transition-all duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)]" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </section>
  );
}
