import React from 'react';
import { Shuffle, List, Gamepad2, Brain } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { loadAllCategories, createRandomCategory } from '../utils/categoryUtils';

export function Hero() {
  const { setCategory, setGameMode, setModalOpen } = useQuizStore();

  const handleRandomMix = async (mode: 'classic' | 'quizMaster') => {
    try {
      const allCategories = await loadAllCategories();
      const randomCategory = createRandomCategory(allCategories);
      setGameMode(mode);
      setCategory(randomCategory);
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  };

  const handleChooseCategory = (mode: 'classic' | 'quizMaster') => {
    setGameMode(mode);
    setModalOpen(true);
  };

  return (
    <div className="relative overflow-hidden bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-normal text-gray-900 sm:text-5xl md:text-7xl">
            <span className="block text-purple-600 font-modak text-6xl sm:text-7xl md:text-8xl mt-4" style={{ WebkitTextStroke: "1px white", textShadow: "-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 #9333ea, 1px 1px 0 #9333ea", fontSize: "200%" }}>QuizPop</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-800 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Test your knowledge across various categories with our fun and engaging quiz platform.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <Gamepad2 className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Classic Mode</h2>
            <p className="text-gray-500 text-center mb-8">
              Quick-fire questions with fun facts to test your knowledge
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleRandomMix('classic')}
                className="w-full p-4 flex items-center justify-center gap-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Shuffle className="w-5 h-5" />
                <span>Random Mix</span>
              </button>
              <button
                onClick={() => handleChooseCategory('classic')}
                className="w-full p-4 flex items-center justify-center gap-2 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <List className="w-5 h-5" />
                <span>Choose Category</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <div className="flex justify-center mb-6">
              <Brain className="w-16 h-16 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">QuizMaster Mode</h2>
            <p className="text-gray-500 text-center mb-8">
              Deep dive into each topic with detailed stories and explanations
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleRandomMix('quizMaster')}
                className="w-full p-4 flex items-center justify-center gap-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Shuffle className="w-5 h-5" />
                <span>Random Mix</span>
              </button>
              <button
                onClick={() => handleChooseCategory('quizMaster')}
                className="w-full p-4 flex items-center justify-center gap-2 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <List className="w-5 h-5" />
                <span>Choose Category</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}