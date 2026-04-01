import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Sudoku'>;
type Difficulty = 'easy' | 'medium' | 'hard';

type Cell = {
  value: number | null;
  fixed: boolean;
};

const easyPuzzle = {
  puzzle: [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, null, 4, 3],
    [4, 3, 2, 1],
  ],
  solution: [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ],
};

const mediumPuzzle = {
  puzzle: [
    [1, null, 3, 4],
    [null, 4, 1, 2],
    [2, null, 4, null],
    [4, 3, null, 1],
  ],
  solution: [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ],
};

const hardPuzzle = {
  puzzle: [
    [null, 2, null, 4],
    [3, null, 1, null],
    [null, 1, null, 3],
    [4, null, 2, null],
  ],
  solution: [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ],
};

export const SudokuScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const [started, setStarted] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);

  const createBoard = (puzzle: (number | null)[][]): Cell[][] => {
    return puzzle.map(row =>
      row.map(cell => ({
        value: cell,
        fixed: cell !== null,
      }))
    );
  };

  const startGame = (mode: Difficulty) => {
    let game;

    if (mode === 'easy') game = easyPuzzle;
    else if (mode === 'medium') game = mediumPuzzle;
    else game = hardPuzzle;

    setDifficulty(mode);
    setBoard(createBoard(game.puzzle));
    setSolution(game.solution);
    setStarted(true);
    setIsWon(false);
    setSelectedCell(null);
  };

  const checkWin = (updatedBoard: Cell[][]) => {
    const won = updatedBoard.every((row, rIndex) =>
      row.every((cell, cIndex) => cell.value === solution[rIndex][cIndex])
    );

    if (won) {
      setTimeout(() => setIsWon(true), 300);
    }
  };

  const handleCellPress = (row: number, col: number) => {
    if (board[row][col].fixed) return;
    setSelectedCell({ row, col });
  };

  const handleNumberPress = (num: number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (board[row][col].fixed) return;

    const updatedBoard = board.map((r, rIndex) =>
      r.map((cell, cIndex) =>
        rIndex === row && cIndex === col
          ? { ...cell, value: num }
          : cell
      )
    );

    setBoard(updatedBoard);
    checkWin(updatedBoard);
  };

  const clearSelectedCell = () => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    if (board[row][col].fixed) return;

    const updatedBoard = board.map((r, rIndex) =>
      r.map((cell, cIndex) =>
        rIndex === row && cIndex === col
          ? { ...cell, value: null }
          : cell
      )
    );

    setBoard(updatedBoard);
  };

  if (!started) {
    return (
      <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
        <View style={globalStyles.center}>
          <AccessibleText style={{ textAlign: 'center', marginBottom: 20 }}>
            Choose a Sudoku difficulty.
          </AccessibleText>

          <LargeButton
            title="Easy"
            onPress={() => startGame('easy')}
            style={{ width: 220, marginVertical: 6 }}
          />
          <LargeButton
            title="Medium"
            onPress={() => startGame('medium')}
            style={{ width: 220, marginVertical: 6 }}
          />
          <LargeButton
            title="Hard"
            onPress={() => startGame('hard')}
            style={{ width: 220, marginVertical: 6 }}
          />
          <LargeButton
            title="Go Back"
            onPress={() => navigation.goBack()}
            colorType="secondary"
            style={{ width: 220, marginVertical: 6 }}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {isWon ? (
        <View style={globalStyles.center}>
          <AccessibleText bold style={{ fontSize: 40, color: 'green', marginBottom: 20 }}>
            Well done!
          </AccessibleText>
          <LargeButton
            title="Play Again"
            onPress={() => startGame(difficulty!)}
            style={{ width: 220, marginVertical: 6 }}
          />
          <LargeButton
            title="Change Mode"
            onPress={() => {
              setStarted(false);
              setDifficulty(null);
              setIsWon(false);
              setSelectedCell(null);
            }}
            style={{ width: 220, marginVertical: 6 }}
          />
          <LargeButton
            title="Go Back"
            onPress={() => navigation.goBack()}
            colorType="secondary"
            style={{ width: 220, marginVertical: 6 }}
          />
        </View>
      ) : (
        <View style={globalStyles.center}>
          <AccessibleText style={{ marginBottom: 20 }}>
            {difficulty === 'easy'
              ? 'Easy Mode'
              : difficulty === 'medium'
              ? 'Medium Mode'
              : 'Hard Mode'}
          </AccessibleText>

          <View style={[styles.board, { borderColor: colors.text }]}>
            {board.map((row, rIndex) => (
              <View key={`r-${rIndex}`} style={styles.row}>
                {row.map((cell, cIndex) => {
                  const isSelected =
                    selectedCell?.row === rIndex && selectedCell?.col === cIndex;

                  return (
                    <TouchableOpacity
                      key={`c-${cIndex}`}
                      onPress={() => handleCellPress(rIndex, cIndex)}
                      activeOpacity={cell.fixed ? 1 : 0.8}
                      style={[
                        styles.cell,
                        {
                          borderColor: colors.border,
                          backgroundColor: cell.fixed
                            ? colors.surface
                            : isSelected
                            ? '#FFF2A8'
                            : '#FFFACD',
                        },
                      ]}
                    >
                      <AccessibleText
                        style={{
                          fontSize: 32,
                          opacity: cell.value === null ? 0.5 : 1,
                        }}
                      >
                        {cell.value ?? '?'}
                      </AccessibleText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          <View style={styles.numberPad}>
            {[1, 2, 3, 4].map(num => (
              <LargeButton
                key={num}
                title={num.toString()}
                onPress={() => handleNumberPress(num)}
                style={{ width: 70, minHeight: 60, margin: 5 }}
              />
            ))}
            <LargeButton
              title="Clear"
              onPress={clearSelectedCell}
              colorType="secondary"
            />
          </View>

          <LargeButton
            title="Change Mode"
            onPress={() => {
              setStarted(false);
              setDifficulty(null);
              setIsWon(false);
              setSelectedCell(null);
            }}
            style={{ width: 220, marginTop: 20 }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },
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
    alignItems: 'center',
  },
});