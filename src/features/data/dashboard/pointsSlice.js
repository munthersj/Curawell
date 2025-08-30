// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstanceR from "../../../config/axiosIntanceR";
// async thunk لطلب البيانات
export const fetchPointData = createAsyncThunk(
  "data/dashboard/fetchPointData",
  async () => {
    const response = await axiosInstanceR.get("/get_points");

    return response.data;
  }
);
// export const fetchAnalyses = createAsyncThunk(
//   "data/dashboard/fetchAnalyses",
//   async () => {
//     const response = await axiosInstanceR.get("/dashboard/patient/analyses");

//     return response.data;
//   }
// );

const pointsSlice = createSlice({
  name: "pointsData",
  initialState: {
    pointsData: {},
    // radiograhy: [],

    status: "idle", // idle | loading | succeeded | failed
    status1: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPointData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPointData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pointsData = action.payload;
      })
      .addCase(fetchPointData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // builder
    //   .addCase(fetchAnalyses.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchAnalyses.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.analyses = action.payload.data;
    //   })
    //   .addCase(fetchAnalyses.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   });
  },
});

export default pointsSlice.reducer;
