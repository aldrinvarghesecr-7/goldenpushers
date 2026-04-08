'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Creative Development",
    tagline: "Architecting the soul of your narrative.",
    items: [
      "Concept ideation and storytelling",
      "Brand strategy and campaign development",
      "Scriptwriting and screenplay development",
      "Storyboarding and visual planning",
      "Creative consulting and direction"
    ]
  },
  {
    id: "02",
    title: "Pre-Production",
    tagline: "Mastering the logistics of visual gold.",
    items: [
      "Budgeting and project planning",
      "Location scouting",
      "Casting (talent/actors/models)",
      "Talent direction and choreography",
      "Set design and art direction",
      "Wardrobe, styling, hair & makeup",
      "Equipment planning and crew assembly",
      "Scheduling and logistics"
    ]
  },
  {
    id: "03",
    title: "Cinematography",
    tagline: "Visceral truth captured through light.",
    items: [
      "Full-scale video/film production",
      "Commercials & TV advertisements",
      "Brand films and promotional videos",
      "Music videos",
      "Luxury & high-end fashion films",
      "Corporate videos and corporate storytelling",
      "Short films and narrative content",
      "Documentary-style content",
      "Live event coverage and multicamera shoots",
      "Aerial/drone cinematography",
      "Studio or on-location shoots"
    ]
  },
  {
    id: "04",
    title: "Post-Production",
    tagline: "Carving masterpieces from raw frames.",
    items: [
      "Video editing and assembly",
      "Color grading and cinematic correction",
      "Sound design, mixing, and audio post",
      "Voice-over and ADR",
      "Visual effects (VFX) and CGI",
      "Motion graphics and animation",
      "Title design and end credits",
      "Final mastering and delivery"
    ]
  },
  {
    id: "05",
    title: "Digital Ecosystems",
    tagline: "Amplifying impact in the digital void.",
    items: [
      "Social media content (Reels, TikTok, YouTube)",
      "Product videos and e-commerce content",
      "Experiential films and immersive storytelling",
      "Podcast video production",
      "Behind-the-scenes and documentary content"
    ]
  },
  {
    id: "06",
    title: "Specialized Services",
    tagline: "Bespoke excellence for elite brands.",
    items: [
      "Photography (still shoots, campaigns)",
      "Full campaign production (360-degree)",
      "Distribution strategy and optimization",
      "Marketing support and promo materials",
      "Archiving and asset management"
    ]
  }
];

export default function TheCraft() {
  const [expanded, setExpanded] = useState<string | null>("03");

  return (
    <section className="bg-primary py-32 md:py-64 relative overflow-hidden" id="services">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,119,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Cinematic Header */}
        <div className="mb-32 md:mb-48">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            className="h-[1px] bg-[#D4AF77] mb-12"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-white/40 font-sans text-xs tracking-[0.6em] uppercase mb-8"
          >
            The Menu of Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-black text-white leading-[1.1] tracking-tighter max-w-5xl"
          >
            From first spark to final frame — every stage is crafted with <span className="text-[#D4AF77] italic font-serif">uncompromising excellence.</span>
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-0 border-l border-white/5">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 1 }}
              className={`group relative p-12 md:p-16 border-r border-b border-white/5 hover:bg-white/[0.01] transition-all duration-1000 overflow-hidden ${expanded === service.id ? 'bg-white/[0.02]' : ''}`}
            >
              {/* Card Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF77]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-[#D4AF77] font-sans text-sm tracking-widest font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    [{service.id}]
                  </span>
                  <motion.div 
                    animate={{ rotate: expanded === service.id ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Plus 
                      size={20} 
                      className={`cursor-pointer transition-colors duration-500 ${expanded === service.id ? 'text-[#D4AF77]' : 'text-white/20 group-hover:text-white'}`}
                      onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                    />
                  </motion.div>
                </div>

                <h3 className="text-3xl lg:text-4xl font-sans font-black text-white uppercase tracking-tighter mb-4 group-hover:text-[#D4AF77] transition-all duration-700">
                  {service.title}
                </h3>
                
                <p className="font-body text-[#D4AF77]/60 italic text-lg lg:text-xl mb-12 leading-relaxed h-14">
                  {service.tagline}
                </p>

                <button 
                  onClick={() => setExpanded(expanded === service.id ? null : service.id)}
                  className="flex items-center gap-3 text-white/30 text-[10px] tracking-[0.4em] uppercase font-bold group-hover:text-[#D4AF77] transition-colors mb-4"
                >
                  {expanded === service.id ? 'View Less' : 'Explore Capabilities'}
                  <ArrowRight size={12} className={`transition-transform duration-500 ${expanded === service.id ? 'rotate-90' : 'group-hover:translate-x-2'}`} />
                </button>

                <AnimatePresence>
                  {expanded === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <ul className="pt-8 space-y-4 border-t border-white/5">
                        {service.items.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 + 0.3 }}
                            className="font-body text-white/50 text-sm md:text-base flex items-start gap-4 hover:text-white transition-colors duration-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF77] mt-1.5 flex-shrink-0 shadow-[0_0_8px_#D4AF77]" />
                            <span className="leading-tight">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Deco Line */}
        <div className="mt-24 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  );
}
