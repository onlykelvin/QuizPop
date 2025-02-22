import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryModal } from './components/CategoryModal';
import { Quiz } from './components/Quiz';
import { QuizMaster } from './components/QuizMaster';
import { AudioController } from './components/AudioController';
import { ProductShowcase } from './components/ProductShowcase';
import { Footer } from './components/Footer';
import { HighScores } from './components/HighScores';
import { AboutUs } from './pages/AboutUs';
import { HowItWorks } from './pages/HowItWorks';
import { Contact } from './pages/Contact';
import { useQuizStore } from './store/quizStore';
import { useNavigationHandler } from './hooks/useNavigationHandler';
import { useEffect } from 'react';
import { WelcomePopup } from './components/WelcomePopup';
import { loadAllCategories } from './utils/categoryUtils';

function App() {
  
  useEffect(() => {
    window.insidee?.init("1f49f786-1143-4b6d-9699-39262e87bba1");
  }, []);
  const { selectedCategory, gameMode } = useQuizStore();
  
  useNavigationHandler();

  return (
    <Router>
      <div className="min-h-screen bg-purple-50 flex flex-col">
        <Header />
        <WelcomePopup />
        <main className="flex-grow">
          <Routes>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={
              selectedCategory ? (
                gameMode === 'classic' ? <Quiz /> : <QuizMaster />
              ) : (
                <>
                  <Hero />
                  <HighScores />
                  <ProductShowcase />
                </>
              )
            } />
          </Routes>
          <CategoryModal />
        </main>
        <Footer />
        <AudioController />
      </div>
    </Router>
  );
}

export default App;
