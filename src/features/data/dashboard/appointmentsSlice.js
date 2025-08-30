// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstanceR from "../../../config/axiosIntanceR";
import axiosInstance from "../../../config/axiosInstance";
// async thunk لطلب البيانات
export const fetchAllAppointments = createAsyncThunk(
  "data/dashboard/fetchAllAppointments",
  async () => {
    const response = await axiosInstanceR.get("/all_appointments");

    return response.data;
  }
);
// export const fetchLandingSectionsData = createAsyncThunk(
//   "data/home/fetchSectionsData",
//   async () => {
//     const response = await axiosInstance.get("/get_sections");
//     return response.data;
//   }
// );

export const fetchClinicsD = createAsyncThunk(
  "data/dashboard/fetchClinicsD",
  async () => {
    const response = await axiosInstance.post("/get_clinics", {
      homeCare: "1",
    });

    return response.data;
  }
);
export const fetchAKeyServices = createAsyncThunk(
  "data/dashboard/fetchAKeyServices",
  async (sectionId) => {
    const response = await axiosInstance.post("/doctors_services", {
      service_id: sectionId,
    });

    return response.data;
  }
);
export const fetchHomeCareAKeyServices = createAsyncThunk(
  "data/dashboard/fetchHomeCareAKeyServices",
  async (sectionId) => {
    const response = await axiosInstance.post("/services_section", {
      section_id: sectionId,
    });

    return response.data;
  }
);

export const fetchDoctors = createAsyncThunk(
  "data/dashboard/fetchDoctors",
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

export const fetchTimesA = createAsyncThunk(
  "data/dashboard/fetchTimesA",
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
export const fetchHomeCareTimesA = createAsyncThunk(
  "data/dashboard/fetchHomeCareTimesA",
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
export const bookApointmentD = createAsyncThunk(
  "data/dashboard/bookApointmentD",
  async (data) => {
    // console.log(JSON.stringify(data));
    const response = await axiosInstanceR.post("/reserve_appointment", data);

    return response.data;
  }
);
export const HomeCarebookApointmentD = createAsyncThunk(
  "data/dashboard/HomeCarebookApointmentD",
  async (data) => {
    console.log(JSON.stringify(data));
    const response = await axiosInstanceR.post("/reserve_appointment_HC", data);

    return response.data;
  }
);
// export const fetchHomeOffersData = createAsyncThunk(
//   "data/home/fetchOffersData",
//   async () => {
//     const response = await axiosInstance.get("/get_discounts");

//     return response.data;
//   }
// );
// export const fetchArticelsData = createAsyncThunk(
//   "data/home/fetchArticelsData",
//   async () => {
//     const response = await axiosInstance.get("/get_articles");

//     return response.data;
//   }
// );
// export const fetchHomeCommentsData = createAsyncThunk(
//   "data/home/fetchCommentsData",
//   async () => {
//     const response = await axiosInstance.post("/get_comments", {});
//     return response.data;
//   }
// );

const appointmentsSlice = createSlice({
  name: "appointmentsData",
  initialState: {
    appointments: [],
    clinics: [],
    KeyServices1: [],
    homeCareKeyServices: [],
    doctors: [],
    times: [],
    homeCareTimes: [],
    // sections: [],
    status: "idle", // idle | loading | succeeded | failed
    status1: "idle", // idle | loading | succeeded | failed
    error: null,
    message2: "",
    message1: "",
  },
  reducers: {
    restMessage: (st) => {
      st.message1 = "";
      st.message2 = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchClinicsD.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchClinicsD.fulfilled, (state, action) => {
        state.status1 = "succeeded";
        // console.log(action.payload);
        state.clinics = action.payload.data;
      })
      .addCase(fetchClinicsD.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchAKeyServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAKeyServices.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.KeyServices1 = action.payload.data;
      })
      .addCase(fetchAKeyServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchHomeCareAKeyServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeCareAKeyServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.homeCareKeyServices = action.payload.data;
      })
      .addCase(fetchHomeCareAKeyServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status1 = "succeeded";
        // console.log(action.payload);
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchTimesA.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchTimesA.fulfilled, (state, action) => {
        state.status1 = "succeeded";

        state.times = action.payload;
      })
      .addCase(fetchTimesA.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchHomeCareTimesA.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchHomeCareTimesA.fulfilled, (state, action) => {
        state.status1 = "succeeded";

        state.homeCareTimes = action.payload;
      })
      .addCase(fetchHomeCareTimesA.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(HomeCarebookApointmentD.pending, (state) => {
        state.status1 = "loading";
        state.message2 = "";
      })
      .addCase(HomeCarebookApointmentD.fulfilled, (state, action) => {
        state.status1 = "succeeded";

        state.message2 = action.payload.message;
      })
      .addCase(HomeCarebookApointmentD.rejected, (state, action) => {
        state.status2 = "failed";
        state.message2 = action.error.message;
      });
    builder
      .addCase(bookApointmentD.pending, (state) => {
        state.status2 = "loading";
        state.message1 = "";
      })
      .addCase(bookApointmentD.fulfilled, (state, action) => {
        state.status2 = "succeeded";

        state.message1 = action.payload.message;
      })
      .addCase(bookApointmentD.rejected, (state, action) => {
        state.status2 = "failed";
        state.message1 = action.error.message;
      });
  },
});
export const { restMessage } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
