import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { fetchChatsListingdata } from '../network/fetchChatsListingData';

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

function Filter() {
  const [selected, setSelected] = useState(0);
  const filterText = ['All', 'Favourites'];

  return (
    <View style={styles.filterContainer}>
      {filterText.map((text, index) => (
        <Pressable onPress={() => setSelected(index)} key={text}>
          <Text
            style={
              selected === index
                ? // eslint-disable-next-line react-native/no-inline-styles
                  { ...styles.filterButtonStyle, backgroundColor: '#ccc' }
                : styles.filterButtonStyle
            }
          >
            {text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function ChatsListingScreen() {
  const [listData, setListData] = useState<ListItem[]>([
    { type: 'filterItem' },
  ]);

  const [loading, setLoading] = useState(false);

  const pageNumber = useRef(0);
  const pageItems = useRef(15);
  const isPageEnd = useRef(false);

  const loadChatsList = useCallback(async () => {
    setLoading(true);

    const response = await fetchChatsListingdata(
      pageNumber.current,
      pageItems.current,
    );

    setListData(list => [
      ...list,
      ...response.data.map(
        (data): ListItem => ({
          type: 'chatListItem',
          data,
        }),
      ),
    ]);

    setLoading(false);

    isPageEnd.current = response.pageEnd;
    pageNumber.current++;
  }, []);

  useEffect(() => {
    loadChatsList();
  }, [loadChatsList]);

  return (
    <View style={styles.chatsListingContainer}>
      <FlashList
        data={listData}
        stickyHeaderIndices={[0]}
        style={styles.flatlistContainer}
        onEndReachedThreshold={0.75}
        onEndReached={() => {
          if (!isPageEnd.current) {
            loadChatsList();
          }
        }}
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
            <ActivityIndicator
              size="large"
              color="blue"
              animating={loading === true}
            />
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
  loadingViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    zIndex: 1,
    backgroundColor: 'white',
  },
  filterButtonStyle: {
    padding: 8,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 16,
  },
  mt16: {
    marginTop: 16,
  },
});
