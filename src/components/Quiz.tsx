import React, { useState, useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';
import { useAudioStore } from '../store/audioStore';
import { CheckCircle2, XCircle, Lightbulb, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { StatsModal } from './StatsModal';
import { AudioTooltip } from './AudioTooltip';

export function Quiz() {
  const { selectedCategory, currentQuestion, questions, score, nextQuestion, incrementScore, resetQuiz, gameMode } = useQuizStore();
  const { playCorrect, playIncorrect, startBackgroundMusic, } = useAudioStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showAudioTooltip, setShowAudioTooltip] = useState(true);
  const { t } = useTranslation();

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const shuffledOptions = React.useMemo(() => 
    [...question.options].sort(() => Math.random() - 0.5),
    [question]
  );

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return;

    const isCorrect = answer === question.answer;
    setSelectedAnswer(answer);
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      incrementScore();
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowStats(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      nextQuestion();
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }
  };

  const handleQuit = () => {
    setShowStats(true);
  };

  const handleStatsClose = () => {
    setShowStats(false);
    resetQuiz();
  };

  useEffect(() => {
    startBackgroundMusic();
    // Hide audio tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowAudioTooltip(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!selectedCategory || !question) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {showAudioTooltip && <AudioTooltip />}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory.category}</h2>
            <div className="flex items-center gap-4">
              <span className="text-purple-600 font-semibold text-xl">
                {t('quiz.score')}: {score}
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                {t('quiz.question')} {currentQuestion + 1}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-2xl text-gray-800 font-medium mb-4">{question.question}</h3>
            
            <div className="flex items-start gap-2 text-gray-600">
              <Lightbulb className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm">{question.funFact}</p>
            </div>

            {selectedAnswer && (
              <div className="mt-4 flex items-start gap-2 text-gray-600">
                <BookOpen className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm italic">{question.story}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            {shuffledOptions.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.answer;
              const showCorrect = selectedAnswer !== null && isCorrect;
              const showWrong = isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={clsx(
                    "p-6 text-left rounded-xl border-2 transition-all duration-200 flex justify-between items-center text-lg hover:shadow-lg",
                    {
                      'border-purple-100 hover:border-purple-500 hover:bg-purple-50': !selectedAnswer,
                      'border-green-500 bg-green-50': showCorrect,
                      'border-red-500 bg-red-50': showWrong,
                      'border-purple-100 opacity-50': selectedAnswer && !isSelected && !isCorrect
                    }
                  )}
                >
                  <span className="font-medium">{option}</span>
                  {showCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  {showWrong && <XCircle className="w-6 h-6 text-red-500" />}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium text-lg"
                >
                  {isLastQuestion ? t('quiz.actions.finish') : t('quiz.actions.next')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleQuit}
            className="px-6 py-3 text-purple-600 hover:text-purple-800 font-medium text-lg transition-colors"
          >
            {t('quiz.actions.quit')}
          </button>
        </div>
      </div>

      <StatsModal
        isOpen={showStats}
        onClose={handleStatsClose}
        score={score}
        questionsAnswered={currentQuestion + 1}
        category={selectedCategory.category}
        gameMode={gameMode}
      />
    </div>
  );
}