'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import BrandLogo from './BrandLogo';
import { siteConfig } from '@/lib/config';

const capabilities = [
  'Commercial films',
  'Brand campaigns',
  'Music videos',
  'Product photography',
  'Corporate films',
  'Wedding stories',
];

const heroFrames = [
  { src: '/work/ig-1.jpg', alt: 'Golden Pushers campaign frame', className: 'left-[7%] top-[14%] h-[34%] w-[28%]' },
  { src: '/work/ig-4.jpg', alt: 'Golden Pushers production frame', className: 'right-[9%] top-[9%] h-[44%] w-[34%]' },
  { src: '/work/ig-5.jpg', alt: 'Golden Pushers cinematic work frame', className: 'left-[30%] bottom-[8%] h-[34%] w-[30%]' },
];

const metrics = [
  ['50+', 'visual projects'],
  ['15+', 'brand partners'],
  ['10M+', 'organic reach'],
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const frameY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const fade = useTransform(scrollYProgress, [0, 0.82], [1, 0.38]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[88dvh] overflow-hidden bg-[#11130f] text-[#F8F4EE]"
    >
      <div className="absolute inset-0">
        <Image
          src="/work/ig-2.jpg"
          alt="Golden Pushers hero production still"
          fill
          sizes="100vw"
          priority
          quality={80}
          className="object-cover opacity-[0.56] saturate-[0.82] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,14,11,0.92)_0%,rgba(12,14,11,0.72)_42%,rgba(12,14,11,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(166,107,69,0.34),transparent_34%),radial-gradient(circle_at_14%_92%,rgba(57,70,58,0.58),transparent_36%)]" />
      </div>

      <motion.div style={{ y: frameY, opacity: fade }} className="absolute inset-0 hidden md:block">
        {heroFrames.map((frame, index) => (
          <motion.div
            key={frame.src}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 + index * 0.13, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute ${frame.className} overflow-hidden border border-[#F8F4EE]/16 bg-[#F8F4EE]/6`}
          >
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              sizes="36vw"
              quality={80}
              className="object-cover opacity-90 saturate-[0.78] transition-transform duration-1000 ease-out hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-[#1E1E1E]/18 mix-blend-multiply" />
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[92vw] items-center justify-between py-6">
        <BrandLogo size={32} showText={false} />
        <div className="hidden items-center gap-4 md:flex">
          {['Kochi', 'Production studio', '2026'].map(item => (
            <span
              key={item}
              className="border border-[#F8F4EE]/16 px-3 py-1 text-[10px] font-medium uppercase text-[#F8F4EE]/64"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="relative z-10 mx-auto flex min-h-[88dvh] max-w-[92vw] flex-col justify-end pb-10 pt-28 md:pb-14"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 bg-[#F8F4EE] px-3 py-1 text-[10px] font-semibold uppercase text-[#1E1E1E]">
                <Sparkles size={12} strokeWidth={1.7} />
                Visual story engineering
              </span>
              <span className="h-px w-12 bg-[#A66B45]" />
              <span className="text-[10px] font-medium uppercase text-[#F8F4EE]/62">
                Films, campaigns, stills, sound
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl text-[64px] font-light leading-[0.88] text-[#F8F4EE] sm:text-[88px] md:text-[112px] xl:text-[132px]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Films that make brands impossible to ignore.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 grid gap-7 border-t border-[#F8F4EE]/16 pt-7 md:grid-cols-[minmax(0,520px)_auto]"
            >
              <p className="max-w-xl text-[15px] font-light leading-8 text-[#F8F4EE]/74 md:text-base">
                Golden Pushers Production builds campaign films, product stories, music videos, podcasts,
                and wedding cinema with a director-led process from concept to final delivery.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  data-cursor-hover
                  data-cursor-text="WATCH"
                  className="inline-flex items-center gap-3 bg-[#F8F4EE] px-5 py-4 text-[11px] font-semibold uppercase text-[#1E1E1E] transition-colors duration-300 hover:bg-[#A66B45] hover:text-[#F8F4EE]"
                >
                  <Play size={14} fill="currentColor" />
                  Watch work
                </a>
                <a
                  href="#contact"
                  data-cursor-hover
                  data-cursor-text="START"
                  className="inline-flex items-center gap-3 border border-[#F8F4EE]/28 px-5 py-4 text-[11px] font-semibold uppercase text-[#F8F4EE] transition-colors duration-300 hover:border-[#A66B45] hover:text-[#A66B45]"
                >
                  Start a project
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.46, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="border border-[#F8F4EE]/16 bg-[#11130f]/62 p-5 backdrop-blur-md"
          >
            <div className="mb-5 flex items-center justify-between border-b border-[#F8F4EE]/12 pb-4">
              <span className="text-[10px] font-semibold uppercase text-[#A66B45]">
                Live production index
              </span>
              <span className="h-2 w-2 rounded-full bg-[#A66B45] shadow-[0_0_18px_rgba(166,107,69,0.9)]" />
            </div>
            <div className="grid grid-cols-3 gap-px bg-[#F8F4EE]/14">
              {metrics.map(([value, label]) => (
                <div key={label} className="bg-[#11130f] p-4">
                  <div className="text-2xl font-light text-[#F8F4EE]" style={{ fontFamily: 'var(--font-display)' }}>
                    {value}
                  </div>
                  <div className="mt-2 text-[9px] uppercase leading-4 text-[#F8F4EE]/50">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {capabilities.map(item => (
                <span
                  key={item}
                  className="border border-[#F8F4EE]/12 px-3 py-2 text-[10px] uppercase text-[#F8F4EE]/64"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.aside>
        </div>

        <div className="mt-9 flex items-center justify-between border-t border-[#F8F4EE]/12 pt-5">
          <span className="text-[10px] uppercase text-[#F8F4EE]/48">
            {siteConfig.location} / Available worldwide
          </span>
          <a href="#ethos" className="flex items-center gap-3 text-[10px] uppercase text-[#F8F4EE]/56">
            Scroll
            <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
              <ArrowDown size={14} />
            </motion.span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
