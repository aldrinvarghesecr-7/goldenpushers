'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Creative Development & Strategy",
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
    title: "Post-Production Services",
    items: [
      "Video editing and assembly",
      "Color grading and cinematic correction",
      "Sound design, mixing, and audio post",
      "Voice-over and ADR (additional dialogue recording)",
      "Visual effects (VFX) and CGI",
      "Motion graphics and animation",
      "Title design and end credits",
      "Final mastering and delivery in multiple formats"
    ]
  },
  {
    id: "05",
    title: "Specialized Content Creation",
    items: [
      "Social media content and short-form videos (Reels, TikTok, YouTube)",
      "Product videos and e-commerce content",
      "Experiential films and immersive storytelling",
      "Podcast video production",
      "Behind-the-scenes and documentary content"
    ]
  },
  {
    id: "06",
    title: "Additional Premium Services",
    items: [
      "Photography (still shoots, campaign photography)",
      "Full campaign production (360-degree campaigns)",
      "Distribution strategy and platform optimization",
      "Marketing support and promo materials",
      "Archiving and asset management"
    ]
  }
];

export default function TheCraft() {
  const [expanded, setExpanded] = useState<string | null>("03"); // Default to Production expanded

  const toggle = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <section className="bg-primary py-24 md:py-48 relative overflow-hidden">
      {/* Editorial Watermark Background */}
      <div className="absolute top-[10%] right-[-10%] text-[20vw] font-black text-white/[0.02] uppercase pointer-events-none select-none tracking-tighter leading-none hidden lg:block">
          THE CRAFT
      </div>

      <div className="max-w-[90vw] md:max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-24 md:mb-40 max-w-3xl">
           <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true }}
                className="h-[1px] bg-accent mb-12"
           />
           <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="text-2xl md:text-4xl font-serif text-white/90 leading-[1.3] tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
           >
              “From the first spark of an idea to the final frame on screen — we deliver <span className="text-accent underline underline-offset-[12px] decoration-accent/20 font-bold italic">uncompromising cinematic excellence</span> at every stage.”
           </motion.p>
        </div>

        {/* Services Accordion */}
        <div className="space-y-0 border-t border-white/10">
          {services.map((service) => (
            <div key={service.id} className="border-b border-white/10 overflow-hidden mix-blend-plus-lighter">
              <button 
                onClick={() => toggle(service.id)}
                className="w-full flex items-center justify-between py-12 md:py-20 text-left group transition-all duration-700 hover:px-2 md:hover:px-4"
              >
                <div className="flex items-center gap-6 md:gap-16">
                   <motion.span 
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 0.4 }}
                       className="font-mono text-accent text-[10px] md:text-sm tracking-[0.6em] font-bold"
                   >
                       [{service.id}]
                   </motion.span>
                   <h3 className={`text-xl md:text-5xl lg:text-6xl font-sans font-black uppercase tracking-tighter transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${expanded === service.id ? 'text-accent scale-105 origin-left' : 'text-white/80 group-hover:text-white'}`}>
                       {service.title}
                   </h3>
                </div>
                
                <div className={`w-8 h-8 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center transition-all duration-700 ${expanded === service.id ? 'bg-accent border-accent text-black rotate-90 scale-110 shadow-[0_0_20px_rgba(206,169,0,0.3)]' : 'text-white group-hover:border-white/30'}`}>
                    {expanded === service.id ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {expanded === service.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0, y: -20 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-20 md:pb-32 pl-12 md:pl-48 pr-6">
                        <motion.ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-8 md:gap-x-20">
                           {service.items.map((item, i) => (
                               <motion.li 
                                 key={i}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: i * 0.04 }}
                                 className="font-serif text-lg md:text-2xl text-white/50 flex items-start gap-5 hover:text-white transition-all duration-500 hover:translate-x-2"
                               >
                                  <span className="text-accent mt-[14px] w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#CEA900] flex-shrink-0" />
                                  <span className="leading-tight">{item}</span>
                               </motion.li>
                           ))}
                        </motion.ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
