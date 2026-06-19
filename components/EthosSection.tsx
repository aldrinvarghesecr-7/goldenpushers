'use client';

// ═══════════════════════════════════════════════════════════════
// ETHOS SECTION — Manifesto & Stats
// Editorial two-column layout, Cormorant italic quote
// ═══════════════════════════════════════════════════════════════

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const springValue = useSpring(0, { stiffness: 35, damping: 20 });
  const displayValue = useTransform(springValue, (v: number) => Math.floor(v));

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      <span style={{ color: '#A66B45' }}>{suffix}</span>
    </span>
  );
}

const stats = [
  { value: 50, suffix: '+', label: 'Visual Projects', sub: 'Brand films, commercials & events' },
  { value: 15, suffix: '+', label: 'Brand Partnerships', sub: 'Luxury & lifestyle clients' },
  { value: 10, suffix: 'M+', label: 'Organic Reach', sub: 'Across digital platforms' },
];

const MANIFESTO_LINES = [
  { text: '"Attention is earned.', italic: false },
  { text: 'Stories are remembered longer', italic: false },
  { text: 'than advertisements."', italic: true },
];

export default function EthosSection() {
  const container = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'end start'] });
  const yStats = useTransform(scrollYProgress, [0, 1], [30, -30]);

  useGSAP(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);

    if (bodyRef.current) {
      gsap.fromTo(bodyRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' },
        }
      );
    }
    if (rulerRef.current) {
      gsap.fromTo(rulerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: 'power3.inOut', transformOrigin: 'left',
          scrollTrigger: { trigger: rulerRef.current, start: 'top 85%' },
        }
      );
    }
  }, { scope: container, dependencies: [mounted] });

  return (
    <section ref={container} id="ethos" className="relative w-full bg-[#F8F4EE] overflow-hidden py-28 md:py-44">

      {/* Subtle right-side warm wash */}
      <div
        className="absolute top-0 right-0 w-[50vw] h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 90% 30%, rgba(166,107,69,0.04) 0%, transparent 65%)' }}
      />

      {mounted && (
        <div className="max-w-[90vw] mx-auto relative z-10">

          {/* Section eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-6 mb-16 md:mb-20"
          >
            <span className="label-olive">The Studio</span>
            <div className="h-px flex-1 bg-[#C8C2B8]/60" />
            <span className="label-editorial hidden md:block">02 / Ethos</span>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 md:mb-32">

            {/* Left — Large manifesto quote */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden">
                {MANIFESTO_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      className="block cursor-default"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontStyle: line.italic ? 'italic' : 'normal',
                        fontSize: 'clamp(22px, 3.5vw, 44px)',
                        fontWeight: 300,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.25,
                        color: i === 2 ? '#39463A' : '#1E1E1E',
                      }}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right — body copy */}
            <div className="lg:col-span-5 flex flex-col justify-end">
              <p
                ref={bodyRef}
                className="border-accent-olive"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(13px, 1.3vw, 15px)',
                  fontWeight: 300,
                  color: '#6F6F6F',
                  lineHeight: 1.85,
                  opacity: 0,
                }}
              >
                Golden Pushers Production is a full-service visual story engineering studio.
                We produce commercial films, brand campaigns, product photography, music videos,
                podcasts, corporate films, and creative direction — across every medium and format.
                <br /><br />
                We don't produce content. We engineer visual identities capable of carrying
                a brand for years. Every frame is intentional. Every story is built to last.
              </p>
            </div>
          </div>

          {/* Thin horizontal rule */}
          <div
            ref={rulerRef}
            className="w-full h-px bg-[#C8C2B8] mb-20 md:mb-28"
            style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
          />

          {/* Stats row */}
          <motion.div
            style={{ y: yStats }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#C8C2B8]/40 will-change-transform"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#F8F4EE] p-10 md:p-12 relative group"
              >
                {/* Olive left accent line on hover */}
                <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-[#39463A] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div
                  className="mb-4 tabular-nums cursor-default"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(48px, 6vw, 80px)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: '#1E1E1E',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                <h4
                  className="mb-1 uppercase"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    color: '#39463A',
                  }}
                >
                  {stat.label}
                </h4>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    color: '#9B9B9B',
                  }}
                >
                  {stat.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      )}
    </section>
  );
}
