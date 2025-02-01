import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null, 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { updateProducts, selectProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;