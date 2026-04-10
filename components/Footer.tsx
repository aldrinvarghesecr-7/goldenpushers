import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] py-32 border-t border-white/5 relative overflow-hidden">
      {/* Animated Subtle Scroll Line */}
      <motion.div 
         className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#CEA900] to-transparent opacity-30"
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
          {['Instagram', 'Vimeo', 'LinkedIn'].map(social => (
             <a
                key={social}
                href="#"
                className="font-sans font-bold tracking-widest text-xs uppercase text-white/50 hover:text-accent transition-colors block"
             >
               {social}
             </a>
          ))}
        </div>

        <div className="pt-16 w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 text-xs text-white/30 tracking-widest uppercase font-mono">
          <p>© {new Date().getFullYear()} Golden Pushers Productions LLP.</p>
          <p className="mt-4 md:mt-0">All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}