'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useScrollStore } from './scrollstore';

// =============================================
// CINEMATIC STORY SCENE (Persistent 3D Canvas)
// OPTIMIZED: Removed shadows, reduced geometry,
// removed Environment preset, simplified lighting,
// lowered particle count, disabled antialias.
// =============================================
export default function CinematicStoryScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{
          antialias: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 14, 38], fov: 45, near: 0.1, far: 100 }}
        className="bg-transparent"
      >
        <StudioScene />
      </Canvas>
    </div>
  );
}

// =============================================
// STUDIO SCENE — Simplified for performance
// =============================================
function StudioScene() {
  const { camera } = useThree();
  const progress = useScrollStore((s) => s.progress);

  const keyframes = useMemo(() => [
    { p: 0.00, pos: [0, 14, 38], target: [0, 4, 0] },
    { p: 0.18, pos: [15, 8, 22], target: [13, 4, 9] },
    { p: 0.38, pos: [-14, 9, 24], target: [-11, 4, 13] },
    { p: 0.58, pos: [3, 5, -15], target: [0, 3, -22] },
    { p: 0.78, pos: [24, 7, -5], target: [20, 3, -8] },
    { p: 1.00, pos: [0, 16, 32], target: [0, 5, 0] },
  ], []);

  useFrame(() => {
    let i = 0;
    while (i < keyframes.length - 1 && progress > keyframes[i + 1].p) i++;

    const start = keyframes[i];
    const end = keyframes[i + 1] || start;
    const t = (progress - start.p) / (end.p - start.p || 1);

    const posX = THREE.MathUtils.lerp(start.pos[0], end.pos[0], t);
    const posY = THREE.MathUtils.lerp(start.pos[1], end.pos[1], t);
    const posZ = THREE.MathUtils.lerp(start.pos[2], end.pos[2], t);

    const tgtX = THREE.MathUtils.lerp(start.target[0], end.target[0], t);
    const tgtY = THREE.MathUtils.lerp(start.target[1], end.target[1], t);
    const tgtZ = THREE.MathUtils.lerp(start.target[2], end.target[2], t);

    const breath = Math.sin(progress * Math.PI * 3) * 0.4;

    camera.position.set(posX, posY + breath, posZ);
    camera.lookAt(tgtX, tgtY, tgtZ);
  });

  return (
    <>
      <fog attach="fog" args={['#0a0a0a', 20, 80]} />
      <ambientLight intensity={0.4} color="#3a2a1f" />
      <directionalLight
        position={[30, 28, -25]}
        intensity={2.5}
        color="#f5d8a0"
      />

      <StudioFloor />
      <StudioWalls />

      <FilmReelsGroup />
      <ProjectorGroup />
      <BoomMicGroup />
      <DirectorChairGroup />
      <CStandsAndLights />

      <GoldenParticles />
      <FloatingFilmStrips />
    </>
  );
}

function StudioFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#1a1814" metalness={0.15} roughness={0.75} />
    </mesh>
  );
}

function StudioWalls() {
  return (
    <>
      <mesh position={[0, 10, -30]}>
        <planeGeometry args={[80, 30]} />
        <meshStandardMaterial color="#11100c" metalness={0.1} roughness={0.85} />
      </mesh>
      <mesh position={[-30, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[80, 30]} />
        <meshStandardMaterial color="#11100c" metalness={0.1} roughness={0.85} />
      </mesh>
      <mesh position={[30, 10, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[80, 30]} />
        <meshStandardMaterial color="#11100c" metalness={0.1} roughness={0.85} />
      </mesh>
    </>
  );
}

function FilmReelsGroup() {
  const reelRefs = useRef<THREE.Mesh[]>([]);

  useFrame((_, delta) => {
    reelRefs.current.forEach((reel, i) => {
      if (reel) reel.rotation.z += delta * (0.6 + i * 0.2);
    });
  });

  return (
    <group position={[-12, 3, 14]}>
      {[-3, -1, 1, 3].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh
            ref={(el) => { if (el) reelRefs.current[i] = el; }}
          >
            <cylinderGeometry args={[1.9, 1.9, 0.7, 16]} />
            <meshStandardMaterial color="#1c1a16" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.9, 16]} />
            <meshStandardMaterial color="#f5c400" metalness={1} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ProjectorGroup() {
  return (
    <group position={[0, 2.2, -18]}>
      <mesh>
        <boxGeometry args={[3, 1.8, 4.5]} />
        <meshStandardMaterial color="#22201c" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 2.4]}>
        <cylinderGeometry args={[0.45, 0.45, 1, 16]} />
        <meshStandardMaterial color="#111" metalness={1} roughness={0} />
      </mesh>
      <pointLight position={[0, 0, 3]} intensity={8} color="#f5d8a0" distance={40} />
    </group>
  );
}

function BoomMicGroup() {
  return (
    <group position={[16, 5, 8]}>
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 14, 8]} />
        <meshStandardMaterial color="#1c1a16" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[3, 9, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 6, 8]} />
        <meshStandardMaterial color="#1c1a16" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[5.5, 9, 0]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function DirectorChairGroup() {
  return (
    <group position={[22, 2, -8]}>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2.4, 0.2, 2.2]} />
        <meshStandardMaterial color="#1c1a16" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0, 2.4, -1]}>
        <boxGeometry args={[2.4, 2.2, 0.2]} />
        <meshStandardMaterial color="#1c1a16" metalness={0.3} roughness={0.6} />
      </mesh>
    </group>
  );
}

function CStandsAndLights() {
  return (
    <>
      <group position={[-20, 0, -10]}>
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 11, 8]} />
          <meshStandardMaterial color="#1c1a16" metalness={0.6} roughness={0.4} />
        </mesh>
        <pointLight position={[2, 10, 2]} intensity={5} color="#f5d8a0" distance={28} />
      </group>
      <group position={[18, 0, -22]}>
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 11, 8]} />
          <meshStandardMaterial color="#1c1a16" metalness={0.6} roughness={0.4} />
        </mesh>
        <pointLight position={[-2, 10, -2]} intensity={5} color="#f5d8a0" distance={28} />
      </group>
    </>
  );
}

function GoldenParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 400;
  const timeRef = useRef(0);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 70;
      pos[i + 1] = Math.random() * 25;
      pos[i + 2] = (Math.random() - 0.5) * 70;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    timeRef.current += delta;
    pointsRef.current.rotation.y = timeRef.current * 0.015;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent size={0.1} sizeAttenuation color="#f5c400" depthWrite={false} />
    </Points>
  );
}

function FloatingFilmStrips() {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    groupRef.current.children.forEach((strip, i) => {
      strip.position.y = 5 + Math.sin(timeRef.current * 1.4 + i) * 3;
      strip.rotation.z = Math.sin(timeRef.current * 0.7 + i) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-15 + i * 7, 8, -5]} rotation={[0, 0.4, 0]}>
          <planeGeometry args={[0.15, 6]} />
          <meshStandardMaterial color="#1c1a16" side={THREE.DoubleSide} metalness={0.4} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}