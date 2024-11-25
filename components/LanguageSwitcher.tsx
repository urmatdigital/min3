import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'ky', name: 'Кыргызча', flag: '🇰🇬' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-gray-700/50 dark:hover:bg-gray-700/75 transition-colors duration-200"
      >
        <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        <span className="text-sm text-gray-700 dark:text-gray-200">
          {languages.find(lang => lang.code === i18n.language)?.flag}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 glass-morphism">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              >
                <span className="flex items-center space-x-2">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </span>
                {i18n.language === lang.code && (
                  <Check className="h-4 w-4 text-emerald-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}