'use client';

// ═══════════════════════════════════════════════════════════════
// SCENE TRANSITION — Cinematic Chapter Divider
// A horizontal gradient line that draws across the viewport
// with an optional scene number. Creates the feeling of
// "chapters" between sections.
// ═══════════════════════════════════════════════════════════════

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SceneTransitionProps {
  sceneNumber?: string;
  label?: string;
}

export default function SceneTransition({ sceneNumber, label }: SceneTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.4, 0.8], [10, 0]);

  return (
    <div ref={ref} className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Gradient line */}
      <div className="relative max-w-[90vw] mx-auto">
        <motion.div
          style={{ scaleX: lineScale, transformOrigin: 'left' }}
          className="w-full h-px"
        >
          <div className="w-full h-full bg-gradient-to-r from-[#00E5FF]/40 via-[#8B5CF6]/30 to-transparent" />
        </motion.div>

        {/* Scene marker */}
        {(sceneNumber || label) && (
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="flex items-center gap-4 mt-6"
          >
            {sceneNumber && (
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#00E5FF]/40 font-medium">
                {sceneNumber}
              </span>
            )}
            {label && (
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#5A6285] uppercase">
                {label}
              </span>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
