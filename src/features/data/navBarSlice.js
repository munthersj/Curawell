import axiosInstance from "../../config/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNavSectionsData = createAsyncThunk(
  "data/navBar/fetchNavSectionsData",
  async () => {
    const response = await axiosInstance.get("/get_sections");
    return response.data;
  }
);

export const fetchClinicsNavBar = createAsyncThunk(
  "data/navBar/fetchClinicsNavBar",
  async () => {
    const response = await axiosInstance.post("/get_clinics", { homeCare: "" });

    return response.data;
  }
);
const navBarDataSlice = createSlice({
  name: "navBarData",
  initialState: {
    sections: [],
    clinics: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavSectionsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNavSectionsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sections = action.payload.data;
      })
      .addCase(fetchNavSectionsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchClinicsNavBar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClinicsNavBar.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.clinics = action.payload.data;
      })
      .addCase(fetchClinicsNavBar.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default navBarDataSlice.reducer;
