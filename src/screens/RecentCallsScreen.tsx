import { View, Text, StyleSheet } from 'react-native';

export function RecentCallsScreen() {
  return (
    <View style={styles.recentCallsContainer}>
      <Text style={styles.headerText}> Recent Calls Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recentCallsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'black',
  },
});
