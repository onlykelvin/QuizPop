import React, { useState, useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';
import { useAudioStore } from '../store/audioStore';
import { CheckCircle2, Lightbulb, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { StatsModal } from './StatsModal';

export function QuizMaster() {
  const { selectedCategory, currentQuestion, questions, score, nextQuestion, incrementScore, resetQuiz } = useQuizStore();
  const { playCorrect, startBackgroundMusic } = useAudioStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleShowAnswer = () => {
    setShowAnswer(true);
    incrementScore();
    playCorrect();
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setShowStats(true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      nextQuestion();
      setShowAnswer(false);
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
  }, []);

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

          {!showAnswer ? (
            <button
              onClick={handleShowAnswer}
              className="w-full p-6 text-center rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-lg font-medium hover:shadow-lg"
            >
              Reveal Answer
            </button>
          ) : (
            <>
              <div className="p-6 rounded-xl border-2 border-green-500 bg-green-50 flex items-center justify-between">
                <span className="font-medium text-lg">{question.answer}</span>
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium text-lg"
                >
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </>
          )}
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
        questionsAnswered={currentQuestion + 1}
        category={selectedCategory.category}
      />
    </div>
  );
}