import React from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import AppText from '../../components/common/appText/AppText';
import Button from '../../components/common/button/Button';
import { palette } from '../../shared/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartItem } from '../../type/CartTypes';
import LoginModel from '../../components/projects/loginModel/LoginModel';
import { RootStackParamList } from '../../navigators/RootNavigator';
import { useProductDetails } from './ProductDetailsViewModel';
import Header from '../../components/common/header/Header';

export type ProductDetailsRouteProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
  route: {
    params: {
      product: CartItem;
    };
  };
};

const { width } = Dimensions.get('window');

const ProductDetails: React.FC<ProductDetailsRouteProp> = props => {
  const {
    handleAddToCart,
    handleRemoveFromCart,
    isLoginVisible,
    setIsLoginVisible,
    handleLogin,
    product,
    quantityInCart,
  } = useProductDetails(props);

  return (
    <View style={styles.container}>
      <Header
        iconColor="black"
        onBackPress={() => props.navigation.goBack()}
        headerStyle={styles.headerStyle}
        iconStyle={styles.iconStyle}
      />
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
      <LoginModel
        visible={isLoginVisible}
        onClose={() => setIsLoginVisible(false)}
        onLogin={handleLogin}
        isLoading={false}
      />
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
  addToCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
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
  headerStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  iconStyle: {
    backgroundColor: palette.white,
    borderRadius: 20,
    padding: 5,
  },
});

export default ProductDetails;
