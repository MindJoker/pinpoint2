/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Custom hook for accessing ThemeContext
export const useTheme = () => useContext(ThemeContext);

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to 'dark'
    return localStorage.getItem('theme') || 'dark';
  });

  // Update localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme); // Set theme at root level
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
