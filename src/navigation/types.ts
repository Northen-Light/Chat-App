import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabsParamList = {
  Chats: NavigatorScreenParams<ChatsStackParamList> | undefined;
  Calls: undefined;
  Profile: undefined;
};

export type ChatsStackParamList = {
  ChatListing: undefined;
  ChatDetails: undefined;
};
