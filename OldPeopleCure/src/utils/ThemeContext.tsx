import React, { createContext, useState, useContext, ReactNode } from 'react';
import * as Haptics from 'expo-haptics';

interface ThemeContextType {
  fontSizeScale: number;
  setFontSizeScale: (scale: number) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  getColors: () => { background: string; text: string; subtext: string; primary: string; secondary: string; border: string; surface: string };
  increaseFont: () => void;
  increaseFontButtonDisabled: boolean;
  decreaseFont: () => void;
  decreaseFontButtonDisabled: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSizeScale, setFontSizeScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const increaseFontButtonDisabled = fontSizeScale >= 1.6;
  const decreaseFontButtonDisabled = fontSizeScale <= 0.8;
  const increaseFont = async () => {
    if (!increaseFontButtonDisabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFontSizeScale(prev => prev + 0.1);
    }
  };

  const decreaseFont = async () => {
    if (!decreaseFontButtonDisabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFontSizeScale(prev => prev - 0.1);
    }
  };

  const getColors = () => {
    if (highContrast) {
      return {
        background: '#000000',
        text: '#FFFFFF',
        subtext: '#E2E8F0', // Slate-200
        primary: '#FFFF00',
        secondary: '#00FFFF',
        border: '#FFFFFF',
        surface: '#222222',
      };
    }
    return {
      background: '#F1F5F9', // Slate-100, better depth than white
      text: '#334155',      
      subtext: '#64748B',    // Slate-500
      primary: '#2563EB',    
      secondary: '#475569',
      border: '#E2E8F0',
      surface: '#FFFFFF',
    };
  };

  return (
    <ThemeContext.Provider value={{
      fontSizeScale,
      setFontSizeScale,
      highContrast,
      setHighContrast,
      getColors,
      increaseFont,
      increaseFontButtonDisabled,
      decreaseFont,
      decreaseFontButtonDisabled
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
