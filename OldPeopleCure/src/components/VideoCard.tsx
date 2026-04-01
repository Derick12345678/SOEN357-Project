import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { AccessibleText } from './AccessibleText';
import { useTheme } from '../utils/ThemeContext';

export const VideoCard = ({ video, style, fontSizeScale = 1, navigation, bgImage }: any) => {
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
          borderRadius: 20,
          height: 175 * fontSizeScale,
          borderColor: colors.border,
          borderWidth: colors.primary === '#FFFF00' ? 3 : 1,
        },
        style,
      ]}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      {bgImage && (
        <Image 
          source={bgImage} 
          style={styles.bgWatermark} 
          resizeMode="contain"
          tintColor="rgba(0,0,0,0.05)"
        />
      )}
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
            <AccessibleText baseSize={16} bold style={styles.playIcon}>Play</AccessibleText>
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
            zIndex: 1,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    borderRadius: 20,
  },
  bgWatermark: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: '40%',
    height: '60%',
    opacity: 0.08,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: '#FFF',
  },
});