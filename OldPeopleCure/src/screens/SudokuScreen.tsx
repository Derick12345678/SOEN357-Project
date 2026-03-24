import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Sudoku'>;

export const SudokuScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const [started, setStarted] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [missingNum, setMissingNum] = useState<number | null>(null);

  // Very simplified 4x4 mock sudoku. 
  const initialGrid = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, null, 4, 3], // cleverly missing '1'
    [4, 3, 2, 1]
  ];

  const startGame = () => {
    setIsWon(false);
    setMissingNum(null);
    setStarted(true);
  };

  const handlePress = (num: number) => {
    if (num === 1) {
      setMissingNum(1);
      setTimeout(() => setIsWon(true), 500); // 0.5s pause before showing Win message
    } else {
      // Intentionally avoiding visual "Error" states for older users to prevent discouragement.
      // E.g. simply do nothing or perhaps play a very subtle indicator if needed. We skip it here.
    }
  };

  if (!started) {
    return (
      <View style={[globalStyles.container, globalStyles.center, { backgroundColor: colors.background }]}>
        <AccessibleText style={{ textAlign: 'center', marginBottom: 20 }}>
          Welcome to extremely simple Sudoku. 
          Fill in the single missing empty square to win!
        </AccessibleText>
        <LargeButton title="Start Easy Game" onPress={startGame} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.background }]}>
      {isWon ? (
        <View style={globalStyles.center}>
          <AccessibleText bold style={{ fontSize: 40, color: 'green', marginBottom: 20 }}>Well done!</AccessibleText>
          <LargeButton title="Play Again" onPress={startGame} />
          <LargeButton title="Go Back" onPress={() => navigation.goBack()} colorType="secondary" />
        </View>
      ) : (
        <View style={globalStyles.center}>
          <AccessibleText style={{ marginBottom: 20 }}>What is the missing number in the third row?</AccessibleText>
          <View style={[styles.board, { borderColor: colors.text }]}>
            {initialGrid.map((row, rIndex) => (
              <View key={`r-${rIndex}`} style={styles.row}>
                {row.map((cell, cIndex) => (
                  <View 
                    key={`c-${cIndex}`} 
                    style={[styles.cell, { borderColor: colors.border, backgroundColor: cell === null ? '#FFFACD' : colors.surface }]}
                  >
                    <AccessibleText style={{ fontSize: 32 }}>
                      {cell === null ? (missingNum !== null ? missingNum : '?') : cell}
                    </AccessibleText>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.numberPad}>
            {[1, 2, 3, 4].map(num => (
              <LargeButton 
                key={num} 
                title={num.toString()} 
                onPress={() => handlePress(num)}
                style={{ minHeight: 60, paddingHorizontal: 20, margin: 5 }}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    borderWidth: 4,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    minWidth: 70,
    minHeight: 70,
    padding: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPad: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
