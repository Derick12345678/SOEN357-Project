import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

interface AccessibleTextProps extends TextProps {
  style?: any;
  bold?: boolean;
  baseSize?: number;
}

export const AccessibleText: React.FC<AccessibleTextProps> = ({ children, style, bold, baseSize = 22, ...props }) => {
  const { fontSizeScale, getColors } = useTheme();
  const colors = getColors();

  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: baseSize * fontSizeScale,
          color: colors.text,
          fontWeight: bold ? 'bold' : 'normal',
          lineHeight: baseSize * fontSizeScale * 1.8, // if too small then some text will be cut off
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    // line-height is now scaled dynamically inline to prevent cut-offs
  },
});
