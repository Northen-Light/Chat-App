import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { trigger } from 'react-native-haptic-feedback';
import { ProfilePage, RecentCallsPage } from '../pages';
import { ChatsStack } from './ChatsStack';

const Tab = createNativeBottomTabNavigator();

const hapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenListeners={({ navigation }) => ({
        tabPress: () => {
          if (!navigation.isFocused()) {
            trigger('impactLight', hapticOptions);
          }
        },
      })}
    >
      <Tab.Screen
        name="Chats"
        component={ChatsStack}
        options={{
          tabBarIcon: {
            type: 'image',
            source: require('@assets/chat.png'),
          },
        }}
      />
      <Tab.Screen
        name="Calls"
        component={RecentCallsPage}
        options={{
          tabBarIcon: {
            type: 'image',
            source: require('@assets/phone-call.png'),
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: {
            type: 'image',
            source: require('@assets/user.png'),
          },
        }}
      />
    </Tab.Navigator>
  );
}
