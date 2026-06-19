'use client';

// ═══════════════════════════════════════════════════════════════
// SCENE TRANSITION — Thin editorial section divider
// ═══════════════════════════════════════════════════════════════

import { motion } from 'framer-motion';

interface SceneTransitionProps {
  sceneNumber: string;
  label: string;
}

export default function SceneTransition({ sceneNumber, label }: SceneTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative py-12 px-8 md:px-16 lg:px-24 bg-[#F8F4EE]"
    >
      <div className="flex items-center gap-6 max-w-[90vw] mx-auto">
        <span
          className="shrink-0"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 400,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#9B9B9B',
          }}
        >
          {sceneNumber}
        </span>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 h-px bg-[#C8C2B8] origin-left"
        />

        <span
          className="shrink-0"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#39463A',
          }}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}
