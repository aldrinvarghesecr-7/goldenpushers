'use client';

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL PROVIDER — Lenis + GSAP ScrollTrigger
// Provides buttery smooth scrolling and syncs with GSAP
// for scroll-driven animations across all sections.
// ═══════════════════════════════════════════════════════════════

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/components/scrollstore';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Prevent Lenis container warnings
    document.documentElement.style.position = 'relative';
    document.body.style.position = 'relative';

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Initialize Lenis with luxury-tuned easing
    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2.0,
      infinite: false,
    });

    // Bridge Lenis scroll to GSAP ScrollTrigger and our zustand store
    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      ScrollTrigger.update();
      const progress = limit > 0 ? scroll / limit : 0;
      useScrollStore.getState().setProgress(progress);
    });

    // Sync Lenis RAF with GSAP ticker for perfect frame alignment
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.documentElement.style.position = '';
      document.body.style.position = '';
    };
  }, []);

  return <>{children}</>;
}
