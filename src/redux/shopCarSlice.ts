import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../model/entities';

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const shopCarSlice = createSlice({
  name: 'shopcar',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find(
        (item) => item.cartId === action.payload.cartId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const existingItem = state.cart.find(
        (item) => item.cartId === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        if (existingItem.quantity <= 0) {
          state.cart = state.cart.filter(
            (item) => item.cartId !== action.payload.id
          );
        }
      }
    },
    removeItemCompletely: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.cartId !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cart.find((item) => item.cartId === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(
            (item) => item.cartId !== action.payload.id
          );
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItemQuantity,
  removeItemCompletely,
} = shopCarSlice.actions;
export default shopCarSlice.reducer;
