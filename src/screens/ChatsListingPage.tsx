import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ChatsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ChatsStackParamList, 'ChatListing'>;

export function ChatsListingPage({ navigation }: Props) {
  return (
    <View style={styles.chatsListingContainer}>
      <Text style={styles.headerText}> Chats Listing Page</Text>
      <View style={styles.separator} />
      <Button
        title="Go to chat details"
        onPress={() => navigation.navigate('ChatDetails')}
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
