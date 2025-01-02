import React from 'react';
import { Music } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AudioTooltip() {
  const { t } = useTranslation();
  
  return (
    <div className="fixed bottom-24 right-4 z-50 animate-fade-in-up">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-purple-600" />
          <p className="text-sm text-gray-700">
          {t('nav.AudioNotification')}
           
          </p>
        </div>
        <div className="absolute w-3 h-3 bg-white transform rotate-45 -bottom-1.5 right-8" />
      </div>
    </div>
  );
}