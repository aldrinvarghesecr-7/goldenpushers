'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  Float, 
  SpotLight, 
  useDepthBuffer,
  ContactShadows,
  useGLTF,
  Stars
} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- High-End Placeholder Components ---

const VintageCamera = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const ref = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const progress = scrollProgress.current;
    
    // Smooth transitions between positions
    // Hero (0) -> Ethos (0.2) -> Craft (0.4) -> Reels (0.6) -> Architects (0.8) -> Enquire (1.0)
    
    const targetZ = THREE.MathUtils.lerp(5, -5, progress);
    const targetX = Math.sin(progress * Math.PI) * 2;
    const targetRotY = progress * Math.PI * 0.5;

    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.1);
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.1);
    
    if (lensRef.current) {
        const focusRange = Math.max(0, 1 - Math.abs(progress - 0.6) * 10);
        lensRef.current.position.z = 0.4 + focusRange * 0.2;
    }
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={lensRef} position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0.2, 0.25, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#CEA900" metalness={1} roughness={0.05} />
      </mesh>
    </group>
  );
};

const ClapperBoard = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
  const ref = useRef<THREE.Group>(null);
  const topRef = useRef<THREE.Group>(null);
  const lastProgress = useRef(0);

  useFrame((state) => {
    if (!ref.current || !topRef.current) return;
    const progress = scrollProgress.current;
    
    // Snap logic for Ethos (0.2) and Enquire (1.0)
    const ethosSnap = progress > 0.15 && lastProgress.current <= 0.15;
    const enquireSnap = progress > 0.9 && lastProgress.current <= 0.9;
    
    if (ethosSnap || enquireSnap) {
        gsap.to(topRef.current.rotation, { z: -0.6, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.inOut" });
    }
    lastProgress.current = progress;

    const targetY = Math.sin(state.clock.elapsedTime) * 0.1 - 1;
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1);
    ref.current.position.x = 3 - progress * 2;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
  });

  return (
    <group ref={ref} position={[3, -1, 2]}>
      <mesh castShadow>
        <boxGeometry args={[1, 0.7, 0.05]} />
        <meshStandardMaterial color="#050505" metalness={0.5} />
      </mesh>
      <group ref={topRef} position={[-0.5, 0.35, 0]}>
        <mesh position={[0.5, 0.05, 0]}>
            <boxGeometry args={[1, 0.12, 0.06]} />
            <meshStandardMaterial color="#111" />
        </mesh>
      </group>
      {/* Stripes */}
      <mesh position={[0, 0.3, 0.03]}>
          <boxGeometry args={[1, 0.05, 0.01]} />
          <meshStandardMaterial color="#CEA900" />
      </mesh>
    </group>
  );
};

const StudioLight = ({ position, index, scrollProgress }: any) => {
    const lightRef = useRef<THREE.SpotLight>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        const progress = scrollProgress.current;
        const threshold = 0.35 + index * 0.08;
        const isOn = progress > threshold;
        
        if (lightRef.current) {
            lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, isOn ? 15 : 0, 0.1);
        }
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isOn ? 5 : 0, 0.1);
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef} castShadow>
                <cylinderGeometry args={[0.2, 0.3, 0.4, 16]} />
                <meshStandardMaterial color="#222" emissive="#CEA900" emissiveIntensity={0} />
            </mesh>
            <SpotLight 
                ref={lightRef}
                color="#CEA900"
                distance={15}
                angle={0.4}
                attenuation={6}
                anglePower={4}
                opacity={0.3}
                position={[0, 0, 0]}
            />
        </group>
    );
};

const DirectorChair = ({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) => {
    const ref = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if (!ref.current) return;
        const progress = scrollProgress.current;
        const inView = progress > 0.75 && progress < 0.9;
        
        const targetRotY = inView ? Math.PI : Math.PI * 0.2;
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.05);
        ref.current.position.set(-3, -2, 3 - progress * 4);
        ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    });

    return (
        <group ref={ref} position={[-3, -2, 2]}>
            <mesh castShadow>
                <boxGeometry args={[0.7, 0.05, 0.7]} />
                <meshStandardMaterial color="#080808" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.4, -0.35]}>
                <boxGeometry args={[0.7, 0.6, 0.05]} />
                <meshStandardMaterial color="#CEA900" metalness={0.5} />
            </mesh>
            {/* Legs */}
            {[[-0.3, -0.4, 0.3], [0.3, -0.4, 0.3], [-0.3, -0.4, -0.3], [0.3, -0.4, -0.3]].map((p, i) => (
                <mesh key={i} position={p as [number, number, number]}>
                    <boxGeometry args={[0.06, 0.8, 0.06]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            ))}
        </group>
    );
};

// --- Main Component ---

const CinematicScene = ({ isMobile }: { isMobile: boolean }) => {
  const scrollProgress = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.current = window.scrollY / totalHeight;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      <ambientLight intensity={0.4} />
      <Environment preset="night" />

      <VintageCamera scrollProgress={scrollProgress} />
      <ClapperBoard scrollProgress={scrollProgress} />
      
      {!isMobile && (
          <group position={[0, 3, -1]}>
              <StudioLight position={[-3, 0, 0]} index={0} scrollProgress={scrollProgress} />
              <StudioLight position={[0, 1, 0]} index={1} scrollProgress={scrollProgress} />
              <StudioLight position={[3, 0, 0]} index={2} scrollProgress={scrollProgress} />
          </group>
      )}

      <DirectorChair scrollProgress={scrollProgress} />

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      
      <mesh rotation={[0, 0, 0]}>
          <sphereGeometry args={[20, 32, 32]} />
          <meshStandardMaterial side={THREE.BackSide} color="#020202" />
      </mesh>
    </>
  );
};

export default function CinematicScrollScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none bg-primary h-screen w-screen overflow-hidden">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <CinematicScene isMobile={isMobile} />
      </Canvas>
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/80 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
