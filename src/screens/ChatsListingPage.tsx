import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { ChatsStackParamList } from '../navigation/types';
import { chatsList } from '../mock/chatsListdata';
import { useNavigation } from '@react-navigation/native';
import { memo } from 'react';

type ChatListingNavigationProp = NativeStackNavigationProp<
  ChatsStackParamList,
  'ChatListing'
>;

type ListItem = {
  id: string;
  profileIcon: string;
  phoneNumber: string;
  lastMessage: {
    text: string;
    time: string;
  };
};

type ListItemProps = {
  item: ListItem;
};

const ListItem = memo(function ({ item }: ListItemProps) {
  const navigation = useNavigation<ChatListingNavigationProp>();

  return (
    <Pressable
      style={styles.chatItemContainer}
      onPress={() => navigation.navigate('ChatDetails')}
    >
      <Text>{item.phoneNumber}</Text>
      <Text>{item.lastMessage.text}</Text>
    </Pressable>
  );
});

export function ChatsListingPage() {
  return (
    <View style={styles.chatsListingContainer}>
      <FlatList
        style={styles.flatlistContainer}
        data={chatsList}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatsListingContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 16,
  },
  headerText: {
    fontSize: 24,
    color: 'black',
  },
  chatItemContainer: {
    height: 60,
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 16,
    borderColor: 'black',
  },
  flatlistContainer: {
    width: '100%',
  },
});
