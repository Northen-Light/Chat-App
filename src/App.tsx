import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabs } from './navigation/BottomTabs';
import { UserDataProvider } from './context/UserDataProvider';
import { ReactElement } from 'react';

function App() {
  return (
    <SafeAreaView style={styles.appContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaView>
  );
}

function AppProvider({ children }: { children: ReactElement }) {
  return <UserDataProvider>{children}</UserDataProvider>;
}

function AppContent() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
