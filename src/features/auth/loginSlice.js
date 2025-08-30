/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import axiosInstanceR from "../../config/axiosIntanceR";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userInfo, thunkAPI) => {
    console.log(userInfo);
    try {
      const response = await axiosInstance.post("/login", userInfo);
      localStorage.setItem("token", response.data.token);
      console.log(localStorage.getItem("token"));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
export const logOut = createAsyncThunk("user/logOut", async () => {
  // لو عندك توكن لازم يتبعت: axiosInstanceR لازم يكون ضابط Authorization تلقائياً
  const res = await axiosInstanceR.post("/logout");
  // بعض الباك إند يرجّع الرسالة داخل data
  const msg = res?.data?.message || "تم تسجيل الخروج بنجاح";
  // امسح التوكن محلياً
  localStorage.removeItem("token");
  toast.success(msg);
  return true;
});
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
