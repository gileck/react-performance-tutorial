import React, { createContext, useState, useContext } from 'react';

// Create the context
export const ThemeContext = createContext();

// Problem: Single context with multiple values and new object reference on every render
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  const [primaryColor, setPrimaryColor] = useState('#0070f3');
  
  // Problem: Creating new object on every render without memoization
  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    primaryColor,
    setPrimaryColor
  };
  
  console.log('ThemeProvider rendering, creating new context value');
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
