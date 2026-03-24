import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../utils/ThemeContext';

interface AccessibleTextProps extends TextProps {
  style?: any;
  bold?: boolean;
}

export const AccessibleText: React.FC<AccessibleTextProps> = ({ children, style, bold, ...props }) => {
  const { fontSizeScale, getColors } = useTheme();
  const colors = getColors();

  // The design rules state minimum 18-22pt. This guarantees big default.
  const baseSize = 22; 

  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: baseSize * fontSizeScale,
          color: colors.text,
          fontWeight: bold ? 'bold' : 'normal',
          lineHeight: baseSize * fontSizeScale * 1.4,
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
