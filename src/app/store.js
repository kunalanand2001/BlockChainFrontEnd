import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerDashboardReducer from '../features/customer/customerDashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customerDashboard: customerDashboardReducer
  }
});
