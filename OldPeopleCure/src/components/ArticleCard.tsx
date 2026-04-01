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
  const { getColors, fontSizeScale } = useTheme();
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

      <View style={styles.textContainer}>
        <AccessibleText numberOfLines={2} bold style={{ color: colors.text, marginBottom: 8 * fontSizeScale }} baseSize={18}>
          {article.title}
        </AccessibleText>

        <AccessibleText numberOfLines={2} baseSize={14} style={{ color: '#888' }}>
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
    height: 250,
  },
  image: {
    width: "100%",
    height: 140,
  },
  textContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
});