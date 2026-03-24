import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type GamesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Games'>;

interface Props {
  navigation: GamesScreenNavigationProp;
}

export const GamesScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  return (
    <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <AccessibleText style={styles.header}>
        Choose a game to play
      </AccessibleText>

      <LargeButton
        title="📝 Play Sudoku"
        onPress={() => navigation.navigate('Sudoku')}
        colorType="primary"
      />
      
      <LargeButton
        title="🃏 Play Memory Game"
        onPress={() => navigation.navigate('MemoryGame')}
        colorType="primary"
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
    textAlign: 'center',
    fontSize: 28,
  },
});
