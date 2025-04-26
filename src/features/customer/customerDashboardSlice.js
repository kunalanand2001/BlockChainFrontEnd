import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBookings,
  fetchTransactions,
  bookTicket,
  fetchVehicles
} from './customerDashboardThunks';

const initialState = {
  bookings: [],
  transactions: [],
  bookingResult: null,
  status: 'idle',
  error: null,
  vehicles: [],
  vehiclesStatus: 'idle',
  vehiclesError: null
};

const customerDashboardSlice = createSlice({
  name: 'customerDashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Bookings
      .addCase(fetchBookings.pending, state => { state.status = 'loading'; })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Transactions
      .addCase(fetchTransactions.pending, state => { state.status = 'loading'; })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Book Ticket
      .addCase(bookTicket.pending, state => { state.status = 'loading'; })
      .addCase(bookTicket.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookingResult = action.payload;
      })
      .addCase(bookTicket.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Vehicles
      .addCase(fetchVehicles.pending, state => {
        state.vehiclesStatus = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.vehiclesStatus = 'succeeded';
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.vehiclesStatus = 'failed';
        state.vehiclesError = action.error.message;
      });
  }
});

export default customerDashboardSlice.reducer;
