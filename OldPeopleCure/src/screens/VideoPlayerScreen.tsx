import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
  
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) return <View><AccessibleText>Video Not Found</AccessibleText></View>;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      <View style={[styles.videoPlaceholder, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <AccessibleText style={{ fontSize: 80 }}>{video.thumbnail}</AccessibleText>
        <AccessibleText bold style={{ marginTop: 20, textAlign: 'center' }}>
          {isPlaying ? 'Video is playing...' : 'Video is paused'}
        </AccessibleText>
      </View>

      <View style={styles.controls}>
        <LargeButton 
          title={isPlaying ? "⏸️ Pause Video" : "▶️ Play Video"} 
          onPress={() => setIsPlaying(!isPlaying)} 
          colorType="primary"
        />
        <LargeButton 
          title="⬅️ Go Back" 
          onPress={() => navigation.goBack()} 
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
  videoPlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 40,
  },
  controls: {
    width: '100%',
  },
});
