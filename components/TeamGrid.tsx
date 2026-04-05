'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const team = [
  { id: 1, name: 'ALEXANDER REED', role: 'Executive Director', bio: 'Architect of $200M spectacles. Obsessed with shadows.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'SOPHIA VANE', role: 'Cinematographer', bio: 'Painting with light. 3x Award Winner.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'MARCUS LEO', role: 'VFX Supervisor', bio: 'Bending reality into digital gold.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'ELENA ROST', role: 'Art Director', bio: 'Sourcing the impossible since 2018.', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' }
];

function TeamCard({ member }: { member: any }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative w-full aspect-[3/4] cursor-pointer perspective-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <motion.div 
               className="w-full h-full preserve-3d relative overflow-hidden"
               style={{ rotateX, rotateY }}
            >
                <img 
                   src={member.image} 
                   alt={member.name}
                   className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" 
                />
                
                {/* Gold Rim Lighting Array triggered on hover */}
                <div className={`absolute inset-0 border border-transparent transition-all duration-500 rounded-sm pointer-events-none ${isHovered ? 'shadow-[inset_0_0_80px_rgba(206,169,0,0.3)] ring-1 ring-accent/50' : ''}`} />

                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Information */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 preserve-3d translate-z-[50px]">
                    <h4 className="text-2xl font-serif font-black text-white tracking-widest uppercase">
                        {member.name}
                    </h4>
                    <p className="font-serif text-accent text-sm italic tracking-wider">
                        {member.role}
                    </p>

                    {/* Typewriter bio */}
                    <div className="overflow-hidden mt-3 h-10">
                        {isHovered && (
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, staggerChildren: 0.05 }}
                                className="text-white/70 text-xs tracking-widest uppercase font-mono"
                            >
                                {member.bio}
                            </motion.p>
                        )}
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
}

export default function TeamGrid() {
  return (
    <section className="relative w-full py-40 bg-[#0A0A0A] overflow-hidden">
       {/* Accents */}
       <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent shadow-[0_0_20px_rgba(206,169,0,0.5)]" />
       
       <div className="max-w-7xl mx-auto px-8 relative">
           <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
               <h2 className="text-5xl md:text-7xl font-serif font-black text-white uppercase tracking-tighter w-full md:w-1/2">
                   The<br/>Architects
               </h2>
               <p className="font-serif text-white/50 text-xl md:text-2xl max-w-sm right-align">
                   World-class talent strictly curated for the pursuit of visual perfection.
               </p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                  <TeamCard key={member.id} member={member} />
              ))}
           </div>
       </div>
    </section>
  );
}
