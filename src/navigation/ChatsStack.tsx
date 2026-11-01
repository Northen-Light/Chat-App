import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatDetailsPage, ChatsListingPage } from '../screens';
import { ChatsStackParamList } from './types';

const Stack = createNativeStackNavigator<ChatsStackParamList>();

export function ChatsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatListing"
        component={ChatsListingPage}
        options={{ headerTitle: 'Chats' }}
      />
      <Stack.Screen
        name="ChatDetails"
        component={ChatDetailsPage}
        options={{ headerTitle: 'Details' }}
      />
    </Stack.Navigator>
  );
}
