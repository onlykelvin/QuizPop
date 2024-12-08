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
  const correctSound = new Audio('/QuizPop/assets/audio/sfx/correct.mp3');
  const incorrectSound = new Audio('/QuizPop/assets/audio/sfx/incorrect.mp3');

  const loadMusicTracks = () => {
    try {
      // Hardcoded paths for the music tracks
      const musicPaths = [
        '/QuizPop/assets/audio/music/track1.mp3',
        '/QuizPop/assets/audio/music/track2.mp3',
        '/QuizPop/assets/audio/music/track3.mp3',
        '/QuizPop/assets/audio/music/track4.mp3',
        '/QuizPop/assets/audio/music/track5.mp3',
      ];

      musicPaths.forEach((path) => {
        const audio = new Audio(path);
        audio.loop = true;
        musicTracks.push(audio);
      });

      console.log("Music tracks loaded:", musicTracks);
    } catch (error) {
      console.error('Failed to load music tracks:', error);
    }
  };

  return {
    isMuted: false,
    volume: 0.5,
    currentTrack: 0,

    initializeAudio: () => {
      loadMusicTracks();
      if (musicTracks.length > 0) {
        currentAudio = musicTracks[0];
        currentAudio.volume = get().volume;
        currentAudio.play().catch((err) =>
          console.error("Failed to play initial track:", err)
        );
      }
    },

    playCorrect: () => {
      if (!get().isMuted) {
        correctSound.volume = get().volume;
        correctSound.play().catch((err) =>
          console.error("Failed to play correct sound:", err)
        );
      }
    },

    playIncorrect: () => {
      if (!get().isMuted) {
        incorrectSound.volume = get().volume;
        incorrectSound.play().catch((err) =>
          console.error("Failed to play incorrect sound:", err)
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
        currentAudio.play().catch((err) =>
          console.error("Failed to play next track:", err)
        );
      }
    },
  };
});
