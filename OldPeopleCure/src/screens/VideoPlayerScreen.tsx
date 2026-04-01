import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as Haptics from 'expo-haptics';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { mockVideos } from '../data/mockData';
import { useTheme } from '../utils/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'VideoPlayer'>;

export const VideoPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
const { videoId, title } = route.params;

  const { getColors } = useTheme();
  const colors = getColors();

  const [isPlaying, setIsPlaying] = useState(true);

  if (!videoId) {
    return (
      <View>
        <AccessibleText>Video Not Found</AccessibleText>
      </View>
    );
  }

  const getYoutubeId = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : '';
  };


  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setIsPlaying(false);
    }
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <AccessibleText bold style={styles.title}>
        {title}
      </AccessibleText>

      <View style={styles.videoWrapper}>
        <YoutubePlayer
          key={videoId} 
          height={250}
          play={isPlaying}
          videoId={videoId}
          onChangeState={onStateChange}
        />
      </View>

      <View style={styles.controls}>
        <LargeButton
          title="⬅️ Go Back"
          onPress={async () => {
            await Haptics.selectionAsync();
            navigation.goBack();
          }}
          colorType="secondary"
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },

  title: {
    marginBottom: 12,
    textAlign: 'center',
  },

  videoWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 40,
  },

  controls: {
    width: '100%',
  },
});