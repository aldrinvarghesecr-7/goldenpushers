'use client';

// ═══════════════════════════════════════════════════════════════
// NAVBAR — Redesigned floating glass capsule & side vertical progress
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
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollY = useRef(0);

  // Active section tracker
  useEffect(() => {
    const sections = ['hero', 'ethos', 'services', 'work', 'team', 'contact'];
    
    const trackActiveSection = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      
      // Auto-hide navigation on scroll down, show on scroll up
      if (currentY > 300) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 5);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentY;
      trackActiveSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    trackActiveSection();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ─── Center-Floating Capsule Navbar ─── */}
      <motion.nav
        initial={{ y: -100, x: '-50%' }}
        animate={{ 
          y: hidden && !isOpen ? -150 : 0,
          x: '-50%' 
        }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed left-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] ${
          scrolled
            ? 'top-6 w-[90vw] max-w-[650px] rounded-full bg-[#111326]/75 backdrop-blur-xl border border-[#00E5FF]/20 px-8 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,229,255,0.05)]'
            : 'top-0 w-full max-w-full rounded-none bg-transparent border-b border-transparent py-6 md:py-7 px-8 md:px-16'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="relative z-50 transition-opacity duration-400 hover:opacity-70">
            <BrandLogo size={scrolled ? 28 : 34} showText={false} />
          </Link>

          {/* Nav Links — Desktop */}
          <div className="hidden md:flex items-center gap-x-8 lg:gap-x-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className={`text-[9px] tracking-[0.4em] uppercase font-sans font-bold transition-all duration-300 relative group py-1.5 ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]'
                    : 'text-[#5A6285] hover:text-[#E8ECF4]'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#00E5FF] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.3,1)] shadow-[0_0_8px_rgba(0,229,255,0.6)] ${
                  activeSection === link.href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}

            {/* CTA Link */}
            <a
              href="#contact"
              data-cursor-hover
              data-cursor-text="LET'S TALK"
              className={`relative group text-[9px] tracking-[0.4em] uppercase font-sans font-bold transition-colors duration-300 flex items-center gap-2.5 ${
                activeSection === 'contact' ? 'text-white' : 'text-[#00E5FF] hover:text-white'
              }`}
            >
              Enquire
              <span className={`h-[2px] bg-[#00E5FF] transition-all duration-400 shadow-[0_0_8px_rgba(0,229,255,0.6)] ${
                activeSection === 'contact' ? 'w-8 bg-white' : 'w-5 group-hover:w-8 group-hover:bg-white'
              }`} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E8ECF4]/60 hover:text-[#E8ECF4] transition-colors z-50 relative p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
              className="fixed inset-0 bg-[#070814] z-40 flex flex-col justify-center items-start px-8 md:px-12 w-screen h-screen"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-[#E8ECF4]/[0.05]" />

              <div className="flex flex-col gap-0 w-full mt-10">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                    className="border-b border-[#E8ECF4]/[0.05]"
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-6 text-3xl font-display font-bold uppercase tracking-tight transition-colors duration-300 ${
                        activeSection === link.href.slice(1) ? 'text-[#00E5FF]' : 'text-[#5A6285]'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="border-b border-[#E8ECF4]/[0.05]"
                >
                  <a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    className="block py-6 text-3xl font-display font-bold text-[#00E5FF] hover:text-[#E8ECF4] uppercase tracking-tight transition-colors duration-300 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                  >
                    Enquire
                  </a>
                </motion.div>
              </div>

              {/* Bottom contact detail */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 left-8 text-[#5A6285] text-[9px] tracking-[0.4em] uppercase font-mono"
              >
                goldenpushers@gmail.com
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ─── Pinned Vertical Scroll Dot Indicators (Desktop) ─── */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[99] hidden lg:flex flex-col gap-5 items-center">
        {['hero', 'ethos', 'services', 'work', 'team', 'contact'].map((section, idx) => (
          <a
            key={section}
            href={`#${section}`}
            className="group relative flex items-center justify-end p-1"
          >
            {/* Tooltip Label */}
            <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 text-[8px] tracking-[0.25em] uppercase font-mono font-bold text-[#00E5FF] bg-[#070814]/90 backdrop-blur-md px-3 py-1.5 border border-[#00E5FF]/20 rounded-full whitespace-nowrap shadow-2xl">
              {section === 'hero' ? 'Start' : section === 'services' ? 'Craft' : section === 'work' ? 'Reels' : section === 'team' ? 'Architects' : section}
            </span>
            {/* Nav Dot */}
            <div 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                activeSection === section
                  ? 'bg-[#00E5FF] scale-[1.7] shadow-[0_0_10px_#00E5FF,0_0_2px_#00E5FF]' 
                  : 'bg-[#5A6285]/30 group-hover:bg-[#E8ECF4]/60 group-hover:scale-125'
              }`}
            />
          </a>
        ))}
      </div>
    </>
  );
}