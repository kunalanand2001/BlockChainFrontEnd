import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

export const fetchVehicles = createAsyncThunk(
  'seller/fetchVehicles',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const resp = await axios.post('/seller/get', { value: token });
      const vehicleIds = resp.data.vehicles;
      const detailPromises = vehicleIds.map(id =>
        axios.get(`/vehicle/${id}`)
      );
      
      const responses = await Promise.all(detailPromises);

      const vehicles = responses.map(r => r.data);
      return vehicles; // array of vehicles
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'seller/fetchTransactions',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const resp = await axios.post('/seller/transactions', { value: token });
      return resp.data;   // array of txs
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 1) Fetch seller’s own profile
export const fetchSellerProfile = createAsyncThunk(
  'seller/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    console.log(getState(), getState().auth)
    try {
      const resp = await axios.post('/seller/get', { value: token });
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2) Update seller’s own profile (PUT /seller/update)
export const updateSellerProfile = createAsyncThunk(
  'seller/updateProfile',
  async (updates, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const resp = await axios.put('/seller/update', { value: token, ...updates });
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addVehicle = createAsyncThunk(
  'seller/addVehicle',
  async (vehicleData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      // token goes in the query param "value"
      const resp = await axios.post(
        `/seller/addvehicle?value=${token}`,
        vehicleData
      );
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeVehicle = createAsyncThunk(
    'seller/removeVehicle',
    async ({ vehicleId }, { getState, rejectWithValue }) => {
      const token = getState().auth.token;
      try {
        // adjust your endpoint as needed
        await axios.delete(
          `/seller/removevehicle?value=${token}&vehicleId=${vehicleId}`
        );
        return vehicleId;
      } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
