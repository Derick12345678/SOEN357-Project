import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryGame'>;
type Difficulty = 'easy' | 'medium' | 'hard' | 'custom';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐸', '🐵', '🐯', '🦁'];

export const MemoryGameScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const [cards, setCards] = useState<any[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);

  const initGame = (mode: Difficulty, customList?: string[]) => {
    setDifficulty(mode);

    let selected: string[] = [];

    if (mode === 'easy') selected = EMOJIS.slice(0, 4);
    if (mode === 'medium') selected = EMOJIS.slice(0, 6);
    if (mode === 'hard') selected = EMOJIS.slice(0, 8);
    if (mode === 'custom') selected = customList || [];

    let newCards = [...selected, ...selected]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));

    setCards(newCards);
    setFlippedIndices([]);
    setIsWon(false);
    setStarted(true);
  };

  const flipCard = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped;
        const updatedCards = [...newCards];

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
      }, 700);
    }
  };

  const toggleEmoji = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter(e => e !== emoji));
    } else {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const buttonStyle = {
    width: 220,
    marginVertical: 6
  };

  if (!started && difficulty !== 'custom') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <View style={globalStyles.center}>
          <AccessibleText style={{ marginBottom: 20 }}>
            Choose difficulty:
          </AccessibleText>

          <LargeButton title="Easy" onPress={() => initGame('easy')} style={buttonStyle} />
          <LargeButton title="Medium" onPress={() => initGame('medium')} style={buttonStyle} />
          <LargeButton title="Hard" onPress={() => initGame('hard')} style={buttonStyle} />
          <LargeButton title="Custom" onPress={() => setDifficulty('custom')} style={buttonStyle} />
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (difficulty === 'custom' && !started) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
        <AccessibleText style={{ textAlign: 'center', marginBottom: 20 }}>
          Select emojis for your game:
        </AccessibleText>

        <View style={styles.grid}>
          {EMOJIS.map(e => {
            const selected = selectedEmojis.includes(e);
            return (
              <TouchableOpacity
                key={e}
                style={[
                  styles.card,
                  {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => toggleEmoji(e)}
              >
                <Text style={{ fontSize: 40, lineHeight: 45 }}>{e}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <LargeButton
            title="Start Custom Game"
            onPress={() => initGame('custom', selectedEmojis)}
            disabled={selectedEmojis.length < 2}
            style={buttonStyle}
          />
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
      {isWon ? (
        <View style={globalStyles.center}>
          <AccessibleText bold style={{ fontSize: 40, color: 'green', marginBottom: 20 }}>
            Well done!
          </AccessibleText>

          <LargeButton title="Play Again" onPress={() => initGame(difficulty!, selectedEmojis)} style={buttonStyle} />
          <LargeButton title="Change Mode" onPress={() => { setStarted(false); setDifficulty(null); }} style={buttonStyle} />

        </View>
      ) : (
        <View style={{ flex: 1, paddingBottom: 40 }}>
          <View style={styles.grid}>
            {cards.map((card, index) => (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      card.isFlipped || card.isMatched
                        ? colors.surface
                        : colors.primary,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => flipCard(index)}
              >
                <Text style={{ fontSize: 40, lineHeight: 45 }}>
                  {card.isFlipped || card.isMatched ? card.emoji : '❓'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    minWidth: 80,
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    margin: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});