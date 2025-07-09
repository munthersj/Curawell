import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/send-code",
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/verify-code",
        data
      );
      if (data.type == "reset_password") {
        console.log("done");
        localStorage.setItem("resetToken", response.data.reset_token);
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

const initialState = {
  otpSent: false,
  loading: false,
  error: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default otpSlice.reducer;
