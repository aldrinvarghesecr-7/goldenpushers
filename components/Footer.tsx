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

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 px-4">
          <a 
            href={siteConfig.instagram} 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-sans font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase text-white/40 hover:text-accent transition-colors duration-500"
          >
            Instagram
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
          </a>
          <a 
            href="https://www.linkedin.com/company/goldenpushers/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-sans font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase text-white/40 hover:text-accent transition-colors duration-500"
          >
            LinkedIn
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
          </a>
          <a 
            href="https://wa.me/917306351867" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-sans font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase text-white/40 hover:text-accent transition-colors duration-500"
          >
            WhatsApp
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent transition-all duration-500 group-hover:w-full" />
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