import React from 'react';
import { useQuizStore } from '../store/quizStore';
import { Brain, BookOpen, Atom, Palette, Music, Globe, Cpu, Dumbbell, UtensilsCrossed, Leaf, Tv2, BookMarked, Languages, Gift, Snowflake, Sun, Cloud, BookHeart, Plane, Gamepad2, Heart, Shirt } from 'lucide-react';
import { ShareButton } from './ShareButton';

export function Footer() {
  const { setCategory, setGameMode } = useQuizStore();

  const handleCategorySelect = async (categoryId: string) => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const response = await import(`../data/categories/${categoryId}.json`);
      setCategory(response.default);
      setGameMode('classic');
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

  const mainCategories = [
    { id: 'science', name: 'Science', icon: Atom },
    { id: 'history', name: 'History', icon: BookOpen },
    { id: 'art', name: 'Art', icon: Palette },
    { id: 'literature', name: 'Literature', icon: Brain },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'geography', name: 'Geography', icon: Globe },
    { id: 'technology', name: 'Technology', icon: Cpu },
    { id: 'sports', name: 'Sports', icon: Dumbbell },
    { id: 'food-drink', name: 'Food & Drink', icon: UtensilsCrossed },
    { id: 'nature-environment', name: 'Nature & Environment', icon: Leaf },
    { id: 'pop-culture', name: 'Pop Culture', icon: Tv2 },
    { id: 'mythology-folklore', name: 'Mythology & Folklore', icon: BookMarked },
    { id: 'languages-linguistics', name: 'Languages & Linguistics', icon: Languages },
  ];

  const specialCategories = [
    { id: 'new-year', name: 'New Year', icon: Gift },
    { id: 'christmas', name: 'Christmas', icon: Gift },
    { id: 'easter', name: 'Easter', icon: Gift },
    { id: 'santa-claus', name: 'Santa Claus', icon: Gift },
    { id: 'winter', name: 'Winter', icon: Snowflake },
    { id: 'summer', name: 'Summer', icon: Sun },
    { id: 'autumn', name: 'Autumn', icon: Cloud },
    { id: 'spring', name: 'Spring', icon: Leaf },
    { id: 'book-club', name: 'Book Club', icon: BookHeart },
    { id: 'travel', name: 'Travel', icon: Plane },
    { id: 'sci-fi-fantasy', name: 'Sci-Fi & Fantasy', icon: BookMarked },
    { id: 'video-games', name: 'Video Games', icon: Gamepad2 },
    { id: 'health-wellness', name: 'Health & Wellness', icon: Heart },
    { id: 'fashion-style', name: 'Fashion & Style', icon: Shirt },
  ];

  return (
    <footer className="bg-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Main Categories</h3>
            <div className="space-y-2">
              {mainCategories.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleCategorySelect(id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors w-full"
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Special Categories</h3>
            <div className="space-y-2">
              {specialCategories.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleCategorySelect(id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors w-full"
                >
                  <Icon className="w-4 h-4" />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-600">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><ShareButton text="Check out QuizPop - The most fun way to learn! 🎯" showText="Share this website" /></li>
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