'use client';

import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.getBoundingClientRect().width);
    let height = (canvas.height = canvas.getBoundingClientRect().height);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      alphaSpeed: number;
    }> = [];

    const colors = [
      'rgba(0, 229, 255, ',   // Cyan
      'rgba(139, 92, 246, ',  // Violet
      'rgba(212, 175, 119, ', // Gold
      'rgba(255, 107, 53, ',  // Ember
    ];

    const createParticle = (init = false) => {
      const size = Math.random() * 3 + 0.5;
      return {
        x: Math.random() * width,
        y: init ? Math.random() * height : height + 10,
        size,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.5 + 0.15),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
        alphaSpeed: (Math.random() - 0.5) * 0.003,
      };
    };

    // Calculate count based on viewport area
    const particleCount = Math.min(50, Math.floor((width * height) / 25000));
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.05 || p.alpha >= 0.7) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // If drift off-screen, reset particle to bottom
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle(false);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[2]" style={{ mixBlendMode: 'screen' }} />;
}
