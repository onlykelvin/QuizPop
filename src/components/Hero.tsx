import React from 'react';
import { ArrowRight, Brain, Trophy, Users, Atom, BookOpen, Palette } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

const categories = [
  { id: 'science', name: 'Science', icon: Atom, description: 'Test your knowledge of scientific concepts and discoveries' },
  { id: 'history', name: 'History', icon: BookOpen, description: 'Journey through time with historical facts and events' },
  { id: 'art', name: 'Art', icon: Palette, description: 'Explore the world of art, artists, and masterpieces' },
];

export function Hero() {
  const { setModalOpen } = useQuizStore();

  const handleCategorySelect = async (categoryId: string) => {
    try {
      const response = await import(`../data/categories/${categoryId}.json`);
      const categoryData = response.default;
      setCategory(categoryData);
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
            <span className="block">Challenge Your Mind with</span>
            <span className="block text-purple-600 mt-2">QuizPop</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Engage your brain with our interactive quiz platform. Learn, compete, and have fun while testing your knowledge across various topics.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ id, name, icon: Icon, description }) => (
            <button
              key={id}
              onClick={() => handleCategorySelect(id)}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{name}</h3>
                <p className="mt-2 text-gray-500">{description}</p>
                <span className="mt-4 inline-flex items-center text-purple-600 font-medium">
                  Start Quiz <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose QuizPop?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="p-8 bg-purple-50 rounded-2xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500 text-white mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learn Actively</h3>
              <p className="text-gray-600">
                Engage with content through interactive quizzes designed to enhance retention and understanding.
              </p>
            </div>

            <div className="p-8 bg-purple-50 rounded-2xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500 text-white mb-6">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your performance and watch your knowledge grow with detailed score tracking.
              </p>
            </div>

            <div className="p-8 bg-purple-50 rounded-2xl">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500 text-white mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compete & Share</h3>
              <p className="text-gray-600">
                Challenge friends and share your achievements on your favorite social platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}