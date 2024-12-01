import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryModal } from './components/CategoryModal';
import { Quiz } from './components/Quiz';
import { AudioController } from './components/AudioController';
import { useQuizStore } from './store/quizStore';

function App() {
  const { selectedCategory } = useQuizStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {selectedCategory ? <Quiz /> : <Hero />}
        <CategoryModal />
      </main>
      <AudioController />
    </div>
  );
}

export default App;