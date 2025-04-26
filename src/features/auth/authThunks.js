import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

// Customer
export const registerCustomer = createAsyncThunk(
  'auth/registerCustomer',
  async (data, thunkAPI) => {
    const response = await axios.post('/customer/signup', data); // see customer signup fields[2]
    return response.data;
  }
);

export const loginCustomer = createAsyncThunk(
  'auth/loginCustomer',
  async (credentials, thunkAPI) => {
    const response = await axios.post('/customer/login', credentials);
    return response.data;
  }
);

// Seller
export const registerSeller = createAsyncThunk(
  'auth/registerSeller',
  async (data, thunkAPI) => {
    const response = await axios.post('/seller/signup', data);
    return response.data;
  }
);

export const loginSeller = createAsyncThunk(
  'auth/loginSeller',
  async (credentials, thunkAPI) => {
    const response = await axios.post('/seller/login', credentials);
    return response.data;
  }
);
