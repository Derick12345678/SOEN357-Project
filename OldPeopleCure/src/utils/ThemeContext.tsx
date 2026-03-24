import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeContextType {
  fontSizeScale: number;
  setFontSizeScale: (scale: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  getColors: () => { background: string; text: string; primary: string; secondary: string; border: string; surface: string };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSizeScale, setFontSizeScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

  const getColors = () => {
    if (highContrast) {
      return {
        background: '#000000',
        text: '#FFFFFF',
        primary: '#FFFF00', // Highly visible yellow on black
        secondary: '#00FFFF', // Cyan
        border: '#FFFFFF',
        surface: '#222222',
      };
    }
    return {
      background: '#F0F8FF', // Alice Blue, very soft light background
      text: '#000000',      // Maximum contrast for typical mode
      primary: '#0047AB',    // Deep cobalt blue
      secondary: '#486581',  
      border: '#BCCCDC',
      surface: '#FFFFFF',
    };
  };

  return (
    <ThemeContext.Provider value={{ fontSizeScale, setFontSizeScale, highContrast, setHighContrast, getColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
