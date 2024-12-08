import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Brain, BookOpen, Atom, Palette, Music, Globe, Cpu } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { loadCategoryQuestions } from '../utils/categoryUtils';
import { Category } from '../types';

const categories = [
  { id: 'science', name: 'Science', icon: Atom },
  { id: 'history', name: 'History', icon: BookOpen },
  { id: 'art', name: 'Art', icon: Palette },
  { id: 'literature', name: 'Literature', icon: Brain },
  { id: 'music', name: 'Music', icon: Music },
  { id: 'geography', name: 'Geography', icon: Globe },
  { id: 'technology', name: 'Technology', icon: Cpu },
];

export function CategoryModal() {
  const { isModalOpen, setModalOpen, setCategory } = useQuizStore();

  const handleCategorySelect = async (categoryId: string) => {
    try {
      const categoryData = await loadCategoryQuestions(categoryId);
      setCategory(categoryData);
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to load category:', error);
    }
  };

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
              <div className="mt-4 grid grid-cols-1 gap-4">
                {categories.map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    onClick={() => handleCategorySelect(id)}
                  >
                    <Icon className="w-6 h-6 text-purple-600 mr-3" />
                    <span className="text-gray-900">{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}