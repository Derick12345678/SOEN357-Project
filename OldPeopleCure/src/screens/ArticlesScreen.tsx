import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { mockArticles } from '../data/mockData';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';
import { ArticleCard } from '../components/ArticleCard';
import { FlatGrid } from 'react-native-super-grid';

type ArticlesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Articles'>;

interface Props {
  navigation: ArticlesScreenNavigationProp;
}

const CATEGORIES = ['All', 'Health', 'History', 'Science', 'Nature'];

const booksTexture = require('../../assets/textures/books.png');

export const ArticlesScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? mockArticles 
    : mockArticles.filter(a => a.category === selectedCategory);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <FlatGrid
        data={filteredArticles}
        itemDimension={160 * fontSizeScale}
        spacing={12 * fontSizeScale}
        contentContainerStyle={{paddingBottom: 40 }}

        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <AccessibleText style={[styles.title, { color: colors.text }]} bold>Articles</AccessibleText>

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
        }

        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            bgImage={booksTexture}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
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
});