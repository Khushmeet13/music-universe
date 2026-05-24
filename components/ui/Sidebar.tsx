'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUniverseStore } from '@/store/universe';
import { PLAYLISTS, SONGS, GENRE_COLORS } from '@/lib/musicData';

export function Sidebar() {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<'playlists' | 'songs'>('playlists');
  const { selectedSong, selectedPlaylist, selectSong, selectPlaylist, setIsPlaying } = useUniverseStore();

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed top-6 left-6 z-40 w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/10 hover:border-white/30 transition-all"
        style={{ background: 'rgba(0,0,20,0.8)' }}
      >
        {open ? '✕' : '☰'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full z-30 flex flex-col"
            style={{
              width: 280,
              background: 'linear-gradient(180deg, rgba(0,0,15,0.97) 0%, rgba(5,0,25,0.95) 100%)',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="pt-16 pb-4 px-5">
              <div className="text-xs tracking-widest text-indigo-400 mb-1 uppercase">Music Universe</div>
              <h1
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 30px rgba(99,102,241,0.5)' }}
              >
                Galaxy Map
              </h1>
            </div>

            {/* Tabs */}
            <div className="flex mx-4 mb-4 rounded-lg overflow-hidden border border-white/10">
              {(['playlists', 'songs'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 py-2 text-xs uppercase tracking-wider transition-all"
                  style={{
                    background: tab === t ? 'rgba(99,102,241,0.25)' : 'transparent',
                    color: tab === t ? '#a5b4fc' : '#6b7280',
                  }}
                >
                  {t === 'playlists' ? '✦ Constellations' : '★ Stars'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2" style={{ scrollbarWidth: 'none' }}>
              {tab === 'playlists' && PLAYLISTS.map(pl => {
                const isActive = selectedPlaylist?.id === pl.id;
                return (
                  <motion.button
                    key={pl.id}
                    onClick={() => selectPlaylist(isActive ? null : pl)}
                    whileHover={{ x: 4 }}
                    className="w-full text-left p-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? `${pl.color}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive ? pl.color + '40' : 'transparent'}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm" style={{ color: pl.color }}>✦</span>
                      <span className="text-white text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                        {pl.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{pl.songIds.length} stars</span>
                      <div className="flex gap-0.5">
                        {pl.songIds.slice(0, 5).map(id => {
                          const s = SONGS.find(s => s.id === id);
                          return s ? (
                            <div key={id} className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                          ) : null;
                        })}
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {tab === 'songs' && SONGS.map(song => {
                const isActive = selectedSong?.id === song.id;
                const color = GENRE_COLORS[song.genre];
                return (
                  <motion.button
                    key={song.id}
                    onClick={() => {
                      selectSong(isActive ? null : song);
                      if (!isActive) setIsPlaying(true);
                    }}
                    whileHover={{ x: 4 }}
                    className="w-full text-left p-3 rounded-xl transition-all"
                    style={{
                      background: isActive ? `${color}18` : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive ? color + '40' : 'transparent'}`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color }}>★</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-medium truncate">{song.title}</div>
                        <div className="text-gray-500 text-xs truncate">{song.artist}</div>
                      </div>
                      <span className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: `${color}20`, color }}>
                        {song.bpm}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-white/5">
              <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">Genres</div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(GENRE_COLORS).map(([genre, color]) => (
                  <div key={genre} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
                    <span className="text-xs text-gray-500 capitalize">{genre}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
