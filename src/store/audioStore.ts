import { create } from 'zustand';
import { AudioState } from '../types';

interface AudioStore extends AudioState {
  playCorrect: () => void;
  playIncorrect: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  initializeAudio: () => void;
}

export const useAudioStore = create<AudioStore>((set, get) => {
  let musicTracks: HTMLAudioElement[] = [];
  let currentAudio: HTMLAudioElement | null = null;
  const correctSound = new Audio('./assets/audio/sfx/correct.mp3');
  const incorrectSound = new Audio('./assets/audio/sfx/incorrect.mp3');

  const loadMusicTracks = async () => {
    try {
      // This will be populated when music files are added to the assets folder
      const musicFiles = import.meta.glob('./assets/audio/music/*.mp3');
      
      for (const path in musicFiles) {
        const audio = new Audio(path);
        audio.loop = true;
        musicTracks.push(audio);
      }
    } catch (error) {
      console.error('Failed to load music tracks:', error);
    }
  };

  return {
    isMuted: false,
    volume: 0.5,
    currentTrack: 0,
    
    initializeAudio: async () => {
      await loadMusicTracks();
      if (musicTracks.length > 0) {
        currentAudio = musicTracks[0];
        currentAudio.volume = get().volume;
        currentAudio.play().catch(console.error);
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
        currentAudio.volume = newMuted ? 0 : get().volume;
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
      if (currentAudio && !get().isMuted) {
        currentAudio.volume = get().volume;
        currentAudio.play().catch(console.error);
      }
    },
  };
});
