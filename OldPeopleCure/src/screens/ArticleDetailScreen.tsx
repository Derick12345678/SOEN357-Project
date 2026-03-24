import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
  const { getColors, fontSizeScale, setFontSizeScale } = useTheme();
  const colors = getColors();

  if (!article) return <View><AccessibleText>Not Found</AccessibleText></View>;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Utility Bar */}
      <View style={[styles.utilsBar, { backgroundColor: colors.surface, borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
        <AccessibleText bold>Text Size:</AccessibleText>
        <View style={styles.row}>
          <LargeButton title="A-" onPress={() => setFontSizeScale(Math.max(0.8, fontSizeScale - 0.1))} style={styles.smallBtn} />
          <View style={{ width: 10 }} />
          <LargeButton title="A+" onPress={() => setFontSizeScale(Math.min(1.6, fontSizeScale + 0.1))} style={styles.smallBtn} />
        </View>
      </View>

      <ScrollView style={[globalStyles.container]} contentContainerStyle={styles.content}>
        <AccessibleText bold style={styles.title}>{article.title}</AccessibleText>
        <AccessibleText style={styles.category}>Category: {article.category}</AccessibleText>
        
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        
        <AccessibleText style={styles.body}>{article.content}</AccessibleText>
        
        <LargeButton 
          title="⬅️ Go Back" 
          onPress={() => navigation.goBack()} 
          colorType="secondary"
          style={{ marginTop: 40 }}
        />
      </ScrollView>
    </View>
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
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  category: {
    marginBottom: 20,
    fontStyle: 'italic',
  },
  divider: {
    height: 2,
    marginVertical: 20,
  },
  body: {
    marginTop: 10,
  },
});
