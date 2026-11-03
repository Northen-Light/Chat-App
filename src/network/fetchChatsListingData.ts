import { chatsList } from '../mock/chatsListdata';
import type { ChatListItem } from '../screens/ChatsListingPage';

export function fetchChatsListingdata(
  start: number,
  count: number = 15,
): Promise<ChatListItem[]> {
  return new Promise(res => {
    setTimeout(() => {
      res(chatsList.slice(start, Math.min(start + count, chatsList.length)));
    }, 2000);
  });
}
