import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../../../type/CartTypes';

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const itemInCart = state.cartItems.find(
        item => item.id === action.payload.id,
      );
      if (itemInCart) {
        itemInCart.quantity += 1;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      }
      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemInCart = state.cartItems.find(
        item => item.id === action.payload,
      );
      if (itemInCart) {
        itemInCart.quantity -= 1;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
        if (itemInCart.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            item => item.id !== action.payload,
          );
        }
      }
      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },
    clearCart: state => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
