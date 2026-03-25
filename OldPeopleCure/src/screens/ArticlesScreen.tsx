import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { mockArticles } from '../data/mockData';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';
import { Image, Pressable } from 'react-native';
import { ArticleCard } from '../components/ArticleCard';
import { useResponsiveGrid } from '../hooks/useResponsiveGrid';

type ArticlesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Articles'>;

interface Props {
  navigation: ArticlesScreenNavigationProp;
}

export const ArticlesScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();
  const { itemWidth, gap } = useResponsiveGrid({
    minItemWidth: 160,
    gap: 10,
    horizontalPadding: 48
  });

  return (
    <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <AccessibleText style={styles.header}>
        Choose an article to read
      </AccessibleText>


      <View style={globalStyles.flexWrap}>
        {mockArticles.map((article) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            style={{
              width: itemWidth,
              marginBottom: gap
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    elevation: 4, // Android shadow
  },

  image: {
    width: '100%',
    height: 180,
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  title: {
    color: '#fff',
    marginBottom: 4,
  },

  category: {
    color: '#ddd',
    fontSize: 14,
  },
});