// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
// async thunk لطلب البيانات
export const fetchHomeClinicsData = createAsyncThunk(
  "data/home/fetchClinicsData",
  async () => {
    const response = await axiosInstance.get("/get_clinics");

    return response.data;
  }
);
export const fetchHomeOffersData = createAsyncThunk(
  "data/home/fetchOffersData",
  async () => {
    const response = await axiosInstance.get("/get_discounts");

    return response.data;
  }
);
export const fetchArticelsData = createAsyncThunk(
  "data/home/fetchArticelsData",
  async () => {
    const response = await axiosInstance.get("/get_articles");

    return response.data;
  }
);
export const fetchHomeCommentsData = createAsyncThunk(
  "data/home/fetchCommentsData",
  async () => {
    const response = await axiosInstance.get("/get_comments");
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    clinics: [],
    offers: [],
    articels: [],
    comments: [],

    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeClinicsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeClinicsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.clinics = action.payload.data;
      })
      .addCase(fetchHomeClinicsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchHomeOffersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeOffersData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.offers = action.payload.data;
      })
      .addCase(fetchHomeOffersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchArticelsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticelsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.articels = action.payload.data;
      })
      .addCase(fetchArticelsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchHomeCommentsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeCommentsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.comments = action.payload.data;
      })
      .addCase(fetchHomeCommentsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
