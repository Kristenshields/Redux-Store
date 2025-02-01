import { configureStore, createSlice } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cartSlice';
import { categoryReducer } from './slices/categorySlice';
import { productReducer } from './slices/productSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('id_token') || null,
    loading: false,
    error: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('id_token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('id_token');
    }
  }
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartReducer,
    categories: categoryReducer,
    products: productReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const { loginSuccess, logout } = authSlice.actions;
export { store };