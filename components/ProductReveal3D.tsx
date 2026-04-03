'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function ProductReveal3D() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Select top 3 projects to showcase
  const showcaseProjects = projects.slice(0, 3);

  // Background darkness to focus on the 3D cards
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-primary perspective-container">
      {/* Sticky container that holds the 3D scene */}
      <motion.div 
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-black to-primary -z-10" />

        <div className="text-center mb-16 relative z-20">
          <motion.p 
            className="text-accent tracking-[6px] uppercase text-xs font-semibold mb-4"
            style={{ 
              opacity: useTransform(scrollYProgress, [0.2, 0.3], [0, 1]),
              y: useTransform(scrollYProgress, [0.2, 0.3], [20, 0])
            }}
          >
            Immersive Experience
          </motion.p>
          <motion.h2 
            className="text-5xl md:text-7xl font-serif text-white tracking-widest leading-tight"
            style={{ 
              scale: useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]),
            }}
          >
            "You're in the scene now."
          </motion.h2>
        </div>

        {/* 3D Showcase Area */}
        <div className="relative w-full max-w-5xl h-[50vh] flex items-center justify-center preserve-3d mt-8">
          {showcaseProjects.map((project, i) => {
            // Card 1: Rotates out to the left
            // Card 2: Stays central but scales up
            // Card 3: Rotates out to the right
            
            const isCenter = i === 1;
            const isLeft = i === 0;
            
            // X position fan out
            const xOffset = useTransform(
              scrollYProgress, 
              [0.3, 0.6], 
              [0, isCenter ? 0 : isLeft ? -350 : 350]
            );
            
            // Y position slight pop up
            const yOffset = useTransform(
              scrollYProgress,
              [0.3, 0.6],
              [0, isCenter ? -40 : 20]
            );

            // Z position pushes the side cards back
            const zOffset = useTransform(
              scrollYProgress,
              [0.3, 0.6],
              [0, isCenter ? 50 : -100]
            );

            // Y Rotation fans them out like a folding screen
            const rotateY = useTransform(
              scrollYProgress,
              [0.3, 0.6],
              [0, isCenter ? 0 : isLeft ? 15 : -15]
            );

            // Scale reveals the cards
            const scale = useTransform(
              scrollYProgress,
              [0.2, 0.4, 0.6],
              [0.5, 0.8, isCenter ? 1.1 : 0.9]
            );
            
            // Opacity fades them in
            const cardOpacity = useTransform(
               scrollYProgress,
               [0.2, 0.4],
               [0, 1]
            );

            return (
              <motion.div
                key={project.slug}
                className="absolute w-[280px] md:w-[320px] aspect-[3/4] origin-center preserve-3d"
                style={{
                  x: xOffset,
                  y: yOffset,
                  z: zOffset,
                  rotateY,
                  scale,
                  opacity: cardOpacity,
                  zIndex: isCenter ? 10 : 5
                }}
              >
                <Link href={`/work/${project.slug}`} className="block w-full h-full group relative rounded-2xl overflow-hidden glass border border-white/20 shadow-2xl">
                  {/* Image container with 3D translation */}
                  <div className="absolute inset-2 overflow-hidden rounded-xl bg-black">
                     <Image 
                       src={project.heroImage} 
                       alt={project.title}
                       fill
                       className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 ease-out group-hover:scale-105"
                     />
                  </div>
                  
                  {/* Content pushed to text plane */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      <p className="text-accent tracking-widest text-[10px] font-semibold mb-2 uppercase">{project.category}</p>
                      <h3 className="font-serif text-2xl text-white tracking-widest uppercase truncate">{project.title}</h3>
                  </div>

                  {/* Highlight sweep effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
