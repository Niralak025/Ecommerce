import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProductListing from '../screens/productListing/ProductListing';
import ProductDetails from '../screens/productDetails/ProductDetails';

export const Stack = createNativeStackNavigator();

export type HomeNavigatorStackParamList = {
  productListing: undefined;
  productDetails: { product: any };
};

const HomeNavigator: React.FC = (): React.JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="productListing"
    >
      <Stack.Screen name="productListing" component={ProductListing} />
      <Stack.Screen name="productDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
