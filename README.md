# 🌌 Music Universe

> *Songs are stars. Genres are galaxies. Playlists are constellations. Beats create particles.*

An immersive 3D music visualization platform built with Next.js and Three.js, where your entire music library becomes a navigable universe.

---

## ✨ Concept

| Music Entity | Universe Metaphor | Visual Representation |
|---|---|---|
| **Song** | ⭐ Star | Glowing sphere with corona glow, pulsing to BPM |
| **Genre** | 🌌 Galaxy | Spiral particle cloud with colored nebula core |
| **Playlist** | ✦ Constellation | Lines connecting stars, labeled in the void |
| **Beat** | 💥 Particle Burst | Explosive particle system triggered on beat |
| **Energy** | ☀️ Star Brightness | Emissive intensity, size, and glow radius |
| **BPM** | 🌀 Pulse Rate | Star breathing animation speed |

---

## 🚀 Tech Stack

### Core
- **Next.js 14** — App Router, SSR-safe dynamic imports for Three.js
- **Three.js** — 3D rendering engine
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Helpers: OrbitControls, Text, Billboard, Stars
- **@react-three/postprocessing** — Bloom, Vignette, Chromatic Aberration

### State & Data
- **Zustand** — Global music/universe state (selected song, beat intensity, playing state)
- **TypeScript** — Full type safety across all music data structures

### Animation & UI
- **Framer Motion** — Smooth panel animations, intro sequence, UI transitions
- **Tailwind CSS** — Utility styling for UI overlays
- **Web Audio API** — Real-time frequency analysis + beat detection

### Audio
- **Howler.js** — Cross-browser audio engine (plug in your audio files)
- **Web Audio API** — AnalyserNode for FFT frequency data

---

## 📁 Project Structure

```
music-universe/
├── app/
│   ├── globals.css          # Fonts (Rajdhani, Space Mono, Crimson Pro), noise texture
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page: intro overlay + universe canvas
│
├── components/
│   ├── three/
│   │   ├── UniverseCanvas.tsx    # R3F Canvas + postprocessing effects
│   │   ├── UniverseScene.tsx     # Main scene: stars, galaxies, constellations
│   │   ├── Star.tsx              # Song as pulsing, glowing star
│   │   ├── Galaxy.tsx            # Genre as spiral particle galaxy
│   │   ├── BeatParticles.tsx     # Beat-triggered particle burst system
│   │   ├── Constellation.tsx     # Playlist as connected star lines
│   │   └── NebulaBackground.tsx  # Deep-space starfield + nebula clouds
│   │
│   └── ui/
│       ├── Sidebar.tsx           # Left panel: constellations + star list
│       ├── MusicPlayer.tsx       # Bottom player HUD with visualizer bars
│       ├── SongInfoPanel.tsx     # Right panel: selected star details + stats
│       └── HUD.tsx               # Coordinates, hints, beat ring
│
├── hooks/
│   └── useAudioAnalyzer.ts   # Web Audio API hook + simulated beat engine
│
├── lib/
│   └── musicData.ts          # Song/playlist/galaxy data + genre colors
│
└── store/
    └── universe.ts           # Zustand store for all universe state
```

---

## 🎮 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🎵 Adding Real Audio

1. Add audio files to `/public/audio/`
2. Update songs in `lib/musicData.ts`:
   ```ts
   { id: 'e1', title: 'Neon Pulse', ..., audioUrl: '/audio/neon-pulse.mp3' }
   ```
3. In `app/page.tsx`, connect the `useAudioAnalyzer` hook:
   ```ts
   const { connectAudio } = useAudioAnalyzer();
   // Call connectAudio(audioElement) when play is triggered
   ```

---

## 🌌 3D Controls

| Action | Control |
|---|---|
| **Rotate** | Click + Drag |
| **Zoom** | Scroll wheel |
| **Pan** | Right-click + Drag |
| **Select star** | Click on any star |
| **View constellation** | Click playlist in sidebar |
| **Camera fly-to** | Auto when song selected |

---

## 🎨 Visual Architecture

### Beat Reactivity
The beat engine (simulated in demo mode, real with audio files) drives:
- **Star pulse** — All stars briefly scale up on beat
- **Particle burst** — 40–100 particles explode from the selected star
- **Player glow** — Bottom player glows brighter on each beat
- **Constellation opacity** — Active constellation lines pulse with the music

### Post-Processing Stack
```
Scene → Bloom (star glow) → Vignette (cosmic darkness) → Chromatic Aberration (sci-fi effect)
```

### Galaxy Generation
Each genre galaxy uses **spiral arm mathematics**:
```
angle = armOffset + radius × spiralTightness + scatter
position = center + [cos(angle) × r, y_scatter, sin(angle) × r]
```

---

## 🔭 Extending the Universe

### Add a new Genre/Galaxy
```ts
// lib/musicData.ts
GENRE_COLORS['metal'] = '#C0C0C0';
GENRE_GALAXY_CENTERS['metal'] = [-10, 25, 20];
```

### Add Songs
```ts
SONGS.push({
  id: 'm1', title: 'Iron Sky', artist: 'Steel Prophet',
  genre: 'metal', duration: 245, bpm: 160, energy: 0.98,
  position: generateStarPosition([-10, 25, 20], 8),
  color: '#C0C0C0', size: 1.1
});
```

### Add Playlists (Constellations)
```ts
PLAYLISTS.push({
  id: 'p5', name: 'Headbanger',
  songIds: ['m1', 'r1', 'r4'],
  color: '#FF0000',
  constellationPoints: [],
});
```

---

## 🛸 Future Features

- [ ] Real audio upload + Web Audio API FFT visualization
- [ ] Warp speed travel between galaxies (camera animation)
- [ ] Spotify API integration — real music library as your universe
- [ ] Multiplayer: see other users as moving comets
- [ ] VR/AR mode with WebXR
- [ ] AI constellation generator from listening history
- [ ] Time-based universe (older songs = further stars)
- [ ] Social sharing: export constellation as image
