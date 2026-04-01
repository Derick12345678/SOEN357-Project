import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/utils/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
