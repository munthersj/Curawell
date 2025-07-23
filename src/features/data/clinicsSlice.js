// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
// async thunk لطلب البيانات

export const fetchClinicsDoctors = createAsyncThunk(
  "data/clinics/fetchDoctors",
  async () => {
    const response = await axiosInstance.get("/get_Top_doctors");

    return response.data;
  }
);
export const fetchClinicsData = createAsyncThunk(
  "data/clinics/fetchCData",
  async () => {
    const response = await axiosInstance.get("/get_clinics");

    return response.data;
  }
);
export const fetchQuestionData = createAsyncThunk(
  "data/clinics/fetchQuestionData",
  async () => {
    const response = await axiosInstance.get("/get_questions");

    return response.data;
  }
);

const clinicsDataSlice = createSlice({
  name: "clincsData",
  initialState: {
    clinics: [],
    doctors: [],
    questions: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClinicsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClinicsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clinics = action.payload.data;
      })
      .addCase(fetchClinicsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchClinicsDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClinicsDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload.data;
      })
      .addCase(fetchClinicsDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchQuestionData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestionData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload.data;
      })
      .addCase(fetchQuestionData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default clinicsDataSlice.reducer;
