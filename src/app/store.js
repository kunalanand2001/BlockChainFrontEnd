import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sellerReducer from '../features/seller/sellerSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    seller: sellerReducer
  }
});
