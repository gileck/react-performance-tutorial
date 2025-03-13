import React, { createContext, useState, useContext, useMemo } from 'react';

// Separate contexts for different concerns
export const ThemeContext = createContext();
export const FontSizeContext = createContext();
export const ColorContext = createContext();

// Individual providers with memoized values
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  // Memoize the value object
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState('medium');
  
  // Memoize the value object
  const value = useMemo(() => ({
    fontSize,
    setFontSize
  }), [fontSize]);
  
  return (
    <FontSizeContext.Provider value={value}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const ColorProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#0070f3');
  
  // Memoize the value object
  const value = useMemo(() => ({
    primaryColor,
    setPrimaryColor
  }), [primaryColor]);
  
  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};

// Combine providers into a single component
export const OptimizedThemeProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <ColorProvider>
          {children}
        </ColorProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
};

// Custom hooks for each context
export const useThemeValue = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeValue must be used within a ThemeProvider');
  }
  return context;
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};
