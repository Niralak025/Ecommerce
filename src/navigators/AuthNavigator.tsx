import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginView from '../screens/authentication/login/LoginView';
import SignupView from '../screens/authentication/signup/SignupView';
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
      <Stack.Screen name="Signup" component={SignupView} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
