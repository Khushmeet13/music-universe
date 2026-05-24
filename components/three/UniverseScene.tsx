'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Star } from './Star';
import { GalaxyCloud } from './Galaxy';
import { BeatParticles } from './BeatParticles';
import { Constellation } from './Constellation';
import { NebulaBackground } from './NebulaBackground';
import { useUniverseStore } from '@/store/universe';
import { SONGS, GALAXIES, PLAYLISTS } from '@/lib/musicData';

export function UniverseScene() {
  const controlsRef = useRef<any>(null);
  const { selectedSong, selectedPlaylist, cameraTarget, beatIntensity } = useUniverseStore();
  const { camera } = useThree();

  // Smooth camera to selected song
  useFrame(() => {
    if (selectedSong && controlsRef.current) {
      const target = new THREE.Vector3(...selectedSong.position);
      controlsRef.current.target.lerp(target, 0.05);
      const idealPos = target.clone().add(new THREE.Vector3(0, 5, 12));
      camera.position.lerp(idealPos, 0.04);
    }
  });

  return (
    <>
      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        minDistance={3}
        maxDistance={120}
        makeDefault
      />

      {/* Environment */}
      <NebulaBackground />
      <Stars radius={200} depth={60} count={2000} factor={3} saturation={0} fade speed={0.5} />

      {/* Galaxy clouds */}
      {GALAXIES.map(galaxy => (
        <GalaxyCloud key={galaxy.genre} galaxy={galaxy} />
      ))}

      {/* Constellation lines (playlists) */}
      {PLAYLISTS.map(playlist => (
        <Constellation
          key={playlist.id}
          playlist={playlist}
          isActive={selectedPlaylist?.id === playlist.id}
        />
      ))}

      {/* Song stars */}
      {SONGS.map(song => (
        <Star key={song.id} song={song} />
      ))}

      {/* Beat particles */}
      <BeatParticles />
    </>
  );
}
