'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUniverseStore } from '@/store/universe';
import { SONGS } from '@/lib/musicData';

export function HUD() {
  const { selectedSong, hoveredSong, isPlaying, beatIntensity, selectSong, setIsPlaying } = useUniverseStore();
  const [coords, setCoords] = useState({ x: 0, y: 0, z: 0 });

  // Simulate drifting coordinates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 200,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top center title */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <motion.h1
          className="text-sm uppercase tracking-[0.4em] font-light"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255,255,255,0.3)',
            textShadow: '0 0 20px rgba(99,102,241,0.5)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ✦ Music Universe ✦
        </motion.h1>
      </div>

      {/* Bottom left coordinates */}
      <div
        className="fixed bottom-6 left-6 z-20 pointer-events-none"
        style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}
      >
        <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
          <div>X {coords.x.toFixed(1)}</div>
          <div>Y {coords.y.toFixed(1)}</div>
          <div>Z {coords.z.toFixed(1)}</div>
          <div className="mt-1 text-indigo-400/40">{SONGS.length} STARS</div>
        </motion.div>
      </div>

      {/* Beat intensity ring (bottom center, behind player) */}
      {isPlaying && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <motion.div
            className="w-64 h-64 rounded-full border"
            animate={{
              scale: 1 + beatIntensity * 0.3,
              opacity: beatIntensity * 0.15,
              borderColor: `rgba(99, 102, 241, ${beatIntensity})`,
            }}
            transition={{ duration: 0.05 }}
            style={{ marginBottom: '-8rem' }}
          />
        </div>
      )}

      {/* Controls hint - bottom right */}
      {!selectedSong && (
        <motion.div
          className="fixed bottom-6 right-6 z-20 pointer-events-none text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}
        >
          <div>SCROLL TO ZOOM</div>
          <div>DRAG TO ROTATE</div>
          <div>CLICK STAR TO SELECT</div>
        </motion.div>
      )}

      {/* Hovered song tooltip */}
      {hoveredSong && !selectedSong && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: 'rgba(0,0,20,0.9)',
            border: `1px solid ${hoveredSong.color}40`,
            color: hoveredSong.color,
            marginTop: '-80px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {hoveredSong.title} — {hoveredSong.artist}
        </motion.div>
      )}
    </>
  );
}
