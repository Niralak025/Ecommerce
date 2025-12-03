import AsyncStorage from '@react-native-async-storage/async-storage';
const ORDERS_KEY = 'user_orders';
export default function useOrderHistoryViewModel() {
  const getOrders = async () => {
    try {
      const orders = await AsyncStorage.getItem(ORDERS_KEY);
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.error('❌ Failed to load orders:', error);
      return [];
    }
  };

  return {
    getOrders,
  };
}
