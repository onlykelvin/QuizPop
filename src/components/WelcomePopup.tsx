import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { BookOpen, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const hasVisitedHowItWorks = localStorage.getItem('quizpop_visited_how_it_works') === 'true';
    const lastDismissed = localStorage.getItem('quizpop_welcome_dismissed');
    const shouldShow = !hasVisitedHowItWorks && (!lastDismissed || Date.now() - parseInt(lastDismissed) > 24 * 60 * 60 * 1000);
    
    if (shouldShow) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('quizpop_welcome_dismissed', Date.now().toString());
    setIsOpen(false);
  };

  const handleLearnMore = () => {
    localStorage.setItem('quizpop_visited_how_it_works', 'true');
    setIsOpen(false);
    navigate('/how-it-works');
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleDismiss}
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

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
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
              <div className="flex justify-between items-start mb-4">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-gray-900"
                >
                  {t('welcome.title')}
                </Dialog.Title>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <p className="text-gray-600 mb-6">
                  {t('welcome.description')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 text-purple-600 hover:text-purple-700 transition-colors font-medium"
                  >
                    {t('welcome.continue')}
                  </button>
                  <button
                    onClick={handleLearnMore}
                    className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    {t('welcome.learnMore')}
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