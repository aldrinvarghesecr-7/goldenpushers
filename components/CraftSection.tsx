'use client';

// ═══════════════════════════════════════════════════════════════
// THE CRAFT — Services Section
// 6 categories with all bullet points. GSAP staggered reveals.
// Cards with gold accents and hover glow effects.
// Added 3D Magnetic Tilt Micro-interactions.
// Desktop: 3-column grid | Mobile: clean vertical stack
// ═══════════════════════════════════════════════════════════════

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const categories = [
  {
    id: '01',
    title: 'Creative Development & Strategy',
    description: 'Architecting the soul of your cinematic vision.',
    items: [
      'Concept ideation and storytelling',
      'Brand strategy and campaign development',
      'Scriptwriting and screenplay development',
      'Storyboarding and visual planning',
      'Creative consulting and direction',
    ],
  },
  {
    id: '02',
    title: 'Pre-Production Services',
    description: 'Precision planning for seamless execution.',
    items: [
      'Budgeting and project planning',
      'Location scouting',
      'Casting (talent/actors/models)',
      'Talent direction and choreography',
      'Set design and art direction',
      'Wardrobe, styling, hair & makeup',
      'Equipment planning and crew assembly',
      'Scheduling and logistics',
    ],
  },
  {
    id: '03',
    title: 'Production (Filming & Shooting)',
    description: 'Capturing the light with masterwork precision.',
    items: [
      'Full-scale video/film production',
      'Commercials & TV advertisements',
      'Brand films and promotional videos',
      'Music videos',
      'Luxury & high-end fashion films',
      'Corporate storytelling',
      'Short films and narrative content',
      'Documentary-style content',
      'Live event coverage',
      'Aerial/drone cinematography',
      'Studio or on-location shoots',
    ],
  },
  {
    id: '04',
    title: 'Post-Production Services',
    description: 'Refining the cut into cinematic gold.',
    items: [
      'Video editing and assembly',
      'Color grading and correction',
      'Sound design and audio post',
      'Voice-over and ADR',
      'Visual effects (VFX) and CGI',
      'Motion graphics and animation',
      'Title design and end credits',
      'Final mastering and delivery',
    ],
  },
  {
    id: '05',
    title: 'Specialized Content Creation',
    description: 'Tailored narratives for the digital age.',
    items: [
      'Social media content (Reels, TikTok)',
      'Product and e-commerce content',
      'Experiential films',
      'Podcast video production',
      'Behind-the-scenes content',
    ],
  },
  {
    id: '06',
    title: 'Additional Premium Services',
    description: 'Extending the reach of your visual identity.',
    items: [
      'Photography (campaigns, stills)',
      '360-degree campaign production',
      'Distribution and optimization',
      'Marketing support and materials',
      'Archiving and asset management',
    ],
  },
];

function TiltCard({ cat }: { cat: typeof categories[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="craft-card group relative p-8 md:p-10 rounded-sm border border-white/[0.04] hover:border-[#D4AF77]/40 bg-white/[0.015] hover:bg-white/[0.03] transition-colors duration-700 perspective-1000"
      data-cursor-hover
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {/* Card Number + Divider */}
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-[#D4AF77]/25 font-sans font-black text-4xl tracking-tighter group-hover:text-[#D4AF77]/80 transition-colors duration-500">
            {cat.id}
          </span>
          <div className="h-px flex-grow bg-white/5 group-hover:bg-[#D4AF77]/30 transition-all duration-700" />
        </div>

        {/* Title */}
        <h3 className="text-white text-lg md:text-xl font-sans font-black uppercase tracking-tight mb-3 group-hover:translate-x-2 group-hover:text-[#D4AF77] transition-all duration-700">
          {cat.title}
        </h3>

        {/* Description */}
        <p className="text-white/30 text-sm font-sans italic mb-8">
          {cat.description}
        </p>

        {/* Items List */}
        <ul className="space-y-3">
          {cat.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-1 h-1 flex-shrink-0 rounded-full bg-[#D4AF77]/30 mt-[7px] group-hover:bg-[#D4AF77]/90 group-hover:shadow-[0_0_8px_#D4AF77] transition-all duration-500" />
              <span className="text-white/25 text-xs font-sans tracking-wide leading-relaxed group-hover:text-white/70 transition-colors duration-500">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover glow effect behind content */}
      <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_60px_rgba(212,175,119,0.05)]" />
    </motion.div>
  );
}

export default function CraftSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Stagger-reveal each card as it enters the viewport
      const cards = container.current?.querySelectorAll('.craft-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: -10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: container }
  );

  return (
    <section ref={container} id="services" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden perspective-1000">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="h-px w-12 bg-[#D4AF77]/40" />
            <span className="text-[#D4AF77] font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold" data-cursor-hover>
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white uppercase tracking-tighter leading-none mb-8 cursor-default"
            data-cursor-hover
          >
            The <span className="text-gold-gradient">Craft</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-lg text-white/30 text-sm md:text-base font-sans font-light leading-relaxed"
          >
            From first spark to final frame — every stage is crafted with
            uncompromising cinematic excellence and technical masterwork.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {categories.map((cat) => (
            <TiltCard key={cat.id} cat={cat} />
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div className="max-w-[1400px] mx-auto mt-32">
        <div className="section-divider" />
      </div>
    </section>
  );
}
