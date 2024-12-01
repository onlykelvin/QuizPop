import React, { useState } from 'react';
import { useQuizStore } from '../store/quizStore';
import { useAudioStore } from '../store/audioStore';
import { CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';

export function Quiz() {
  const { selectedCategory, currentQuestion, questions, score, nextQuestion, incrementScore, resetQuiz } = useQuizStore();
  const { playCorrect, playIncorrect } = useAudioStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

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
        resetQuiz();
      } else {
        nextQuestion();
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      }
    }, 1500);
  };

  if (!selectedCategory || !question) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-xl p-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">{selectedCategory.category}</h2>
          <div className="flex items-center gap-4">
            <span className="text-purple-600 font-semibold text-xl">
              Score: {score}
            </span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
              Question {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-2xl text-gray-700 font-medium">{question.question}</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
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

        <div className="mt-8 flex justify-end">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 text-purple-600 hover:text-purple-800 font-medium text-lg transition-colors"
          >
            Quit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}