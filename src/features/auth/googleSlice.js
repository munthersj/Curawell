/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
export const googleLogin = createAsyncThunk(
  "user/loginUser",
  async (userInfo, thunkAPI) => {
    console.log(userInfo);
    try {
      const response = await axiosInstance.post("/googleLogin", userInfo);
      console.log(response.data.token);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
const tokenFromStorage = localStorage.getItem("token");
export const googleSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    token: tokenFromStorage || null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(googleLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

// Action creators are generated for each case reducer function
// export const { loading,error } = loginSlice.actions;

export default googleSlice.reducer;
