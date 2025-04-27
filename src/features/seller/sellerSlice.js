// src/features/seller/sellerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchVehicles,
  fetchTransactions,
  fetchSellerProfile,
  updateSellerProfile,
  removeVehicle
} from './sellerThunks';

const initialState = {
  // Seller’s own profile
  profile: null,
  statusProfile: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
  errorProfile: null,

  // Vehicles list
  vehicles: [],
  statusVehicles: 'idle',
  errorVehicles: null,

  // Transactions list
  transactions: [],
  statusTransactions: 'idle',
  errorTransactions: null
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    // you can add local-only reducers here if needed
    clearSellerState(state) {
      state.profile = null;
      state.vehicles = [];
      state.transactions = [];
      state.statusProfile = state.statusVehicles = state.statusTransactions = 'idle';
      state.errorProfile = state.errorVehicles = state.errorTransactions = null;
    }
  },
  extraReducers: builder => {
    // ---- PROFILE ----
    builder
      .addCase(fetchSellerProfile.pending, state => {
        state.statusProfile = 'loading';
        state.errorProfile = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, { payload }) => {
        state.statusProfile = 'succeeded';
        state.profile       = payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, { payload, error }) => {
        state.statusProfile = 'failed';
        state.errorProfile  = payload || error.message;
      })

      .addCase(removeVehicle.fulfilled, (state, { payload: removedId }) => {
        state.vehicles = state.vehicles.filter(v => v.id !== removedId);
      })

    // ---- UPDATE PROFILE ----
    builder
      .addCase(updateSellerProfile.pending, state => {
        state.statusProfile = 'loading';
        state.errorProfile  = null;
      })
      .addCase(updateSellerProfile.fulfilled, (state, { payload }) => {
        state.statusProfile = 'succeeded';
        state.profile       = payload;
      })
      .addCase(updateSellerProfile.rejected, (state, { payload, error }) => {
        state.statusProfile = 'failed';
        state.errorProfile  = payload || error.message;
      });

    // ---- VEHICLES ----
    builder
      .addCase(fetchVehicles.pending, state => {
        state.statusVehicles = 'loading';
        state.errorVehicles  = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, { payload }) => {
        state.statusVehicles = 'succeeded';
        state.vehicles = payload.vehicles;
      })
      .addCase(fetchVehicles.rejected, (state, { payload, error }) => {
        state.statusVehicles = 'failed';
        state.errorVehicles  = payload || error.message;
      });

    // ---- TRANSACTIONS ----
    builder
      .addCase(fetchTransactions.pending, state => {
        state.statusTransactions = 'loading';
        state.errorTransactions  = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, { payload }) => {
        state.statusTransactions = 'succeeded';
        state.transactions       = payload;
      })
      .addCase(fetchTransactions.rejected, (state, { payload, error }) => {
        state.statusTransactions = 'failed';
        state.errorTransactions  = payload || error.message;
      });
  }
});

export const { clearSellerState } = sellerSlice.actions;
export default sellerSlice.reducer;
