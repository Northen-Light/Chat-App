import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ChatsStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { fetchChatsListingdata } from '../network/fetchChatsListingData';

type ChatListingNavigationProp = NativeStackNavigationProp<
  ChatsStackParamList,
  'ChatListing'
>;

export type ChatListItem = {
  id: string;
  profileIcon: string;
  phoneNumber: string;
  lastMessage: {
    text: string;
    time: string;
  };
};

type ListItemProps = {
  item: ChatListItem;
};

const ChatListItem = memo(function ({ item }: ListItemProps) {
  const navigation = useNavigation<ChatListingNavigationProp>();
  const date = item.lastMessage.time.split('T')[0].split('-');

  return (
    <Pressable
      style={styles.chatItemContainer}
      onPress={() => navigation.navigate('ChatDetails')}
    >
      <Image style={styles.profileIcon} source={{ uri: item.profileIcon }} />
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.contactInfoText}>{item.phoneNumber}</Text>
          <Text style={styles.messageText}>{item.lastMessage.text}</Text>
        </View>
        <Text>{`${date[1]}/${date[2]}`}</Text>
      </View>
    </Pressable>
  );
});

export function ChatsListingPage() {
  const [chatsList, setChatsList] = useState<ChatListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const pageNumber = useRef<number>(0);
  const pageItems = useRef<number>(15);
  const isPageEnd = useRef<boolean>(false);

  const loadNextPageChats = useCallback(async () => {
    setLoading(true);

    const response = await fetchChatsListingdata(
      pageNumber.current,
      pageItems.current,
    );

    setChatsList(list => [...list, ...response.data]);
    setLoading(false);

    isPageEnd.current = response.pageEnd;
    pageNumber.current++;
  }, []);

  useEffect(() => {
    loadNextPageChats();
  }, [loadNextPageChats]);

  return (
    <View style={styles.chatsListingContainer}>
      <FlatList
        data={chatsList}
        keyExtractor={item => item.id}
        style={styles.flatlistContainer}
        onEndReachedThreshold={0.75}
        onEndReached={() => {
          if (!isPageEnd.current) {
            loadNextPageChats();
          }
        }}
        renderItem={({ item }) => <ChatListItem item={item} />}
      />
      <View style={styles.loadingViewContainer}>
        <ActivityIndicator
          size="large"
          color="blue"
          animating={loading === true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatsListingContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
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
    borderRadius: 8,
    marginVertical: 16,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  flatlistContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 32,
    borderColor: 'black',
  },
  rightContainer: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactInfoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageText: {
    fontWeight: '300',
  },
  loadingViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
