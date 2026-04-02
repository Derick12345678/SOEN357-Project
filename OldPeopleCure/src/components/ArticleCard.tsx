import { Image, ImageSourcePropType, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
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
  compact?: boolean;
  bgImage?: ImageSourcePropType;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, style, compact = false, bgImage }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();

  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        compact && styles.compactCard,
        style,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: colors.primary === '#FFFF00' ? 3 : 1,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={() =>
        navigation.navigate("ArticleDetail", {
          articleId: article.id,
        })
      }
    >
      {bgImage && (
        <Image 
          source={bgImage} 
          style={styles.bgWatermark} 
          resizeMode="contain"
          tintColor="rgba(0,0,0,0.05)"
        />
      )}
      <Image 
        source={{ uri: article.thumbnail }} 
        style={compact ? styles.compactImage : styles.image} 
      />

      <View style={compact ? styles.compactTextContainer : styles.textContainer}>
        <AccessibleText 
          numberOfLines={2} 
          bold 
          style={{ color: colors.text, marginBottom: compact ? 4 : 8 * fontSizeScale, zIndex: 1 }} 
          baseSize={compact ? 16 : 18}
        >
          {article.title}
        </AccessibleText>

        <AccessibleText 
          numberOfLines={compact ? 1 : 2} 
          baseSize={compact ? 12 : 14} 
          style={{ color: colors.subtext, zIndex: 1 }}
        >
          {article.category}
        </AccessibleText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    height: 250,
  },
  compactCard: {
    flexDirection: 'row',
    height: 100,
  },
  bgWatermark: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: '40%',
    height: '80%',
    opacity: 0.08,
  },
  image: {
    width: "100%",
    height: 140,
  },
  compactImage: {
    width: 100,
    height: "100%",
  },
  textContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  compactTextContainer: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
});