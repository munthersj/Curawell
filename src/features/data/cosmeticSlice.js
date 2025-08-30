// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import axios from "axios";
// async thunk لطلب البيانات

export const fetchKeyServices = createAsyncThunk(
  "data/cosmeticClinics/fetchKeyServices",
  async (sectionId) => {
    const response = await axiosInstance.post("/doctors_services", {
      service_id: sectionId,
    });

    return response.data;
  }
);
export const fetchHomeCareKeyServices = createAsyncThunk(
  "data/cosmeticClinics/fetchHomeCareKeyServices",
  async (sectionId) => {
    const response = await axiosInstance.post("/services_section", {
      section_id: sectionId,
    });

    return response.data;
  }
);
export const fetchTimes = createAsyncThunk(
  "data/cosmeticClinics/fetchTimes",
  async (data) => {
    console.log(data.date + "     " + data.id);
    const response = await axiosInstance.post("/day_and_sessions", {
      doctor_id: data.id,
      day_date: data.date,
    });

    // console.log(response.data.data);

    return response.data.data.flatMap((item) =>
      item.doctor_sessions.map((session) => ({
        id: session.id,
        from: session.from.slice(0, 5),
        status: session.status,
      }))
    );
  }
);
export const fetchHomeCareTimes = createAsyncThunk(
  "data/cosmeticClinics/fetchHomeCareTimes",
  async (data) => {
    console.log(data.date);
    const response = await axiosInstance.post("/period_homeCare", {
      date: data.date,
    });
    console.log(response);

    return response.data.data.periods_for_day.map(({ id, time, status }) => ({
      id,
      time: time.slice(0, 5),
      status,
    }));
  }
);

export const fetchSectionDoctors = createAsyncThunk(
  "data/cosmeticClinics/fetchSectionDoctors",
  async (data) => {
    // بيدعم الحالتين: competence_id أو id كألياس
    const competenceId = data?.competence_id ?? data?.id;

    // ابنِ البودي شرطيًا
    const payload = {
      service_id: data.sectionId,
      date: data.date,
      ...(competenceId !== undefined &&
      competenceId !== null &&
      competenceId !== ""
        ? { competence_id: competenceId }
        : {}),
    };

    const res = await axiosInstance.post("/competence_doctors", payload);

    // إذا الـ API بيرجع Array مباشرة أو داخل data[]
    const items = Array.isArray(res.data?.data) ? res.data.data : res.data;

    return items.map((d) => ({
      doctor_id: d.id,
      address: d.address,
      competence_name: d.competence_name,
      first_name: d.first_name,
      last_name: d.last_name,
      age: d.age,
      phone: d.phone,
      respective_en: d.doctor?.respective_en ?? null,
      services_en: d.doctor?.services_en ?? [],
      evaluation:
        d.doctor?.evaluation != null ? Number(d.doctor.evaluation) : null,
    }));
  }
);

export const bookApointment = createAsyncThunk(
  "data/cosmeticClinics/bookApointment",
  async (data) => {
    // console.log(JSON.stringify(data));
    const response = await axios.post(
      "http://127.0.0.1:8000/api/reserve_appointment",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  }
);
export const HomeCarebookApointment = createAsyncThunk(
  "data/cosmeticClinics/HomeCarebookApointment",
  async (data) => {
    console.log(JSON.stringify(data));
    const response = await axios.post(
      "http://127.0.0.1:8000/api/reserve_appointment_HC",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  }
);
export const fetchCosOffersData = createAsyncThunk(
  "data/cosmeticClinics/fetchCosOffersData",
  async () => {
    const response = await axiosInstance.get("/get_discounts");

    return response.data;
  }
);
export const fetchLHomeCareComments = createAsyncThunk(
  "data/cosmeticClinics/fetchLHomeCareComments",
  async (data) => {
    const response = await axiosInstance.post("/get_comments", data);
    // console.log(response.data);
    return response.data;
  }
);

export const fetchHomeCareSectionsData = createAsyncThunk(
  "data/cosmeticClinics/fetchHomeCareSectionsData",
  async () => {
    const response = await axiosInstance.get("/get_sections");
    console.log(response.data);
    return response.data;
  }
);
const initialState = {
  keyServices: [],
  homeCareKeyServices: [],
  doctors1: [],
  competenceDoctors: [],
  times: [],
  homeCareTimes: [],
  offers: [],
  comments: [],
  sections: [],
  message1: "",
  message2: "",
  status: "idle", // idle | loading | succeeded | failed
  status1: "idle",
  status2: "idle",
  status3: "idle",

  error: null,
};
const cosmeticDataSlice = createSlice({
  name: "cosmeticData",
  initialState,
  reducers: {
    reset: () => initialState,
    clearTimes: (st) => {
      st.times = [];
      st.homeCareTimes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKeyServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchKeyServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.keyServices = action.payload.data;
      })
      .addCase(fetchKeyServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchTimes.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchTimes.fulfilled, (state, action) => {
        state.status1 = "succeeded";

        state.times = action.payload;
      })
      .addCase(fetchTimes.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(bookApointment.pending, (state) => {
        state.status2 = "loading";
        state.message1 = "";
      })
      .addCase(bookApointment.fulfilled, (state, action) => {
        state.status2 = "succeeded";

        state.message1 = action.payload.message;
      })
      .addCase(bookApointment.rejected, (state, action) => {
        state.status2 = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchSectionDoctors.pending, (state) => {
        state.status3 = "loading";
      })
      .addCase(fetchSectionDoctors.fulfilled, (state, action) => {
        state.status3 = "succeeded";
        state.doctors1 = action.payload;
      })
      .addCase(fetchSectionDoctors.rejected, (state, action) => {
        state.status3 = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchCosOffersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCosOffersData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offers = action.payload.data;
      })
      .addCase(fetchCosOffersData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchHomeCareKeyServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeCareKeyServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homeCareKeyServices = action.payload.data;
      })
      .addCase(fetchHomeCareKeyServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchHomeCareTimes.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchHomeCareTimes.fulfilled, (state, action) => {
        state.status1 = "succeeded";

        state.homeCareTimes = action.payload;
      })
      .addCase(fetchHomeCareTimes.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(HomeCarebookApointment.pending, (state) => {
        state.status2 = "loading";
        state.message2 = "";
      })
      .addCase(HomeCarebookApointment.fulfilled, (state, action) => {
        state.status2 = "succeeded";

        state.message2 = action.payload.message;
      })
      .addCase(HomeCarebookApointment.rejected, (state, action) => {
        state.status2 = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchLHomeCareComments.pending, (state) => {
        state.status2 = "loading";
      })
      .addCase(fetchLHomeCareComments.fulfilled, (state, action) => {
        state.status2 = "succeeded";
        state.comments = action.payload.data;
      })
      .addCase(fetchLHomeCareComments.rejected, (state, action) => {
        state.status2 = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchHomeCareSectionsData.pending, (state) => {
        state.status2 = "loading";
      })
      .addCase(fetchHomeCareSectionsData.fulfilled, (state, action) => {
        state.status2 = "succeeded";
        console.log(action.payload.data);
        state.sections = action.payload.data;
      })
      .addCase(fetchHomeCareSectionsData.rejected, (state, action) => {
        state.status2 = "failed";
        state.error = action.error.message;
      });
  },
});
export const { reset, clearTimes } = cosmeticDataSlice.actions;
export default cosmeticDataSlice.reducer;
