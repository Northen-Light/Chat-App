import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { trigger } from 'react-native-haptic-feedback';
import { ReactElement } from 'react';
import { SafeAreaView } from 'react-native-screens/experimental';
import { ProfileScreen, RecentCallsScreen } from '../screens';
import { ChatsStack } from './ChatsStack';
import { BottomTabsParamList } from './types';
import { Platform } from 'react-native';

const Tab = createNativeBottomTabNavigator<BottomTabsParamList>();

const hapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

const ScreenLayout = ({ children }: { children: ReactElement }) => {
  return (
    <SafeAreaView edges={{ bottom: true }} insetType="interface">
      {children}
    </SafeAreaView>
  );
};

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenLayout={Platform.OS === 'android' ? ScreenLayout : undefined}
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
