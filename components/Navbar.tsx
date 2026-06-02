'use client';

// ═══════════════════════════════════════════════════════════════
// NAVBAR — Modern Production House
// Minimal top bar. Logo left, links centered, CTA right.
// Hide-on-scroll-down. Transparent → opaque on scroll.
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
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
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      if (currentY > 300) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden && !isOpen ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#111110]/90 backdrop-blur-xl border-b border-white/[0.04] py-4'
          : 'bg-transparent py-6 md:py-7'
      }`}
    >
      <div className="max-w-[90vw] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 transition-opacity duration-400 hover:opacity-70">
          <BrandLogo size={36} showText={false} />
        </Link>

        {/* Center nav links — desktop */}
        <div className="hidden md:flex items-center gap-x-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              className="text-[9px] tracking-[0.5em] uppercase font-sans font-bold text-white/35 hover:text-white transition-colors duration-400 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-[#8B1E1F] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#contact"
            data-cursor-hover
            data-cursor-text="LET'S TALK"
            className="relative group text-[9px] tracking-[0.5em] uppercase font-sans font-bold text-[#8B1E1F] hover:text-white transition-colors duration-400 flex items-center gap-3"
          >
            Enquire
            <span className="w-6 h-px bg-[#8B1E1F] group-hover:w-10 group-hover:bg-white transition-all duration-400" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/60 hover:text-white transition-colors z-50 relative"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-[#0E0E0D] z-40 flex flex-col justify-center items-start px-10"
          >
            {/* Top rule */}
            <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.05]" />

            <div className="flex flex-col gap-0 w-full">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  className="border-b border-white/[0.05]"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-7 text-4xl font-serif font-black text-white/60 hover:text-white uppercase tracking-tight transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="border-b border-white/[0.05]"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block py-7 text-4xl font-serif font-black text-[#8B1E1F] hover:text-white uppercase tracking-tight transition-colors duration-300"
                >
                  Enquire
                </a>
              </motion.div>
            </div>

            {/* Bottom contact detail */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 left-10 text-white/20 text-[9px] tracking-[0.4em] uppercase font-sans"
            >
              goldenpushers@gmail.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}