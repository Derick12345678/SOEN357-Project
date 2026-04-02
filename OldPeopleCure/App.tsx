import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/utils/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
