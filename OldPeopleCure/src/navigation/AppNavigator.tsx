import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../utils/ThemeContext';

import { HomeScreen } from '../screens/HomeScreen';
import { ArticlesScreen } from '../screens/ArticlesScreen';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { VideosScreen } from '../screens/VideosScreen';
import { VideoPlayerScreen } from '../screens/VideoPlayerScreen';
import { GamesScreen } from '../screens/GamesScreen';
import { MemoryGameScreen } from '../screens/MemoryGameScreen';
import { SudokuScreen } from '../screens/SudokuScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Articles: undefined;
  ArticleDetail: { articleId: string };
  Videos: undefined;
  VideoPlayer: { videoId: string, title: string };
  Games: undefined;
  MemoryGame: undefined;
  Sudoku: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { getColors } = useTheme();
  const colors = getColors();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.primary === '#FFFF00' ? '#000000' : '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Old People Cure' }} />
        <Stack.Screen name="Articles" component={ArticlesScreen} options={{ title: 'Articles' }} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} options={{ title: 'Reading' }} />
        <Stack.Screen name="Videos" component={VideosScreen} options={{ title: 'Videos' }} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ title: 'Playing Video' }} />
        <Stack.Screen name="Games" component={GamesScreen} options={{ title: 'Brain Games' }} />
        <Stack.Screen name="Sudoku" component={SudokuScreen} options={{ title: 'Sudoku' }} />
        <Stack.Screen name="MemoryGame" component={MemoryGameScreen} options={{ title: 'Memory Game' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
