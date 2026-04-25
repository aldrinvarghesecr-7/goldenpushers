'use client';

// ═══════════════════════════════════════════════════════════════
// HERO SECTION — $50K CINEMATIC ENTRANCE
// Staggered line-by-line reveal with GSAP,
// scroll-linked parallax fade, breathing gold glow,
// and a cinematic scroll cue.
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLHeadingElement>(null);
  const line2 = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineAccent = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax Scroll Effects
  const { scrollY } = useScroll();
  const yText1 = useTransform(scrollY, [0, 800], [0, 120]);
  const yText2 = useTransform(scrollY, [0, 800], [0, 80]);
  const ySub = useTransform(scrollY, [0, 800], [0, 40]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.95]);

  // GSAP staggered entrance — only fires after mounted
  useGSAP(
    () => {
      if (!mounted) return;

      const tl = gsap.timeline({ delay: 0.2 });

      // Horizontal accent line sweeps in
      if (lineAccent.current) {
        tl.fromTo(
          lineAccent.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }
        );
      }

      // Badge fades in
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: -15, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
      }

      // Title line 1 — clips up from below with rotation
      if (line1.current) {
        tl.fromTo(
          line1.current,
          { y: 100, opacity: 0, rotateX: 35 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.4, ease: 'power4.out' },
          '-=0.6'
        );
      }

      // Title line 2 — clips up from opposite
      if (line2.current) {
        tl.fromTo(
          line2.current,
          { y: 100, opacity: 0, rotateX: -25 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.4, ease: 'power4.out' },
          '-=1.0'
        );
      }

      // Subtitle with blur dissolve
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 25, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
          '-=0.6'
        );
      }
    },
    { scope: container, dependencies: [mounted] }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {mounted && (
        <>
          {/* Breathing Gold Glow — slow pulse */}
          <motion.div 
            animate={{
              opacity: [0.03, 0.08, 0.03],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#D4AF77] blur-[100px] rounded-full pointer-events-none mix-blend-screen will-change-transform" 
          />

          {/* Content — parallax group */}
          <motion.div 
            style={{ opacity: opacityFade, scale }}
            className="relative z-10 text-center px-6 max-w-7xl mx-auto will-change-transform"
          >
            {/* Horizontal accent line */}
            <div
              ref={lineAccent}
              className="w-16 h-[1px] mx-auto mb-8 bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent origin-center"
              style={{ transform: 'scaleX(0)' }}
            />

            {/* Top badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-3 mb-10 opacity-0"
            >
              <span className="text-[#D4AF77] text-[10px] md:text-xs tracking-[0.5em] uppercase font-sans font-bold" data-cursor-hover>
                Est. 2024 — Premium Productions
              </span>
            </div>

            {/* Main Headline — Two lines, staggered parallax */}
            <div className="perspective-container overflow-hidden mb-2 md:mb-4">
              <motion.h1
                ref={line1}
                style={{ y: yText1 }}
                data-cursor-hover
                className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] tracking-[-0.04em] leading-[0.9] font-serif text-transparent bg-clip-text bg-[linear-gradient(110deg,#fff_35%,#D4AF77_50%,#fff_65%)] bg-[length:200%_auto] animate-[shimmer_6s_linear_infinite] opacity-0 cursor-default will-change-transform"
              >
                PUSHING VISION
              </motion.h1>
            </div>
            <div className="perspective-container overflow-hidden">
              <motion.h1
                ref={line2}
                style={{ y: yText2 }}
                data-cursor-hover
                className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] tracking-[-0.04em] leading-[0.9] font-serif text-white/90 opacity-0 cursor-default will-change-transform"
              >
                INTO <span className="text-gold-gradient">GOLD</span>
              </motion.h1>
            </div>

            {/* Subline */}
            <motion.p
              ref={subRef}
              style={{ y: ySub }}
              className="mt-10 md:mt-14 text-sm md:text-base font-sans text-white/40 tracking-[0.2em] uppercase max-w-lg mx-auto leading-relaxed opacity-0"
            >
              A Premium Creative Production House.
              <br className="hidden md:block" /> Uncompromising Cinematic Excellence.
            </motion.p>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <span className="text-[#D4AF77]/50 text-[9px] tracking-[0.5em] uppercase font-sans font-bold">
                Scroll
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ChevronDown size={16} className="text-[#D4AF77]/30" />
            </motion.div>
          </div>

          {/* Decorative bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-[5]" />
        </>
      )}
    </section>
  );
}
