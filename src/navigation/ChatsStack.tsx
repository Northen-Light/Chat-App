import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatDetailsScreen, ChatsListingScreen } from '../screens';
import { ChatsStackParamList } from './types';

const Stack = createNativeStackNavigator<ChatsStackParamList>();

export function ChatsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatListing"
        component={ChatsListingScreen}
        options={{ headerTitle: 'Chats' }}
      />
      <Stack.Screen
        name="ChatDetails"
        component={ChatDetailsScreen}
        options={{ headerTitle: 'Details' }}
      />
    </Stack.Navigator>
  );
}
