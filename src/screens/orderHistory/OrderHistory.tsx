import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppText from '../../components/common/appText/AppText';
import Header from '../../components/common/header/Header';
import { CartNavigatorStackParamList } from '../../navigators/CartNavigator';
import { Order } from '../../type/OrderTypes';
import useOrderHistoryViewModel from './OrderHistoryViewModel';

type OrderListingProps = {
  navigation: NativeStackNavigationProp<
    CartNavigatorStackParamList,
    'orderHistory'
  >;
};

const OrderHistory: React.FC<OrderListingProps> = props => {
  const [ordersList, setOrdersList] = useState<Order[]>([]);
  const { getOrders } = useOrderHistoryViewModel();

  useEffect(() => {
    const loadOrders = async () => {
      const savedOrders = await getOrders();
      console.log('🚀 ~ useEffect ~ savedOrders:', savedOrders);

      setOrdersList(savedOrders);
    };

    loadOrders();
  }, []);

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderCard} onPress={() => {}}>
      <View style={styles.orderHeader}>
        <View>
          <AppText style={styles.orderNumber}>
            Order #{item.id}
          </AppText>
          <AppText style={styles.orderDate}>
            {new Date(item.order_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </AppText>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        {item.items.map(product => (
          <View key={product.id} style={styles.itemRow}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.itemDetails}>
              <AppText style={styles.productName} numberOfLines={1}>
                {product.title}
              </AppText>
              <AppText style={styles.productPrice}>
                ${product.price.toFixed(2)} x {product.quantity}
              </AppText>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <AppText style={styles.totalText}>
          Total: ${item.total_price?.toFixed(2)}
        </AppText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="My Orders" onBackPress={() => props.navigation.goBack()} />

      {ordersList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <AppText style={styles.emptyText}>No orders found</AppText>
        </View>
      ) : (
        <FlatList
          data={ordersList}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  totalText: {
    fontWeight: '600',
    fontSize: 16,
  },
});

export default OrderHistory;
