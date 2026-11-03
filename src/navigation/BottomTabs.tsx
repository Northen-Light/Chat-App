import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { trigger } from 'react-native-haptic-feedback';
import { ProfileScreen, RecentCallsScreen } from '../screens';
import { ChatsStack } from './ChatsStack';
import { BottomTabsParamList } from './types';
import { Platform } from 'react-native';

const Tab = createNativeBottomTabNavigator<BottomTabsParamList>();

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
          tabBarIcon:
            Platform.OS === 'ios'
              ? {
                  type: 'sfSymbol',
                  name: 'bubble.left.and.bubble.right',
                }
              : {
                  type: 'image',
                  source: require('@assets/chat.png'),
                },
        }}
      />
      <Tab.Screen
        name="Calls"
        component={RecentCallsScreen}
        options={{
          tabBarIcon:
            Platform.OS === 'ios'
              ? {
                  type: 'sfSymbol',
                  name: 'phone',
                }
              : {
                  type: 'image',
                  source: require('@assets/phone-call.png'),
                },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon:
            Platform.OS === 'ios'
              ? {
                  type: 'sfSymbol',
                  name: 'person.crop.circle',
                }
              : {
                  type: 'image',
                  source: require('@assets/user.png'),
                },
        }}
      />
    </Tab.Navigator>
  );
}
