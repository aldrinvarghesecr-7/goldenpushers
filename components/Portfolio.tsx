'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  { id: 1, title: 'THE ECHO', category: 'BRAND FILM', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200&auto=format&fit=crop', video: 'https://cdn.pixabay.com/video/2019/04/10/22692-330689958_large.mp4' },
  { id: 2, title: 'AURELIA', category: 'LUXURY', image: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?q=80&w=1200&auto=format&fit=crop', video: 'https://cdn.pixabay.com/video/2015/08/08/254-136006158_large.mp4' },
  { id: 3, title: 'MIDNIGHT RUN', category: 'COMMERCIAL', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop', video: 'https://cdn.pixabay.com/video/2021/08/11/84687-587841398_large.mp4' },
  { id: 4, title: 'SILK VOID', category: 'MUSIC VIDEO', image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1200&auto=format&fit=crop', video: 'https://cdn.pixabay.com/video/2019/04/10/22692-330689958_large.mp4' },
];

function ProjectCard({ project, index }: { project: any, index: number }) {
    const [hover, setHover] = useState(false);

    return (
        <motion.div 
            className="group relative w-[70vw] md:w-[40vw] lg:w-[30vw] h-[60vh] md:h-[70vh] flex-shrink-0 cursor-pointer overflow-hidden rounded-md"
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            style={{ perspective: '1000px' }}
        >
            <motion.div 
               className="w-full h-full preserve-3d origin-center"
               animate={{ 
                   rotateX: hover ? 5 : 0, 
                   rotateY: hover ? -5 : 0,
                   scale: hover ? 1.02 : 1 
               }}
               transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Fallback Image */}
                <img 
                    src={project.image} 
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hover ? 'opacity-0' : 'opacity-80'}`}
                />
                
                {/* Autoplay Video Reveal */}
                <video 
                    src={project.video}
                    loop 
                    muted 
                    playsInline
                    autoPlay
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${hover ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Film Frame Overlay Border */}
                <div className="absolute inset-0 border-[1px] border-white/10 group-hover:border-accent/50 transition-colors duration-700 m-4 rounded" />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Text Content */}
                <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start Z-20">
                    <motion.div 
                        animate={{ y: hover ? -10 : 0 }}
                        className="text-[10px] tracking-[0.3em] font-mono text-accent mb-2 uppercase"
                    >
                        {project.category}
                    </motion.div>
                    
                    <h3 className="text-4xl md:text-5xl font-sans font-black text-white uppercase tracking-tighter relative overflow-hidden">
                        {project.title}
                        {/* Gold Light Sweep */}
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF77] to-transparent mix-blend-color-dodge -translate-x-[150%] opacity-0 group-hover:opacity-100"
                            animate={{ x: hover ? ['-150%', '150%'] : '-150%' }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </h3>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#0A0A0A]">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Cinematic Background Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/5 via-[#0A0A0A] to-[#0A0A0A] pointer-events-none" />

        <div className="max-w-7xl px-8 w-full mx-auto mb-16 relative z-10">
          <h2 className="text-6xl md:text-8xl font-sans font-black tracking-tighter text-white uppercase">
            The <span className="text-accent">Reels</span>
          </h2>
          <p className="text-white/50 tracking-[0.2em] uppercase text-xs mt-4">Selected Masterpieces</p>
        </div>

        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-8 md:px-[10vw]">
           {projects.map((proj, i) => (
               <ProjectCard key={proj.id} project={proj} index={i} />
           ))}
        </motion.div>
      </div>
    </section>
  );
}
