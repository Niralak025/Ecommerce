import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../../components/common/appText/AppText';
import Button from '../../components/common/button/Button';
import { palette } from '../../shared/theme';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../redux/features/cart/cartSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartItem } from '../../type/CartTypes';
import { HomeNavigatorStackParamList } from '../../navigators/HomeNavigator';

type ProductDetailsRouteProp = {
  params: {
    product: CartItem;
  };
};

type ProductDetailsNavigationProp = {
  navigation: NativeStackNavigationProp<
    HomeNavigatorStackParamList,
    'productDetails'
  >;
};

const { width } = Dimensions.get('window');

const ProductDetails: React.FC<ProductDetailsNavigationProp> = props => {
  const route = useRoute<RouteProp<ProductDetailsRouteProp, 'params'>>();
  const { product } = route.params;
  const dispatch = useDispatch();

  const quantityInCart = useSelector(
    (state: any) =>
      state.cart.cartItems.find((item: any) => item.id === product.id)
        ?.quantity,
  );
  const isUserLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const handleAddToCart = () => {
    // if (!isUserLoggedIn) {
    //   props.navigation.navigate('Auth', {
    //     screen: 'Login',
    //   });
    //   return;
    // }
    dispatch(addItemToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(product.id));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <AppText style={styles.name}>{product.title}</AppText>
          </View>

          <AppText style={styles.category}>{product.category}</AppText>
          <AppText style={styles.price}>${product.price.toFixed(2)}</AppText>
          <AppText style={styles.description}>{product.description}</AppText>

          {/* Add to cart button */}
          <View style={styles.addToCartContainer}>
            <Button
              title={'Add to Cart'}
              onPress={handleAddToCart}
              buttonStyle={styles.button}
              disabled={quantityInCart >= 1}
            />
            {quantityInCart > 0 ? (
              <View style={styles.counterContainer}>
                <Pressable
                  style={styles.quantityContainer}
                  onPress={handleRemoveFromCart}
                >
                  <AppText style={styles.quantityText}>-</AppText>
                </Pressable>
                <AppText
                  style={[styles.quantityText, { color: palette.primaryGreen }]}
                >
                  {quantityInCart}
                </AppText>
                <Pressable
                  style={styles.quantityContainer}
                  onPress={handleAddToCart}
                >
                  <AppText style={styles.quantityText}>+</AppText>
                </Pressable>
              </View>
            ) : null}
          </View>
          {quantityInCart > 0 ? (
            <AppText style={styles.description}>{`Total Amount : ${
              product.price * quantityInCart
            }`}</AppText>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: width * 1,
  },
  detailsContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: palette.primaryGreen,
  },
  description: {
    marginVertical: 5,
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  addToCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: palette.primaryGreen,
    paddingVertical: 16,
    borderRadius: 8,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  quantityContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  counterContainer: {
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '50%',
  },
  category: {
    marginBottom: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default ProductDetails;
