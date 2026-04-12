'use client';

import React from 'react';
import { motion } from 'framer-motion';

const GOLD = '#D4AF77';

const categories = [
  {
    id: "01",
    title: "Creative Development & Strategy",
    description: "Architecting the soul of your cinematic vision.",
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
    title: "Pre-Production Services",
    description: "Precision planning for seamless execution.",
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
    title: "Production (Filming & Shooting)",
    description: "Capturing the light with masterwork precision.",
    items: [
      "Full-scale video/film production",
      "Commercials & TV advertisements",
      "Brand films and promotional videos",
      "Music videos",
      "Luxury & high-end fashion films",
      "Corporate storytelling",
      "Short films and narrative content",
      "Documentary-style content",
      "Live event coverage",
      "Aerial/drone cinematography",
      "Studio or on-location shoots"
    ]
  },
  {
    id: "04",
    title: "Post-Production Services",
    description: "Refining the cut into cinematic gold.",
    items: [
      "Video editing and assembly",
      "Color grading and correction",
      "Sound design and audio post",
      "Voice-over and ADR",
      "Visual effects (VFX) and CGI",
      "Motion graphics and animation",
      "Title design and end credits",
      "Final mastering and delivery"
    ]
  },
  {
    id: "05",
    title: "Specialized Content Creation",
    description: "Tailored narratives for the digital age.",
    items: [
      "Social media content (Reels, TikTok)",
      "Product and e-commerce content",
      "Experiential films",
      "Podcast video production",
      "Behind-the-scenes content"
    ]
  },
  {
    id: "06",
    title: "Additional Premium Services",
    description: "Extending the reach of your visual identity.",
    items: [
      "Photography (campaigns, stills)",
      "360-degree campaign production",
      "Distribution and optimization",
      "Marketing support and materials",
      "Archiving and asset management"
    ]
  }
];

export default function TheCraft() {
  return (
    <section className="relative py-32 px-6 md:px-24 bg-transparent overflow-hidden" id="services">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Editorial Header */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="h-[1px] w-12 bg-accent/50" />
            <span className="text-accent font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold">
              Our Expertise
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-8"
          >
            The <span className="text-accent underline decoration-accent/20 underline-offset-8">Craft</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xl text-white/40 text-lg font-serif italic leading-relaxed"
          >
            From first spark to final frame — every stage is crafted with uncompromising cinematic excellence and technical masterwork.
          </motion.p>
        </div>

        {/* Stable 2D Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="group flex flex-col"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-accent/30 font-sans font-black text-4xl tracking-tighter group-hover:text-accent transition-colors duration-500">
                  {cat.id}
                </span>
                <div className="h-px flex-grow bg-white/5 group-hover:bg-accent/20 transition-all duration-700" />
              </div>

              <h3 className="text-white text-2xl font-sans font-black uppercase tracking-tight mb-4 group-hover:translate-x-3 transition-transform duration-700">
                {cat.title}
              </h3>

              <p className="text-white/40 text-sm font-serif italic mb-8 h-12">
                {cat.description}
              </p>

              <ul className="space-y-4">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-1 h-1 flex-shrink-0 rounded-full bg-accent/40 mt-[9px] group-hover:bg-accent transition-colors" />
                    <span className="text-white/30 text-xs font-sans tracking-wide leading-tight group-hover:text-white/60 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
      
      {/* Decorative Bottom Line */}
      <div className="max-w-[1400px] mx-auto mt-40">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  );
}
