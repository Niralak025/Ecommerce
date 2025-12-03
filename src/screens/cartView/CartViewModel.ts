import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { CheckoutViewProps } from './CartView';
import { STORAGE } from '../../utils/constants/Constants';

export default function useCartViewModel(props: CheckoutViewProps) {
  const itemInCart = useSelector((state: any) => state.cart.cartItems);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);
  const totalItems = useSelector((state: any) => state.cart.totalItems);
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    try {
      const orderDetailsObject = {
        id: `${new Date().toLocaleDateString('en-GB')} - ${totalItems}`,
        total_price: totalAmount,
        items: itemInCart,
        order_date: new Date().toISOString(),
      };
      const existingOrders = await AsyncStorage.getItem(STORAGE.ORDERS_KEY);
      const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];
      const updatedOrders = [orderDetailsObject, ...parsedOrders];
      await AsyncStorage.setItem(
        STORAGE.ORDERS_KEY,
        JSON.stringify(updatedOrders),
      );
      dispatch(clearCart());
      props.navigation.navigate('orderHistory');
    } catch (error) {
      console.error('❌ Failed to save order:', error);
    }
  };

  return {
    handlePlaceOrder,
    itemInCart,
    totalAmount,
  };
}
