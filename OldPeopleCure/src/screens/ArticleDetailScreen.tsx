import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AccessibleText } from '../components/AccessibleText';
import { LargeButton } from '../components/LargeButton';
import { mockArticles } from '../data/mockData';
import { useTheme } from '../utils/ThemeContext';
import { globalStyles } from '../styles/GlobalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'ArticleDetail'>;

export const ArticleDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { articleId } = route.params;
  const article = mockArticles.find(a => a.id === articleId);
  const { getColors, fontSizeScale, increaseFont, decreaseFont, decreaseFontButtonDisabled, increaseFontButtonDisabled } = useTheme();
  const colors = getColors();

  if (!article) return <View><AccessibleText>Not Found</AccessibleText></View>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <View style={{ flex: 1 }}>
      {/* Utility Bar */}

      <ScrollView style={[globalStyles.container]} contentContainerStyle={styles.content}>
        <AccessibleText baseSize={32} bold style={styles.title}>{article.title}</AccessibleText>
        <AccessibleText style={styles.category}>Category: {article.category}</AccessibleText>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <AccessibleText style={styles.body}>{article.content}</AccessibleText>


      </ScrollView>
      <View style={[styles.utilsBar, { backgroundColor: colors.surface, borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
        <AccessibleText bold>Text Size:</AccessibleText>
        <View style={styles.row}>
          <LargeButton title="A-" onPress={decreaseFont} style={styles.smallBtn} disabled={decreaseFontButtonDisabled} />
          <View style={{ width: 10 }} />
          <LargeButton title="A+" onPress={increaseFont} style={styles.smallBtn} disabled={increaseFontButtonDisabled} />
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  utilsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  smallBtn: {
    minHeight: 48,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  content: {
    paddingBottom: 60,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    marginBottom: 8, 
    color: '#1E293B',
  },
  category: {
    marginBottom: 20,
    fontSize: 16,
    color: '#64748B',
  },
  divider: {
    height: 2,
    marginVertical: 20,
  },
  body: {
    marginTop: 10,
  },
});
