'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

const proofPoints = [
  {
    label: 'Pre-production',
    title: 'Concept to shot map',
    body: 'Campaign logic, references, locations, talent, schedule, art direction, and deliverables are locked before the camera moves.',
  },
  {
    label: 'Production',
    title: 'Crew built around the brief',
    body: 'Lean commercial crews, cinema cameras, controlled light, clean sound, and a director-led set designed for speed and intention.',
  },
  {
    label: 'Post',
    title: 'Edit, color, sound, release',
    body: 'Every project leaves with platform-ready masters, cutdowns, stills, captions, and a visual system the brand can keep using.',
  },
];

const deliverables = [
  'Hero film',
  '15s and 30s cutdowns',
  'Vertical reels',
  'Campaign stills',
  'Color grade',
  'Sound mix',
  'Social kit',
  'Launch assets',
];

export default function ProductionProof() {
  return (
    <section className="relative overflow-hidden bg-[#F8F4EE] py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-[#C8C2B8]/70" />
      <div className="mx-auto grid max-w-[92vw] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-[#A66B45]" />
            <span className="text-xs font-semibold uppercase text-[#A66B45]">Why it feels premium</span>
          </div>
          <h2
            className="max-w-3xl text-5xl font-light leading-none text-[#1E1E1E] md:text-7xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A production partner, not a vendor with a camera.
          </h2>
          <p className="mt-6 max-w-xl text-sm font-light leading-7 text-[#6F6F6F] md:text-base">
            The best production websites do not simply look expensive. They make the buyer feel the
            process is controlled. This page now leads with that promise: story, craft, proof, and a
            simple path to start.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {deliverables.map(item => (
              <span key={item} className="border border-[#C8C2B8]/70 px-3 py-2 text-xs text-[#39463A]">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-[0.8fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[360px] overflow-hidden bg-[#1E1E1E]"
          >
            <Image
              src="/work/ig-6.jpg"
              alt="Golden Pushers production proof frame"
              fill
              sizes="(max-width: 768px) 100vw, 34vw"
              quality={80}
              className="object-cover opacity-[0.86] saturate-[0.82]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E]/76 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span className="text-xs font-medium uppercase text-[#F8F4EE]/64">Campaign engine</span>
              <p className="mt-2 text-lg font-light leading-6 text-[#F8F4EE]">
                Built for films, cutdowns, stills, and social systems in one production day.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-px bg-[#C8C2B8]/50">
            {proofPoints.map((point, index) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F8F4EE] p-6 transition-colors duration-300 hover:bg-[#F0EAE0]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-[#A66B45]">{point.label}</span>
                  <CheckCircle2 size={17} strokeWidth={1.6} className="text-[#39463A]" />
                </div>
                <h3 className="text-2xl font-light text-[#1E1E1E]" style={{ fontFamily: 'var(--font-display)' }}>
                  {point.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-7 text-[#6F6F6F]">{point.body}</p>
              </motion.div>
            ))}
            <a
              href="#contact"
              className="group flex items-center justify-between bg-[#39463A] p-6 text-[#F8F4EE] transition-colors duration-300 hover:bg-[#A66B45]"
              data-cursor-hover
              data-cursor-text="ENQUIRE"
            >
              <span className="text-sm font-semibold uppercase">Build my campaign</span>
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
