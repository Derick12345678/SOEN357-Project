import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';
import { VideoCard } from '../components/VideoCard';
import { FlatGrid } from 'react-native-super-grid';

type VideosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Videos'>;

interface Props {
  navigation: VideosScreenNavigationProp;
}

export const VideosScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();

  const [videos, setVideos] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const fetchVideos = async (searchQuery: string, searching = false) => {
    setLoading(true);
    setIsSearching(searching);

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery
        )}&type=video&maxResults=12&key=AIzaSyAZGziQNViLBPCHz3Gy5cZPeQot24lUMsM`
      );

      const data = await res.json();

      const formatted = data.items
        .filter((item: any) => item.id.videoId)
        .map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high?.url,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

      setVideos(formatted);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const searchYouTube = () => {
    if (!query.trim()) return;
    fetchVideos(query, true);
  };

  useEffect(() => {
    fetchVideos('trending videos');
  }, []);

  return (
      
      <FlatGrid
        itemDimension={160 * fontSizeScale}
        data={videos}
        spacing={12 * fontSizeScale}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <View style={{paddingHorizontal: 16}}>
            <AccessibleText
              style={[
                styles.mainTitle,
                { fontSize: 22 * fontSizeScale, color: colors.text }
              ]}
            >
              Discover Videos
            </AccessibleText>

            <TextInput
              placeholder="Search YouTube..."
              placeholderTextColor="#888"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={searchYouTube}
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  padding: 12 * fontSizeScale,
                  borderRadius: 12 * fontSizeScale,
                  fontSize: 14 * fontSizeScale,
                },
              ]}
            />

            <AccessibleText
              style={[
                styles.sectionTitle,
                { fontSize: 16 * fontSizeScale, color: colors.text }
              ]}
            >
              {isSearching ? 'Search Results' : 'Recommended'}
            </AccessibleText>

            {loading && (
              <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
            )}
          </View>
        }
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            fontSizeScale={fontSizeScale}
            navigation={navigation}
          />
        )}
      />
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
});