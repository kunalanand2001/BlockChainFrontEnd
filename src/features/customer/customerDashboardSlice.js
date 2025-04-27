import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBookings,
  fetchTransactions,
  bookTicket,
  fetchVehicles,
  fetchTickets
} from './customerDashboardThunks';

const initialState = {
  bookings: [],
  transactions: [],
  bookingResult: null,
  status: 'idle',
  error: null,
  vehicles: [],
  vehiclesStatus: 'idle',
  vehiclesError: null,
  isModalOpen: false,
  modalVehicle: null
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
        state.transactions = action.payload.transactions;
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
      })
  },
  reducers:{
    openModal:(state,action)=>{
      state.isModalOpen = true;
      state.modalVehicle = action.payload
    },
    closeModal:(state)=>{
      state.isModalOpen = false;
      state.modalVehicle = null
    }
  },
});

export const {openModal, closeModal} = customerDashboardSlice.actions
export default customerDashboardSlice.reducer;
