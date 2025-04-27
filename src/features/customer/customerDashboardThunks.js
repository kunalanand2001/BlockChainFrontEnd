import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

// Fetch existing bookings
export const fetchBookings = createAsyncThunk(
  "customerDashboard/fetchBookings",
  async ({token}, thunkAPI) => {
    const params = new URLSearchParams({ token });
    const resp = await axios.post(`/customer/booking?${params.toString()}`)
    const bookings = Array.isArray(resp.data)
      ? resp.data
      : resp.data.bookings || []
      const enriched = await Promise.all(
        bookings.map(async booking => {
          try {
            const params = new URLSearchParams({ vehicleId: booking.vehicle });
            const vehicleResp = await axios.get(`/vehicle?${params.toString()}`)
            return {
              ...booking,
              ...vehicleResp.data
            }
          } catch (err) {
            // if the vehicle call fails, still return the booking
            return {
              ...booking,
              vehicleInfo: null,
              vehicleError: err.message
            }
          }
        }))
        return enriched;
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
  "customerDashboard/bookTicket",
  async (bookingData, thunkAPI) => {
    const resp = await axios.post("/customer/bookTicket", bookingData);
    return resp.data; // assume booking confirmation
  }
);

// New: GET /vehicles
export const fetchVehicles = createAsyncThunk( 
  "customerDashboard/fetchVehicles",
  async (_, thunkAPI) => {
    const resp = await axios.get("/vehicles");
    return resp.data; // array of vehicle objects
  }
);

export const customerBook = createAsyncThunk(
  "customerDashboard/customerBook",
  async ({ token, vehicleNumber, vehicleId, seatCount }, thunkAPI) => {
    const resp = await axios.post(
      "/customer/book",
      { vehicleNumber, customerId:vehicleId, seatCount },
      { params: { token } }
    );
    return resp.data;
  }
);

export const rateSeller = createAsyncThunk(
  'customerDashboard/rateSeller',
  async ({ sellerId, rating }, thunkAPI) => {
    const params = new URLSearchParams({ sellerId, rating });
    const resp = await axios.post(
      `/customer/rateseller?${params.toString()}`,
    )
    return  resp.data
  }
)

export const cancelBooking = createAsyncThunk(
  'customerDashboard/cancelBooking',
  async ({ ticketId, token }, thunkAPI) => {
    // 1) call cancelTicket
    const params = new URLSearchParams({ ticketId, token })
    await axios.post(`/customer/cancelTicket?${params.toString()}`)  // [3]

    // 2) re-fetch bookings via the existing thunk
    const resultAction = await thunkAPI.dispatch(fetchBookings({ token }))
    // resultAction.payload is the new bookings array
    return resultAction.payload
  }
)