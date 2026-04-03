'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-20 text-white">
        <Link href="/" className="text-2xl tracking-[4px] font-serif hover:opacity-80 transition-opacity">{siteConfig.title}</Link>

        <div className="hidden md:flex gap-x-12 text-sm tracking-widest uppercase font-medium">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`hover:text-accent transition-colors duration-300 ${pathname === l.href ? 'text-accent' : 'text-white/80'}`}>{l.label}</Link>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-primary border-t border-white/10"
          >
            <div className="flex flex-col px-8 py-8 text-lg tracking-widest text-white">
              {links.map(l => <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="py-4 hover:text-accent font-serif tracking-widest transition-colors">{l.label}</Link>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}