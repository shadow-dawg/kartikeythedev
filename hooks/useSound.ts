import { useCallback } from 'react';

export const useSound = () => {
  const playSound = useCallback((type: 'coin' | 'start' | 'click' | 'expand' | 'hover') => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'coin') {
      // Coin sound: B -> E high pitch
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.1); // E6
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.start();
      osc.stop(now + 0.5);
    } else if (type === 'start') {
      // Start sound: Classic melody
      osc.type = 'square';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 1);
      osc.start();
      osc.stop(now + 1);
    } else if (type === 'click') {
      // Short high blip for UI interaction
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc.start();
      osc.stop(now + 0.1);
    } else if (type === 'expand') {
      // Sci-fi open sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(400, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start();
      osc.stop(now + 0.3);
    } else if (type === 'hover') {
      // Very subtle tick
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.03);
      osc.start();
      osc.stop(now + 0.03);
    }
  }, []);

  return { playSound };
};
