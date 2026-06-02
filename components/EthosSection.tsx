'use client';

// ═══════════════════════════════════════════════════════════════
// THE ETHOS — Modern Production House Editorial
// Large left-aligned heading. Horizontal rule. Stats in a row.
// Full dark background. Minimal, powerful, intentional.
// ═══════════════════════════════════════════════════════════════

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import AnimatedText from './AnimatedText';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(springValue, (v: number) => Math.floor(v));

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return (
    <span ref={ref} className="font-serif font-black tracking-tighter tabular-nums text-white">
      <motion.span>{displayValue}</motion.span>
      <span className="text-[#8B1E1F]">{suffix}</span>
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
          scrollTrigger: { trigger: bodyRef.current, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }
  }, { scope: container, dependencies: [mounted] });

  return (
    <section ref={container} id="ethos" className="relative w-full py-32 md:py-48 bg-[#111110] overflow-hidden">

      {mounted && (
        <div className="max-w-[90vw] mx-auto px-0 relative z-10">

          {/* Section label + horizontal rule */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-16"
          >
            <span className="text-[#8B1E1F] text-[9px] tracking-[0.6em] uppercase font-sans font-bold">The Ethos</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-white/15 text-[9px] tracking-[0.4em] font-sans hidden md:block">02 / Ethos</span>
          </motion.div>

          {/* Big heading */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.23, 1, 0.32, 1] }}
            className="text-[13vw] sm:text-[10vw] md:text-[9vw] font-serif font-black text-white uppercase tracking-[-0.05em] leading-[0.9] mb-16 cursor-default"
            data-cursor-hover
          >
            The <span className="text-gold-gradient">Ethos</span>
          </motion.h2>

          {/* Two-column editorial layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32">
            {/* Quote */}
            <div className="text-xl sm:text-2xl font-serif text-white/50 leading-[1.6] cursor-default" data-cursor-hover>
              <AnimatedText text="We don't just capture light. We architect moments of visceral truth. Every frame is meticulously crafted — a symphony of shadow, organic rock, and raw velocity." />
            </div>

            {/* Body text */}
            <p
              ref={bodyRef}
              className="text-base md:text-lg text-white/30 font-sans font-light tracking-wide leading-[1.8] opacity-0"
            >
              GoldenPushers is a cinematic production house that brings stories to life through professional video production. From brand films and corporate videos to event coverage and creative visual storytelling, we craft high-quality cinematic experiences that captivate audiences and elevate your vision.
            </p>
          </div>

          {/* Full-width divider */}
          <div className="w-full h-px bg-white/[0.06] mb-24" />

          {/* Stats — horizontal row with large typography */}
          <motion.div
            style={{ y: yStats }}
            className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06] will-change-transform"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="group relative flex flex-col cursor-default py-10 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0"
                data-cursor-hover
              >
                <div className="text-[64px] md:text-[72px] lg:text-[80px] leading-none mb-4 transition-transform duration-700 group-hover:translate-x-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <h4 className="text-white/40 text-[9px] tracking-[0.5em] uppercase font-sans font-bold mb-1 group-hover:text-white/70 transition-colors duration-500">
                  {stat.label}
                </h4>
                <p className="text-[#8B1E1F]/50 text-[8px] tracking-[0.3em] uppercase font-sans group-hover:text-[#8B1E1F]/80 transition-colors duration-500">
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      )}
    </section>
  );
}
