'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ContactForm from '../ContactForm';
import Footer from '../Footer';

const GOLD = '#D4AF77';

export default function HTMLOverlay() {
  return (
    <div className="w-screen relative" style={{ height: '600vh' }}>
      
      {/* 1. HERO SECTION (Page 0) */}
      <section className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center p-6 text-center pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(212,175,119,0.2)]"
        >
          PUSHING VISION <br/> <span className="text-accent">INTO GOLD</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="mt-8 text-white/40 tracking-[0.5em] uppercase text-xs md:text-sm font-light"
        >
          Scroll to enter the studio
        </motion.p>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-accent/50"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 2. THE ETHOS (Page 1) */}
      <section className="absolute top-[100vh] left-0 w-full h-screen flex items-center justify-start p-8 md:p-24 pointer-events-none">
        <div className="max-w-4xl w-full">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-accent" />
            <span className="text-accent tracking-[0.4em] uppercase text-xs font-bold">The Ethos</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-none mb-8">
            EVERY FRAME IS <br/> A TRIBUTE TO TRUTH.
          </h2>
          <p className="text-white/60 text-lg md:text-2xl font-serif italic max-w-2xl leading-relaxed">
            "We don't just record images; we architect emotional gold. Our mission is to push the boundaries of visual storytelling until the vision becomes undeniable."
          </p>
        </div>
      </section>

      {/* 3. THE CRAFT - Title Overlay (Page 2) */}
      <section className="absolute top-[200vh] left-0 w-full h-screen pointer-events-none">
        {/* On desktop, this is just title labels for the 3D carousel. On mobile, it mounts standard HTML cards. */}
        <div className="absolute top-24 left-8 md:left-24 z-10">
          <h2 className="text-white text-3xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-xl">THE CRAFT</h2>
          <p className="text-accent font-mono text-xs tracking-[0.5em] uppercase mt-4">Capabilities & Scale</p>
        </div>

        {/* Mobile HTML Fallback */}
        <div className="md:hidden flex flex-col items-center justify-center h-full w-full px-6 pt-32 gap-6 pointer-events-auto">
          {[
            { id: '01', title: 'CINEMATIC ADVERTISING', desc: 'High-budget commercial storytelling.' },
            { id: '02', title: 'BRAND NARRATIVES', desc: 'Documentary-style ethos films.' },
            { id: '03', title: 'STUDIO PRODUCTIONS', desc: 'Full-scale VFX & set design.' },
            { id: '04', title: 'AERIAL & ACTION', desc: 'Precision high-speed cinematography.' },
          ].map((srv) => (
             <div key={srv.id} className="w-full bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-lg text-center">
               <h3 className="text-accent font-serif text-2xl mb-2">{srv.id}</h3>
               <h4 className="text-white font-bold tracking-widest text-sm mb-2">{srv.title}</h4>
               <p className="text-white/50 text-xs">{srv.desc}</p>
             </div>
          ))}
        </div>
      </section>

      {/* 4. THE REELS (Page 3) */}
      <section className="absolute top-[300vh] left-0 w-full h-screen pointer-events-none flex flex-col justify-between p-8 md:p-24">
         <div className="self-end text-right">
            <h2 className="text-white text-3xl md:text-6xl font-black uppercase tracking-tighter">THE REELS</h2>
            <div className="flex items-center justify-end gap-4 mt-4">
              <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono">Archive 2024-2026</span>
              <div className="h-px w-12 bg-white/20" />
            </div>
         </div>
         <div className="self-start text-left max-w-sm">
            <p className="text-white/60 font-serif italic text-lg">
              Cinematic scale, intimate detail. Browse our legacy framing the unbelievable.
            </p>
         </div>
      </section>

      {/* 5. THE ARCHITECTS (Page 4) */}
      <section className="absolute top-[400vh] left-0 w-full h-screen flex flex-col items-center justify-center p-8 pointer-events-none">
          <div className="text-center mb-16">
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-[calc(-0.05em)]">ARCHITECTS</h2>
            <p className="text-accent tracking-[0.8em] uppercase text-xs mt-6">Visionaries Behind the Lens</p>
          </div>
          {/* Simple Names Overlay */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 max-w-5xl">
            {['ALDRIN VARGHESE', 'BHANUNNI MAPIL', 'LEAD DOP', 'LEAD VFX'].map((name, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-bold tracking-widest text-sm">{name}</p>
                <div className="w-full h-px bg-accent/30 mt-2" />
              </div>
            ))}
          </div>
      </section>

      {/* 6. ENQUIRE / CONTACT (Page 5) */}
      <section className="absolute top-[500vh] left-0 w-full h-screen flex flex-col items-center justify-between pointer-events-none">
        
        <div className="flex-1 flex items-center justify-center w-full p-6">
          <div className="w-full max-w-4xl pointer-events-auto">
            <div className="bg-[#050505]/95 backdrop-blur-3xl border border-accent/20 p-8 md:p-12 shadow-[0_0_100px_rgba(212,175,119,0.1)] rounded-2xl relative overflow-hidden">
               {/* Ambient interior glow */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-accent/5 blur-[100px] pointer-events-none" />
               <ContactForm />
            </div>
          </div>
        </div>

        {/* Footer is part of the final page, placed at the bottom */}
        <div className="w-full pointer-events-auto">
          <Footer />
        </div>

      </section>

    </div>
  );
}
