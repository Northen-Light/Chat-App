import { View, Text, StyleSheet } from 'react-native';

export function ChatDetailsScreen() {
  return (
    <View style={styles.chatDetailsContainer}>
      <Text style={styles.headerText}>Chat Details Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chatDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: 'black',
  },
});
