'use client';
import { useEffect, useRef, useCallback } from 'react';
import { useUniverseStore } from '@/store/universe';

export function useAudioAnalyzer() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);
  const lastBeatRef = useRef(0);
  
  const { setAudioAnalyzer, setFrequencyData, setBeatIntensity, setParticleBurst } = useUniverseStore();

  const connectAudio = useCallback((audioElement: HTMLAudioElement) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }

    const analyzer = ctx.createAnalyser();
    analyzer.fftSize = 512;
    analyzer.smoothingTimeConstant = 0.8;
    analyzerRef.current = analyzer;
    setAudioAnalyzer(analyzer);

    const source = ctx.createMediaElementSource(audioElement);
    sourceRef.current = source;
    source.connect(analyzer);
    analyzer.connect(ctx.destination);

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);

    const tick = () => {
      analyzer.getByteFrequencyData(dataArray);
      setFrequencyData(new Uint8Array(dataArray));

      // Beat detection: look at bass frequencies (0-10 bins)
      const bassEnergy = dataArray.slice(0, 10).reduce((a, b) => a + b, 0) / 10;
      const intensity = bassEnergy / 255;
      setBeatIntensity(intensity);

      // Trigger particle burst on strong beats
      const now = Date.now();
      if (intensity > 0.7 && now - lastBeatRef.current > 300) {
        lastBeatRef.current = now;
        setParticleBurst(true);
        setTimeout(() => setParticleBurst(false), 100);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, [setAudioAnalyzer, setFrequencyData, setBeatIntensity, setParticleBurst]);

  const resumeContext = useCallback(() => {
    audioCtxRef.current?.resume();
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  return { connectAudio, resumeContext };
}

// Simulated beat for demo mode (no real audio)
export function useSimulatedBeats() {
  const { setBeatIntensity, setParticleBurst, isPlaying } = useUniverseStore();
  const rafRef = useRef<number>(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (!isPlaying) {
      setBeatIntensity(0);
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = () => {
      const t = (Date.now() - startRef.current) / 1000;
      // Simulate 128 BPM beat pattern
      const bpm = 128;
      const beatPhase = (t * bpm / 60) % 1;
      const intensity = Math.pow(Math.max(0, 1 - beatPhase * 3), 2) * 0.9;
      setBeatIntensity(intensity);

      if (beatPhase < 0.05 && intensity > 0.5) {
        setParticleBurst(true);
        setTimeout(() => setParticleBurst(false), 80);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, setBeatIntensity, setParticleBurst]);
}
