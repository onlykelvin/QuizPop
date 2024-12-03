import React from 'react';
import { ArrowRight, Brain, Trophy, Users, Atom, BookOpen, Palette, Shuffle, GraduationCap } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { CategoryCard } from './CategoryCard';
import { loadAllCategories, createRandomCategory } from '../utils/categoryUtils';

export function Hero() {
  const { setCategory, setGameMode } = useQuizStore();

  const handleCategorySelect = async (categoryId: string, mode: 'classic' | 'quizMaster' = 'classic') => {
    try {
      setGameMode(mode);
      if (categoryId === 'random') {
        const allCategories = await loadAllCategories();
        const randomCategory = createRandomCategory(allCategories);
        setCategory(randomCategory);
      } else {
        const response = await import(`../data/categories/${categoryId}.json`);
        setCategory(response.default);
      }
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

  const categories = [
    {
      id: 'random',
      title: 'Random Mix',
      description: 'Questions from all categories mixed together',
      icon: Shuffle
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Test your knowledge of scientific concepts',
      icon: Atom
    },
    {
      id: 'history',
      title: 'History',
      description: 'Journey through historical events',
      icon: BookOpen
    },
    {
      id: 'art',
      title: 'Art',
      description: 'Explore the world of art and artists',
      icon: Palette
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Challenge Your Mind with</span>
            <span className="block text-purple-600">QuizPop</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Test your knowledge across various categories with our fun and engaging quiz platform.
            Choose a category below or try our random mix!
          </p>
        </div>

        {/* Game Modes */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl bg-purple-100">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-center text-gray-900">Classic Mode</h2>
            <p className="mt-2 text-gray-500 text-center mb-6">
              Quick-fire questions with fun facts to test your knowledge
            </p>
            <div className="grid grid-cols-2 gap-4">
              {categories.map(category => (
                <CategoryCard
                  key={`classic-${category.id}`}
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  onClick={() => handleCategorySelect(category.id, 'classic')}
                  compact
                />
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl bg-purple-100">
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-center text-gray-900">QuizMaster Mode</h2>
            <p className="mt-2 text-gray-500 text-center mb-6">
              Deep dive into each topic with detailed stories and explanations
            </p>
            <div className="grid grid-cols-2 gap-4">
              {categories.map(category => (
                <CategoryCard
                  key={`master-${category.id}`}
                  icon={category.icon}
                  title={category.title}
                  description={category.description}
                  onClick={() => handleCategorySelect(category.id, 'quizMaster')}
                  compact
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="p-8 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Learn Actively</h3>
            <p className="mt-2 text-base text-gray-500">
              Engage with interactive quizzes designed to enhance retention.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Track Progress</h3>
            <p className="mt-2 text-base text-gray-500">
              Monitor your scores and watch your knowledge grow.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow-md">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Challenge Friends</h3>
            <p className="mt-2 text-base text-gray-500">
              Compare scores and compete with friends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}