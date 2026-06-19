'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { UniverseScene } from '@/components/three/UniverseScene';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { Vector2 } from 'three';

export function UniverseCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 10, 60], fov: 60, near: 0.1, far: 500 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ background: '#00000F' }}
    >
      <Suspense fallback={null}>
        <UniverseScene />
        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.3} darkness={0.6} />
          <ChromaticAberration
            offset={new Vector2(0.0005, 0.0005)}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
