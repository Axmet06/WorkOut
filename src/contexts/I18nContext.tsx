import React, { createContext, useContext, useState, ReactNode } from 'react';
import ruTranslations from '../translations/ru';
import kyTranslations from '../translations/ky';

type Language = 'ru' | 'ky';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatName: (name: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ru: ruTranslations,
  ky: kyTranslations,
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const formatName = (name: string): string => {
    // If name contains both Russian and Kyrgyz versions separated by " / "
    if (name.includes(' / ')) {
      const [russian, kyrgyz] = name.split(' / ');
      return language === 'ru' ? russian : kyrgyz;
    }
    // Return as is if no separator
    return name;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, formatName }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};