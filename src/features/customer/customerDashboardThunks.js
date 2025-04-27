import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

// Fetch existing bookings
export const fetchBookings = createAsyncThunk(
  'customerDashboard/fetchBookings',
  async (_, thunkAPI) => {
    const resp = await axios.get('/customer/bookings');
    return resp.data; // assume array of bookings
  }
);

// Fetch transaction history
export const fetchTransactions = createAsyncThunk(
  'customerDashboard/fetchTransactions',
  async ({role, token}, thunkAPI) => {
    const resp = await axios.post(`/customer/get`, { value: token })
    return resp.data; // assume array of transactions
  }
);

// Book a ticket (example payload: { tripId, seats })
export const bookTicket = createAsyncThunk(
  'customerDashboard/bookTicket',
  async (bookingData, thunkAPI) => {
    const resp = await axios.post('/customer/bookTicket', bookingData);
    return resp.data; // assume booking confirmation
  }
);

// New: GET /vehicles
export const fetchVehicles = createAsyncThunk(
  'customerDashboard/fetchVehicles',
  async (_, thunkAPI) => {
    const resp = await axios.get('/vehicles');
    return resp.data; // array of vehicle objects
  }
);