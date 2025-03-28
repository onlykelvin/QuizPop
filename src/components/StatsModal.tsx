import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Trophy, XCircle, Home } from 'lucide-react';
import { ShareButton } from './ShareButton';
import { saveHighScore } from '../utils/storageUtils';
import { GameMode } from '../types';
import { useTranslation } from 'react-i18next';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  questionsAnswered: number;
  category: string;
  gameMode: GameMode;
}

export function StatsModal({ isOpen, onClose, score, questionsAnswered, category, gameMode }: StatsModalProps) {
  const percentage = Math.round((score / questionsAnswered) * 100) || 0;
  const { t } = useTranslation();
  
  const shareText = `🎯 I just scored ${score}/${questionsAnswered} (${percentage}%) on the ${category} quiz in QuizPop! Can you beat my score?`;
  
  React.useEffect(() => {
    if (isOpen && score > 0) {
      saveHighScore(score, questionsAnswered, category, gameMode);
    }
  }, [isOpen, score, questionsAnswered, category, gameMode]);

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
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

          <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

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
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {percentage >= 70 ? (
                    <Trophy className="w-16 h-16 text-yellow-400" />
                  ) : (
                    <XCircle className="w-16 h-16 text-purple-400" />
                  )}
                </div>
                
                <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-4">
                  {t('stats.title')}
                </Dialog.Title>
                
                <div className="bg-purple-50 rounded-lg p-6 mb-6">
                  <p className="text-lg text-gray-600 mb-2">{t('stats.category')}: {category}</p>
                  <p className="text-3xl font-bold text-purple-600 mb-2">{score} / {questionsAnswered}</p>
                  <p className="text-xl text-gray-700">{t('stats.score')}: {percentage}%</p>
                </div>

                {percentage >= 70 && (
                  <p className="text-green-600 font-medium mb-6">
                    {t('stats.greatJob')}
                  </p>
                )}

                <div className="flex justify-center gap-4">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    {t('stats.actions.home')}
                  </button>
                  <button
                    className="inline-flex items-center px-4 py-2 border border-purple-600 text-base font-medium rounded-md text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    <ShareButton text={shareText} showText={t('stats.actions.game')} />
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