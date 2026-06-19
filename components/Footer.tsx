'use client';

// ═══════════════════════════════════════════════════════════════
// FOOTER — Editorial charcoal footer with ivory wordmark
// Thin rules, Inter labels, Cormorant wordmark
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BrandLogo from './BrandLogo';
import { siteConfig } from '@/lib/config';

const socials = [
  { label: 'Instagram', href: siteConfig.instagram },
  { label: 'LinkedIn', href: siteConfig.linkedin },
  { label: 'WhatsApp', href: siteConfig.whatsapp },
];

const navLinks = [
  { label: 'Studio', href: '#ethos' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'Enquire', href: '#contact' },
];

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end end'] });
  const wordmarkY = useTransform(scrollYProgress, [0, 0.8], [50, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const LABEL = {
    fontFamily: 'var(--font-sans)',
    fontSize: '9px',
    fontWeight: 400,
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
  };

  return (
    <footer
      ref={containerRef}
      className="relative pt-20 pb-0 overflow-hidden"
      style={{ background: '#1E1E1E', borderTop: '1px solid rgba(200,194,184,0.08)' }}
    >

      <div className="max-w-[90vw] mx-auto relative z-10">

        {/* Top row — logo + socials + nav */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 pb-14"
          style={{ borderBottom: '1px solid rgba(200,194,184,0.10)' }}>

          {/* Brand */}
          <div>
            <BrandLogo size={32} showText={true} inverted />
            <p
              className="mt-6 max-w-[220px]"
              style={{
                ...LABEL,
                color: '#6F6F6F',
                lineHeight: 1.9,
                letterSpacing: '0.08em',
                textTransform: 'none',
                fontSize: '12px',
                fontWeight: 300,
              }}
            >
              A Visual Story Engineering Studio based in Kochi, Kerala.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p style={{ ...LABEL, color: '#3A3A3A', marginBottom: '8px' }}>Navigation</p>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className="group flex items-center gap-2 transition-all duration-300"
                style={{ ...LABEL, color: '#6F6F6F' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F8F4EE')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6F6F6F')}
              >
                <span className="w-0 h-px bg-[#A66B45] group-hover:w-4 transition-all duration-300 block" />
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact + socials */}
          <div className="flex flex-col gap-3">
            <p style={{ ...LABEL, color: '#3A3A3A', marginBottom: '8px' }}>Connect</p>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{ ...LABEL, color: '#A66B45', display: 'block' }}
              className="hover:opacity-70 transition-opacity duration-300"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              style={{ ...LABEL, color: '#6F6F6F', display: 'block' }}
              className="hover:text-[#F8F4EE] transition-colors duration-300"
            >
              {siteConfig.phone}
            </a>
            <div className="h-px bg-[rgba(200,194,184,0.08)] my-3" />
            <div className="flex items-center gap-6">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="group relative transition-colors duration-300"
                  style={{ ...LABEL, color: '#6F6F6F' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F8F4EE')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6F6F6F')}
                >
                  {s.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#A66B45] group-hover:w-full transition-all duration-400 block" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row — tagline + copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-8">
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              fontWeight: 300,
              letterSpacing: '0',
              color: '#6F6F6F',
            }}
          >
            {siteConfig.tagline}
          </p>

          <div className="flex items-center gap-4">
            <p style={{ ...LABEL, color: '#3A3A3A' }}>{siteConfig.copyright}</p>
            <span style={{ color: '#3A3A3A' }}>—</span>
            <p style={{ ...LABEL, color: '#3A3A3A' }}>All Rights Reserved</p>
          </div>
        </div>
      </div>

      {/* Massive scroll-reveal wordmark */}
      {mounted && (
        <div className="overflow-hidden relative z-10">
          <motion.div
            style={{ y: wordmarkY, opacity: wordmarkOpacity }}
            className="w-full pointer-events-none"
          >
            <h2
              className="uppercase whitespace-nowrap w-full text-center leading-[0.85] select-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(60px, 13vw, 180px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                color: 'rgba(248,244,238,0.03)',
              }}
            >
              Golden Pushers
            </h2>
          </motion.div>
        </div>
      )}
    </footer>
  );
}