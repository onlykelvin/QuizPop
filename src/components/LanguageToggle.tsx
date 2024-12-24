import React, { memo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Languages } from 'lucide-react';

export const LanguageToggle = memo(function LanguageToggle() {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Dutch' : 'English'}`}
    >
      <Languages className="w-4 h-4" />
      <span>{currentLanguage === 'en' ? 'EN' : 'NL'}</span>
    </button>
  );
});