import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Image, ImageSourcePropType, View } from 'react-native';
import { AccessibleText } from './AccessibleText';
import { useTheme } from '../utils/ThemeContext';

interface LargeButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colorType?: 'primary' | 'secondary';
  disabled?: boolean;
  bgImage?: ImageSourcePropType;
}

export const LargeButton: React.FC<LargeButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  colorType = 'primary', 
  disabled = false,
  bgImage
}) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const backgroundColor = disabled ? '#CBD5E1' : (colorType === 'primary' ? colors.primary : colors.surface);
  const textColor = disabled ? '#FFFFFF' : (colorType === 'primary' ? (colors.primary === '#FFFF00' ? '#000000' : '#FFFFFF') : colors.text);
  const borderColor = colors.primary === '#FFFF00' ? colors.border : (colorType === 'secondary' ? colors.border : 'transparent');
  const borderWidth = colors.primary === '#FFFF00' ? 2 : (colorType === 'secondary' ? 1 : 0);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, borderWidth },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
    >
      {bgImage && (
        <Image 
          source={bgImage} 
          style={styles.bgImage} 
          resizeMode="contain"
          tintColor={colorType === 'primary' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
        />
      )}
      <View style={styles.textWrapper}>
        <AccessibleText style={[{ color: textColor, textAlign: 'center' }, textStyle]} bold>
          {title}
        </AccessibleText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 64, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginVertical: 12, 
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: '50%',
    height: '100%',
    opacity: 0.1,
  },
  textWrapper: {
    zIndex: 1,
  },
});
