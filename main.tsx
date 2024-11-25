import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './lib/i18n';
import i18n from './lib/i18n';

// Загружаем сохраненный язык из localStorage
const savedLanguage = localStorage.getItem('language');
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);