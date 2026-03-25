import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    flexDirection: "row"
  }
});
