import { Song, Playlist, Galaxy } from '@/store/universe';

export const GENRE_COLORS: Record<string, string> = {
  electronic: '#00F5FF',
  jazz: '#FFB347',
  classical: '#DDA0DD',
  rock: '#FF4500',
  ambient: '#7DF9FF',
  hiphop: '#FF69B4',
};

export const GENRE_GALAXY_CENTERS: Record<string, [number, number, number]> = {
  electronic: [30, 5, -20],
  jazz: [-25, -10, 15],
  classical: [10, 20, -35],
  rock: [-15, -5, -30],
  ambient: [35, -15, 10],
  hiphop: [-30, 15, -10],
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateStarPosition(center: [number, number, number], spread: number): [number, number, number] {
  return [
    center[0] + randomInRange(-spread, spread),
    center[1] + randomInRange(-spread * 0.4, spread * 0.4),
    center[2] + randomInRange(-spread, spread),
  ];
}

export const SONGS: Song[] = [
  // Electronic Galaxy
  { id: 'e1', title: 'Neon Pulse', artist: 'Synthwave X', genre: 'electronic', duration: 240, bpm: 128, energy: 0.9, position: generateStarPosition([30, 5, -20], 8), color: '#00F5FF', size: 0.8 },
  { id: 'e2', title: 'Digital Dreams', artist: 'Circuit Breaker', genre: 'electronic', duration: 195, bpm: 140, energy: 0.85, position: generateStarPosition([30, 5, -20], 8), color: '#00BFFF', size: 0.7 },
  { id: 'e3', title: 'Quantum Drift', artist: 'Electron Flow', genre: 'electronic', duration: 310, bpm: 120, energy: 0.75, position: generateStarPosition([30, 5, -20], 8), color: '#1E90FF', size: 0.9 },
  { id: 'e4', title: 'Cyber Rain', artist: 'Neon Ghost', genre: 'electronic', duration: 225, bpm: 135, energy: 0.95, position: generateStarPosition([30, 5, -20], 8), color: '#00FFFF', size: 1.1 },
  { id: 'e5', title: 'Void Signal', artist: 'Synthwave X', genre: 'electronic', duration: 180, bpm: 150, energy: 0.8, position: generateStarPosition([30, 5, -20], 8), color: '#40E0D0', size: 0.6 },
  { id: 'e6', title: 'Photon Drive', artist: 'Laser Pulse', genre: 'electronic', duration: 270, bpm: 145, energy: 0.88, position: generateStarPosition([30, 5, -20], 8), color: '#00CED1', size: 0.75 },

  // Jazz Galaxy
  { id: 'j1', title: 'Midnight Smoke', artist: 'Blue Note Trio', genre: 'jazz', duration: 380, bpm: 72, energy: 0.5, position: generateStarPosition([-25, -10, 15], 8), color: '#FFB347', size: 0.85 },
  { id: 'j2', title: 'Velvet Horizon', artist: 'Miles Ahead', genre: 'jazz', duration: 420, bpm: 88, energy: 0.45, position: generateStarPosition([-25, -10, 15], 8), color: '#FFA500', size: 0.7 },
  { id: 'j3', title: 'Bourbon Street', artist: 'The Quartet', genre: 'jazz', duration: 290, bpm: 95, energy: 0.65, position: generateStarPosition([-25, -10, 15], 8), color: '#FF8C00', size: 0.95 },
  { id: 'j4', title: 'Cool Breeze', artist: 'Autumn Leaves', genre: 'jazz', duration: 340, bpm: 76, energy: 0.4, position: generateStarPosition([-25, -10, 15], 8), color: '#FFAD60', size: 0.8 },
  { id: 'j5', title: 'Satin Road', artist: 'Blue Note Trio', genre: 'jazz', duration: 310, bpm: 84, energy: 0.55, position: generateStarPosition([-25, -10, 15], 8), color: '#FFC87C', size: 0.65 },

  // Classical Galaxy
  { id: 'c1', title: 'Moonlight Opus', artist: 'Vienna Strings', genre: 'classical', duration: 840, bpm: 60, energy: 0.35, position: generateStarPosition([10, 20, -35], 8), color: '#DDA0DD', size: 1.2 },
  { id: 'c2', title: 'Storm Symphony', artist: 'Grand Orchestra', genre: 'classical', duration: 1200, bpm: 80, energy: 0.7, position: generateStarPosition([10, 20, -35], 8), color: '#DA70D6', size: 1.4 },
  { id: 'c3', title: 'Nocturne No.9', artist: 'Piano Solo', genre: 'classical', duration: 480, bpm: 55, energy: 0.3, position: generateStarPosition([10, 20, -35], 8), color: '#EE82EE', size: 0.9 },
  { id: 'c4', title: 'Requiem in D', artist: 'Chamber Choir', genre: 'classical', duration: 960, bpm: 65, energy: 0.6, position: generateStarPosition([10, 20, -35], 8), color: '#BF8FBF', size: 1.1 },
  { id: 'c5', title: 'Spring Concerto', artist: 'Vienna Strings', genre: 'classical', duration: 720, bpm: 90, energy: 0.5, position: generateStarPosition([10, 20, -35], 8), color: '#C8A0C8', size: 1.0 },

  // Rock Galaxy
  { id: 'r1', title: 'Thunder Road', artist: 'Iron Fist', genre: 'rock', duration: 210, bpm: 110, energy: 0.95, position: generateStarPosition([-15, -5, -30], 8), color: '#FF4500', size: 1.0 },
  { id: 'r2', title: 'Burning Skies', artist: 'The Voltage', genre: 'rock', duration: 185, bpm: 125, energy: 0.9, position: generateStarPosition([-15, -5, -30], 8), color: '#FF6347', size: 0.85 },
  { id: 'r3', title: 'Stone Wall', artist: 'Granite', genre: 'rock', duration: 240, bpm: 100, energy: 0.8, position: generateStarPosition([-15, -5, -30], 8), color: '#FF3200', size: 0.9 },
  { id: 'r4', title: 'Electric Fury', artist: 'Iron Fist', genre: 'rock', duration: 195, bpm: 132, energy: 0.98, position: generateStarPosition([-15, -5, -30], 8), color: '#FF5733', size: 1.15 },
  { id: 'r5', title: 'Broken Glass', artist: 'Shatter', genre: 'rock', duration: 175, bpm: 118, energy: 0.85, position: generateStarPosition([-15, -5, -30], 8), color: '#E84040', size: 0.75 },

  // Ambient Galaxy
  { id: 'a1', title: 'Starfield', artist: 'Ether', genre: 'ambient', duration: 600, bpm: 40, energy: 0.2, position: generateStarPosition([35, -15, 10], 8), color: '#7DF9FF', size: 0.6 },
  { id: 'a2', title: 'Deep Space', artist: 'Cosmos', genre: 'ambient', duration: 780, bpm: 35, energy: 0.15, position: generateStarPosition([35, -15, 10], 8), color: '#ADFFE4', size: 0.7 },
  { id: 'a3', title: 'Neural Drift', artist: 'Ether', genre: 'ambient', duration: 540, bpm: 50, energy: 0.25, position: generateStarPosition([35, -15, 10], 8), color: '#87FFEF', size: 0.5 },
  { id: 'a4', title: 'Fog of Time', artist: 'Misty Fields', genre: 'ambient', duration: 900, bpm: 30, energy: 0.1, position: generateStarPosition([35, -15, 10], 8), color: '#B0FFF8', size: 0.65 },
  { id: 'a5', title: 'Horizon Lines', artist: 'Cosmos', genre: 'ambient', duration: 660, bpm: 45, energy: 0.18, position: generateStarPosition([35, -15, 10], 8), color: '#64FFDA', size: 0.55 },

  // Hip-Hop Galaxy
  { id: 'h1', title: 'City Cipher', artist: 'Verbal Ink', genre: 'hiphop', duration: 195, bpm: 88, energy: 0.8, position: generateStarPosition([-30, 15, -10], 8), color: '#FF69B4', size: 0.9 },
  { id: 'h2', title: 'Concrete Jungle', artist: 'Street Sage', genre: 'hiphop', duration: 215, bpm: 92, energy: 0.85, position: generateStarPosition([-30, 15, -10], 8), color: '#FF1493', size: 0.8 },
  { id: 'h3', title: 'Flow State', artist: 'Verbal Ink', genre: 'hiphop', duration: 180, bpm: 85, energy: 0.75, position: generateStarPosition([-30, 15, -10], 8), color: '#FF82B2', size: 0.7 },
  { id: 'h4', title: 'Neon Alley', artist: 'Midnight Cipher', genre: 'hiphop', duration: 225, bpm: 96, energy: 0.9, position: generateStarPosition([-30, 15, -10], 8), color: '#FF3399', size: 1.0 },
  { id: 'h5', title: 'Underground King', artist: 'Street Sage', genre: 'hiphop', duration: 200, bpm: 90, energy: 0.82, position: generateStarPosition([-30, 15, -10], 8), color: '#FF6EB4', size: 0.85 },
];

export const GALAXIES: Galaxy[] = Object.entries(GENRE_GALAXY_CENTERS).map(([genre, center]) => ({
  genre: genre as Song['genre'],
  center: center as [number, number, number],
  color: GENRE_COLORS[genre],
  label: genre.charAt(0).toUpperCase() + genre.slice(1),
  songIds: SONGS.filter(s => s.genre === genre).map(s => s.id),
}));

export const PLAYLISTS: Playlist[] = [
  {
    id: 'p1',
    name: 'Cosmic Energy',
    songIds: ['e1', 'r1', 'h4', 'e4', 'r4'],
    color: '#FF00FF',
    constellationPoints: [],
  },
  {
    id: 'p2',
    name: 'Deep Space Lounge',
    songIds: ['a1', 'j1', 'a2', 'j2', 'a3', 'c1'],
    color: '#00BFFF',
    constellationPoints: [],
  },
  {
    id: 'p3',
    name: 'Sonic Storm',
    songIds: ['r1', 'r4', 'h1', 'e4', 'r2'],
    color: '#FF6600',
    constellationPoints: [],
  },
  {
    id: 'p4',
    name: 'Ethereal Journey',
    songIds: ['c2', 'a1', 'c1', 'a4', 'j1', 'c3'],
    color: '#9966FF',
    constellationPoints: [],
  },
];

// Build constellation points from song positions
PLAYLISTS.forEach(playlist => {
  playlist.constellationPoints = playlist.songIds.map(id => {
    const song = SONGS.find(s => s.id === id);
    return song ? song.position : [0, 0, 0];
  }) as [number, number, number][];
});
