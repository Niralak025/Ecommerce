import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginView from '../screens/authentication/login/LoginView';
export const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const AuthNavigator: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginView} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
