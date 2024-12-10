import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryModal } from './components/CategoryModal';
import { Quiz } from './components/Quiz';
import { QuizMaster } from './components/QuizMaster';
import { AudioController } from './components/AudioController';
import { ProductShowcase } from './components/ProductShowcase';
import { Footer } from './components/Footer';
import { useQuizStore } from './store/quizStore';

function App() {
  const { selectedCategory, gameMode } = useQuizStore();

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        {selectedCategory ? (
          gameMode === 'classic' ? <Quiz /> : <QuizMaster />
        ) : (
          <>
            <Hero />
            <ProductShowcase />
          </>
        )}
        <CategoryModal />
      </main>
      <Footer />
      <AudioController />
    </div>
  );
}

export default App;