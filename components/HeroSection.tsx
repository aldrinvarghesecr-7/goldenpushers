'use client';

// ═══════════════════════════════════════════════════════════════
// HERO SECTION — "PUSHING VISION INTO GOLD"
// Grand cinematic entrance with GSAP-powered text reveal.
// Split headline with gold gradient, staggered subtitle,
// and animated scroll indicator.
// ═══════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLHeadingElement>(null);
  const line2 = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Title line 1 — sweeps up with rotation
      tl.fromTo(
        line1.current,
        { y: 120, opacity: 0, rotateX: 40, skewY: 2 },
        { y: 0, opacity: 1, rotateX: 0, skewY: 0, duration: 1.4, ease: 'power4.out' },
        '-=0.6'
      );

      // Title line 2 — sweeps up from opposite angle
      tl.fromTo(
        line2.current,
        { y: 120, opacity: 0, rotateX: -30, skewY: -2 },
        { y: 0, opacity: 1, rotateX: 0, skewY: 0, duration: 1.4, ease: 'power4.out' },
        '-=1.0'
      );

      // Subtitle
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.6'
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        {/* Top badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-3 mb-8 opacity-0"
        >
          <div className="h-px w-8 bg-[#D4AF77]/40" />
          <span className="text-[#D4AF77] text-[10px] md:text-xs tracking-[0.5em] uppercase font-sans font-bold">
            Est. 2024
          </span>
          <div className="h-px w-8 bg-[#D4AF77]/40" />
        </div>

        {/* Main Headline */}
        <div className="perspective-container overflow-hidden">
          <h1
            ref={line1}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-[#D4AF77] to-[#B8943F] opacity-0"
          >
            PUSHING VISION
          </h1>
        </div>
        <div className="perspective-container overflow-hidden mt-2 md:mt-4">
          <h1
            ref={line2}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none font-serif text-white/90 opacity-0"
          >
            INTO GOLD
          </h1>
        </div>

        {/* Subline */}
        <p
          ref={subRef}
          className="mt-8 md:mt-10 text-sm md:text-lg font-sans text-white/50 tracking-[0.15em] md:tracking-[0.2em] uppercase max-w-xl mx-auto leading-relaxed opacity-0"
        >
          A Premium Creative Production House.
          <br className="hidden md:block" /> Uncompromising Cinematic Excellence.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-[#D4AF77]/60 text-[9px] tracking-[0.5em] uppercase font-sans font-bold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-[#D4AF77]/40" />
        </motion.div>
      </div>

      {/* Decorative bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent pointer-events-none z-[5]" />
    </section>
  );
}
