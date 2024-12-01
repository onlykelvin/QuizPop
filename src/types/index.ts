export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Category {
  category: string;
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
}