import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { useTheme } from '../utils/ThemeContext';
import { FlatGrid } from 'react-native-super-grid';
import { GameCard } from '../components/GameCard';
import { mockGames } from '../data/mockData';
import { BackgroundGradient } from '../components/BackgroundGradient';

type GamesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Games'>;

interface Props {
  navigation: GamesScreenNavigationProp;
}

const gamesTexture = require('../../assets/textures/games.png');
const CATEGORIES = ['All', 'Logic', 'Memory'];

export const GamesScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredGames = selectedCategory === 'All' 
    ? mockGames 
    : mockGames.filter(g => g.category === selectedCategory);

  return (
    <BackgroundGradient colors={['#F1F5F9', '#E0F2FE']}>
      <SafeAreaView style={{ flex: 1 }} edges = {['top']}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content}>
          <View style={styles.headerContainer}>
            <AccessibleText style={styles.title} bold>Games</AccessibleText>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesWrapper} contentContainerStyle={styles.categoriesContent}>
              {CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    activeOpacity={0.7}
                    style={[
                      styles.categoryPill,
                      {
                        backgroundColor: isActive ? colors.primary : colors.surface,
                        borderColor: isActive ? colors.primary : colors.border,
                      }
                    ]}
                  >
                    <AccessibleText 
                      baseSize={15} 
                      style={{ color: isActive ? (colors.primary === '#FFFF00' ? '#000000' : '#FFFFFF') : colors.text }}
                      bold={isActive}
                    >
                      {cat}
                    </AccessibleText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.listContainer}>
            {filteredGames.map((item) => (
              <GameCard
                key={item.id}
                game={item}
                compact
                bgImage={gamesTexture}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    color: '#0F172A',
    marginBottom: 24,
  },
  categoriesWrapper: {
    flexDirection: 'row',
  },
  categoriesContent: {
    paddingRight: 16,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    marginRight: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});
