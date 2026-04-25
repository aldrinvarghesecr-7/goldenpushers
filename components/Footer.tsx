'use client';

// ═══════════════════════════════════════════════════════════════
// FOOTER — Grand Finale with Massive Scroll-Reveal Text
// Scroll-linked scale/opacity for the giant brand name,
// editorial social links, and a cinematic closing.
// ═══════════════════════════════════════════════════════════════

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { siteConfig } from '@/lib/config';
import Marquee from './Marquee';

const socials = [
  { label: 'Instagram', href: siteConfig.instagram },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'WhatsApp', href: siteConfig.whatsapp },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const textScale = useTransform(scrollYProgress, [0, 0.6], [0.6, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.7], [80, 0]);

  return (
    <footer ref={containerRef} className="relative pt-24 pb-8 md:pt-40 md:pb-12 border-t border-white/[0.04] overflow-hidden bg-[#030303]">
      
      {/* Marquee — runs behind everything */}
      <div className="absolute top-8 left-0 right-0 opacity-[0.02]">
        <Marquee 
          text="GOLDEN PUSHERS PRODUCTIONS" 
          speed={50} 
          className="text-[20vw] font-serif font-black text-white leading-none" 
        />
      </div>

      <div className="max-w-[90vw] mx-auto flex flex-col items-center text-center space-y-12 relative z-10">
        {/* Logo */}
        <BrandLogo size={50} showText={false} />

        {/* Tagline */}
        <div className="space-y-3">
          <p className="font-sans text-white/60 text-lg md:text-xl tracking-wide max-w-sm mx-auto font-light">
            Forging cinematic gold, one frame at a time.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group relative font-sans font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase text-white/25 hover:text-[#D4AF77] transition-colors duration-500"
            >
              {social.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[#D4AF77] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-12 w-full flex flex-col md:flex-row justify-between items-center border-t border-white/[0.04] text-[10px] text-white/15 tracking-[0.3em] uppercase font-sans gap-3">
          <p>{siteConfig.copyright}</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>

      {/* Massive Cinematic Text Reveal */}
      {mounted && (
        <motion.div 
          className="w-full flex justify-center mt-12 md:mt-24 pointer-events-none overflow-hidden"
          style={{ scale: textScale, opacity: textOpacity, y: textY }}
        >
          <h2 className="text-[14vw] font-serif font-black tracking-[-0.04em] leading-none text-transparent bg-clip-text bg-[linear-gradient(to_bottom,rgba(212,175,119,0.15),rgba(5,5,5,0))] uppercase whitespace-nowrap will-change-transform">
            GOLDEN PUSHERS
          </h2>
        </motion.div>
      )}
    </footer>
  );
}