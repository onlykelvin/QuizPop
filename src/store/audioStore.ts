import { create } from 'zustand';
import { AudioState } from '../types';

interface AudioStore extends AudioState {
  playCorrect: () => void;
  playIncorrect: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  initializeAudio: () => void;
  startBackgroundMusic: () => void;
  isPlaying: boolean;
}

export const useAudioStore = create<AudioStore>((set, get) => {
  const musicTracks = [
    '/QuizPop/music/track1.mp3',
    '/QuizPop/music/track2.mp3',
    '/QuizPop/music/track3.mp3',
    '/QuizPop/music/track4.mp3',
    '/QuizPop/music/track5.mp3',
    '/QuizPop/music/track6.mp3',
    '/QuizPop/music/track7.mp3',
  ].map(path => {
    const audio = new Audio(path);
    audio.loop = true;
    return audio;
  });

  let currentAudio: HTMLAudioElement | null = null;
  const correctSound = new Audio('/QuizPop/sfx/correct.mp3');
  const incorrectSound = new Audio('/QuizPop/sfx/incorrect.mp3');

  return {
    isMuted: false,
    volume: 0.5,
    currentTrack: 0,
    isPlaying: false,
    
    initializeAudio: () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio = musicTracks[0];
      currentAudio.volume = get().volume;
    },

    startBackgroundMusic: () => {
      if (!get().isPlaying && !get().isMuted) {
        if (currentAudio) {
          currentAudio.play().catch(console.error);
          set({ isPlaying: true });
        }
      }
    },

    playCorrect: () => {
      if (!get().isMuted) {
        correctSound.volume = get().volume;
        correctSound.play().catch(console.error);
      }
    },

    playIncorrect: () => {
      if (!get().isMuted) {
        incorrectSound.volume = get().volume;
        incorrectSound.play().catch(console.error);
      }
    },

    toggleMute: () => {
      const newMuted = !get().isMuted;
      set({ isMuted: newMuted });
      
      if (currentAudio) {
        if (newMuted) {
          currentAudio.pause();
        } else if (get().isPlaying) {
          currentAudio.play().catch(console.error);
        }
      }
    },

    setVolume: (volume) => {
      set({ volume });
      if (currentAudio && !get().isMuted) {
        currentAudio.volume = volume;
      }
    },

    nextTrack: () => {
      if (musicTracks.length === 0) return;
      
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const nextTrackIndex = (get().currentTrack + 1) % musicTracks.length;
      set({ currentTrack: nextTrackIndex });
      
      currentAudio = musicTracks[nextTrackIndex];
      if (currentAudio && !get().isMuted && get().isPlaying) {
        currentAudio.volume = get().volume;
        currentAudio.play().catch(console.error);
      }
    },
  };
});
