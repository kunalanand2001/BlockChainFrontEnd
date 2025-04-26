import { createSlice } from '@reduxjs/toolkit';
import {
  registerCustomer, loginCustomer,
  registerSeller, loginSeller, fetchProfile, updateProfile
} from './authThunks';

const initialState = {
  user: null,
  token: null,
  role: null,      // 'customer' or 'seller'
  status: 'idle',
  error: null
};




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
    }
  },
  extraReducers: builder => {
    builder
      // Customer
      .addCase(registerCustomer.pending, state => { state.status = 'loading'; })
      .addCase(registerCustomer.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginCustomer.pending, state => { state.status = 'loading'; })
      .addCase(loginCustomer.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.value;
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Seller
      .addCase(registerSeller.pending, state => { state.status = 'loading'; })
      .addCase(registerSeller.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.token;
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginSeller.pending, state => { state.status = 'loading'; })
      .addCase(loginSeller.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload.user;
        state.token = payload.value;
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // fetchProfile
      .addCase(fetchProfile.pending, state => {
        state.status = 'loading';
        state.error  = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user   = payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error  = action.payload || action.error.message;
      })


      .addCase(updateProfile.pending, state => {
        state.status = 'loading'; state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user   = payload;       // replace with updated user
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error  = action.payload || action.error.message;
      })
  }
});

export const { setRole, logout } = authSlice.actions;
export default authSlice.reducer;
