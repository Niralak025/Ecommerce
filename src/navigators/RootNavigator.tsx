import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import SplashView from '../screens/splash/SplashView';
import BottomNavigator, { RootTabParamList } from './BottomNavigator';
import AuthNavigator, { AuthStackParamList } from './AuthNavigator';

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashView} />
      <Stack.Screen name="MainTabs" component={BottomNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
