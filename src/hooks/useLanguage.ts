import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef } from 'react';
import { loadAllCategories } from '../utils/categoryUtils';

export function useLanguage() {
  const { i18n } = useTranslation();
  const isInitialLoad = useRef(true);

  // Ensure HTML lang attribute is updated
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    
    // Only reload categories when language changes after initial load
    if (!isInitialLoad.current) {
      loadAllCategories().catch(console.error);
    }
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