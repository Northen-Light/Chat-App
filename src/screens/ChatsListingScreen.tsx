import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ChatsStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { fetchChatsListingData } from '../network/fetchChatsListingData';
import { useUserData } from '../context/UserDataProvider';

type ChatListingNavigationProp = NativeStackNavigationProp<
  ChatsStackParamList,
  'ChatListing'
>;

export type Chat = {
  id: string;
  profileIcon: string;
  phoneNumber: string;
  lastMessage: {
    text: string;
    time: string;
  };
};

type ChatListItem = {
  type: 'chatListItem';
  data: Chat;
};

type FilterListItem = {
  type: 'filterItem';
};

type ListItem = ChatListItem | FilterListItem;

const PAGE_SIZE = 15;
const FILTER_TEXT = ['All', 'Favourites'];

const ChatListItem = memo(function ({ item }: { item: ChatListItem }) {
  const navigation = useNavigation<ChatListingNavigationProp>();

  const date = item.data.lastMessage.time.split('T')[0].split('-');

  return (
    <Pressable
      style={styles.chatItemContainer}
      onPress={() => navigation.navigate('ChatDetails')}
    >
      <Image
        style={styles.profileIcon}
        source={{ uri: item.data.profileIcon }}
      />
      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.contactInfoText}>{item.data.phoneNumber}</Text>
          <Text style={styles.messageText}>{item.data.lastMessage.text}</Text>
        </View>
        <Text>{`${date[1]}/${date[2]}`}</Text>
      </View>
    </Pressable>
  );
});

export function ChatsListingScreen() {
  const [chatData, setChatData] = useState<Chat[]>([]);
  const [listData, setListData] = useState<ListItem[]>([
    { type: 'filterItem' },
  ]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const isLoading = useRef(false);
  const isInitiaload = useRef(true);
  const hasMore = useRef(false);
  const selectedIndex = useRef(0);
  const pageNumber = useRef(0);

  const userContextValue = useUserData();

  const loadChatsList = useCallback(async () => {
    setLoading(true);
    isLoading.current = true;

    try {
      const response = await fetchChatsListingData(
        pageNumber.current,
        PAGE_SIZE,
      );

      setChatData(data => [...data, ...response.data]);

      setListData(list => [
        ...list,
        ...response.data.map(
          (data): ListItem => ({
            type: 'chatListItem',
            data,
          }),
        ),
      ]);

      hasMore.current = !response.pageEnd;
      pageNumber.current++;
    } finally {
      isInitiaload.current = false;
      isLoading.current = false;
      setLoading(false);
    }
  }, []);

  const onEndReachedCallback = () => {
    if (
      selectedIndex.current !== 0 ||
      isInitiaload.current ||
      isLoading.current ||
      !hasMore.current
    )
      return;

    loadChatsList();
  };

  const onFilterSelect = useCallback(
    (index: number) => {
      selectedIndex.current = index;
      setSelected(index);

      switch (index) {
        case 0: {
          const listDataCopy: ListItem[] = [];
          listDataCopy.push({ type: 'filterItem' });

          listDataCopy.push(
            ...chatData.map(
              (data): ListItem => ({
                type: 'chatListItem',
                data,
              }),
            ),
          );

          setListData(listDataCopy);

          break;
        }
        case 1: {
          const listDataCopy: ListItem[] = [];

          listDataCopy.push({ type: 'filterItem' });

          listDataCopy.push(
            ...chatData
              .filter(data =>
                userContextValue.favouriteUserIds.includes(Number(data.id)),
              )
              .map(
                (data): ListItem => ({
                  type: 'chatListItem',
                  data,
                }),
              ),
          );

          setListData(listDataCopy);

          break;
        }
      }
    },
    [chatData, userContextValue],
  );

  useEffect(() => {
    loadChatsList();
  }, [loadChatsList]);

  const Filter = useCallback(() => {
    return (
      <View style={styles.filterContainer}>
        {FILTER_TEXT.map((text, index) => (
          <Pressable onPress={() => onFilterSelect(index)} key={text}>
            <Text
              style={[
                styles.filterButton,
                index === selected && styles.filterButtonSelected,
              ]}
            >
              {text}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  }, [selected, onFilterSelect]);

  return (
    <View style={styles.chatsListingContainer}>
      <FlashList
        data={listData}
        style={styles.flatlistContainer}
        onEndReachedThreshold={0.75}
        onEndReached={onEndReachedCallback}
        renderItem={({ item }: { item: ListItem }) => {
          switch (item.type) {
            case 'chatListItem':
              return <ChatListItem item={item} />;
            case 'filterItem':
              return <Filter />;
          }
        }}
        ListFooterComponent={
          <View style={styles.mt16}>
            <ActivityIndicator size="large" color="blue" animating={loading} />
          </View>
        }
      />
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
  chatItemContainer: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 16,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginHorizontal: 16,
  },
  flatlistContainer: {
    width: '100%',
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
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    zIndex: 1,
    backgroundColor: 'white',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 16,
  },
  filterButtonSelected: {
    padding: 8,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 16,
    backgroundColor: '#ccc',
  },
  mt16: {
    marginTop: 16,
  },
});
