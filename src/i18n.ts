import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en.json';
import nl from './translations/nl.json';

const CACHE_VERSION = '1.0';
const CACHE_KEY = 'preferred-language';

// Clear outdated cache if version changes
const cachedVersion = localStorage.getItem('translation-cache-version');
if (cachedVersion !== CACHE_VERSION) {
  localStorage.removeItem(CACHE_KEY);
  localStorage.setItem('translation-cache-version', CACHE_VERSION);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      nl: { translation: nl }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: true // Security: Enable HTML escaping
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: CACHE_KEY,
      caches: ['localStorage']
    },
    load: 'languageOnly', // Optimize: Load only language code without region
    cleanCode: true, // Normalize language codes
    supportedLngs: ['en', 'nl'], // Explicitly define supported languages
    returnEmptyString: false, // Prevent empty string returns for missing translations
    react: {
      useSuspense: true // Enable Suspense for loading translations
    }
  }).then(() => {
    // Store detected language in local storage
    const detectedLanguage = i18n.language;
    localStorage.setItem(CACHE_KEY, detectedLanguage);
  });


// Add error handling for missing translations
i18n.on('missingKey', (lngs, namespace, key) => {
  console.warn(`Missing translation key: ${key} for languages: ${lngs.join(', ')}`);
});

export default i18n;
