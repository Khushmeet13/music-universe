'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Galaxy as GalaxyType } from '@/store/universe';
import { useUniverseStore } from '@/store/universe';

interface GalaxyProps {
  galaxy: GalaxyType;
}

export function GalaxyCloud({ galaxy }: GalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const diskRef = useRef<THREE.Mesh>(null);
  const { beatIntensity } = useUniverseStore();

  const particleCount = 800;

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const color = new THREE.Color(galaxy.color);

    for (let i = 0; i < particleCount; i++) {
      // Spiral galaxy shape
      const arm = Math.floor(Math.random() * 3);
      const armAngle = (arm / 3) * Math.PI * 2;
      const radius = Math.random() * 12 + 1;
      const spiralAngle = armAngle + radius * 0.35 + (Math.random() - 0.5) * 1.2;
      const scatter = Math.exp(-radius * 0.05) * 2;

      positions[i * 3] = galaxy.center[0] + Math.cos(spiralAngle) * radius + (Math.random() - 0.5) * scatter;
      positions[i * 3 + 1] = galaxy.center[1] + (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = galaxy.center[2] + Math.sin(spiralAngle) * radius + (Math.random() - 0.5) * scatter;

      // Vary color brightness
      const brightness = 0.3 + Math.random() * 0.7;
      colors[i * 3] = color.r * brightness;
      colors[i * 3 + 1] = color.g * brightness;
      colors[i * 3 + 2] = color.b * brightness;

      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    return { positions, colors, sizes };
  }, [galaxy]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.y = t;

    // Beat pulse
    const scale = 1 + beatIntensity * 0.1;
    pointsRef.current.scale.setScalar(scale);

    if (diskRef.current) {
      diskRef.current.rotation.y = t;
      (diskRef.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + beatIntensity * 0.06;
    }
  });

  const pointsMaterial = useMemo(() => new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <group>
      {/* Galaxy particle cloud */}
      <points ref={pointsRef} geometry={geometry} material={pointsMaterial} />

      {/* Central bulge disk */}
      <mesh ref={diskRef} position={galaxy.center} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 64]} />
        <meshBasicMaterial
          color={galaxy.color}
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Galaxy center glow */}
      <mesh position={galaxy.center}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color={galaxy.color} transparent opacity={0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Galaxy label */}
      <Billboard position={[galaxy.center[0], galaxy.center[1] + 14, galaxy.center[2]]}>
        <Text
          fontSize={1.2}
          color={galaxy.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.1}
          outlineColor="#000000"
          letterSpacing={0.1}
        >
          {galaxy.label.toUpperCase()}
        </Text>
      </Billboard>

      {/* Point light at galaxy center */}
      <pointLight position={galaxy.center} color={galaxy.color} intensity={1.5} distance={25} />
    </group>
  );
}
