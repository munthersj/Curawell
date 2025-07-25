import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/auth/reset-password", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Reset Failed"
      );
    }
  }
);

const initialState = {
  resetdone: false,
  loading: false,
  error: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resetPasswordSlice.reducer;
