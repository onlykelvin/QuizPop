import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryModal } from './components/CategoryModal';
import { Quiz } from './components/Quiz';
import { QuizMaster } from './components/QuizMaster';
import { AudioController } from './components/AudioController';
import { useQuizStore } from './store/quizStore';

function App() {
  const { selectedCategory, gameMode } = useQuizStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {selectedCategory ? (
          gameMode === 'classic' ? <Quiz /> : <QuizMaster />
        ) : (
          <Hero />
        )}
        <CategoryModal />
      </main>
      <AudioController />
    </div>
  );
}

export default App;