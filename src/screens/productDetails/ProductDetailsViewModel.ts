import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../redux/features/cart/cartSlice';
import { ProductDetailsRouteProp } from './ProductDetails';

export const useProductDetails = (props: ProductDetailsRouteProp) => {
  const isUserLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const userToken = useSelector((state: any) => state.auth.token);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const dispatch = useDispatch();
  const { product } = props.route.params;

  const quantityInCart = useSelector(
    (state: any) =>
      state.cart.cartItems.find((item: any) => item.id === product.id)
        ?.quantity,
  );

  const handleAddToCart = () => {
    if (isUserLoggedIn && userToken) {
      dispatch(addItemToCart(product));
    } else {
      setIsLoginVisible(true);
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(product.id));
  };

  const handleLogin = async () => {
    setIsLoginVisible(false);
    props.navigation.navigate('Auth', {
      screen: 'Login',
    });
  };
  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleLogin,
    isLoginVisible,
    setIsLoginVisible,
    isUserLoggedIn,
    quantityInCart,
    product,
  };
};
