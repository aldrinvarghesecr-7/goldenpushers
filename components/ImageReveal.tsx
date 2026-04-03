'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}

export default function ImageReveal({
  children,
  className = '',
  direction = 'left',
  delay = 0,
}: Props) {
  // The mask slides away to reveal the image beneath
  const clipPaths: Record<string, { hidden: string; visible: string }> = {
    left: {
      hidden: 'inset(0 0 0 0)',        // fully covered
      visible: 'inset(0 0 0 100%)',     // slides to the left
    },
    right: {
      hidden: 'inset(0 0 0 0)',
      visible: 'inset(0 100% 0 0)',
    },
    up: {
      hidden: 'inset(0 0 0 0)',
      visible: 'inset(0 0 100% 0)',
    },
    down: {
      hidden: 'inset(0 0 0 0)',
      visible: 'inset(100% 0 0 0)',
    },
  };

  const clip = clipPaths[direction];

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* Content underneath */}
      <motion.div
        variants={{
          hidden: { scale: 1.15, opacity: 0.8 },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 1.2,
              delay: delay + 0.4,
              ease: [0.23, 1, 0.32, 1],
            },
          },
        }}
      >
        {children}
      </motion.div>

      {/* Sliding mask overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-accent/90"
        variants={{
          hidden: { clipPath: clip.hidden },
          visible: {
            clipPath: clip.visible,
            transition: {
              duration: 1.0,
              delay,
              ease: [0.77, 0, 0.175, 1],
            },
          },
        }}
      />
    </motion.div>
  );
}
