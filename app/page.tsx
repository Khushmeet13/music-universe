'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/ui/Sidebar';
import { MusicPlayer } from '@/components/ui/MusicPlayer';
import { SongInfoPanel } from '@/components/ui/SongInfoPanel';
import { HUD } from '@/components/ui/HUD';
import { useUniverseStore } from '@/store/universe';
import { SONGS, PLAYLISTS, GALAXIES } from '@/lib/musicData';
import { useSimulatedBeats } from '@/hooks/useAudioAnalyzer';

// Dynamic import so Three.js only loads client-side
const UniverseCanvas = dynamic(
  () => import('@/components/three/UniverseCanvas').then(m => m.UniverseCanvas),
  { ssr: false }
);

function IntroOverlay({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #0a0020 0%, #000008 100%)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>

      <motion.div
        className="text-center z-10 px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✦
        </motion.div>

        <h1
          className="text-5xl font-bold text-white mb-3 tracking-wide"
          style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 60px rgba(99,102,241,0.8)' }}
        >
          Music Universe
        </h1>
        <p className="text-indigo-300 text-sm tracking-widest uppercase mb-2">
          Songs Are Stars · Genres Are Galaxies
        </p>
        <p className="text-indigo-400/60 text-xs tracking-widest uppercase mb-10">
          Playlists Are Constellations · Beats Create Particles
        </p>

        <div className="flex justify-center gap-8 mb-12 text-center">
          {[
            { num: SONGS.length, label: 'Stars' },
            { num: 6, label: 'Galaxies' },
            { num: PLAYLISTS.length, label: 'Constellations' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{num}</div>
              <div className="text-xs text-indigo-400/50 uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-3 rounded-full text-sm font-bold uppercase tracking-widest"
          style={{
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            boxShadow: '0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.2)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Enter the Universe
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const { setSongs } = useUniverseStore();

  useEffect(() => {
    setSongs(SONGS);
  }, [setSongs]);

  // Simulated beat engine (demo mode)
  useSimulatedBeats();

  return (
    <main className="fixed inset-0 overflow-hidden">
      {/* 3D Canvas - always mounted for preloading */}
      <div className="absolute inset-0" style={{ opacity: entered ? 1 : 0, transition: 'opacity 2s' }}>
        <UniverseCanvas />
      </div>

      {/* UI Layer */}
      {entered && (
        <>
          <Sidebar />
          <SongInfoPanel />
          <MusicPlayer />
          <HUD />
        </>
      )}

      {/* Intro overlay */}
      <AnimatePresence>
        {!entered && <IntroOverlay onEnter={() => setEntered(true)} />}
      </AnimatePresence>
    </main>
  );
}
