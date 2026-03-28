import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { AccessibleText } from "./AccessibleText";
import { useTheme } from "../utils/ThemeContext";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Video } from "../data/mockData";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Articles"
>;

interface VideoCardProps {
  video: Video;
  style?: StyleProp<ViewStyle>;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, style }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const navigation = useNavigation<NavigationProp>();

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    navigation.navigate("VideoPlayer", {
      videoId: video.id,
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        style,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={handlePress}
    >
      <Image source={{ uri: video.thumbnail }} style={styles.image} />

      <View style={styles.playContainer}>
        <AccessibleText style={styles.playIcon}>▶</AccessibleText>
      </View>

      <View style={styles.overlay}>
        <AccessibleText bold style={styles.title} baseSize={20}>
          {video.title}
        </AccessibleText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 200,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  title: {
    color: "#fff",
  },

  playContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 50,
    height: 50,
    marginTop: -25,
    marginLeft: -25,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  playIcon: {
    color: "#fff",
    fontSize: 18,
  },
});