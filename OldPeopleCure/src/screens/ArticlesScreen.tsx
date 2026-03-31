import React from 'react';
import { View, StyleSheet } from 'react-native';
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

export const ArticlesScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();

  return (
      <FlatGrid
        data={mockArticles}
        itemDimension={160 * fontSizeScale}
        spacing={12 * fontSizeScale}
        contentContainerStyle={{paddingBottom: 40 }}

        ListHeaderComponent={
          <AccessibleText style={[styles.header, { fontSize: 18 * fontSizeScale }]}>
            Choose an article to read
          </AccessibleText>
        }

        renderItem={({ item }) => (
          <ArticleCard
            article={item}
          />
        )}
      />
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
});