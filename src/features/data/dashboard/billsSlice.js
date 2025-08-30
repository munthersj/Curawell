// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstanceR from "../../../config/axiosIntanceR";
// async thunk لطلب البيانات
export const fetchBillsData = createAsyncThunk(
  "data/dashboard/fetchBillsData",
  async () => {
    const response = await axiosInstanceR.get("/rates_bill");

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

const billsSlice = createSlice({
  name: "billsdAta",
  initialState: {
    billsData: [],
    radiograhy: [],

    status: "idle", // idle | loading | succeeded | failed
    status1: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBillsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload.data);
        state.billsData = action.payload;
      })
      .addCase(fetchBillsData.rejected, (state, action) => {
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

export default billsSlice.reducer;
