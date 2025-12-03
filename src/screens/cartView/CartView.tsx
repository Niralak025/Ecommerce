import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppText from '../../components/common/appText/AppText';
import { CartNavigatorStackParamList } from '../../navigators/CartNavigator';
import Button from '../../components/common/button/Button';
import { CartItem } from '../../type/CartTypes';
import { palette } from '../../shared/theme';
import useCartViewModel from './CartViewModel';
export interface CheckoutViewProps {
  navigation: NativeStackNavigationProp<
    CartNavigatorStackParamList,
    'orderHistory'
  >;
}

const CartView: React.FC<CheckoutViewProps> = props => {
  const { handlePlaceOrder, itemInCart, totalAmount } = useCartViewModel(props);

  const renderCheckoutItem = ({ item }: { item: CartItem }) => {
    return (
      <View style={styles.orderCard}>
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
      </View>
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
            buttonStyle={styles.buttonStyle}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: palette.textMuted,
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: palette.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.cancel,
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
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: palette.cancel,
  },
  totalText: {
    fontWeight: '500',
    fontSize: 16,
    color: palette.text,
  },
  buttonStyle: {
    margin: 16,
    alignSelf: 'center',
  },
});

export default CartView;
