import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Brain, BookOpen, Atom, Palette, Music, Globe, Cpu, ChevronDown, ChevronUp, Dumbbell, UtensilsCrossed, Leaf, Tv2, BookMarked, Languages, Gift, Snowflake, Sun, Cloud, BookHeart, Plane, Gamepad2, Heart, Shirt } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { loadCategoryQuestions } from '../utils/categoryUtils';
import { Category } from '../types';

const mainCategories = [
  { id: 'science', name: 'Science', icon: Atom },
  { id: 'history', name: 'History', icon: BookOpen },
];

const specialCategories = [
  { id: 'new-year', name: 'New Year', icon: Gift },
  { id: 'christmas', name: 'Christmas', icon: Gift },
];

const allMainCategories = [
  ...mainCategories,
  { id: 'art', name: 'Art', icon: Palette },
  { id: 'music', name: 'Music', icon: Music },
  { id: 'literature', name: 'Literature', icon: Brain },
  { id: 'geography', name: 'Geography', icon: Globe },
  { id: 'technology', name: 'Technology', icon: Cpu },
  { id: 'sports', name: 'Sports', icon: Dumbbell },
  { id: 'food-drink', name: 'Food & Drink', icon: UtensilsCrossed },
  { id: 'nature-environment', name: 'Nature & Environment', icon: Leaf },
  { id: 'pop-culture', name: 'Pop Culture', icon: Tv2 },
  { id: 'mythology-folklore', name: 'Mythology & Folklore', icon: BookMarked },
  { id: 'languages-linguistics', name: 'Languages & Linguistics', icon: Languages },
];

const allSpecialCategories = [
  ...specialCategories,
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

export function CategoryModal() {
  const { isModalOpen, setModalOpen, setCategory } = useQuizStore();
  const [showAllMain, setShowAllMain] = useState(false);
  const [showAllSpecial, setShowAllSpecial] = useState(false);

  const handleCategorySelect = async (categoryId: string) => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const categoryData = await loadCategoryQuestions(categoryId);
      setCategory(categoryData);
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

  const CategoryButton = ({ id, name, icon: Icon }) => (
    <button
      className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors w-full"
      onClick={() => handleCategorySelect(id)}
    >
      <Icon className="w-6 h-6 text-purple-600 mr-3" />
      <span className="text-gray-900">{name}</span>
    </button>
  );

  return (
    <Transition show={isModalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setModalOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 cherry-bomb mb-4">
                Choose a Category
              </Dialog.Title>

              <div className="space-y-6">
                {/* Main Categories Section */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Main Categories</h4>
                  <div className="space-y-2">
                    {(showAllMain ? allMainCategories : mainCategories).map((category) => (
                      <CategoryButton key={category.id} {...category} />
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllMain(!showAllMain)}
                    className="mt-2 flex items-center text-purple-600 hover:text-purple-800 font-medium"
                  >
                    {showAllMain ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        See All
                      </>
                    )}
                  </button>
                </div>

                {/* Special Categories Section */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">Special Categories</h4>
                  <div className="space-y-2">
                    {(showAllSpecial ? allSpecialCategories : specialCategories).map((category) => (
                      <CategoryButton key={category.id} {...category} />
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllSpecial(!showAllSpecial)}
                    className="mt-2 flex items-center text-purple-600 hover:text-purple-800 font-medium"
                  >
                    {showAllSpecial ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        See All
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}