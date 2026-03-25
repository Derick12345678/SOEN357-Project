import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { AccessibleText } from "./AccessibleText";
import { useTheme } from "../utils/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Article } from "../data/mockData";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Articles"
>;

interface ArticleCardProps {
  article: Article;
  style?: StyleProp<ViewStyle>;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, style }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const navigation = useNavigation<NavigationProp>();

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
      onPress={() =>
        navigation.navigate("ArticleDetail", {
          articleId: article.id,
        })
      }
    >
      <Image source={{ uri: article.thumbnail }} style={styles.image} />

      <View style={styles.overlay}>
        <AccessibleText bold style={styles.title} baseSize={22}>
          {article.title}
        </AccessibleText>

        <AccessibleText style={styles.category}>
          {article.category}
        </AccessibleText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 360,
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  title: {
    color: "#fff",
    marginBottom: 4,
  },

  category: {
    color: "#ddd",
    fontSize: 14,
  },
});