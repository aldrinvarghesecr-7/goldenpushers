'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function BokehField() {
  const ref = useRef<THREE.Points>(null);

  // Generate a field of bokeh particles
  const [positions, colors, sizes] = useMemo(() => {
    const count = 400; // Fewer but larger and more visible
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    
    const gold = new THREE.Color('#D4AF77');
    const darkGold = new THREE.Color('#1A1408');

    for (let i = 0; i < count; i++) {
      // Position in a controlled volume in front of camera
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10; // -20 to 0

      // Color variation
      const mix = Math.random();
      const color = gold.clone().lerp(darkGold, mix);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      // Varied sizes for depth
      sz[i] = Math.random() * 0.5 + 0.1;
    }
    return [pos, col, sz];
  }, []);

  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slow organic drift
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.01;

    // Interactive parallax - much more responsive
    const targetX = mouse.current.x * 3;
    const targetY = mouse.current.y * 3;
    
    ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
    ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.8} // Much larger for visibility
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
        // Use a round bokeh-like texture (procedural)
      />
    </Points>
  );
}

export default function MinimalInteractive3D() {
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020202] z-0 pointer-events-none overflow-hidden">
      {/* ─── BASE AMBIENT GLOW (The "Gold Aura") ─── */}
      <div 
        className="absolute inset-0 opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(212, 175, 119, 0.15) 0%, transparent 60%)`,
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <BokehField />
        <ambientLight intensity={0.5} />
      </Canvas>

      {/* ─── VIGNETTE ─── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,2,2,0.8)_100%)]" />
    </div>
  );
}
