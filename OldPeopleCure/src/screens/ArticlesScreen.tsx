import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { mockArticles } from '../data/mockData';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type ArticlesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Articles'>;

interface Props {
  navigation: ArticlesScreenNavigationProp;
}

export const ArticlesScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  return (
    <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <AccessibleText style={styles.header}>
        Choose an article to read
      </AccessibleText>
      
      {mockArticles.map((article) => (
        <View key={article.id} style={styles.card}>
          <LargeButton
            title={`📖 ${article.title}`}
            onPress={() => navigation.navigate('ArticleDetail', { articleId: article.id })}
            colorType="secondary"
          />
        </View>
      ))}
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
    marginBottom: 10,
  },
});
