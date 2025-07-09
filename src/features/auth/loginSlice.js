/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userInfo) => {
    console.log(userInfo);
    const request = await axios.post(
      "http://127.0.0.1:8000/api/login",
      userInfo
    );
    const response = await request.data;
    console.log(request);

    //TODO localStorage Token
    localStorage.setItem("token", response.token);
    console.log(localStorage.getItem("token"));
    return response;
  }
);
const tokenFromStorage = localStorage.getItem("token");
export const loginSlice = createSlice({
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
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
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

export default loginSlice.reducer;
