import React from 'react';
import { View, StyleSheet, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

export const SettingsScreen: React.FC = () => {
  const { highContrast, setHighContrast, getColors, decreaseFont, increaseFont } = useTheme();
  const colors = getColors();


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <AccessibleText style={[styles.description, { color: colors.subtext }]}>
        Adjust the app to make it easier for you to use.
      </AccessibleText>
      
      <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.primary === '#FFFF00' ? colors.border : 'transparent', borderWidth: colors.primary === '#FFFF00' ? 2 : 1, elevation: colors.primary === '#FFFF00' ? 0 : 2 }]}>
        <AccessibleText bold>Text Size</AccessibleText>
        <AccessibleText style={{ fontSize: 18, marginTop: 8 }}>
          Sample text to see size.
        </AccessibleText>
        <View style={styles.row}>
          <LargeButton title="Make Smaller" onPress={decreaseFont} colorType="secondary" style={styles.flexBtn} />
          <View style={{ width: 16 }} />
          <LargeButton title="Make Bigger" onPress={increaseFont} colorType="primary" style={styles.flexBtn} />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.primary === '#FFFF00' ? colors.border : 'transparent', borderWidth: colors.primary === '#FFFF00' ? 2 : 1, elevation: colors.primary === '#FFFF00' ? 0 : 2 }]}>
        <AccessibleText bold style={{ marginBottom: 16 }}>High Contrast Mode</AccessibleText>
        <View style={[globalStyles.row, { justifyContent: 'space-between' }]}>
          <AccessibleText>{highContrast ? 'On' : 'Off'}</AccessibleText>
          <Switch
            value={highContrast}
            onValueChange={setHighContrast}
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={highContrast ? '#FFFFFF' : '#f4f3f4'}
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginRight: 10 }} 
          />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  description: {
    marginBottom: 30,
    fontSize: 18,
  },
  section: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderColor: '#E2E8F0', // Adding standard fallback border
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 16,
  },
  flexBtn: {
    flex: 1,
  },
});
