'use client';

// ═══════════════════════════════════════════════════════════════
// THE ETHOS — Editorial Storytelling Section
// Large-scale typography with GSAP scroll-triggered reveals.
// Parallax images, animated stats, and luxury editorial layout.
// ═══════════════════════════════════════════════════════════════

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// ─── ANIMATED COUNTER ───
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const displayValue = useTransform(springValue, (v) => Math.floor(v));

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
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Large quote text — reveal word by word on scroll
      if (quoteRef.current) {
        const words = quoteRef.current.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { opacity: 0.1, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: quoteRef.current,
              start: 'top 80%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      // Body paragraph — fade in
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
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
    { scope: container }
  );

  // Split quote into words for staggered animation
  const quoteText =
    "We don't just capture light. We architect moments of visceral truth. Every frame is meticulously crafted — a symphony of shadow, gold, and gravity.";
  const quoteWords = quoteText.split(' ');

  return (
    <section ref={container} id="ethos" className="relative w-full py-32 md:py-48 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[#D4AF77]/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px w-12 bg-[#D4AF77]/40" />
          <span className="text-[#D4AF77] text-[10px] md:text-xs tracking-[0.5em] uppercase font-sans font-bold">
            The Ethos
          </span>
        </motion.div>

        {/* Large Quote — word-by-word reveal */}
        <p
          ref={quoteRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white/90 leading-[1.4] md:leading-[1.5] max-w-5xl mb-16"
        >
          {quoteWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>

        {/* Body Text */}
        <p
          ref={bodyRef}
          className="text-base md:text-lg text-white/40 font-sans font-light tracking-wide leading-relaxed max-w-2xl mb-24 md:mb-32 opacity-0"
        >
          Golden Pushers isn't an agency. It's a sanctuary for cinematic obsession.
          From breathtaking brand films to bespoke luxury productions, we forge
          visual gold with unrelenting precision and artistic truth.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pt-16 border-t border-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative flex flex-col items-start"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <h4 className="text-white text-[10px] tracking-[0.4em] uppercase font-sans font-bold mb-1">
                {stat.label}
              </h4>
              <p className="text-[#D4AF77]/35 text-[9px] tracking-[0.2em] uppercase font-sans italic">
                {stat.sub}
              </p>
              <div className="absolute -bottom-4 left-0 w-0 h-px bg-gradient-to-r from-[#D4AF77] to-transparent group-hover:w-full transition-all duration-700 opacity-30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
