import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
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
  const { videoId } = route.params;
  const video = mockVideos.find(v => v.id === videoId);

  const { getColors } = useTheme();
  const colors = getColors();

  // ✅ Autoplay ON
  const [isPlaying, setIsPlaying] = useState(true);

  if (!video) {
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

  const videoIdFromUrl = getYoutubeId(video.videoUrl);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setIsPlaying(false);
    }
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* 🔥 Title ABOVE video */}
      <AccessibleText bold style={styles.title}>
        {video.title}
      </AccessibleText>

      {/* 🎬 Video */}
      <View style={styles.videoWrapper}>
        <YoutubePlayer
          key={videoIdFromUrl} // 👈 important
          height={250}
          play={isPlaying}
          videoId={videoIdFromUrl}
          onChangeState={onStateChange}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {/* <LargeButton
          title={isPlaying ? "⏸️ Pause Video" : "▶️ Play Video"}
          onPress={async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setIsPlaying(prev => !prev);
          }}
          colorType="primary"
        /> */}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
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