import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../config/languages';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for the current language
  const loadTranslations = async (languageCode) => {
    try {
      setIsLoading(true);
      const translationModule = await import(`../translations/${languageCode}.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.error(`Failed to load translations for ${languageCode}:`, error);
      // Fallback to English if translation fails
      if (languageCode !== 'en') {
        const fallbackModule = await import('../translations/en.json');
        setTranslations(fallbackModule.default);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved language preference
  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = localStorage.getItem('selectedLanguage');
      if (savedLanguage && LANGUAGES[savedLanguage]) {
        setCurrentLanguage(savedLanguage);
        await loadTranslations(savedLanguage);
      } else {
        await loadTranslations(DEFAULT_LANGUAGE);
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
      await loadTranslations(DEFAULT_LANGUAGE);
    }
  };

  // Change language
  const changeLanguage = async (languageCode) => {
    if (!LANGUAGES[languageCode]) {
      console.error(`Language ${languageCode} is not supported`);
      return;
    }

    try {
      setCurrentLanguage(languageCode);
      localStorage.setItem('selectedLanguage', languageCode);
      await loadTranslations(languageCode);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  // Get translation for a key
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found`);
        return key; // Return the key itself if translation not found
      }
    }

    if (typeof value === 'string') {
      // Replace parameters in the translation
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] || match;
      });
    }

    return value;
  };

  // Get current language info
  const getCurrentLanguageInfo = () => {
    return LANGUAGES[currentLanguage];
  };

  // Get all available languages
  const getAvailableLanguages = () => {
    return Object.values(LANGUAGES);
  };

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const value = {
    currentLanguage,
    translations,
    isLoading,
    changeLanguage,
    t,
    getCurrentLanguageInfo,
    getAvailableLanguages,
    isRTL: LANGUAGES[currentLanguage]?.direction === 'rtl'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

