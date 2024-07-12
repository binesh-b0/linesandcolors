"use client";

import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextProps {
  colors: {
    teal: string;
    darkTeal: string;
    lightGray: string;
    coral: string;
    gold: string;
    white: string;
  };
}

const ThemeContext = createContext<ThemeContextProps>({
  colors: {
    teal: '#008080',
    darkTeal: '#005F5F',
    lightGray: '#F5F5F5',
    coral: '#FF6F61',
    gold: '#FFD700',
    white: '#FFF',
  },
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = {
    colors: {
      // teal: 'var(--color-teal)',
      // darkTeal: 'var(--color-dark-teal)',
      // lightGray: 'var(--color-light-gray)',
      // coral: 'var(--color-coral)',
      // gold: 'var(--color-gold)',
      teal: '#008080',
      darkTeal: '#005F5F',
      lightGray: '#F5F5F5',
      coral: '#FF6F61',
      gold: '#FFD700',
      white: '#FFF',
    },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
