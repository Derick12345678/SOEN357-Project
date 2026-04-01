import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { useTheme } from '../utils/ThemeContext';
import { VideoCard } from '../components/VideoCard';
import { FlatGrid } from 'react-native-super-grid';
import { mockVideos } from '../data/mockData';

type VideosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Videos'>;

interface Props {
  navigation: VideosScreenNavigationProp;
}

const CATEGORIES = ['All', 'Health', 'Science', 'Nature', 'Arts'];

const videosTexture = require('../../assets/textures/videos.png');

export const VideosScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All' 
    ? mockVideos 
    : mockVideos.filter(v => v.category === selectedCategory);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <FlatGrid
        itemDimension={160 * fontSizeScale}
        data={filteredVideos}
        spacing={12 * fontSizeScale}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <AccessibleText style={styles.title} bold>Videos</AccessibleText>

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

            <AccessibleText style={[styles.mainTitle, { fontSize: 22 * fontSizeScale, color: colors.text }]}>
              Recommended Documentaries
            </AccessibleText>
          </View>
        }
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            fontSizeScale={fontSizeScale}
            navigation={navigation}
            bgImage={videosTexture}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 16,
  },
  categoriesWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
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
  mainTitle: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 20,
    color: '#334155',
  },
});