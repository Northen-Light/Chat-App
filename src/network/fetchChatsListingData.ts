import { chatsList } from '../mock/chatsListdata';
import type { Chat } from '../screens/ChatsListingScreen';

type ChatListingDataResponse = {
  data: Chat[];
  pageEnd: boolean;
};

export function fetchChatsListingdata(
  pageNumber: number,
  pageItems: number = 15,
): Promise<ChatListingDataResponse> {
  return new Promise(res => {
    setTimeout(() => {
      const start = pageNumber * pageItems;
      const end = Math.min(start + pageItems, chatsList.length);

      res({
        data: chatsList.slice(start, end),
        pageEnd: end === chatsList.length,
      });
    }, 2000);
  });
}
