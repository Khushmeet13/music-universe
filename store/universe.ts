import { create } from 'zustand';

export type Genre = 'electronic' | 'jazz' | 'classical' | 'rock' | 'ambient' | 'hiphop';

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: Genre;
  duration: number; // seconds
  bpm: number;
  energy: number; // 0-1
  position: [number, number, number];
  color: string;
  size: number;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songIds: string[];
  color: string;
  constellationPoints: [number, number, number][];
}

export interface Galaxy {
  genre: Genre;
  center: [number, number, number];
  color: string;
  label: string;
  songIds: string[];
}

interface UniverseStore {
  songs: Song[];
  playlists: Playlist[];
  galaxies: Galaxy[];
  selectedSong: Song | null;
  selectedPlaylist: Playlist | null;
  hoveredSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  audioAnalyzer: AnalyserNode | null;
  frequencyData: Uint8Array | null;
  beatIntensity: number;
  particleBurst: boolean;
  cameraTarget: [number, number, number];
  viewMode: 'universe' | 'galaxy' | 'song';
  
  setSongs: (songs: Song[]) => void;
  selectSong: (song: Song | null) => void;
  selectPlaylist: (playlist: Playlist | null) => void;
  setHoveredSong: (song: Song | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setAudioAnalyzer: (analyzer: AnalyserNode | null) => void;
  setFrequencyData: (data: Uint8Array | null) => void;
  setBeatIntensity: (intensity: number) => void;
  setParticleBurst: (burst: boolean) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setViewMode: (mode: 'universe' | 'galaxy' | 'song') => void;
}

export const useUniverseStore = create<UniverseStore>((set) => ({
  songs: [],
  playlists: [],
  galaxies: [],
  selectedSong: null,
  selectedPlaylist: null,
  hoveredSong: null,
  isPlaying: false,
  currentTime: 0,
  audioAnalyzer: null,
  frequencyData: null,
  beatIntensity: 0,
  particleBurst: false,
  cameraTarget: [0, 0, 0],
  viewMode: 'universe',

  setSongs: (songs) => set({ songs }),
  selectSong: (song) => set({ selectedSong: song }),
  selectPlaylist: (playlist) => set({ selectedPlaylist: playlist }),
  setHoveredSong: (song) => set({ hoveredSong: song }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setAudioAnalyzer: (analyzer) => set({ audioAnalyzer: analyzer }),
  setFrequencyData: (data) => set({ frequencyData: data }),
  setBeatIntensity: (intensity) => set({ beatIntensity: intensity }),
  setParticleBurst: (burst) => set({ particleBurst: burst }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
