"use client";

import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { ReactCountryFlag } from 'react-country-flag';
import languages from '../../config/languages'

const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectLanguage = (language: any) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center space-x-2">
        <ReactCountryFlag countryCode={selectedLanguage.countryCode} svg />
        {/* <span>{selectedLanguage.name}</span>
        <FiChevronDown /> */}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => selectLanguage(language)}
              className="flex items-center space-x-2 p-2 w-full text-left hover:bg-gray-100"
            >
              <ReactCountryFlag countryCode={language.countryCode} svg />
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


export default LanguageSwitcher;
