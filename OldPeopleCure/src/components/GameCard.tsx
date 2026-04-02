import React from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";
import { AccessibleText } from "./AccessibleText";
import { useTheme } from "../utils/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Game } from "../data/mockData";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Games">;

interface GameCardProps {
  game: Game;
  bgImage?: ImageSourcePropType;
  compact?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, bgImage, compact = false }) => {
  const { getColors, fontSizeScale } = useTheme();
  const colors = getColors();

  const navigation = useNavigation<NavigationProp>();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        compact && styles.compactCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: colors.primary === '#FFFF00' ? 3 : 1,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      onPress={() => navigation.navigate(game.routeName as any)}
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
        source={{ uri: game.thumbnail }} 
        style={compact ? styles.compactImage : styles.image} 
      />

      <View style={compact ? styles.compactTextContainer : styles.textContainer}>
        <AccessibleText 
          numberOfLines={1} 
          bold 
          style={{ color: colors.text, marginBottom: compact ? 4 : 4 * fontSizeScale, zIndex: 1 }} 
          baseSize={compact ? 16 : 18}
        >
          {game.title}
        </AccessibleText>

        <AccessibleText 
          numberOfLines={1} 
          baseSize={compact ? 12 : 14} 
          style={{ color: colors.subtext, zIndex: 1 }}
        >
          {game.category}
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
    height: 180,
  },
  compactCard: {
    flexDirection: 'row',
    height: 100,
  },
  bgWatermark: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: '40%',
    height: '60%',
    opacity: 0.08,
  },
  image: {
    width: "100%",
    height: 110,
  },
  compactImage: {
    width: 100,
    height: "100%",
  },
  textContainer: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  compactTextContainer: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
});
