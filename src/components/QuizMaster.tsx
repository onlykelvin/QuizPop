import React, { useState } from 'react';
import { useQuizStore } from '../store/quizStore';
import { useAudioStore } from '../store/audioStore';
import { CheckCircle2, XCircle, BookOpen, Lightbulb } from 'lucide-react';
import clsx from 'clsx';
import { StatsModal } from './StatsModal';

export function QuizMaster() {
  const { selectedCategory, currentQuestion, questions, score, nextQuestion, incrementScore, resetQuiz } = useQuizStore();
  const { playCorrect, playIncorrect } = useAudioStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showStats, setShowStats] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

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

    setTimeout(() => {
      if (isLastQuestion) {
        setShowStats(true);
      } else {
        nextQuestion();
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      }
    }, 1500);
  };

  const handleQuit = () => {
    setShowStats(true);
  };

  const handleStatsClose = () => {
    setShowStats(false);
    resetQuiz();
  };

  if (!selectedCategory || !question) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory.category}</h2>
            <div className="flex items-center gap-4">
              <span className="text-purple-600 font-semibold text-xl">
                Score: {score}
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                Question {currentQuestion + 1}/{questions.length}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="text-2xl text-gray-800 font-medium mb-4">{question.question}</h3>
            
            <div className="flex items-start gap-2 text-gray-600 mb-4">
              <Lightbulb className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm">{question.funFact}</p>
            </div>
            
            <div className="flex items-start gap-2 text-gray-600">
              <BookOpen className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm italic">{question.story}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = isSelected && isAnswerCorrect;
              const isWrong = isSelected && !isAnswerCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={clsx(
                    "p-6 text-left rounded-xl border-2 transition-all duration-200 flex justify-between items-center text-lg hover:shadow-md",
                    {
                      'border-purple-100 hover:border-purple-500 hover:bg-purple-50': !selectedAnswer,
                      'border-green-500 bg-green-50': isCorrect,
                      'border-red-500 bg-red-50': isWrong,
                      'border-purple-100 opacity-50': selectedAnswer && !isSelected
                    }
                  )}
                >
                  <span className="font-medium">{option}</span>
                  {isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  {isWrong && <XCircle className="w-6 h-6 text-red-500" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleQuit}
            className="px-6 py-3 text-purple-600 hover:text-purple-800 font-medium text-lg transition-colors"
          >
            Quit Quiz
          </button>
        </div>
      </div>

      <StatsModal
        isOpen={showStats}
        onClose={handleStatsClose}
        score={score}
        totalQuestions={questions.length}
        category={selectedCategory.category}
      />
    </div>
  );
}