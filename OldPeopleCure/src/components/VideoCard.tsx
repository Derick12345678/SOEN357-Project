import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AccessibleText } from './AccessibleText';
import { useTheme } from '../utils/ThemeContext';

export const VideoCard = ({ video, style, fontSizeScale = 1, navigation }: any) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const imageHeight = 110 * fontSizeScale;

  const getYoutubeId = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : '';
  };

  const handlePress = () => {
    const youtubeId = getYoutubeId(video.videoUrl);

    navigation.navigate('VideoPlayer', {
      videoId: youtubeId,
      title: video.title,
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: 14 * fontSizeScale,
          height: 175 * fontSizeScale,
        },
        style,
      ]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      <View>
        <Image
          source={{ uri: video.thumbnail }}
          style={{
            width: '100%',
            height: imageHeight,
          }}
          resizeMode="cover"
        />
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <AccessibleText style={styles.playIcon}>▶</AccessibleText>
          </View>
        </View>
      </View>

      <View style={{ padding: 10 * fontSizeScale, flex: 1, justifyContent: 'center' }}>
        <AccessibleText
          numberOfLines={2}
          style={{
            fontSize: 13 * fontSizeScale,
            fontWeight: '600',
            color: colors.text,
          }}
        >
          {video.title}
        </AccessibleText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    elevation: 3,
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFF',
    fontSize: 24,
    marginLeft: 4, 
  },
});