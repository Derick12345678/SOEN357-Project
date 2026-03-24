import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { getColors } = useTheme();
  const colors = getColors();

  return (
    <ScrollView style={[globalStyles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <AccessibleText style={styles.greeting} bold>
        Welcome back!
      </AccessibleText>
      <AccessibleText style={styles.subtitle}>
        What would you like to do today?
      </AccessibleText>

      <View style={styles.buttonContainer}>
        <LargeButton
          title="📖 Read Articles"
          onPress={() => navigation.navigate('Articles')}
        />
        <LargeButton
          title="📺 Watch Videos"
          onPress={() => navigation.navigate('Videos')}
        />
        <LargeButton
          title="🧩 Play Games"
          onPress={() => navigation.navigate('Games')}
        />
      </View>

      <View style={{ marginTop: 40 }}>
        <LargeButton
          title="⚙️ Settings"
          colorType="secondary"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 36, // Exceptionally large for Home greeting
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
  },
});
