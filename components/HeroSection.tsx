'use client';

// ═══════════════════════════════════════════════════════════════
// HERO SECTION — Cinematic Reveal Experience
// The Opening Shot — dramatic reveal sequence.
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Play, Volume2, VolumeX, X } from 'lucide-react';
import MagneticWrap from './MagneticWrap';
import ParticleBackground from './ParticleBackground';

const headline1 = "PUSHING VISION";
const headline2 = "INTO GOLD";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const headlineWrap1 = useRef<HTMLDivElement>(null);
  const headlineWrap2 = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const sceneNumRef = useRef<HTMLSpanElement>(null);

  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showreelOpen, setShowreelOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const scaleY = useTransform(scrollY, [0, 800], [1, 0.95]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  useGSAP(
    () => {
      if (!mounted) return;
      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Line draws across
      if (lineRef.current) {
        tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'center' });
      }

      // 2. Viewport splits (clip-path animation on mask)
      if (maskRef.current) {
        tl.fromTo(maskRef.current, { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0 0 0 0)', duration: 1.5, ease: 'power4.inOut' }, '-=0.4');
      }

      // 3. Line fades out as content reveals
      if (lineRef.current) {
        tl.to(lineRef.current, { opacity: 0, duration: 0.5 }, '-=1');
      }

      // 4. Headline character reveal
      const chars1 = headlineWrap1.current?.querySelectorAll('span');
      const chars2 = headlineWrap2.current?.querySelectorAll('span');
      
      if (chars1) {
        tl.fromTo(chars1, { opacity: 0, y: 30, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'power2.out' }, '-=0.8');
      }
      if (chars2) {
        tl.fromTo(chars2, { opacity: 0, y: 30, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.05, ease: 'power2.out' }, '-=0.6');
      }

      // 5. Badge & Subline & Scene Number
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
      }
      if (sceneNumRef.current) {
        tl.fromTo(sceneNumRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.4');
      }
      if (subRef.current) {
        tl.fromTo(subRef.current, { opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }, '-=0.2');
      }
    },
    { scope: container, dependencies: [mounted] }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative w-full h-screen bg-[#0B0D1A] overflow-hidden"
    >
      {/* Video Background (Autoplays, silent, loops) */}
      <video
        src="https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-camera-operator-filming-40248-large.mp4"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-30' : 'opacity-0'}`}
      />

      {/* Animated gradient mesh background (provides organic gold/indigo color mixing) */}
      <div className={`absolute inset-0 gradient-mesh transition-opacity duration-1000 ${videoLoaded ? 'opacity-40' : 'opacity-100'}`} />

      {/* Particle dust background */}
      <ParticleBackground />

      {/* Floating geometric CSS shapes */}
      <div className="geo-float border border-[#00E5FF]/20 w-64 h-64 top-[10%] left-[5%] [animation-delay:0s]" />
      <div className="geo-float border border-[#8B5CF6]/20 w-96 h-96 top-[60%] right-[10%] [animation-delay:-4s]" />
      <div className="geo-float-triangle top-[30%] right-[20%] [animation-delay:-2s]" />

      {/* Center line for initial reveal */}
      <div ref={lineRef} className="absolute top-1/2 left-0 w-full h-px bg-[#00E5FF] z-20" />

      {mounted && (
        <motion.div
          style={{ opacity: opacityFade, scaleY, transformOrigin: 'top' }}
          className="relative z-10 w-full h-full flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-16 lg:px-24 will-change-transform"
        >
          {/* Mask container for the split reveal */}
          <div ref={maskRef} className="w-full h-full absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-16 lg:px-24" style={{ clipPath: 'inset(50% 0 50% 0)' }}>
            
            {/* Top row */}
            <div className="absolute top-32 left-8 md:left-16 lg:left-24 right-8 md:right-16 lg:right-24 flex items-center justify-between pointer-events-none">
              <div ref={badgeRef} className="text-[#00E5FF] text-[9px] tracking-[0.6em] uppercase font-sans font-bold opacity-0">
                Est. 2024 — Premium Productions
              </div>
              <span ref={sceneNumRef} className="text-[#5A6285]/40 text-[10px] tracking-[0.4em] uppercase font-mono hidden md:block opacity-0">
                Scene 01 / 00:00:00:00
              </span>
            </div>

            {/* Headlines */}
            <div className="mb-2 mt-auto">
              <h1 ref={headlineWrap1} className="text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] tracking-[-0.03em] leading-[0.85] font-display text-[#E8ECF4] cursor-default flex flex-wrap">
                {headline1.split('').map((char, i) => (
                  <span key={i} className="inline-block whitespace-pre" style={{ opacity: 0 }}>{char}</span>
                ))}
              </h1>
              <h1 ref={headlineWrap2} className="text-[13vw] sm:text-[11vw] md:text-[10vw] lg:text-[9vw] tracking-[-0.03em] leading-[0.85] font-display text-cyan-gradient cursor-default flex flex-wrap mt-2">
                {headline2.split('').map((char, i) => (
                  <span key={i} className="inline-block whitespace-pre" style={{ opacity: 0 }}>{char}</span>
                ))}
              </h1>
            </div>

            {/* Subline, CTA & Scroll cue */}
            <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <p ref={subRef} className="text-sm md:text-base font-sans text-[#5A6285] tracking-[0.15em] uppercase max-w-xs leading-relaxed opacity-0">
                  A Premium Creative Production House.<br/>Uncompromising Cinematic Excellence.
                </p>
                {/* Play Showreel Button */}
                <MagneticWrap>
                  <motion.button 
                    initial={{ opacity: 0, y: 15 }}
                    animate={mounted ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    onClick={() => setShowreelOpen(true)}
                    className="group relative px-6 py-3 bg-transparent border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-mono tracking-[0.2em] uppercase hover:bg-[#00E5FF] hover:text-[#0B0D1A] hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 w-fit shrink-0 cursor-none"
                    data-cursor-hover
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Play size={12} fill="currentColor" /> Play Showreel
                    </span>
                  </motion.button>
                </MagneticWrap>
              </div>

              {/* Background Video Control Overlay */}
              <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={mounted ? { opacity: 0.6 } : {}}
                  whileHover={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-2 text-[#5A6285] hover:text-[#00E5FF] text-[10px] font-mono tracking-[0.15em] uppercase py-2 px-3 border border-[#5A6285]/20 hover:border-[#00E5FF]/40 transition-all cursor-none"
                  data-cursor-hover
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  <span>{isMuted ? "UNMUTE BG" : "MUTE BG"}</span>
                </motion.button>

                <div className="flex items-center gap-4 text-[#5A6285]/60 text-[9px] tracking-[0.4em] uppercase font-sans">
                  <span>Scroll</span>
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="w-10 h-px bg-[#5A6285]/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Showreel Fullscreen Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowreelOpen(false)}
              className="absolute inset-0 cursor-none"
              data-cursor-hover
              data-cursor-text="CLOSE"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl aspect-video mx-4 overflow-hidden bg-black border border-[#00E5FF]/20 shadow-[0_0_50px_rgba(0,229,255,0.15)]"
            >
              <button
                onClick={() => setShowreelOpen(false)}
                className="absolute top-5 right-5 z-[100] p-2 bg-black/60 hover:bg-[#00E5FF] text-white/60 hover:text-[#0B0D1A] transition-all border border-white/10 group cursor-none"
                data-cursor-hover
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-400" />
              </button>
              
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-camera-operator-filming-40248-large.mp4"
                autoPlay
                controls
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
