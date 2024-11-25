import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

import ru from './locales/ru.json';
import ky from './locales/ky.json';

z.setErrorMap(zodI18nMap);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      ky: { translation: ky },
    },
    lng: 'ky', // Set Kyrgyz as default
    fallbackLng: 'ky',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;