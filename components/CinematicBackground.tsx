'use client';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  PerspectiveCamera, 
  Environment, 
  Stars,
  SpotLight,
  useDepthBuffer,
  ContactShadows
} from '@react-three/drei';
import * as THREE from 'three';

// --- Assets ---

const FilmReel = ({ position, rotation, scale = 1 }: any) => {
  const reelRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (reelRef.current) {
      reelRef.current.rotation.z += 0.005;
      reelRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
    }
  });

  return (
    <group ref={reelRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Reel Disks - Back */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Main Reel Disks - Front */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.4]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Gold Inner Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
        <meshStandardMaterial color="#CEA900" metalness={1} roughness={0.1} />
      </mesh>

      {/* Spoke Holes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
           <mesh position={[0.6, 0, 0.2]}>
             <boxGeometry args={[0.4, 0.4, 0.6]} />
             <meshStandardMaterial color="#000" />
           </mesh>
        </group>
      ))}
    </group>
  );
};

const ClapperBoard = ({ position, rotation, scale = 1 }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  const clapperTopRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.cos(state.clock.elapsedTime + position[1]) * 0.001;
      groupRef.current.rotation.y += 0.002;
    }
    if (clapperTopRef.current) {
        const isOpen = Math.sin(state.clock.elapsedTime * 0.5) > 0.98;
        clapperTopRef.current.rotation.z = isOpen ? -0.5 : 0;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Bottom Base */}
      <mesh>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Top Clapper */}
      <group ref={clapperTopRef} position={[-0.6, 0.4, 0]}>
         <mesh position={[0.6, 0.1, 0]}>
           <boxGeometry args={[1.2, 0.2, 0.1]} />
           <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
         </mesh>
      </group>
      {/* Stripes (simplified) */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.12]} />
        <meshStandardMaterial color="#CEA900" metalness={0.8} />
      </mesh>
    </group>
  );
};

const DustParticles = ({ count = 200 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 20;
        p[i * 3 + 1] = (Math.random() - 0.5) * 20;
        p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.2) * 0.001;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#CEA900" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
};

// --- Scene ---

const Scene = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      
      <ambientLight intensity={0.2} />
      <SpotLight
        position={[5, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color="#CEA900"
      />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#444" />

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <FilmReel position={[-4, 2, -2]} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={0.8} />
      </Float>
      
      <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
        <ClapperBoard position={[4, -1, -1]} rotation={[0, -Math.PI / 6, 0.2]} scale={1.2} />
      </Float>

      {!isMobile && (
        <>
            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.5}>
                <FilmReel position={[2, 3, -4]} rotation={[0, 0, Math.PI / 3]} scale={0.5} />
            </Float>
            <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
                <ClapperBoard position={[-3, -3, -3]} rotation={[0.2, Math.PI / 8, 0]} scale={0.7} />
            </Float>
        </>
      )}

      <DustParticles count={isMobile ? 100 : 300} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Environment preset="night" />
      <ContactShadows position={[0, -5, 0]} opacity={0.4} blur={2} far={10} color="#000000" />
    </>
  );
};

export default function CinematicBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden bg-primary">
       {/* Dark overlay to ensure readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/80 via-primary/40 to-primary/80" />
      
      <Canvas shadows dpr={[1, 2]}>
        <Scene isMobile={isMobile} />
      </Canvas>

      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
