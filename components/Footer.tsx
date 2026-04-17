'use client';

// ═══════════════════════════════════════════════════════════════
// FOOTER — Elegant Minimal Footer
// Social links (Instagram, LinkedIn, WhatsApp), copyright line,
// and animated gold accent line.
// ═══════════════════════════════════════════════════════════════

import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { siteConfig } from '@/lib/config';

const socials = [
  { label: 'Instagram', href: siteConfig.instagram },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'WhatsApp', href: siteConfig.whatsapp },
];

export default function Footer() {
  return (
    <footer className="relative py-24 md:py-32 border-t border-white/[0.04] overflow-hidden bg-[#0A0A0A]/80">
      {/* Animated gold accent line */}
      <motion.div
        className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#D4AF77]/30 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
      />

      <div className="max-w-[90vw] mx-auto flex flex-col items-center text-center space-y-12">
        {/* Logo */}
        <BrandLogo size={50} showText={false} />

        {/* Tagline */}
        <div className="space-y-3">
          <p className="font-sans text-white/70 text-lg md:text-xl tracking-wide max-w-sm mx-auto font-light">
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
              className="group relative font-sans font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase text-white/30 hover:text-[#D4AF77] transition-colors duration-500"
            >
              {social.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[#D4AF77] group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-12 w-full flex flex-col md:flex-row justify-between items-center border-t border-white/[0.04] text-[10px] text-white/20 tracking-[0.3em] uppercase font-sans gap-3">
          <p>{siteConfig.copyright}</p>
          <p>All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}