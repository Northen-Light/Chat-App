import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatDetailsPage, ChatsListingPage } from '../pages';

const Stack = createNativeStackNavigator();

export function ChatsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="chat-listing"
        component={ChatsListingPage}
        options={{ headerTitle: 'Chats' }}
      />
      <Stack.Screen
        name="chat-details"
        component={ChatDetailsPage}
        options={{ headerTitle: 'Details' }}
      />
    </Stack.Navigator>
  );
}
