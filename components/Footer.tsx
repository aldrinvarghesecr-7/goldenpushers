'use client';
import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-32 border-t border-white/5 relative overflow-hidden">
      {/* Animated Subtle Scroll Line */}
      <motion.div 
         className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent opacity-30"
         animate={{ x: ["-100%", "100%"] }}
         transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      />

      <div className="max-w-[90vw] mx-auto flex flex-col items-center justify-center text-center space-y-16">
        <div className="flex justify-center">
          <BrandLogo size={60} />
        </div>


        <div className="space-y-4">
          <p className="text-xs tracking-[0.4em] text-white/40 uppercase font-mono">Los Angeles // London</p>
          <p className="font-serif tracking-widest text-xl text-white/80 max-w-sm mx-auto">
             Forging cinematic gold, one frame at a time.
          </p>
        </div>

        <div className="flex gap-12">
          <a href="https://instagram.com" className="font-sans font-bold tracking-widest text-xs uppercase text-[#D4AF77]/50 hover:text-[#D4AF77] transition-colors block">
            Instagram
          </a>
          <a href="https://www.linkedin.com/company/goldenpushers/" className="font-sans font-bold tracking-widest text-xs uppercase text-[#D4AF77]/50 hover:text-[#D4AF77] transition-colors block">
            LinkedIn
          </a>
          <a href="https://wa.me/placeholder" className="font-sans font-bold tracking-widest text-xs uppercase text-[#D4AF77]/50 hover:text-[#D4AF77] transition-colors block">
            WhatsApp
          </a>
        </div>

        <div className="pt-16 w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 text-xs text-white/30 tracking-widest uppercase font-mono">
          <p>© 2026 Golden Pushers Productions LLP.</p>
          <p className="mt-4 md:mt-0">All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}