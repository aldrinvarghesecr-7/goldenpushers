'use client';

// ═══════════════════════════════════════════════════════════════
// NAVBAR — Editorial floating header with ivory/olive palette
// Auto-hides on scroll down, reveals on scroll up
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { href: '#ethos', label: 'Studio' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#team', label: 'Team' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollY = useRef(0);

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
      setScrolled(currentY > 80);
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
      {/* ─── Main Navbar ─── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden && !isOpen ? -120 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'top-0 bg-[#F8F4EE]/92 backdrop-blur-md border-b border-[#C8C2B8]/40 shadow-[0_1px_20px_rgba(30,30,30,0.06)]'
            : 'top-0 bg-transparent'
        }`}
      >
        <div className="max-w-[90vw] mx-auto flex items-center justify-between py-5 md:py-6">

          {/* Logo */}
          <Link href="/" className="relative z-50 transition-opacity duration-300 hover:opacity-70">
            <BrandLogo size={scrolled ? 30 : 34} showText={false} />
          </Link>

          {/* Nav Links — Desktop */}
          <div className="hidden md:flex items-center gap-x-10 lg:gap-x-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className="group relative py-1"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: activeSection === link.href.slice(1) ? '#39463A' : '#6F6F6F',
                  transition: 'color 0.3s ease',
                }}
              >
                <span
                  onMouseEnter={e => (e.currentTarget.style.color = '#39463A')}
                  onMouseLeave={e => (e.currentTarget.style.color = activeSection === link.href.slice(1) ? '#39463A' : '#6F6F6F')}
                >
                  {link.label}
                </span>
                {/* Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[1px] bg-[#39463A] transition-all duration-500 origin-left"
                  style={{ width: activeSection === link.href.slice(1) ? '100%' : '0%' }}
                />
                <span className="absolute bottom-0 left-0 h-[1px] bg-[#A66B45] w-0 group-hover:w-full transition-all duration-400 origin-left" />
              </a>
            ))}

            {/* CTA */}
            <a
              href="#contact"
              data-cursor-hover
              data-cursor-text="ENQUIRE"
              className="group flex items-center gap-2.5 transition-all duration-300"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#39463A',
              }}
            >
              <span>Enquire</span>
              <span className="h-[1px] w-5 bg-[#39463A] group-hover:w-9 group-hover:bg-[#A66B45] transition-all duration-400 block" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 relative p-1 transition-colors duration-200"
            style={{ color: '#39463A' }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* ─── Side Section Dots (Desktop) ─── */}
      <div className="fixed right-7 top-1/2 -translate-y-1/2 z-[99] hidden lg:flex flex-col gap-4 items-center">
        {['hero', 'ethos', 'services', 'work', 'team', 'contact'].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className="group relative flex items-center justify-end p-1"
            title={section}
          >
            {/* Tooltip */}
            <span
              className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-1 group-hover:translate-x-0 whitespace-nowrap px-2.5 py-1 border border-[#C8C2B8] bg-[#F8F4EE]"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '8px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#39463A',
              }}
            >
              {section === 'hero' ? 'Top' : section === 'services' ? 'Services' : section === 'work' ? 'Work' : section === 'team' ? 'Team' : section}
            </span>
            {/* Dot */}
            <div
              className="rounded-full transition-all duration-400"
              style={{
                width: activeSection === section ? '6px' : '4px',
                height: activeSection === section ? '6px' : '4px',
                background: activeSection === section ? '#39463A' : '#C8C2B8',
                transform: activeSection === section ? 'scale(1)' : 'scale(1)',
              }}
            />
          </a>
        ))}
      </div>

      {/* ─── Mobile Fullscreen Drawer ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 32px) 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-[#F8F4EE] z-[90] flex flex-col justify-center items-start px-10 w-screen h-screen"
          >
            {/* Top thin rule */}
            <div className="absolute top-0 left-0 right-0 h-px bg-[#C8C2B8]/40" />

            <div className="flex flex-col gap-0 w-full">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="border-b border-[#C8C2B8]/40"
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-6 transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 8vw, 48px)',
                      fontWeight: 300,
                      letterSpacing: '-0.01em',
                      color: activeSection === link.href.slice(1) ? '#39463A' : '#9B9B9B',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#39463A')}
                    onMouseLeave={e => (e.currentTarget.style.color = activeSection === link.href.slice(1) ? '#39463A' : '#9B9B9B')}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="border-b border-[#C8C2B8]/40"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block py-6 transition-colors duration-300"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 8vw, 48px)',
                    fontWeight: 300,
                    color: '#A66B45',
                  }}
                >
                  Enquire
                </a>
              </motion.div>
            </div>

            {/* Bottom detail */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-10"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '9px',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#9B9B9B',
              }}
            >
              goldenpushers@gmail.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}