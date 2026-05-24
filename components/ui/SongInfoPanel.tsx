'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useUniverseStore } from '@/store/universe';
import { GENRE_COLORS } from '@/lib/musicData';

function EnergyBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-500">{label}</span>
        <span style={{ color }}>{Math.round(value * 100)}%</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 6px ${color}` }}
        />
      </div>
    </div>
  );
}

export function SongInfoPanel() {
  const { selectedSong, isPlaying, setIsPlaying, beatIntensity } = useUniverseStore();

  if (!selectedSong) return null;

  const color = GENRE_COLORS[selectedSong.genre];
  const minutes = Math.floor(selectedSong.duration / 60);
  const seconds = selectedSong.duration % 60;

  return (
    <AnimatePresence>
      <motion.div
        key={selectedSong.id}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 22 }}
        className="fixed top-6 right-6 z-30 w-64"
      >
        <div
          className="relative overflow-hidden rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,20,0.97) 0%, rgba(10,0,40,0.95) 100%)',
            border: `1px solid ${color}30`,
            boxShadow: `0 0 30px ${color}20, 0 20px 60px rgba(0,0,0,0.7)`,
          }}
        >
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: 0.3 + beatIntensity * 0.4 }}
            style={{ background: `radial-gradient(ellipse at top right, ${color}15, transparent 60%)` }}
          />

          {/* Star visualization */}
          <div className="flex justify-center mb-4">
            <motion.div
              className="relative"
              animate={{ scale: 1 + beatIntensity * 0.15 }}
              transition={{ duration: 0.05 }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                style={{
                  background: `radial-gradient(circle, ${color}40, ${color}10)`,
                  border: `2px solid ${color}60`,
                  boxShadow: `0 0 30px ${color}60, 0 0 60px ${color}30`,
                }}
              >
                ✦
              </div>
              {isPlaying && (
                <>
                  {[1, 2, 3].map(ring => (
                    <motion.div
                      key={ring}
                      className="absolute inset-0 rounded-full border"
                      style={{ borderColor: `${color}30` }}
                      animate={{ scale: 1 + ring * 0.4 + beatIntensity * 0.3, opacity: 0.5 / ring }}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          </div>

          {/* Song title */}
          <h2 className="text-white font-bold text-center text-lg leading-tight mb-1"
            style={{ fontFamily: 'var(--font-display)' }}>
            {selectedSong.title}
          </h2>
          <p className="text-center text-sm mb-4" style={{ color }}>{selectedSong.artist}</p>

          {/* Tags */}
          <div className="flex justify-center gap-2 mb-5">
            <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: `${color}20`, color }}>
              {selectedSong.genre.toUpperCase()}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-400">
              {selectedSong.bpm} BPM
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-400">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-5">
            <EnergyBar value={selectedSong.energy} label="Energy" color={color} />
            <EnergyBar value={selectedSong.bpm / 200} label="Tempo" color={color} />
            <EnergyBar value={selectedSong.size / 1.5} label="Magnitude" color={color} />
          </div>

          {/* Play button */}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-black transition-all"
            style={{
              background: isPlaying
                ? `linear-gradient(135deg, ${color}, ${color}cc)`
                : `linear-gradient(135deg, ${color}90, ${color}60)`,
              boxShadow: isPlaying ? `0 0 20px ${color}50` : 'none',
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play Star'}
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
