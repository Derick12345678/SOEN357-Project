import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { ArticleCard } from '../components/ArticleCard';
import { useTheme } from '../utils/ThemeContext';
import { mockArticles } from '../data/mockData';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

import { BackgroundGradient } from '../components/BackgroundGradient';

const booksTexture = require('../../assets/textures/books.png');
const videosTexture = require('../../assets/textures/videos.png');
const gamesTexture = require('../../assets/textures/games.png');

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();
  const featuredArticles = [mockArticles[0], mockArticles[1]];

  const canScroll = fontSizeScale > 1.2;

  return (
    <BackgroundGradient colors={['#F1F5F9', '#DBEAFE']}>
      <SafeAreaView style={{ flex: 1 }} edges = {['top']}>
        <ScrollView 
          style={{ flex: 1 }} 
          contentContainerStyle={styles.content}
          scrollEnabled={canScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <AccessibleText style={styles.greeting} bold>
              Welcome back!
            </AccessibleText>
            <AccessibleText style={styles.subtitle}>
              What would you like to do today?
            </AccessibleText>
          </View>

          <View style={styles.section}>
            <AccessibleText style={styles.sectionTitle} bold>Featured Content</AccessibleText>
            {featuredArticles.map((article) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                compact 
                bgImage={booksTexture} 
                style={{ marginBottom: 12 }} 
              />
            ))}
          </View>

          <View style={styles.section}>
            <AccessibleText style={styles.sectionTitle} bold>Categories</AccessibleText>
            <View style={styles.buttonRow}>
              <LargeButton
                title="Articles"
                onPress={() => navigation.navigate('Articles')}
                style={styles.rowButton}
                textStyle={{ fontSize: 16 }}
                bgImage={booksTexture}
              />
              <LargeButton
                title="Videos"
                onPress={() => navigation.navigate('Videos')}
                style={styles.rowButton}
                textStyle={{ fontSize: 16 }}
                bgImage={videosTexture}
              />
            </View>
            <View style={styles.buttonRow}>
              <LargeButton
                title="Games"
                onPress={() => navigation.navigate('Games')}
                style={styles.rowButton}
                textStyle={{ fontSize: 16 }}
                bgImage={gamesTexture}
              />
              <LargeButton
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
                style={styles.rowButton}
                colorType="primary"
                textStyle={{ fontSize: 16 }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundGradient>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 28, 
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#334155',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  rowButton: {
    flex: 1,
    marginVertical: 0,
    minHeight: 56,
  },
});
