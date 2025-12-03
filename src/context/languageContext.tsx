import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { setI18nConfig } from '../shared/i18n';

type LanguageType = 'en' | 'ar';

interface LanguageContextProps {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: any) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  useEffect(() => {
    loadStoredLanguage();
  }, []);

  const loadStoredLanguage = async () => {
    const savedLang = await AsyncStorage.getItem('app_language');
    const defaultLang: LanguageType = (savedLang as LanguageType) || 'en';

    setI18nConfig(defaultLang);
    setLanguage(defaultLang);
  };

  const changeLanguage = async (lang: LanguageType) => {
    await AsyncStorage.setItem('app_language', lang);
    setI18nConfig(lang);
    setLanguage(lang);

    // Restart for full RTL flip
    RNRestart.Restart();
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
