'use client';
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { Song } from '@/store/universe';
import { useUniverseStore } from '@/store/universe';

interface StarProps {
  song: Song;
}

export function Star({ song }: StarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { selectedSong, selectSong, setHoveredSong, beatIntensity, viewMode } = useUniverseStore();
  const isSelected = selectedSong?.id === song.id;

  const starColor = useMemo(() => new THREE.Color(song.color), [song.color]);
  const glowColor = useMemo(() => new THREE.Color(song.color), [song.color]);

  // Corona material (star glow)
  const coronaMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: glowColor,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
  }), [glowColor]);

  // Core material
  const coreMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: starColor,
    emissive: starColor,
    emissiveIntensity: 2.5,
    metalness: 0.1,
    roughness: 0.2,
  }), [starColor]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Breathing pulse with beat
    const beatScale = 1 + beatIntensity * song.energy * 0.4;
    const breathScale = 1 + Math.sin(t * 2 + song.bpm * 0.01) * 0.05;
    const finalScale = song.size * beatScale * breathScale * (isSelected ? 1.6 : hovered ? 1.3 : 1);
    meshRef.current.scale.setScalar(finalScale);

    // Twinkle via emissive intensity
    if (coreMaterial) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        2.5 + Math.sin(t * 3 + parseFloat(song.id.slice(1)) * 1.7) * 1.0 + beatIntensity * song.energy * 2;
    }

    // Glow corona
    if (glowRef.current) {
      glowRef.current.scale.setScalar(finalScale * 2.5);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.08 + beatIntensity * 0.2 + (isSelected ? 0.2 : 0);
    }

    // Rotating ring for selected
    if (ringRef.current && isSelected) {
      ringRef.current.rotation.x = t * 0.5;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group position={song.position}>
      {/* Glow corona */}
      <mesh ref={glowRef} material={coronaMaterial}>
        <sphereGeometry args={[song.size, 16, 16]} />
      </mesh>

      {/* Star core */}
      <mesh
        ref={meshRef}
        material={coreMaterial}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredSong(song);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          setHovered(false);
          setHoveredSong(null);
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          selectSong(isSelected ? null : song);
        }}
      >
        <sphereGeometry args={[song.size, 32, 32]} />
      </mesh>

      {/* Orbit ring for selected star */}
      {isSelected && (
        <mesh ref={ringRef}>
          <torusGeometry args={[song.size * 2.5, 0.04, 8, 64]} />
          <meshBasicMaterial color={song.color} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Point light emanating from star */}
      <pointLight color={song.color} intensity={isSelected ? 3 : hovered ? 1.5 : 0.5} distance={8} />

      {/* Song label */}
      {(hovered || isSelected) && (
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Text
            position={[0, song.size * 2.5, 0]}
            fontSize={0.4}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.05}
            outlineColor="#000000"
          >
            {song.title}
          </Text>
          <Text
            position={[0, song.size * 2.5 - 0.55, 0]}
            fontSize={0.28}
            color={song.color}
            anchorX="center"
            anchorY="middle"
          >
            {song.artist}
          </Text>
        </Billboard>
      )}
    </group>
  );
}
