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
        },
        style,
      ]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      <Image
        source={{ uri: video.thumbnail }}
        style={{
          width: '100%',
          height: imageHeight,
        }}
        resizeMode="cover"
      />

      <View style={{ padding: 10 * fontSizeScale }}>
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
});