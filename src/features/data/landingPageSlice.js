import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";

export const fetchLandingClinicsData = createAsyncThunk(
  "data/landing/fetchClinicsData",
  async () => {
    const response = await axiosInstance.post("/get_clinics", { homeCare: "" });
    return response.data;
  }
);
export const fetchLandingOffersData = createAsyncThunk(
  "data/landing/fetchOffersData",
  async () => {
    const response = await axiosInstance.get("/get_discounts");
    return response.data;
  }
);
export const fetchLandingSectionsData = createAsyncThunk(
  "data/landing/fetchSectionsData",
  async () => {
    const response = await axiosInstance.get("/get_sections");
    return response.data;
  }
);
export const fetchLandingCommentsData = createAsyncThunk(
  "data/landing/fetchCommentsData",
  async () => {
    const response = await axiosInstance.post("/get_comments", {});

    return response.data;
  }
);
export const fetchLandingIntruduceData = createAsyncThunk(
  "data/landing/fetchIntruduceData",
  async () => {
    const response = await axiosInstance.get("/Info-center");

    return response.data;
  }
);
export const fetchLandingContactData = createAsyncThunk(
  "data/landing/fetchLandingContactData",
  async () => {
    const response = await axiosInstance.get("/Info-contact_us");

    return response.data;
  }
);
export const fetchLandingDoctors = createAsyncThunk(
  "data/landing/fetchLandingDoctors",
  async () => {
    const response = await axiosInstance.get("/get_Top_doctors");

    return response.data;
  }
);
const landingDataSlice = createSlice({
  name: "landingData",
  initialState: {
    sections: [],
    offers: [],
    doctors: [],
    comments: [],
    clinics: [],
    intruduce: {},
    contactInfo: {},

    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingClinicsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingClinicsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.clinics = action.payload.data;
      })
      .addCase(fetchLandingClinicsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLandingOffersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingOffersData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.offers = action.payload.data;
      })
      .addCase(fetchLandingOffersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLandingSectionsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingSectionsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.sections = action.payload.data;
      })
      .addCase(fetchLandingSectionsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLandingCommentsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingCommentsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.comments = action.payload.data;
      })
      .addCase(fetchLandingCommentsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLandingIntruduceData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingIntruduceData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.intruduce = action.payload.data;
      })
      .addCase(fetchLandingIntruduceData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLandingContactData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingContactData.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.contactInfo = action.payload.data;
      })
      .addCase(fetchLandingContactData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLandingDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLandingDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.doctors = action.payload.data;
      })
      .addCase(fetchLandingDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default landingDataSlice.reducer;
