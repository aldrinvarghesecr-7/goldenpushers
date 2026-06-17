'use client';

// ═══════════════════════════════════════════════════════════════
// FOOTER — Massive wordmark with character cascade.
// ═══════════════════════════════════════════════════════════════

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { siteConfig } from '@/lib/config';

const socials = [
  { label: 'Instagram', href: siteConfig.instagram },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'WhatsApp', href: siteConfig.whatsapp },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });
  const textY = useTransform(scrollYProgress, [0, 0.8], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer ref={containerRef} className="relative pt-24 pb-0 bg-[#0B0D1A] overflow-hidden border-t border-[#00E5FF]/[0.04]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#00E5FF]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-[90vw] mx-auto relative z-10">
        {/* Top row: Logo + socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-16 border-b border-[#00E5FF]/[0.04]">
          <BrandLogo size={42} showText={false} />

          <div className="flex items-center gap-10">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group relative font-sans font-bold tracking-[0.35em] text-[9px] md:text-[10px] uppercase text-[#5A6285]/80 hover:text-[#E8ECF4] transition-colors duration-400"
              >
                {social.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#00E5FF] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
              </a>
            ))}
          </div>
        </div>

        {/* Middle: Tagline + copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-12 pb-12">
          <p className="font-sans text-[#5A6285] text-sm md:text-base tracking-wide font-light max-w-sm">
            Forging cinematic stories, one frame at a time.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 text-[9px] text-[#5A6285]/60 tracking-[0.4em] uppercase font-mono">
            <p>{siteConfig.copyright}</p>
            <span className="hidden md:block text-[#E8ECF4]/[0.05]">—</span>
            <p>All Rights Reserved.</p>
          </div>
        </div>
      </div>

      {/* Massive bottom wordmark — scroll-reveal */}
      {mounted && (
        <div className="overflow-hidden relative z-10">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="w-full pointer-events-none"
          >
            <h2 className="text-[14vw] font-display font-bold tracking-[-0.04em] leading-[0.85] text-[#E8ECF4]/[0.03] uppercase whitespace-nowrap w-full text-center pb-0 will-change-transform">
              GOLDEN PUSHERS
            </h2>
          </motion.div>
        </div>
      )}
    </footer>
  );
}