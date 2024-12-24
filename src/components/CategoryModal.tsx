import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Brain, BookOpen, Atom, Palette, Music, Globe, Cpu, ChevronDown, ChevronUp, Dumbbell, UtensilsCrossed, Leaf, Tv2, BookMarked, Languages, Gift, Snowflake, Sun, Cloud, BookHeart, Plane, Gamepad2, Heart, Shirt } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { loadCategoryQuestions } from '../utils/categoryUtils';
import { useTranslation } from 'react-i18next';

export function CategoryModal() {
  const { isModalOpen, setModalOpen, setCategory } = useQuizStore();
  const [showAllMain, setShowAllMain] = useState(false);
  const [showAllSpecial, setShowAllSpecial] = useState(false);
  const { t } = useTranslation();

  const mainCategories = [
    { id: 'science', name: t('categories.main.science'), icon: Atom },
    { id: 'history', name: t('categories.main.history'), icon: BookOpen },
  ];

  const specialCategories = [
    { id: 'new-year', name: t('categories.special.newYear'), icon: Gift },
    { id: 'christmas', name: t('categories.special.christmas'), icon: Gift },
  ];

  const allMainCategories = [
    ...mainCategories,
    { id: 'art', name: t('categories.main.art'), icon: Palette },
    { id: 'music', name: t('categories.main.music'), icon: Music },
    { id: 'literature', name: t('categories.main.literature'), icon: Brain },
    { id: 'geography', name: t('categories.main.geography'), icon: Globe },
    { id: 'technology', name: t('categories.main.technology'), icon: Cpu },
    { id: 'sports', name: t('categories.main.sports'), icon: Dumbbell },
    { id: 'food-drink', name: t('categories.main.foodDrink'), icon: UtensilsCrossed },
    { id: 'nature-environment', name: t('categories.main.nature'), icon: Leaf },
    { id: 'pop-culture', name: t('categories.main.popCulture'), icon: Tv2 },
    { id: 'mythology-folklore', name: t('categories.main.mythology'), icon: BookMarked },
    { id: 'languages-linguistics', name: t('categories.main.languages'), icon: Languages },
  ];

  const allSpecialCategories = [
    ...specialCategories,
    { id: 'easter', name: t('categories.special.easter'), icon: Gift },
    { id: 'santa-claus', name: t('categories.special.santaClaus'), icon: Gift },
    { id: 'winter', name: t('categories.special.winter'), icon: Snowflake },
    { id: 'summer', name: t('categories.special.summer'), icon: Sun },
    { id: 'autumn', name: t('categories.special.autumn'), icon: Cloud },
    { id: 'spring', name: t('categories.special.spring'), icon: Leaf },
    { id: 'book-club', name: t('categories.special.bookClub'), icon: BookHeart },
    { id: 'travel', name: t('categories.special.travel'), icon: Plane },
    { id: 'sci-fi-fantasy', name: t('categories.special.sciFiFantasy'), icon: BookMarked },
    { id: 'video-games', name: t('categories.special.videoGames'), icon: Gamepad2 },
    { id: 'health-wellness', name: t('categories.special.health'), icon: Heart },
    { id: 'fashion-style', name: t('categories.special.fashion'), icon: Shirt },
  ];

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
                {t('categoryModal.title')}
              </Dialog.Title>

              <div className="space-y-6">
                {/* Main Categories Section */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">{t('categoryModal.mainCategories')}</h4>
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
                        {t('categoryModal.showLess')}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        {t('categoryModal.showMore')}
                      </>
                    )}
                  </button>
                </div>

                {/* Special Categories Section */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-3">{t('categoryModal.specialCategories')}</h4>
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
                        {t('categoryModal.showLess')}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-1" />
                        {t('categoryModal.showMore')}
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