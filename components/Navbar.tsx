'use client';

// ═══════════════════════════════════════════════════════════════
// NAVBAR — Premium Hide-on-scroll-down, Show-on-scroll-up
// Glassmorphism backdrop, magnetic Enquire button.
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import BrandLogo from './BrandLogo';

const NAV_LINKS = [
  { href: '#ethos', label: 'Ethos' },
  { href: '#services', label: 'Craft' },
  { href: '#work', label: 'Reels' },
  { href: '#team', label: 'Architects' },
];

// ─── MAGNETIC BUTTON ───
function MagneticButton({ children, className = '', href = '#', ...props }: { children: React.ReactNode; className?: string; href?: string; [key: string]: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <a href={href} className={className} data-cursor-hover data-cursor-text={props['data-cursor-text']}>
        {children}
      </a>
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      
      // Hide on scroll down, show on scroll up (only after 300px)
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
      animate={{ y: hidden && !isOpen ? -120 : 0 }}
      transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled
          ? 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/[0.04] py-4'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-[90vw] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group relative z-50">
          <BrandLogo size={40} showText={false} />
        </Link>

          <div className="hidden md:flex items-center gap-x-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor-hover
                className="text-[10px] tracking-[0.4em] uppercase font-sans font-bold text-white/40 hover:text-white transition-all duration-500 relative group/link"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF77] group-hover/link:w-full transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
              </a>
            ))}
            
            <div className="ml-8">
              <MagneticButton
                href="#contact"
                data-cursor-hover
                data-cursor-text="LET'S TALK"
                className="px-8 py-3 border border-[#D4AF77]/25 text-[#D4AF77] text-[10px] tracking-[0.4em] uppercase font-sans font-black hover:text-[#0A0A0A] transition-all duration-700 rounded-sm relative overflow-hidden group block"
              >
                <span className="relative z-10">Enquire</span>
                <div className="absolute inset-0 bg-[#D4AF77] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
              </MagneticButton>
            </div>
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
    </motion.nav>
  );
}