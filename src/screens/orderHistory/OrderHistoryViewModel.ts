import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE } from '../../utils/constants/Constants';

export default function useOrderHistoryViewModel() {
  const getOrders = async () => {
    try {
      const orders = await AsyncStorage.getItem(STORAGE.ORDERS_KEY);
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
