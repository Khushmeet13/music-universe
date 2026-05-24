'use client';
import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverseStore } from '@/store/universe';

const MAX_PARTICLES = 600;

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  color: THREE.Color;
}

export function BeatParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { particleBurst, beatIntensity, selectedSong, isPlaying } = useUniverseStore();
  const particlesRef = useRef<Particle[]>([]);

  const { positions, colors, sizes } = useMemo(() => ({
    positions: new Float32Array(MAX_PARTICLES * 3),
    colors: new Float32Array(MAX_PARTICLES * 3),
    sizes: new Float32Array(MAX_PARTICLES),
  }), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  }), []);

  useEffect(() => {
    if (!particleBurst || !isPlaying) return;

    const burstOrigin = selectedSong?.position
      ? new THREE.Vector3(...selectedSong.position)
      : new THREE.Vector3(0, 0, 0);

    const burstColor = new THREE.Color(selectedSong?.color || '#00F5FF');
    const count = 40 + Math.floor(beatIntensity * 60);

    for (let i = 0; i < count; i++) {
      const speed = 0.05 + Math.random() * 0.15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlesRef.current.push({
        position: burstOrigin.clone().add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          )
        ),
        velocity: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        ),
        life: 1,
        maxLife: 0.5 + Math.random() * 1.5,
        size: 0.1 + Math.random() * 0.4,
        color: burstColor.clone().offsetHSL(Math.random() * 0.1 - 0.05, 0, Math.random() * 0.3 - 0.1),
      });
    }

    // Cap particle pool
    if (particlesRef.current.length > MAX_PARTICLES) {
      particlesRef.current = particlesRef.current.slice(-MAX_PARTICLES);
    }
  }, [particleBurst, isPlaying, selectedSong, beatIntensity]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    // Update particles
    particlesRef.current = particlesRef.current.filter(p => p.life > 0);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const p = particlesRef.current[i];
      if (p) {
        p.life -= delta / p.maxLife;
        p.position.add(p.velocity);
        p.velocity.multiplyScalar(0.97); // drag

        const lifeRatio = Math.max(0, p.life);
        positions[i * 3] = p.position.x;
        positions[i * 3 + 1] = p.position.y;
        positions[i * 3 + 2] = p.position.z;
        colors[i * 3] = p.color.r * lifeRatio;
        colors[i * 3 + 1] = p.color.g * lifeRatio;
        colors[i * 3 + 2] = p.color.b * lifeRatio;
        sizes[i] = p.size * lifeRatio;
      } else {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 10000; // hide
        positions[i * 3 + 2] = 0;
        sizes[i] = 0;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
