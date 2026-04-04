import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or default to dark (since we want premium Dark default)
    const saved = localStorage.getItem('cc_theme');
    if (saved) return saved === 'dark';
    return true; // Default Dark
  });

  useEffect(() => {
    // Apply .dark class to root html element natively 
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('cc_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('cc_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
