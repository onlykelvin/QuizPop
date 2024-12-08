import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { Brain, BookOpen, Atom, Palette, Music, Globe, Cpu } from 'lucide-react';

export function Footer() {
  const { setCategory, setGameMode } = useQuizStore();

  const handleCategorySelect = async (categoryId: string) => {
    try {
      const response = await import(`../data/categories/${categoryId}.json`);
      setCategory(response.default);
      setGameMode('classic');
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

  const categories = [
    { id: 'science', name: 'Science', icon: Atom },
    { id: 'history', name: 'History', icon: BookOpen },
    { id: 'art', name: 'Art', icon: Palette },
    { id: 'literature', name: 'Literature', icon: Brain },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'geography', name: 'Geography', icon: Globe },
    { id: 'technology', name: 'Technology', icon: Cpu },
  ];

  return (
    <footer className="bg-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div className="col-span-4 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {categories.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleCategorySelect(id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="col-span-4 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Contact</a></li>
            </ul>
          </div>
          
          <div className="col-span-4 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="col-span-4 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">© 2024 QuizPop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}