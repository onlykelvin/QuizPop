import React from 'react';
import { Trophy } from 'lucide-react';
import { getHighScores } from '../utils/storageUtils';
import { useTranslation } from 'react-i18next';

export function HighScores() {
  const highScores = getHighScores();
  const { t } = useTranslation();

  if (highScores.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 mt-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 style={{ marginBottom: '2rem' }}">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-2xl font-bold text-gray-900">{t('highScores.title')}</h2>
          </div>
          <p className="text-gray-600 text-center">{t('highScores.noScores')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-12">
      <div className="bg-white rounded-2xl shadow-xl p-8" style={{ marginBottom: '2rem' }}>
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h2 className="text-2xl font-bold text-gray-900">{t('highScores.title')}</h2>
        </div>
        
        <div className="space-y-4">
          {highScores.map((score, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-purple-50 rounded-xl"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {score.category} ({score.mode})
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(score.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-purple-600">
                  {score.score}/{score.total}
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round((score.score / score.total) * 100)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
