import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef } from 'react';
import { loadAllCategories } from '../utils/categoryUtils';

export function useLanguage() {
  const { i18n } = useTranslation();
  const isInitialLoad = useRef(true);

  // Ensure HTML lang attribute is updated and load categories on initial detection
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    
    // Load categories both on initial load and language changes
    loadAllCategories().catch(console.error);
    isInitialLoad.current = false;
  }, [i18n.language]);

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'nl' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('preferred-language', newLang);
    loadAllCategories().catch(console.error);
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    toggleLanguage,
    isRTL: i18n.dir() === 'rtl',
  };
}
