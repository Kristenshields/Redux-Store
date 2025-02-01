import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemInCart = state.cart.find((cartItem) => cartItem._id === item._id);
      if (itemInCart) {
        itemInCart.purchaseQuantity++;
      } else {
        state.cart.push({ ...item, purchaseQuantity: 1 });
      }

      state.cartOpen = true;
    },
    addMultipleToCart: (state, action) => {
      state.cart.push(...action.payload);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== itemId);
    },
    updateCartQuantity: (state, action) => {
      const { _id, purchaseQuantity } = action.payload;
      state.cart = state.cart.map((item) =>
        item._id === _id ? { ...item, purchaseQuantity } : item
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const { 
  addToCart, 
  addMultipleToCart,
  removeFromCart, 
  updateCartQuantity, 
  clearCart, 
  toggleCart 
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;