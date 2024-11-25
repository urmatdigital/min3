import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from '../locales/ru.json';
import ky from '../locales/ky.json';

// Get saved language from localStorage or use browser language
const savedLanguage = localStorage.getItem('language');
const browserLanguage = navigator.language.startsWith('ru') ? 'ru' : 'ky';
const defaultLanguage = savedLanguage || browserLanguage;

const resources = {
  ru: {
    translation: ru
  },
  ky: {
    translation: ky
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  });

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
