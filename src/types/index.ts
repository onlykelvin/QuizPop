export interface Question {
  question: string;
  options: string[];
  answer: string;
  funFact: string;
  story: string;
}

export interface Category {
  category: string;
  description: string;
  questions: Question[];
}

export interface MusicTrack {
  title: string;
  url: string;
}

export interface AudioState {
  isMuted: boolean;
  volume: number;
  currentTrack: number;
  isShuffled: boolean;
}

export type GameMode = 'classic' | 'quizMaster';