'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const links = [
    { href: "#about", label: "Ethos" },
    { href: "#work", label: "Works" },
    { href: "#team", label: "Architects" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'bg-[#0A0A0A]/70 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[90vw] mx-auto flex items-center justify-between text-white">
        <Link href="/" className="group">
           <BrandLogo size={45} />
        </Link>


        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-x-12">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-[10px] tracking-[0.3em] uppercase font-sans font-bold text-white/40 hover:text-accent transition-all duration-500 relative group/link">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover/link:w-full transition-all duration-500" />
            </Link>
          ))}
          <Link href="#contact" className="px-8 py-3 ml-4 border border-accent/30 text-accent text-[10px] tracking-[0.4em] uppercase font-black hover:bg-accent hover:text-black transition-all duration-700 glass">
             Enquire
          </Link>
        </div>


        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white/80 hover:text-accent transition-colors z-50">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col justify-center items-center backdrop-blur-3xl"
          >
            <div className="flex flex-col text-center space-y-12">
              {links.map(l => (
                  <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                     <Link href={l.href} onClick={() => setIsOpen(false)} className="text-4xl font-serif text-white hover:text-accent tracking-widest uppercase transition-colors">
                        {l.label}
                     </Link>
                  </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                 <Link href="#contact" onClick={() => setIsOpen(false)} className="text-4xl font-serif text-accent tracking-widest uppercase mt-8 block">
                    Enquire
                 </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}