'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronRight } from 'lucide-react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

const GOLD = '#D4AF77';

const categories = [
  {
    id: "01",
    title: "Creative Development & Strategy",
    description: "Architecting the soul of your cinematic vision.",
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
    description: "Precision planning for seamless execution.",
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
    description: "Capturing the light with masterwork precision.",
    items: [
      "Full-scale video/film production",
      "Commercials & TV advertisements",
      "Brand films and promotional videos",
      "Music videos",
      "Luxury & high-end fashion films",
      "Corporate storytelling",
      "Short films and narrative content",
      "Documentary-style content",
      "Live event coverage",
      "Aerial/drone cinematography",
      "Studio or on-location shoots"
    ]
  },
  {
    id: "04",
    title: "Post-Production Services",
    description: "Refining the cut into cinematic gold.",
    items: [
      "Video editing and assembly",
      "Color grading and correction",
      "Sound design and audio post",
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
    description: "Tailored narratives for the digital age.",
    items: [
      "Social media content (Reels, TikTok)",
      "Product and e-commerce content",
      "Experiential films",
      "Podcast video production",
      "Behind-the-scenes content"
    ]
  },
  {
    id: "06",
    title: "Additional Premium Services",
    description: "Extending the reach of your visual identity.",
    items: [
      "Photography (campaigns, stills)",
      "360-degree campaign production",
      "Distribution and optimization",
      "Marketing support and materials",
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

  const rimMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const filmUnspoolRef = useRef<THREE.Group>(null);
  const filmMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);
  const glintRef = useRef<THREE.Mesh>(null);
  const p = progressRef.current;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const myPos = index * spacing;
    const maxScroll = (categories.length - 1) * spacing;
    const scrollTargetX = progressRef.current * maxScroll;
    
    // ARRANGEMENT: Dynamic Arc
    const angle = (myPos - scrollTargetX) * 0.1; 
    const arcRadius = 14;
    const arcX = Math.sin(angle) * arcRadius;
    const arcZ = Math.cos(angle) * arcRadius - arcRadius;

    const distFromCenter = Math.abs(myPos - scrollTargetX);
    const isCenter = distFromCenter < 2.0;
    
    // SINE WAVE FLOAT
    const floatY = Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.15;
    
    // SCALE & DEPTH (Centering Climax)
    const baseScale = THREE.MathUtils.mapLinear(Math.min(distFromCenter, spacing), 0, spacing, 1, 0.7);
    const finalScale = (isCenter ? 1.04 : baseScale);
    
    // PARALLAX & HOVER
    const rotY = (myPos - scrollTargetX) * 0.12;
    const activeHover = isHovered && isCenter;
    const hoverY = activeHover ? 0.3 : 0;
    const hoverRotY = activeHover ? rotY + (state.mouse.x * 0.2) + 0.14 : rotY;
    const hoverRotX = activeHover ? -0.1 : 0;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, arcX, 12 * delta);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatY + hoverY, 12 * delta);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, arcZ + (activeHover ? 1.5 : 0), 12 * delta);
    groupRef.current.scale.lerp(new THREE.Vector3().setScalar(finalScale * 0.8), 12 * delta);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, hoverRotY, 12 * delta);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, hoverRotX + (state.mouse.y * -0.1), 12 * delta);

    // SPECULAR GLINT SWEEP
    if (glintRef.current) {
        glintRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5 + p * 10) * 2;
        glintRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5 + p * 10) * 3;
    }

    // Light pulse
    const lightIntensity = isCenter ? (activeHover ? 35 : 25) : 0;
    if (centerSpotlightRef.current) {
      centerSpotlightRef.current.intensity = THREE.MathUtils.lerp(centerSpotlightRef.current.intensity, lightIntensity, 15 * delta);
    }

    if (rimMatRef.current) {
        rimMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(rimMatRef.current.emissiveIntensity, activeHover ? 1.2 : (isCenter ? 0.3 : 0.05), 15 * delta);
    }

    if (filmUnspoolRef.current && filmMatRef.current) {
        const targetScale = activeHover ? 1.2 : 0.01;
        filmUnspoolRef.current.scale.x = THREE.MathUtils.lerp(filmUnspoolRef.current.scale.x, targetScale, 15 * delta);
        filmMatRef.current.opacity = THREE.MathUtils.lerp(filmMatRef.current.opacity, activeHover ? 0.9 : 0, 15 * delta);
    }

    if (pointsMatRef.current) {
        pointsMatRef.current.opacity = THREE.MathUtils.lerp(pointsMatRef.current.opacity, isCenter ? 0.9 : 0, 15 * delta);
    }
  });

  return (
    <group>
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          
          {/* 🎞️ PREMIUM FILM CANISTER CARDS: 420x520 units */}
          <group>
            {/* Main Canister Body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[4.2, 5.2, 0.4]} />
              <meshStandardMaterial 
                color="#050505" 
                metalness={0.92} 
                roughness={0.12} 
                envMapIntensity={3}
              />
            </mesh>
            
            {/* Metallic Golden Ends (Canister Caps) */}
            <mesh position={[0, 2.5, 0]} scale={[1.05, 0.1, 1]}>
              <boxGeometry args={[4.2, 1, 0.5]} />
              <meshStandardMaterial 
                ref={rimMatRef}
                color={GOLD} 
                metalness={1} 
                roughness={0.05} 
                emissive={GOLD}
                emissiveIntensity={0.1}
                envMapIntensity={5} 
              />
            </mesh>
            <mesh position={[0, -2.5, 0]} scale={[1.05, 0.1, 1]}>
              <boxGeometry args={[4.2, 1, 0.5]} />
              <meshStandardMaterial 
                ref={rimMatRef}
                color={GOLD} 
                metalness={1} 
                roughness={0.05} 
                emissive={GOLD}
                emissiveIntensity={0.1}
                envMapIntensity={5} 
              />
            </mesh>

            {/* Specular Glint Mesh (Dynamic moving highlight) */}
            <mesh ref={glintRef} position={[0, 0, 0.22]}>
               <planeGeometry args={[0.5, 6]} />
               <meshBasicMaterial color="#fff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>
          </group>

          {/* UNSPOOLING EFFECT */}
          <group ref={filmUnspoolRef} position={[2.1, 0, 0]}>
             <mesh position={[1.5, 0, 0]}>
                <planeGeometry args={[3, 4.8]} />
                <meshStandardMaterial 
                  ref={filmMatRef}
                  color="#111" 
                  metalness={0.8} 
                  roughness={0.2} 
                  transparent 
                  opacity={0} 
                  side={THREE.DoubleSide}
                />
             </mesh>
          </group>
          
          {/* Rich content mounted via HTML Transform */}
          <Html 
            transform 
            position={[0, 0, 0.25]} 
            zIndexRange={[100, 0]}
            className="pointer-events-auto select-none"
          >
            <div 
              className="w-[420px] h-[520px] p-10 flex flex-col justify-start rounded-[24px] overflow-hidden border border-white/5"
              style={{
                background: 'linear-gradient(135deg, rgba(5,5,5,0.95), rgba(5,5,5,0.85))',
                backdropFilter: 'blur(25px)',
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-px w-10 bg-[#D4AF77]/40" />
                 <span className="text-[#D4AF77] font-sans font-black text-[10px] tracking-[0.5em] uppercase">
                   Chapter {category.id}
                 </span>
              </div>
              
              <h3 className="text-white text-3xl font-sans font-black uppercase tracking-tighter leading-none mb-4">
                {category.title}
              </h3>

              <p className="text-[#F8E5B1]/50 text-xs font-serif italic mb-10 tracking-wide font-medium">
                {category.description}
              </p>
              
              <motion.div 
                initial={false}
                animate={{ 
                  height: isCenter ? 'auto' : 0,
                  opacity: isCenter ? 1 : 0
                }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <ul className="space-y-[14px]">
                  {category.items.map((item, i) => (
                    <motion.li 
                      initial={{ x: -10, opacity: 0 }}
                      animate={isCenter ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                      key={i} 
                      className="flex items-start gap-4"
                    >
                      <div className="w-1 h-1 flex-shrink-0 rounded-full bg-[#D4AF77] mt-[7px] shadow-[0_0_8px_rgba(212,175,119,0.5)]" />
                      <span className="text-white/60 text-[13px] font-body leading-tight tracking-wide">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </Html>

          {/* Targeted SpotLight reacting to center position - Now with Golden Volumetric Hint */}
          <SpotLight
            ref={centerSpotlightRef}
            color="#F8E5B1"
            position={[0, 8, 4]}
            angle={0.4}
            penumbra={1}
            intensity={0}
            distance={20}
            castShadow
          />
          
          {/* Dense Particle Accent for Centered Card */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
            </bufferGeometry>
            <pointsMaterial 
               ref={pointsMatRef}
               color={GOLD} 
               size={0.05} 
               transparent 
               opacity={0} 
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
  const spacing = 6.4; // Increased spacing for more cinematic breathing room

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Map overall progress (0-1) to the negative X translation
    // We remove the lerp here to ensure 1:1 scroll precision
    const totalWidth = (categories.length - 1) * spacing;
    const targetX = -(progressRef.current * totalWidth);
    
    groupRef.current.position.x = targetX;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, state.mouse.x * 0.05, 5 * delta);
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
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (containerRef.current && !isMobile) {
      const scrollWidth = (categories.length) * window.innerWidth;
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollWidth}`,
        pin: true,
        scrub: 1.5, // Buffer-smooth scrubbing
        onUpdate: (self) => {
          progressRef.current = self.progress;
        }
      });

      return () => {
        st.kill();
        window.removeEventListener('resize', checkMobile);
      };
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-transparent overflow-hidden h-screen" 
      id="services"
    >
      
      {/* Premium Cinematic Header Overlay */}
      <div className="absolute top-16 left-0 w-full px-8 md:px-24 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="h-[2px] w-16 bg-[#D4AF77]" />
            <span className="text-[#D4AF77] font-sans text-xs tracking-[0.6em] uppercase font-black">
              Production Standards
            </span>
          </div>
          <h2 className="text-6xl md:text-[10rem] font-sans font-black text-white uppercase tracking-[-0.05em] leading-[0.85] mb-8">
            The <span className="text-white/10">Craft</span>
          </h2>
          <p className="max-w-xl text-white/40 text-sm md:text-lg font-body italic leading-relaxed">
            From first spark to final frame — every stage is crafted with uncompromising cinematic excellence and technical precision.
          </p>
        </div>
      </div>

      {/* MOBILE FALLBACK */}
      {isMobile && (
        <div className="pt-40 pb-20 px-6 flex flex-col gap-10 relative z-30 overflow-y-auto h-full scrollbar-hide">
          {categories.map((cat, i) => (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-50px" }}
               key={cat.id} 
               className="bg-[#050505]/95 backdrop-blur-3xl border border-white/5 rounded-[32px] p-10 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-px w-8 bg-[#D4AF77]" />
                 <span className="text-[#D4AF77] font-sans text-[10px] tracking-[0.4em] uppercase font-bold">
                   Chapter {cat.id}
                 </span>
              </div>
              <h3 className="text-white text-3xl font-sans font-black uppercase mb-3">
                {cat.title}
              </h3>
              <p className="text-[#F8E5B1]/40 text-xs italic mb-8 font-serif">{cat.description}</p>
              <ul className="space-y-4">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-[4px] h-[4px] flex-shrink-0 rounded-full bg-[#D4AF77] mt-[10px]" />
                    <span className="text-white/60 text-sm font-sans leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}

      {/* DESKTOP 3D SCENE */}
      {!isMobile && (
        <div className="absolute inset-0 z-10">
          
          {/* Transparent Hover Overlay System (Pinned) */}
          <div className="absolute inset-0 z-30 pointer-events-none">
             <div className="flex h-full" style={{ width: `${categories.length * 100}vw`, transform: `translateX(-${progressRef.current * (categories.length - 1) * 100}vw)` }}>
              {categories.map((_, i) => (
                <div 
                  key={i} 
                  className="w-[100vw] h-full pointer-events-auto cursor-pointer"
                  onPointerEnter={() => setHoverIndex(i)}
                  onPointerLeave={() => setHoverIndex(null)}
                />
              ))}
             </div>
          </div>

          <Canvas 
             camera={{ position: [0, 0, 10], fov: 40 }} 
             dpr={[1, 1.5]}
             gl={{ alpha: true, antialias: true }}
          >
            <Scenes3D progressRef={progressRef} activeHoverIndex={hoverIndex} />
          </Canvas>
          
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 opacity-40">
             <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#D4AF77]" />
             <span className="text-[#D4AF77] text-[10px] uppercase font-sans font-black tracking-[0.5em]">Scroll through our studio</span>
             <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#D4AF77]" />
          </div>
        </div>
      )}

    </section>
  );
}
