'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Playlist } from '@/store/universe';
import { useUniverseStore } from '@/store/universe';

interface ConstellationProps {
  playlist: Playlist;
  isActive: boolean;
}

export function Constellation({ playlist, isActive }: ConstellationProps) {
  const lineRef = useRef<THREE.Line>(null);
  const { beatIntensity } = useUniverseStore();

  const { lineGeometry, midpoint } = useMemo(() => {
    const pts = playlist.constellationPoints;
    if (pts.length < 2) return { lineGeometry: null, midpoint: [0, 0, 0] as [number, number, number] };

    const points = pts.map(p => new THREE.Vector3(...p));
    const geo = new THREE.BufferGeometry().setFromPoints(points);

    const mid = pts.reduce(
      (acc, p) => [acc[0] + p[0] / pts.length, acc[1] + p[1] / pts.length, acc[2] + p[2] / pts.length],
      [0, 0, 0]
    ) as [number, number, number];

    return { lineGeometry: geo, midpoint: mid };
  }, [playlist.constellationPoints]);

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(playlist.color),
    transparent: true,
    opacity: isActive ? 0.8 : 0.15,
    blending: THREE.AdditiveBlending,
    linewidth: 1,
  }), [playlist.color, isActive]);

  useFrame(() => {
    if (!lineRef.current) return;
    (lineRef.current.material as THREE.LineBasicMaterial).opacity =
      isActive ? 0.6 + beatIntensity * 0.4 : 0.1 + beatIntensity * 0.05;
  });

  if (!lineGeometry) return null;

  return (
    <group>
      <primitive
        ref={lineRef}
        object={new THREE.Line(lineGeometry, lineMaterial)}
      />

      {/* Dot markers at each star */}
      {playlist.constellationPoints.map((pt, i) => (
        <mesh key={i} position={pt}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial
            color={playlist.color}
            transparent
            opacity={isActive ? 0.9 : 0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Playlist name label */}
      {isActive && (
        <Billboard position={midpoint}>
          <Text
            fontSize={0.7}
            color={playlist.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.06}
            outlineColor="#000000"
          >
            ✦ {playlist.name}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
