import React from 'react';
import { View, StyleSheet } from 'react-native';
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

export const VideosScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();

  return (
      <FlatGrid
        itemDimension={160 * fontSizeScale}
        data={mockVideos}
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
              Recommended Documentaries
            </AccessibleText>
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
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});