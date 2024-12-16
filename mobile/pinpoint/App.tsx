import React from 'react';
import { ExpoRoot } from 'expo-router';
import { ThemeProvider } from './src/constants/ThemeProvider'; // Example for custom theming or context
import { AuthProvider } from './src/services/AuthService'; // Example for authentication context

export default function App() {
  // Dynamically load routes from the `app/` directory
  const ctx = require.context('./src/app');
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <ExpoRoot context={ctx} />
      </ThemeProvider>
    </AuthProvider>
  );
}
