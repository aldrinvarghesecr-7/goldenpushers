'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronRight } from 'lucide-react';

const categories = [
  {
    id: "01",
    title: "Creative Development & Strategy",
    items: [
      "Concept ideation and storytelling",
      "Brand strategy and campaign development",
      "Scriptwriting and screenplay development",
      "Storyboarding and visual planning",
      "Creative consulting and direction"
    ]
  },
  {
    id: "02",
    title: "Pre-Production Services",
    items: [
      "Budgeting and project planning",
      "Location scouting",
      "Casting (talent/actors/models)",
      "Talent direction and choreography",
      "Set design and art direction",
      "Wardrobe, styling, hair & makeup",
      "Equipment planning and crew assembly",
      "Scheduling and logistics"
    ]
  },
  {
    id: "03",
    title: "Production (Filming & Shooting)",
    items: [
      "Full-scale video/film production",
      "Commercials & TV advertisements",
      "Brand films and promotional videos",
      "Music videos",
      "Luxury & high-end fashion films",
      "Corporate videos and corporate storytelling",
      "Short films and narrative content",
      "Documentary-style content",
      "Live event coverage and multicamera shoots",
      "Aerial/drone cinematography",
      "Studio or on-location shoots"
    ]
  },
  {
    id: "04",
    title: "Post-Production Services",
    items: [
      "Video editing and assembly",
      "Color grading and cinematic correction",
      "Sound design, mixing, and audio post",
      "Voice-over and ADR",
      "Visual effects (VFX) and CGI",
      "Motion graphics and animation",
      "Title design and end credits",
      "Final mastering and delivery"
    ]
  },
  {
    id: "05",
    title: "Specialized Content Creation",
    items: [
      "Social media content and short-form videos",
      "Product videos and e-commerce content",
      "Experiential films and immersive storytelling",
      "Podcast video production",
      "Behind-the-scenes and documentary content"
    ]
  },
  {
    id: "06",
    title: "Additional Premium Services",
    items: [
      "Photography (still shoots, campaign photography)",
      "Full campaign production (360-degree campaigns)",
      "Distribution strategy and platform optimization",
      "Marketing support and promo materials",
      "Archiving and asset management"
    ]
  }
];

function Card3D({ category, index, spacing, progressRef, isHovered }: { category: typeof categories[0], index: number, spacing: number, progressRef: React.MutableRefObject<number>, isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const centerSpotlightRef = useRef<THREE.SpotLight>(null);

  // Subtle particle accents assigned to card
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(30 * 3);
    for (let i = 0; i < 30; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const myPos = index * spacing;
    // Total distance the carousel can move
    const maxScroll = (categories.length - 1) * spacing;
    const scrollTargetX = progressRef.current * maxScroll;
    
    // How far is this card from the center of the view?
    const distFromCenter = Math.abs(myPos - scrollTargetX);
    const isCenter = distFromCenter < 2.0;
    
    // Scale & Depth effects based on center proximity
    const baseScale = isCenter ? 1.05 : 0.85;
    const baseZ = isCenter ? 0 : -2.5;
    const rotY = (myPos - scrollTargetX) * 0.15; // Parallax rotation
    
    // Apply Hover interactions (Only applies if card is centered)
    const activeHover = isHovered && isCenter;
    const finalScale = baseScale * (activeHover ? 1.03 : 1);
    const finalZ = baseZ + (activeHover ? 0.4 : 0);
    const hoverRotX = activeHover ? -0.05 : 0;

    // Smooth un-spring interpolation
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, finalZ, 6 * delta);
    groupRef.current.scale.lerp(new THREE.Vector3().setScalar(finalScale), 6 * delta);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotY, 6 * delta);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, hoverRotX, 6 * delta);

    // Light pulse exactly when centered
    if (centerSpotlightRef.current) {
      centerSpotlightRef.current.intensity = THREE.MathUtils.lerp(
        centerSpotlightRef.current.intensity,
        isCenter ? (activeHover ? 15 : 8) : 0,
        8 * delta
      );
    }
  });

  return (
    <group position={[index * spacing, 0, 0]}>
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          
          {/* Metallic Card Base */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[4.4, 6.2, 0.2]} />
            <meshStandardMaterial 
              color="#050505" 
              metalness={0.9} 
              roughness={0.2} 
            />
          </mesh>
          
          {/* Golden Rim */}
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[4.5, 6.3, 0.05]} />
            <meshStandardMaterial 
              color={isHovered ? "#FFD700" : "#D4AF77"} 
              metalness={1} 
              roughness={0.1}
              emissive="#D4AF77"
              emissiveIntensity={isHovered ? 0.3 : 0.05}
            />
          </mesh>
          
          {/* Rich content mounted via HTML Transform allows perfect text crispness */}
          <Html 
            transform 
            position={[0, 0, 0.12]} 
            zIndexRange={[100, 0]}
            className="pointer-events-auto select-none"
            castShadow={false}
            receiveShadow={false}
          >
            <div 
              className="w-[400px] h-[550px] p-8 flex flex-col justify-start rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(5,5,5,0.95), rgba(5,5,5,0.8))',
                backdropFilter: 'blur(20px)',
                boxShadow: isHovered ? 'inset 0 0 40px rgba(212,175,119,0.1)' : 'none',
                transition: 'box-shadow 0.4s ease'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-px w-8 bg-[#D4AF77]" />
                 <span className="text-[#D4AF77] font-mono text-[11px] tracking-[0.4em] uppercase font-bold">
                   Chapter {category.id}
                 </span>
              </div>
              
              <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-[1.1] mb-6 drop-shadow-md">
                {category.title}
              </h3>
              
              <ul className="space-y-[10px] mt-2 flex-1 overflow-y-auto scrollbar-hide pr-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 flex-shrink-0 rounded-full bg-[#D4AF77] mt-[7px] shadow-[0_0_5px_rgba(212,175,119,0.8)]" />
                    <span className="text-white/70 text-[13px] font-sans leading-tight tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 group cursor-pointer w-fit">
                <span className="text-[#D4AF77] text-xs uppercase tracking-widest font-black group-hover:text-white transition-colors duration-300">Explore Services</span>
                <ChevronRight size={14} className="text-[#D4AF77] group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
              </div>
            </div>
          </Html>

          {/* Targeted SpotLight reacting to center position */}
          <SpotLight
            ref={centerSpotlightRef}
            color="#D4AF77"
            position={[0, 4, 3]}
            angle={0.8}
            penumbra={1}
            intensity={0}
            distance={15}
            castShadow
          />
          
          {/* Subtle Golden Particles for each card */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
            </bufferGeometry>
            <pointsMaterial 
               color="#D4AF77" 
               size={0.03} 
               transparent 
               opacity={isHovered ? 0.6 : 0.1} 
               sizeAttenuation={true} 
               blending={THREE.AdditiveBlending}
            />
          </points>

        </Float>
      </group>
    </group>
  );
}

const Scenes3D = ({ progressRef, activeHoverIndex }: { progressRef: React.MutableRefObject<number>, activeHoverIndex: number | null }) => {
  const groupRef = useRef<THREE.Group>(null);
  const spacing = 5.2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Map overall progress (0-1) to the negative X translation
    const totalWidth = (categories.length - 1) * spacing;
    const targetX = -(progressRef.current * totalWidth);
    
    // Smooth camera pan linked to scroll
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 5 * delta);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#D4AF77" />
      {/* Ensures the metallic cards reflect something rich */}
      <spotLight position={[-5, 5, 5]} intensity={2} color="#ffffff" penumbra={1} />
      
      <group ref={groupRef} position={[0, -0.2, 0]}>
        {categories.map((cat, i) => (
          <Card3D key={cat.id} category={cat} index={i} spacing={spacing} progressRef={progressRef} isHovered={activeHoverIndex === i} />
        ))}
      </group>
    </>
  );
};

export default function TheCraft() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth > clientWidth) {
      progressRef.current = scrollLeft / (scrollWidth - clientWidth);
    }
  };

  return (
    <section className="relative w-full bg-transparent overflow-hidden py-32" id="services">
      
      {/* Premium Cinematic Header Overlay */}
      <div className="absolute top-24 left-0 w-full px-8 md:px-16 z-20 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#D4AF77]" />
              <span className="text-[#D4AF77] font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase font-black">
                Excellence in Motion
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-sans font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
              The <span className="text-white/20">Craft</span>
            </h2>
          </div>
          <p className="max-w-md text-white/50 text-sm md:text-base font-serif italic leading-relaxed">
            From first spark to final frame — every stage is crafted with uncompromising cinematic excellence.
          </p>
        </div>
      </div>

      {/* MOBILE EXACT HTML FALLBACK (Vertical Stack, Fast, No Lag) */}
      {isMobile && (
        <div className="mt-40 px-6 flex flex-col gap-8 relative z-30 pointer-events-auto">
          {categories.map((cat, i) => (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6 }}
               key={cat.id} 
               className="bg-[#050505]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <span className="text-[#D4AF77] font-sans text-[10px] tracking-[0.3em] uppercase font-bold mb-2 block">
                Chapter {cat.id}
              </span>
              <h3 className="text-white text-2xl font-black uppercase tracking-tight mb-6">
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-[3px] h-[3px] flex-shrink-0 rounded-full bg-[#D4AF77] mt-[8px]" />
                    <span className="text-white/60 text-sm font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}

      {/* DESKTOP 3D APPLE-STYLE CAROUSEL */}
      {!isMobile && (
        <div className="relative w-full h-[800px] mt-24">
          
          {/* Native Horizontal Scroll Container for Momentum Snapping */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="absolute inset-0 z-30 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
             {/* The Rich Content Layout rendered via DOM */}
              {categories.map((cat, i) => (
                <div 
                  key={i} 
                  className="w-[100vw] h-full shrink-0 snap-center flex items-center justify-center pointer-events-auto"
                >
                    <div 
                       className="w-[400px] h-[550px] bg-transparent cursor-pointer"
                       onPointerEnter={() => setHoverIndex(i)}
                       onPointerLeave={() => setHoverIndex(null)}
                    />
                </div>
              ))}
          </div>

          {/* Isolated Local Transparent Canvas */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Canvas 
               camera={{ position: [0, 0, 8.5], fov: 45 }} 
               dpr={[1, 1.5]}
               gl={{ 
                  alpha: true, 
                  antialias: false, 
                  powerPreference: 'high-performance',
                  stencil: false,
                  depth: true
               }}
            >
              <Scenes3D progressRef={progressRef} activeHoverIndex={hoverIndex} />
            </Canvas>
          </div>

          {/* Interactive hint overlay */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-4 opacity-50">
             <div className="w-16 h-px bg-gradient-to-r from-transparent to-white" />
             <span className="text-white text-[10px] uppercase font-mono tracking-widest text-shadow">Scroll to Explore</span>
             <div className="w-16 h-px bg-gradient-to-l from-transparent to-white" />
          </div>

        </div>
      )}

    </section>
  );
}
