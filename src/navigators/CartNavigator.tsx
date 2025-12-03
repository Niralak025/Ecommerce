import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CartView from '../screens/cartView/CartView';
import OrderHistory from '../screens/orderHistory/OrderHistory';

export const Stack = createNativeStackNavigator<CartNavigatorStackParamList>();

export type CartNavigatorStackParamList = {
  cartView: undefined;
  orderHistory: undefined;
};

const CartNavigator: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="cartView"
    >
      <Stack.Screen name="cartView" component={CartView} />
      <Stack.Screen name="orderHistory" component={OrderHistory} />
    </Stack.Navigator>
  );
};

export default CartNavigator;
