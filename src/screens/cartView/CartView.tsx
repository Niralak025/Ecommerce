import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppText from '../../components/common/appText/AppText';
import { CartNavigatorStackParamList } from '../../navigators/CartNavigator';
import { useSelector } from 'react-redux';
import Button from '../../components/common/button/Button';
import { CartItem } from '../../type/CartTypes';
import { palette } from '../../shared/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CheckoutViewProps {
  navigation: NativeStackNavigationProp<
    CartNavigatorStackParamList,
    'orderHistory'
  >;
}

const CartView: React.FC<CheckoutViewProps> = props => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CartNavigatorStackParamList>>();
  const itemInCart = useSelector((state: any) => state.cart.cartItems);
  console.log('itemInCart', itemInCart);
  const totalAmount = useSelector((state: any) => state.cart.totalAmount);
  console.log('totalAmount', totalAmount);
  const totalItems = useSelector((state: any) => state.cart.totalItems);
  console.log('totalItems', totalItems);

  const ORDERS_KEY = 'user_orders';
  const handlePlaceOrder = async () => {
    try {
      console.log('Place Order');
      const orderDetailsObject = {
        id: Math.random().toString(),
        total_price: totalAmount,
        items: itemInCart,
        order_date: new Date().toISOString(),
      };
      console.log('orderDetailsObject', orderDetailsObject);
      const existingOrders = await AsyncStorage.getItem(ORDERS_KEY);
      const parsedOrders = existingOrders ? JSON.parse(existingOrders) : [];
      const updatedOrders = [orderDetailsObject, ...parsedOrders];
      await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
      props.navigation.navigate('orderHistory');
      console.log('✅ Order saved successfully');
    } catch (error) {
      console.error('❌ Failed to save order:', error);
    }
  };

  const renderCheckoutItem = ({ item }: { item: CartItem }) => {
    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => {
          console.log('Item pressed:', item);
        }}
      >
        <View style={styles.orderHeader}>
          <AppText style={styles.productTitle}>{item.title}</AppText>
          <AppText style={styles.productTitle}>{item.category}</AppText>
        </View>

        <View style={styles.orderFooter}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <AppText style={styles.totalText}> Qty. {item.quantity}</AppText>
            <AppText style={styles.totalText}>
              ${(item.price * item.quantity).toFixed(2)}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {itemInCart.length > 0 ? (
        <FlatList
          data={itemInCart}
          renderItem={renderCheckoutItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <AppText style={styles.emptyText}>Your cart is empty</AppText>
        </View>
      )}

      {itemInCart.length > 0 ? (
        <View style={styles.totalPriceContainer}>
          <AppText style={styles.totalText}>
            Total Amount: ${totalAmount}
          </AppText>
          <Button
            title="Place Order"
            onPress={() => {
              handlePlaceOrder();
            }}
            buttonStyle={{ margin: 16, alignSelf: 'center' }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
    overflow: 'hidden',
  },
  totalPriceContainer: {
    padding: 16,
    backgroundColor: palette.textMuted,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: 'center',
  },
  orderHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  orderNumber: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  orderDate: {
    color: '#666',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  itemsContainer: {
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    color: '#666',
    fontSize: 14,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  totalText: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export default CartView;
