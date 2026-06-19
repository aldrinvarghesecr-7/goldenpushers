'use client';

// ═══════════════════════════════════════════════════════════════
// SCROLL PROGRESS — Thin olive editorial line
// ═══════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[9997] h-[2px] bg-[#C8C2B8]/20 pointer-events-none">
      <div
        className="h-full bg-[#39463A] origin-left transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}