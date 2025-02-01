import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  currentCategory: '',
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.categories = action.payload;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    }
  }
});

export const { updateCategories, updateCurrentCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;