import { create } from 'zustand';
import { AudioState } from '../types';
import { saveLastPlayedTrack, getLastPlayedTrack } from '../utils/storageUtils';

interface AudioStore extends AudioState {
  playCorrect: () => void;
  playIncorrect: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  initializeAudio: () => void;
  startBackgroundMusic: () => void;
  togglePlay: () => void;
  selectTrack: (index: number) => void;
  shuffleTracks: () => void;
  isPlaying: boolean;
  isShuffled: boolean;
}

export const useAudioStore = create<AudioStore>((set, get) => {
  const musicTracks = [
    '/QuizPop/assets/audio/music/track1.mp3',
    '/QuizPop/assets/audio/music/track2.mp3',
    '/QuizPop/assets/audio/music/track3.mp3',
    '/QuizPop/assets/audio/music/track4.mp3',
    '/QuizPop/assets/audio/music/track5.mp3',
    '/QuizPop/assets/audio/music/track6.mp3',
    '/QuizPop/assets/audio/music/track7.mp3',
  ].map((path) => {
    const audio = new Audio(path);
    return audio;
  });

  let currentAudio: HTMLAudioElement | null = null;
  const correctSound = new Audio('/QuizPop/assets/audio/sfx/correct.mp3');
  const incorrectSound = new Audio('/QuizPop/assets/audio/sfx/incorrect.mp3');
  let shuffledIndices: number[] = [];

  const getNextShuffledIndex = () => {
    if (shuffledIndices.length === 0) {
      shuffledIndices = Array.from({ length: musicTracks.length }, (_, i) => i)
        .sort(() => Math.random() - 0.5);
    }
    return shuffledIndices.shift()!;
  };

  const setupAudioEndedHandler = (audio: HTMLAudioElement) => {
    audio.onended = () => {
      const store = get();
      if (store.isShuffled) {
        store.nextTrack();
      } else {
        // For non-shuffle mode, loop the current track
        audio.currentTime = 0;
        if (!store.isMuted && store.isPlaying) {
          audio.play().catch(console.error);
        }
      }
    };
  };

  return {
    isMuted: false,
    volume: 0.5,
    currentTrack: getLastPlayedTrack(),
    isPlaying: false,
    isShuffled: false,

    initializeAudio: () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      const lastTrack = getLastPlayedTrack();
      currentAudio = musicTracks[lastTrack];
      currentAudio.volume = get().volume;
      setupAudioEndedHandler(currentAudio);
    },

    startBackgroundMusic: () => {
      if (!get().isPlaying && !get().isMuted && currentAudio) {
        currentAudio.play().catch(console.error);
        set({ isPlaying: true });
      }
    },

    togglePlay: () => {
      if (currentAudio) {
        if (get().isPlaying) {
          currentAudio.pause();
        } else if (!get().isMuted) {
          currentAudio.play().catch(console.error);
        }
        set({ isPlaying: !get().isPlaying });
      }
    },

    selectTrack: (index: number) => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      currentAudio = musicTracks[index];
      setupAudioEndedHandler(currentAudio);
      saveLastPlayedTrack(index);
      set({ currentTrack: index });

      if (currentAudio && !get().isMuted && get().isPlaying) {
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

      let nextTrackIndex: number;
      if (get().isShuffled) {
        nextTrackIndex = getNextShuffledIndex();
      } else {
        nextTrackIndex = (get().currentTrack + 1) % musicTracks.length;
      }

      saveLastPlayedTrack(nextTrackIndex);
      set({ currentTrack: nextTrackIndex });

      currentAudio = musicTracks[nextTrackIndex];
      setupAudioEndedHandler(currentAudio);
      
      if (currentAudio && !get().isMuted && get().isPlaying) {
        currentAudio.volume = get().volume;
        currentAudio.play().catch(console.error);
      }
    },

    shuffleTracks: () => {
      shuffledIndices = [];
      set((state) => ({ isShuffled: !state.isShuffled }));
      
      // Reset the current audio's ended handler based on the new shuffle state
      if (currentAudio) {
        setupAudioEndedHandler(currentAudio);
      }
    },
  };
});
