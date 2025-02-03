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
      const uniqueCategories = Array.from(new Map(action.payload.map(c => [c._id, c])).values());
      state.categories = uniqueCategories;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    }
  }
});

export const { updateCategories, updateCurrentCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;