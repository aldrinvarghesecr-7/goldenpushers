'use client';

// ═══════════════════════════════════════════════════════════════
// HERO SECTION — Modern Production House
// Full-bleed dark. Left-aligned power typography.
// Horizontal rule as separator. Clean film-industry aesthetics.
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLHeadingElement>(null);
  const line2 = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const hrRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const yText1 = useTransform(scrollY, [0, 800], [0, 120]);
  const yText2 = useTransform(scrollY, [0, 800], [0, 80]);
  const ySub = useTransform(scrollY, [0, 800], [0, 40]);
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.97]);

  useGSAP(
    () => {
      if (!mounted) return;
      const tl = gsap.timeline({ delay: 0.3 });

      if (hrRef.current) {
        tl.fromTo(hrRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power3.inOut', transformOrigin: 'left' });
      }
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      }
      if (line1.current) {
        tl.fromTo(line1.current, { y: 120, opacity: 0, rotateX: 25 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.4, ease: 'power4.out' }, '-=0.5');
      }
      if (line2.current) {
        tl.fromTo(line2.current, { y: 120, opacity: 0, rotateX: -15 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.4, ease: 'power4.out' }, '-=1.0');
      }
      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, y: 20, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power2.out' }, '-=0.8');
      }
    },
    { scope: container, dependencies: [mounted] }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative w-full h-screen bg-[#111110] flex flex-col justify-end overflow-hidden"
    >
      {/* Subtle diagonal noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Crimson accent — very subtle, top-right corner */}
      <div className="absolute top-0 right-0 w-[35vw] h-[35vh] bg-[#8B1E1F]/[0.06] blur-[120px] pointer-events-none" />

      {mounted && (
        <motion.div
          style={{ opacity: opacityFade, scale }}
          className="relative z-10 w-full pb-16 md:pb-24 px-8 md:px-16 lg:px-24 will-change-transform"
        >
          {/* Top row — badge + scene number */}
          <div
            ref={badgeRef}
            className="flex items-center justify-between mb-12 opacity-0"
          >
            <span className="text-[#8B1E1F] text-[9px] tracking-[0.6em] uppercase font-sans font-bold" data-cursor-hover>
              Est. 2024 — Premium Productions
            </span>
            <span className="text-white/15 text-[9px] tracking-[0.4em] uppercase font-sans hidden md:block">
              Scene 01 / 00:00:00:00
            </span>
          </div>

          {/* Full-width horizontal rule */}
          <div
            ref={hrRef}
            className="w-full h-px bg-white/10 mb-10 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />

          {/* Main Headline — left-aligned, massive */}
          <div className="perspective-container overflow-hidden mb-1">
            <motion.h1
              ref={line1}
              style={{ y: yText1 }}
              data-cursor-hover
              className="text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] tracking-[-0.06em] leading-[0.85] font-serif text-white opacity-0 cursor-default will-change-transform"
            >
              PUSHING VISION
            </motion.h1>
          </div>

          <div className="perspective-container overflow-hidden">
            <motion.h1
              ref={line2}
              style={{ y: yText2 }}
              data-cursor-hover
              className="text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] tracking-[-0.06em] leading-[0.85] font-serif text-white/15 opacity-0 cursor-default will-change-transform"
            >
              INTO <span className="text-gold-gradient text-white/90">GOLD</span>
            </motion.h1>
          </div>

          {/* Subline + scroll cue — row layout */}
          <div className="mt-10 md:mt-14 flex items-end justify-between">
            <motion.p
              ref={subRef}
              style={{ y: ySub }}
              className="text-sm md:text-base font-sans text-white/35 tracking-[0.15em] uppercase max-w-xs leading-relaxed opacity-0"
            >
              A Premium Creative Production House.
              <br />Uncompromising Cinematic Excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              className="flex items-center gap-4 text-white/20 text-[9px] tracking-[0.4em] uppercase font-sans"
            >
              <span>Scroll</span>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="w-8 h-px bg-white/20"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
