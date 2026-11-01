import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';

export function ChatsListingPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.chatsListingContainer}>
      <Text style={styles.headerText}> Chats Listing Page</Text>
      <View style={styles.separator} />
      <Button
        title="Go to chat details"
        onPress={() => navigation.navigate('chat-details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatsListingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 16,
  },
  headerText: {
    fontSize: 24,
    color: 'black',
  },
});
