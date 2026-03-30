import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { AccessibleText } from './AccessibleText';
import { useTheme } from '../utils/ThemeContext';

interface LargeButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colorType?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const LargeButton: React.FC<LargeButtonProps> = ({ title, onPress, style, textStyle, colorType = 'primary', disabled = false }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  const backgroundColor = disabled ? '#A9A9A9' : (colorType === 'primary' ? colors.primary : colors.surface);
  const textColor = disabled ? '#FFFFFF' : (colorType === 'primary' ? (colors.primary === '#FFFF00' ? '#000000' : '#FFFFFF') : colors.text);
  const borderColor = colorType === 'secondary' ? colors.primary : 'transparent';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, borderWidth: colorType === 'secondary' ? 3 : 0 },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
    >
      <AccessibleText style={[{ color: textColor, textAlign: 'center' }, textStyle]} bold>
        {title}
      </AccessibleText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 80, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginVertical: 12, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
