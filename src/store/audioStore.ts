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

  // Fixed paths for GitHub Pages compatibility
  const correctSound = new Audio('./assets/audio/sfx/correct.mp3');
  const incorrectSound = new Audio('./assets/audio/sfx/incorrect.mp3');

  // Static list of music tracks for production
  const musicFilePaths = [
    './src/assets/audio/music/track1.mp3',
    './src/assets/audio/music/track2.mp3',
    './src/assets/audio/music/track3.mp3',
    './src/assets/audio/music/track4.mp3',
    './src/assets/audio/music/track5.mp3',
    './src/assets/audio/music/track6.mp3',
    './src/assets/audio/music/track7.mp3',
  ];

  // Preload music tracks
  const loadMusicTracks = async () => {
    try {
      musicTracks = musicFilePaths.map((path) => {
        const audio = new Audio(path);
        audio.loop = true;
        return audio;
      });
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
      }
    },

    playCorrect: () => {
      if (!get().isMuted) {
        correctSound.volume = get().volume;
        correctSound.play().catch((error) =>
          console.error('Failed to play correct sound:', error)
        );
      }
    },

    playIncorrect: () => {
      if (!get().isMuted) {
        incorrectSound.volume = get().volume;
        incorrectSound.play().catch((error) =>
          console.error('Failed to play incorrect sound:', error)
        );
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
        currentAudio
          .play()
          .catch((error) =>
            console.error('Failed to play next track:', error)
          );
      }
    },
  };
});
