import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBookings,
  fetchTransactions,
  bookTicket
} from './customerDashboardThunks';

const initialState = {
  bookings: [],
  transactions: [],
  bookingResult: null,
  status: 'idle',
  error: null
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
      });
  }
});

export default customerDashboardSlice.reducer;
