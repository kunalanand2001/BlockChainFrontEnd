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

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async ({ role, token }, { rejectWithValue }) => {
    try {
      console.log("insode fetch");
      // your API expects { value: token } in the body
      const resp = await axios.post(`/${role}/get`, { value: token })
      return resp.data      // full user object
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ role, token, updates }, { rejectWithValue }) => {
    try {
      const resp = await axios.put(
        `/${role}/update`,
        { value: token, ...updates }
      );
      return resp.data;         // updated user object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addBalance = createAsyncThunk(
  'auth/addBalance',
  async ({ role, token, amount }, thunkAPI) => {
    const params = new URLSearchParams({ token, amount });
    const response = await axios.post(
      `/${role}/addBalance?${params.toString()}`
    );
    return response.data;
  }
);


export const getBalance = createAsyncThunk(
  'auth/balance',
  async ({ role, token }, thunkAPI) => {
    const params = new URLSearchParams({ token });
    const response = await axios.post(
      `/${role}/balance?${params.toString()}`
    );
    return response.data;
  }
);