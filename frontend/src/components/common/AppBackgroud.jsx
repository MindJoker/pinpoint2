import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const AppBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-0">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 opacity-80 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' // Dark theme
            : 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50'  // Light theme
        }`}
      />
      {/* Blur */}
      <div className="absolute inset-0 backdrop-blur-sm" />
    </div>
  );
};

export default AppBackground;
