import { create } from 'zustand';
import { Category, Question, GameMode } from '../types';

interface QuizState {
  isModalOpen: boolean;
  selectedCategory: Category | null;
  currentQuestion: number;
  score: number;
  questions: Question[];
  gameMode: GameMode;
  setModalOpen: (isOpen: boolean) => void;
  setCategory: (category: Category) => void;
  nextQuestion: () => void;
  incrementScore: () => void;
  resetQuiz: () => void;
  setGameMode: (mode: GameMode) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isModalOpen: false,
  selectedCategory: null,
  currentQuestion: 0,
  score: 0,
  questions: [],
  gameMode: 'classic',
  setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  setCategory: (category) => {
    // Create a copy of the questions array and shuffle it
    const shuffledQuestions = [...category.questions].sort(() => Math.random() - 0.5);
    
    set({ 
      selectedCategory: {
        ...category,
        questions: shuffledQuestions
      },
      questions: shuffledQuestions,
      currentQuestion: 0,
      score: 0
    });
  },
  nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  resetQuiz: () => set({ 
    currentQuestion: 0, 
    score: 0, 
    questions: [], 
    selectedCategory: null,
    isModalOpen: false 
  }),
  setGameMode: (mode) => set({ gameMode: mode }),
}));
