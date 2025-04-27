import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import sellerReducer from '../features/seller/sellerSlice'
import customerDashboardReducer from '../features/customer/customerDashboardSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    seller: sellerReducer,
    customerDashboard: customerDashboardReducer
  }
});
