'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, Mail, Users, Briefcase, Info } from 'lucide-react';
import ContactForm from './ContactForm';

const sections = [
  { id: 'hero', title: 'PUSHING VISION INTO GOLD', subtitle: 'The First Push', progress: [0, 0.15] },
  { id: 'ethos', title: 'THE VOICE AWAKENS', subtitle: 'Crafting Narrative Truth', progress: [0.15, 0.35] },
  { id: 'craft', title: 'THE CRAFT', subtitle: 'Cinematic Excellence', progress: [0.35, 0.6] },
  { id: 'work', title: 'THE REELS', subtitle: 'Selected Masterpieces', progress: [0.6, 0.8] },
  { id: 'team', title: 'THE ARCHITECTS', subtitle: 'World-Class Talent', progress: [0.8, 0.95] },
  { id: 'contact', title: 'ENQUIRE', subtitle: 'The Final Frame', progress: [0.95, 1.0] },
];

export default function UnbrokenCinematicFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (latest) => {
      const current = sections.find(s => latest >= s.progress[0] && latest <= s.progress[1]);
      if (current && current.id !== activeSection) {
        setActiveSection(current.id);
      }
    });
    return () => unsub();
  }, [scrollYProgress, activeSection]);

  return (
    <div ref={containerRef} className="relative h-[1000vh] w-full">
      {/* Persistent Content Layer */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        
        {/* Cinematic Overlays */}
        <AnimatePresence mode="wait">
          {activeSection === 'hero' && (
            <motion.div 
               key="hero"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.1 }}
               transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
               className="text-center px-6"
            >
               <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(212,175,119,0.3)]">
                 PUSHING VISION <br/> <span className="text-accent">INTO GOLD</span>
               </h1>
               <p className="mt-8 text-white/40 tracking-[0.5em] uppercase text-xs md:text-sm font-light">
                 Scroll to Ignite the Studio
               </p>
               <motion.div 
                 animate={{ y: [0, 10, 0] }} 
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="mt-12 text-accent/50"
               >
                 <ChevronDown size={32} />
               </motion.div>
            </motion.div>
          )}

          {activeSection === 'ethos' && (
            <motion.div 
               key="ethos"
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 30 }}
               className="max-w-4xl px-8 text-left w-full"
            >
               <div className="flex items-center gap-4 mb-6">
                 <div className="h-px w-12 bg-accent" />
                 <span className="text-accent tracking-[0.4em] uppercase text-xs font-bold">The Ethos</span>
               </div>
               <h2 className="text-4xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-none">
                 EVERY FRAME IS <br/> A TRIBUTE TO TRUTH.
               </h2>
               <p className="mt-8 text-white/60 text-lg md:text-2xl font-serif italic max-w-2xl leading-relaxed">
                 "We don't just record images; we architect emotional gold. Our mission is to push the boundaries of visual storytelling until the vision becomes undeniable."
               </p>
            </motion.div>
          )}

          {activeSection === 'craft' && (
             <motion.div 
                key="craft"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="w-full h-full flex items-center justify-center"
             >
                {/* 3D Carousel logic is handled by CinematicFlowScene, 
                    here we only provide the metadata or labels if needed */}
                <div className="absolute top-24 left-12">
                   <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter">THE CRAFT</h2>
                   <p className="text-accent font-mono text-xs tracking-[0.5em] uppercase mt-4">Apple-Style 3D Sequence</p>
                </div>
             </motion.div>
          )}

          {activeSection === 'work' && (
             <motion.div 
                key="work"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-24 right-12 text-right"
             >
                <h2 className="text-white text-3xl md:text-6xl font-black uppercase tracking-tighter">THE REELS</h2>
                <div className="flex items-center justify-end gap-4 mt-4">
                  <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono">Archive 2024-2025</span>
                  <div className="h-px w-12 bg-white/20" />
                </div>
             </motion.div>
          )}

          {activeSection === 'team' && (
             <motion.div 
                key="team"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
             >
                <h2 className="text-white text-6xl md:text-9xl font-black uppercase tracking-[calc(-0.05em)]">ARCHITECTS</h2>
                <p className="text-accent tracking-[0.8em] uppercase text-xs mt-6">Visionaries Behind the Lens</p>
             </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div 
                key="contact"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl px-6 pointer-events-auto"
            >
               <div className="bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/5 p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                  <ContactForm />
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Navigation Sidebar */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-end z-50 pointer-events-auto">
          {sections.map((s, idx) => (
            <div 
              key={s.id} 
              className="flex items-center gap-4 group cursor-pointer"
              onClick={() => {
                const target = document.documentElement.scrollHeight * s.progress[0];
                window.scrollTo({ top: target + 10, behavior: 'smooth' });
              }}
            >
              <span className={`text-[10px] tracking-widest uppercase transition-all duration-500 ${activeSection === s.id ? 'text-accent opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`}>
                {s.title}
              </span>
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === s.id ? 'bg-accent scale-150 shadow-[0_0_10px_#D4AF77]' : 'bg-white/20'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Background Section Markers (for scroll mapping) */}
      <div id="hero" className="h-[150vh]" />
      <div id="ethos" className="h-[200vh]" />
      <div id="craft" className="h-[250vh]" />
      <div id="work" className="h-[200vh]" />
      <div id="team" className="h-[150vh]" />
      <div id="contact" className="h-[150vh]" />
    </div>
  );
}
