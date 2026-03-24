import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { mockVideos } from '../data/mockData';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type VideosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Videos'>;

interface Props {
  navigation: VideosScreenNavigationProp;
}

export const VideosScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  return (
    <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <AccessibleText style={styles.header}>
        Choose a video to watch
      </AccessibleText>
      
      {mockVideos.map((video) => (
        <View key={video.id} style={styles.card}>
          <LargeButton
            title={`${video.thumbnail} ${video.title}`}
            onPress={() => navigation.navigate('VideoPlayer', { videoId: video.id })}
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
