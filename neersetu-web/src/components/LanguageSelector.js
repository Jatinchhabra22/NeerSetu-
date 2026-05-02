import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGES } from '../config/languages';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = async (languageCode) => {
    try {
      await changeLanguage(languageCode);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const currentLang = LANGUAGES[currentLanguage];

  return (
    <div className="relative">
      {/* Language Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium text-gray-700">
          {currentLang.code.toUpperCase()}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">
              {t('ui.selectLanguage')}
            </h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {Object.values(LANGUAGES).map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  currentLanguage === language.code ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {language.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {language.nativeName}
                  </div>
                </div>
                {currentLanguage === language.code && (
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;
