import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

export const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'ky' : 'ru';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="font-medium text-sm"
    >
      {i18n.language === 'ru' ? 'Кыргызча' : 'Русский'}
    </Button>
  );
};
