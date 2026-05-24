'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUniverseStore } from '@/store/universe';
import { GENRE_COLORS } from '@/lib/musicData';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function MusicPlayer() {
  const { selectedSong, isPlaying, setIsPlaying, currentTime, setCurrentTime, beatIntensity } = useUniverseStore();
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => {
          if (selectedSong && e >= selectedSong.duration) {
            setIsPlaying(false);
            return 0;
          }
          return e + 0.1;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, selectedSong, setIsPlaying]);

  useEffect(() => {
    setElapsed(0);
  }, [selectedSong]);

  if (!selectedSong) return null;

  const progress = selectedSong ? elapsed / selectedSong.duration : 0;
  const genreColor = GENRE_COLORS[selectedSong.genre];

  return (
    <AnimatePresence>
      <motion.div
        key={selectedSong.id}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
        style={{ width: 'min(480px, calc(100vw - 2rem))' }}
      >
        <div
          className="relative overflow-hidden rounded-2xl backdrop-blur-xl border"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,20,0.95) 0%, rgba(10,0,40,0.92) 100%)`,
            borderColor: `${genreColor}40`,
            boxShadow: `0 0 40px ${genreColor}30, 0 20px 60px rgba(0,0,0,0.8)`,
          }}
        >
          {/* Beat pulse glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{ opacity: beatIntensity * 0.4 }}
            style={{ background: `radial-gradient(ellipse at center, ${genreColor}20, transparent 70%)` }}
          />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `${genreColor}20` }}>
            <motion.div
              className="h-full"
              style={{
                width: `${progress * 100}%`,
                background: `linear-gradient(90deg, ${genreColor}, white)`,
                boxShadow: `0 0 8px ${genreColor}`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="p-4 flex items-center gap-4">
            {/* Star icon */}
            <motion.div
              className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{
                background: `radial-gradient(circle, ${genreColor}40, ${genreColor}10)`,
                border: `1px solid ${genreColor}60`,
                boxShadow: `0 0 20px ${genreColor}40`,
              }}
              animate={{ scale: 1 + beatIntensity * 0.15 }}
              transition={{ duration: 0.05 }}
            >
              ✦
            </motion.div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold text-sm truncate" style={{ fontFamily: 'var(--font-display)' }}>
                {selectedSong.title}
              </div>
              <div className="text-xs truncate mt-0.5" style={{ color: genreColor }}>
                {selectedSong.artist}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: `${genreColor}20`, color: genreColor, fontSize: '10px' }}>
                  {selectedSong.genre.toUpperCase()}
                </span>
                <span className="text-gray-500 text-xs">{selectedSong.bpm} BPM</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Time */}
              <span className="text-gray-500 text-xs">{formatTime(elapsed)} / {formatTime(selectedSong.duration)}</span>

              {/* Play/Pause */}
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: genreColor,
                  color: '#000',
                  boxShadow: `0 0 20px ${genreColor}60`,
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? '⏸' : '▶'}
              </motion.button>
            </div>
          </div>

          {/* Beat visualizer bars */}
          <div className="px-4 pb-3 flex items-end gap-0.5 h-6">
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: genreColor, minHeight: 2 }}
                animate={{
                  height: isPlaying
                    ? `${Math.max(2, Math.sin(i * 0.5 + Date.now() * 0.003) * beatIntensity * 20 + 4)}px`
                    : '2px'
                }}
                transition={{ duration: 0.05 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
