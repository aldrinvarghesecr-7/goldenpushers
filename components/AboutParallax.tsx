'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax calculations
  const yImage1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5, 1], ["blur(10px)", "blur(0px)", "blur(10px)"]);
  const opacityText = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full py-40 min-h-[150vh] bg-primary overflow-hidden">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative h-full">
        
        {/* Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Left Column: Big typography & ethereal image */}
            <div className="md:col-span-5 relative z-10 flex flex-col gap-16">
              <motion.h2 
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                 className="text-6xl md:text-8xl font-serif text-white tracking-widest uppercase leading-none"
              >
                  The<br/><span className="text-accent italic">&nbsp;Ethos</span>
              </motion.h2>

              <motion.div style={{ y: yImage1 }} className="relative w-full aspect-[3/4] overflow-hidden ml-0 md:-ml-12 border border-white/5">
                 <img 
                    src="https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000&auto=format&fit=crop" 
                    alt="Cinematic behind the scenes"
                    className="object-cover w-[120%] h-[120%] absolute -top-[10%] -left-[10%] opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-[2s]"
                 />
                 <div className="absolute inset-0 border border-accent/20 m-4 pointer-events-none" />
              </motion.div>
            </div>

            {/* Right Column: Staggered text & overlapping secondary image */}
            <div className="md:col-span-7 relative flex flex-col gap-24 mt-24 md:mt-0 z-20">
              
              <motion.div style={{ opacity: opacityText }} className="max-w-xl pl-0 md:pl-16">
                  <h3 className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6">Our Vision</h3>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-white/90 leading-[1.6]">
                     We don't just capture light. We architect moments of visceral truth. 
                     Every frame is meticulously crafted—a symphony of shadow, gold, and gravity.
                  </p>
                  <p className="text-lg text-white/50 mt-8 font-sans font-light tracking-wide leading-relaxed">
                     Golden Pushers isn't an agency. It's a sanctuary for cinematic obsession. From $200M IMAX epics to bespoke luxury brand films, we forge visual gold.
                  </p>
              </motion.div>

              <motion.div style={{ y: yImage2, filter: blurValue }} className="relative w-3/4 aspect-[16/9] self-end overflow-hidden shadow-2xl z-30 ring-1 ring-white/10">
                 <img 
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1459&auto=format&fit=crop" 
                    alt="Film reel light leak"
                    className="object-cover w-full h-full opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 <span className="absolute bottom-6 left-6 text-xs tracking-widest text-[#D4AF77] uppercase">Est. 2026 // Global</span>
              </motion.div>

            </div>

        </div>
      </div>
    </section>
  );
}
