'use client';

// ═══════════════════════════════════════════════════════════════
// ARCHITECTS SECTION — Team editorial list
// Warm portrait reveal on hover, olive/copper accents
// ═══════════════════════════════════════════════════════════════

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

const team = [
  {
    id: 1,
    name: 'Avril John Varghese',
    role: 'Founder & Director',
    bio: 'Visionary behind Golden Pushers Production. Avril leads creative direction and brings cinematic clarity to every project — from brand campaigns to wedding films.',
    image: '/team/founder.jpg',
    fallback: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    focus: 'Commercial Films & Brand Campaigns',
  },
  {
    id: 2,
    name: 'Jerry Abraham Johnson',
    role: 'Co-Founder & Creative Director',
    bio: 'Jerry shapes the strategic and visual language of every project. His editorial instincts elevate client stories into assets that last.',
    image: '/team/co-founder.jpg',
    fallback: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    focus: 'Creative Strategy & Art Direction',
  },
  {
    id: 3,
    name: 'Danish Mackenzie',
    role: 'Director of Photography',
    bio: 'Danish controls the light and the frame. His cinematographic language — warm, naturalistic, deeply human — defines the visual signature of Golden Pushers.',
    image: '/team/danish.jpg',
    fallback: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    focus: 'Cinematography & Lighting Design',
  },
  {
    id: 4,
    name: 'Bhanunni',
    role: 'Creativity Director',
    bio: 'Concept-first thinker with a mastery of visual narrative structure. Bhanunni translates abstract brand ideas into concrete, shootable visual sequences.',
    image: '/team/bhanunni.jpg',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    focus: 'Concept Development & Narrative Design',
  },
  {
    id: 5,
    name: 'Arjunan',
    role: 'Director of Photography',
    bio: 'Every frame Arjunan shoots carries a quiet intentionality. His approach to depth, colour, and motion brings texture to every production.',
    image: '/team/arjunan.jpg',
    fallback: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=800&auto=format&fit=crop',
    focus: 'Cinematography & Color Work',
  },
  {
    id: 6,
    name: 'Jyothi Prakash',
    role: 'Design Director',
    bio: 'Jyothi builds the visual scaffolding — the typography, layout, and graphic systems that give Golden Pushers its editorial identity.',
    image: '/team/jyothi.jpg',
    fallback: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    focus: 'Graphic Design & Visual Identity',
  },
];

function TeamRow({
  member,
  index,
  onClick,
}: {
  member: (typeof team)[0];
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(member.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
      data-cursor-text="PROFILE"
      className="group relative flex items-center justify-between py-6 border-b border-[#C8C2B8]/40 cursor-none transition-all duration-300 hover:px-2"
    >
      {/* Olive left flash on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#39463A] transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0 }}
      />

      {/* Index */}
      <span
        className="w-10 shrink-0 transition-colors duration-300"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: hovered ? '#39463A' : '#C8C2B8',
        }}
      >
        0{member.id}
      </span>

      {/* Name */}
      <h3
        className="flex-1 transition-colors duration-300"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(20px, 3.5vw, 40px)',
          fontWeight: 300,
          letterSpacing: '-0.01em',
          color: hovered ? '#1E1E1E' : '#6F6F6F',
          lineHeight: 1,
        }}
      >
        {member.name}
      </h3>

      {/* Role — desktop */}
      <span
        className="hidden md:block w-52 text-right shrink-0 transition-colors duration-300"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: hovered ? '#A66B45' : '#9B9B9B',
        }}
      >
        {member.role}
      </span>

      {/* Hover portrait — floats in from right */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 3, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, rotate: -2, scale: 1 }}
            exit={{ opacity: 0, x: 20, rotate: 3, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="absolute right-56 top-1/2 -translate-y-1/2 w-20 h-28 overflow-hidden border border-[#C8C2B8] hidden lg:block pointer-events-none"
          >
            <Image
              src={imgSrc}
              alt={member.name}
              fill
              className="object-cover object-top image-editorial"
              onError={() => setImgSrc(member.fallback)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow */}
      <motion.span
        animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="ml-6 shrink-0 hidden md:block"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: '#39463A',
        }}
      >
        VIEW →
      </motion.span>
    </motion.div>
  );
}

function ModalImage({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => { setImgSrc(src); }, [src]);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover object-top image-editorial"
      quality={95}
      priority
      onError={() => setImgSrc(fallback)}
    />
  );
}

export default function ArchitectsSection() {
  const [selected, setSelected] = useState<(typeof team)[0] | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
      const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
      window.addEventListener('keydown', esc);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
    }
  }, [selected]);

  return (
    <>
      <section id="team" className="relative w-full py-24 md:py-40 bg-[#F8F4EE] overflow-hidden">
        <div className="max-w-[90vw] mx-auto">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-16 md:mb-20"
          >
            <span className="label-olive">The Team</span>
            <div className="h-px flex-1 bg-[#C8C2B8]/60" />
            <span className="label-editorial hidden md:block">05 / Architects</span>
          </motion.div>

          {/* Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-18">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 8vw, 100px)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 0.9,
                color: '#1E1E1E',
              }}
            >
              The{' '}
              <em style={{ color: '#39463A', fontStyle: 'italic' }}>People</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 300,
                color: '#6F6F6F',
                lineHeight: 1.75,
                maxWidth: '280px',
              }}
            >
              World-class visual storytellers — curated for the pursuit of craft.
            </motion.p>
          </div>

          {/* Top thin rule */}
          <div className="w-full h-px bg-[#C8C2B8]/50 mb-0" />

          {/* Team rows */}
          <div>
            {team.map((member, i) => (
              <TeamRow
                key={member.id}
                member={member}
                index={i}
                onClick={() => setSelected(member)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Profile Modal ─── */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-[#1E1E1E]/75 backdrop-blur-sm"
              data-cursor-hover
              data-cursor-text="CLOSE"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#F8F4EE] flex flex-col md:flex-row overflow-hidden max-h-[90dvh]"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                data-cursor-hover
                className="absolute top-4 right-4 z-50 w-8 h-8 border border-[#C8C2B8] flex items-center justify-center bg-[#F8F4EE] hover:bg-[#39463A] hover:border-[#39463A] transition-all duration-300 group"
              >
                <X size={14} strokeWidth={1.5} className="text-[#6F6F6F] group-hover:text-[#F8F4EE]" />
              </button>

              {/* Portrait */}
              <div className="relative w-full md:w-[40%] aspect-[4/5] md:aspect-auto md:min-h-[460px] overflow-hidden shrink-0 bg-[#F0EAE0]">
                <ModalImage src={selected.image} fallback={selected.fallback} alt={selected.name} />
                {/* Gradient edge */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8F4EE]/30 md:bg-gradient-to-r hidden md:block" />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                >
                  <span
                    className="block mb-2"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      fontWeight: 500,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: '#A66B45',
                    }}
                  >
                    {selected.focus}
                  </span>

                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(24px, 3vw, 36px)',
                      fontWeight: 300,
                      letterSpacing: '-0.01em',
                      color: '#1E1E1E',
                      lineHeight: 1.1,
                    }}
                  >
                    {selected.name}
                  </h3>

                  <p
                    className="mb-6"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#39463A',
                    }}
                  >
                    {selected.role}
                  </p>

                  {/* Rule */}
                  <div className="w-8 h-px bg-[#A66B45] mb-6" />

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#6F6F6F',
                      lineHeight: 1.85,
                    }}
                  >
                    {selected.bio}
                  </p>

                  <p
                    className="mt-4"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#9B9B9B',
                      lineHeight: 1.75,
                    }}
                  >
                    {selected.name.split(' ')[0]} is part of the Golden Pushers Production team based in Kochi, Kerala — a collective dedicated to engineering visual stories that hold weight across time and medium.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
