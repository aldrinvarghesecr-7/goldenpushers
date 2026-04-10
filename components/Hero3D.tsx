'use client';
import { useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { Play, Pause, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Abstract Floating Golden Reeds / "Reel" shapes
export default function Hero3D() {
  const container = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 4 }); // Sync with 3.5s preloader + 0.5s buffer
    
    tl.fromTo(title1Ref.current, 
        { y: 100, opacity: 0, rotateX: 45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power4.out" }
    ).fromTo(title2Ref.current,
        { y: 100, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power4.out" },
        "-=1.2"
    );
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden bg-black/40">
      {/* Background Video (Subtle Overlay) */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen overflow-hidden">
        <video 
          autoPlay={isVideoPlaying}
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover scale-105"
          src="https://cdn.pixabay.com/video/2021/08/11/84687-587841398_large.mp4"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 pt-20">
        <div className="perspective-container text-center max-w-7xl">
           <motion.h1 
             ref={title1Ref} 
             className="text-5xl md:text-8xl lg:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-[#D4AF77] to-[#A88A00] drop-shadow-2xl"
           >
             PUSHING VISION
           </motion.h1>
           <motion.h1 
             ref={title2Ref} 
             className="text-5xl md:text-8xl lg:text-9xl mt-2 md:mt-4 tracking-tighter text-white/90 drop-shadow-2xl"
           >
             INTO GOLD
           </motion.h1>
        </div>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 1 }}
            className="mt-8 text-lg font-sans text-white/60 tracking-[0.2em] uppercase max-w-md text-center"
        >
            A Premium Creative Production House. Uncompromising Cinematic Excellence.
        </motion.p>
      </div>

      {/* Video Control & Scroll Prompt */}
      <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end z-30">
         <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5 }}
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="group flex gap-3 items-center text-xs tracking-widest uppercase text-white/50 hover:text-accent transition-colors"
         >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:scale-110 transition-all duration-500 glass">
              {isVideoPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </div>
            <span>{isVideoPlaying ? 'Pause Reel' : 'Play Reel'}</span>
         </motion.button>
         
         <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.5 }}
            className="flex flex-col items-center gap-4 text-xs tracking-widest cursor-pointer text-[#D4AF77]"
         >
            <span className="uppercase [writing-mode:vertical-rl] tracking-[0.5em] opacity-70">Scroll Journey</span>
            <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
               <ChevronDown size={20} className="opacity-50" />
            </motion.div>
         </motion.div>
      </div>
    </section>
  );
}
