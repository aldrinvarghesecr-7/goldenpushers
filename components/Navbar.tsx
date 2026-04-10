'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <Link href="/" className="flex items-center gap-4 group">
           {/* High-End SVG Wave Logo (Custom implementation based on user upload) */}
           <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
              <svg viewBox="0 0 100 100" className="w-full h-full text-accent drop-shadow-[0_0_15px_rgba(212,175,119,0.3)]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-20" />
                <path d="M20 60C20 60 30 40 50 40C70 40 80 60 80 60C80 60 70 80 50 80C30 80 20 60 20 60Z" fill="currentColor" className="opacity-10" />
                <path d="M15 65C15 65 30 35 55 35C80 35 85 70 85 70C85 70 70 85 55 85C40 85 15 65 15 65Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 50C45 30 65 30 80 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(212,175,119,0.8)]" />
                <circle cx="70" cy="35" r="3" fill="currentColor" />
              </svg>
           </div>
           <div className="flex flex-col">
             <span className="text-sm font-black tracking-[0.3em] uppercase text-white leading-none">Golden Pushers</span>
             <span className="text-[8px] tracking-[0.5em] text-accent/60 uppercase font-sans font-light mt-1">Productions LLP</span>
           </div>
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