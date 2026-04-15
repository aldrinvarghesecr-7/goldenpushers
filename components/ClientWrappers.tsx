'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// ═══════════════════════════════════════════════════════════════
// DYNAMIC CLIENT WRAPPERS
// ===================================
// Moving these to a Client Component resolves the SSR mismatch 
// error in Next.js Server Components (like root layout).
// ═══════════════════════════════════════════════════════════════

const CinematicStoryScene = dynamic(() => import("@/components/CinematicStoryScene"), { ssr: false });
const CinematicPreloader = dynamic(() => import("@/components/CinematicPreloader"), { ssr: false });
const ClapperboardIntro = dynamic(() => import("@/components/ClapperboardIntro"), { ssr: false });
const ContentReveal = dynamic(() => import("@/components/ContentReveal"), { ssr: false });
const CursorTrailer = dynamic(() => import("@/components/CursorTrailer"), { ssr: false });

export default function ClientWrappers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CinematicPreloader />
      <ClapperboardIntro />
      <CinematicStoryScene />
      <ContentReveal>
        {children}
        <CursorTrailer />
      </ContentReveal>
    </>
  );
}
