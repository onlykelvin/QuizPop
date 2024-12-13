import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';

export function useLanguage() {
  const { i18n } = useTranslation();

  // Ensure HTML lang attribute is updated
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'nl' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('preferred-language', newLang);
  }, [i18n]);

  return {
    currentLanguage: i18n.language,
    toggleLanguage,
    isRTL: i18n.dir() === 'rtl',
  };
}