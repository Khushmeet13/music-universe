'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverseStore } from '@/store/universe';

export function NebulaBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { beatIntensity } = useUniverseStore();

  // Distant star field
  const { starGeo, starMat } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const starColors = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#aad4ff'),
      new THREE.Color('#ffd6aa'),
      new THREE.Color('#ffaaaa'),
      new THREE.Color('#aaffdd'),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 150 + Math.random() * 100;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = starColors[Math.floor(Math.random() * starColors.length)];
      const brightness = 0.4 + Math.random() * 0.6;
      colors[i * 3] = c.r * brightness;
      colors[i * 3 + 1] = c.g * brightness;
      colors[i * 3 + 2] = c.b * brightness;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    return { starGeo: geo, starMat: mat };
  }, []);

  // Nebula clouds
  const nebulaData = useMemo(() => {
    return [
      { pos: [40, 20, -60] as [number, number, number], color: '#1a004d', scale: 30 },
      { pos: [-50, -10, -40] as [number, number, number], color: '#004d1a', scale: 25 },
      { pos: [10, -30, -80] as [number, number, number], color: '#4d0000', scale: 35 },
      { pos: [-20, 40, -70] as [number, number, number], color: '#00004d', scale: 28 },
    ];
  }, []);

  const starFieldRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (starFieldRef.current) {
      starFieldRef.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <group>
      {/* Background star field */}
      <points ref={starFieldRef} geometry={starGeo} material={starMat} />

      {/* Nebula clouds */}
      {nebulaData.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.scale, 16, 16]} />
          <meshBasicMaterial
            color={n.color}
            transparent
            opacity={0.12}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Ambient cosmic light */}
      <ambientLight intensity={0.15} color="#0a0a2e" />
      <directionalLight position={[0, 50, 0]} intensity={0.3} color="#ffffff" />
    </group>
  );
}
