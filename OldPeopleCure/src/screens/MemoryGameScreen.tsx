import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryGame'>;

const EMOTICONS = ['🐶', '🐱', '🐭', '🐹']; // 4 pairs representing 8 cards

export const MemoryGameScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();
  
  const [cards, setCards] = useState<{ id: number, emoji: string, isFlipped: boolean, isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [started, setStarted] = useState(false);

  const initGame = () => {
    let newCards = [...EMOTICONS, ...EMOTICONS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }));
    setCards(newCards);
    setFlippedIndices([]);
    setIsWon(false);
    setStarted(true);
  };

  const flipCard = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
    
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped;
        const updatedCards = [...cards];
        if (updatedCards[first].emoji === updatedCards[second].emoji) {
          updatedCards[first].isMatched = true;
          updatedCards[second].isMatched = true;
        } else {
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
        }
        setCards(updatedCards);
        setFlippedIndices([]);

        if (updatedCards.every(c => c.isMatched)) {
          setIsWon(true);
        }
      }, 1000); // Wait 1 sec before flipping back so user can process mentally
    }
  };

  if (!started) {
    return (
      <View style={[globalStyles.container, globalStyles.center, { backgroundColor: colors.background }]}>
        <AccessibleText style={{ textAlign: 'center', marginBottom: 20 }}>
          Find the matching pairs of animals! Tap two cards to turn them over.
        </AccessibleText>
        <LargeButton title="Start Game" onPress={initGame} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { backgroundColor: colors.background }]}>
      {isWon ? (
        <View style={globalStyles.center}>
          <AccessibleText bold style={{ fontSize: 40, color: 'green', marginBottom: 20 }}>Well done!</AccessibleText>
          <LargeButton title="Play Again" onPress={initGame} />
          <LargeButton title="Go Back" onPress={() => navigation.goBack()} colorType="secondary" />
        </View>
      ) : (
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <TouchableOpacity 
              key={card.id}
              style={[
                styles.card,
                { backgroundColor: card.isFlipped || card.isMatched ? colors.surface : colors.primary,
                  borderColor: colors.border }
              ]}
              onPress={() => flipCard(index)}
              activeOpacity={0.8}
            >
              <AccessibleText style={{ fontSize: 50 }}>
                {card.isFlipped || card.isMatched ? card.emoji : '❓'}
              </AccessibleText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 16,
  },
  card: {
    minWidth: 100,
    minHeight: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    margin: 8,
  },
});
