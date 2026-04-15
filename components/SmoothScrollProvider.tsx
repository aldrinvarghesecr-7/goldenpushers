'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/components/scrollStore';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fix Lenis container warning
    document.documentElement.style.position = 'relative';
    document.body.style.position = 'relative';

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // smoothTouch removed (caused type error)
      touchMultiplier: 2.0,
      infinite: false,
    });

    // Update ScrollTrigger + 3D camera progress
    lenis.on('scroll', ({ scroll, limit }) => {
      ScrollTrigger.update();
      const progress = limit > 0 ? scroll / limit : 0;
      useScrollStore.getState().setProgress(progress);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if (document.documentElement) document.documentElement.style.position = '';
      if (document.body) document.body.style.position = '';
    };
  }, []);

  return <>{children}</>;
}