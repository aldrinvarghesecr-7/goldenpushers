'use client';

// ═══════════════════════════════════════════════════════════════
// THE ARCHITECTS — Cinematic Team Section
// Team portraits with 3D tilt-on-hover using Framer Motion
// spring physics. Staggered entrance animations via GSAP.
// ═══════════════════════════════════════════════════════════════

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

const team = [
  {
    id: 1,
    name: 'AVRIL JOHN VARGHESE',
    role: 'Founder',
    bio: 'Visionary architect of cinematic experiences.',
    image: '/team/founder.jpg',
    fallback: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'JERRY ABRAHAM JOHNSON',
    role: 'Co-Founder / Creative Director',
    bio: 'Strategic partner in creative excellence.',
    image: '/team/co-founder.jpg',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'DANISH MACKENZIE',
    role: 'DOP',
    bio: 'Master of light and cinematic rhythm.',
    image: '/team/danish.jpg',
    fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'BHANUNNI',
    role: 'Creativity Director',
    bio: 'Turning abstract concepts into cinematic gold.',
    image: '/team/bhanunni.jpg',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'ARJUNAN',
    role: 'DOP',
    bio: 'Every frame is a tribute to cinematic truth.',
    image: '/team/arjunan.jpg',
    fallback: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    name: 'JYOTHI PRAKASH',
    role: 'Designer',
    bio: 'Visual architect crafting the layout of dreams.',
    image: '/team/jyothi.jpg',
    fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
  },
];

// ─── TEAM CARD WITH 3D TILT ───
function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(member.image);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full aspect-[3/4] cursor-pointer perspective-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <motion.div
        className="w-full h-full preserve-3d relative overflow-hidden rounded-sm"
        style={{ rotateX, rotateY }}
      >
        {/* Portrait Image */}
        <Image
          src={imgSrc}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgSrc(member.fallback)}
          className="object-cover transition-all duration-[1.5s] group-hover:scale-105"
          quality={80}
          loading="lazy"
        />

        {/* Gold rim glow on hover */}
        <div
          className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
            isHovered
              ? 'shadow-[inset_0_0_60px_rgba(212,175,119,0.2)] ring-1 ring-[#D4AF77]/30'
              : 'ring-0'
          }`}
        />

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

        {/* Info */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1">
          <h4 className="text-lg md:text-xl font-serif font-black text-white tracking-wider uppercase leading-tight">
            {member.name}
          </h4>
          <p className="font-sans text-[#D4AF77] text-xs italic tracking-wider">
            {member.role}
          </p>

          {/* Bio reveal on hover */}
          <div className="overflow-hidden mt-2 h-8">
            {isHovered && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white/60 text-[10px] tracking-widest uppercase font-sans"
              >
                {member.bio}
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── MAIN ARCHITECTS SECTION ───
export default function ArchitectsSection() {
  return (
    <section id="team" className="relative w-full py-32 md:py-40 overflow-hidden">
      {/* Accent line */}
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#D4AF77]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white uppercase tracking-tighter leading-none"
          >
            The
            <br />
            <span className="text-gold-gradient">Architects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-sans text-white/40 text-base md:text-lg max-w-sm text-left md:text-right font-light"
          >
            World-class talent strictly curated for the pursuit of visual
            perfection.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {team.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
