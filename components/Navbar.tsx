'use client';

// ═══════════════════════════════════════════════════════════════
// NAVBAR — Cinematic Fixed Navigation
// Transparent on top, glassmorphism on scroll. Minimal luxury feel.
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { href: '#ethos', label: 'Ethos' },
  { href: '#services', label: 'Craft' },
  { href: '#work', label: 'Reels' },
  { href: '#team', label: 'Architects' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/5 py-4'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-[90vw] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group relative z-50">
          <BrandLogo size={40} showText={false} />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-x-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] tracking-[0.35em] uppercase font-sans font-bold text-white/35 hover:text-[#D4AF77] transition-colors duration-500 relative group/link"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF77] group-hover/link:w-full transition-all duration-500" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 ml-4 border border-[#D4AF77]/20 text-[#D4AF77] text-[9px] tracking-[0.4em] uppercase font-sans font-black hover:bg-[#D4AF77] hover:text-black transition-all duration-700 glass"
          >
            Enquire
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/80 hover:text-[#D4AF77] transition-colors z-50 relative"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-[#0A0A0A]/98 z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col text-center space-y-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-serif text-white hover:text-[#D4AF77] tracking-widest uppercase transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-serif text-[#D4AF77] tracking-widest uppercase"
                >
                  Enquire
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}