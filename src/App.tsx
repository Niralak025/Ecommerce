/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Loader from './components/common/loader/Loader';
import { Provider, useSelector } from 'react-redux';
import RootNavigator from './navigators/RootNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { palette } from './shared/theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppContent />
          </SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const isLoading = useSelector((state: any) => state.app.isLoading);

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
      <RootNavigator />
      <Loader
        fullScreen={true}
        size="large"
        color={palette.primaryGreen}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
