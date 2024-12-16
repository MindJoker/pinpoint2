import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
 

  return (
    <ToggleButtonGroup exclusive onChange={toggleTheme}>
      <ToggleButton
        value={theme === 'dark' ? 'light' : 'dark'}
        aria-label="theme-toggle"
        sx={{
          height: 40, // Retain size-specific styles
          minWidth: 80,
          backgroundColor: 'var(--primary-color)', // Use CSS variables
          color: 'var(--text-color)',
          borderRadius: '0.375rem', // Rounded edges remain component-specific
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: 'var(--primary-hover-color)', // Hover color from CSS variables
          },
          '&:active': {
            backgroundColor: 'var(--primary-active-color)', // Active color from CSS variables
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--secondary-color)', // Disabled background
            color: '#9ca3af', // Disabled text color (fallback)
          },
        }}
      >
        <Brightness4Icon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ThemeToggle;
