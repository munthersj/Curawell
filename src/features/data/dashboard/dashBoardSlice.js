// features/data/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstanceR from "../../../config/axiosIntanceR";

// async thunk لطلب البيانات
export const fetchMedDigData = createAsyncThunk(
  "data/dashboard/fetchMedDigData",
  async () => {
    const response = await axiosInstanceR.get("/sessions");

    return response.data;
  }
);
export const fetchPateintDoctor = createAsyncThunk(
  "data/dashboard/fetchPateintDoctor",
  async () => {
    const response = await axiosInstanceR.get("/myDoctors");
    // console.log(response.data);
    return response.data;
  }
);

export const fetchAppointments = createAsyncThunk(
  "data/dashboard/fetchAppointments",
  async () => {
    const response = await axiosInstanceR.get("/appointments");

    return response.data;
  }
);
export const fetchProfileData = createAsyncThunk(
  "data/dashboard/fetchProfileData",
  async () => {
    const response = await axiosInstanceR.get("/profile");

    return response.data;
  }
);
export const savePatientProfile = createAsyncThunk(
  "data/dashboard/savePatientProfile",
  async (payload, { getState, rejectWithValue }) => {
    console.log(payload);
    const state = getState();
    const existing = state?.dashBoardData?.profileData || {};
    try {
      const toArray = (v) =>
        Array.isArray(v)
          ? v
          : String(v || "")
              .split(/[,،]\s*|\n+/)
              .map((x) => x.trim())
              .filter(Boolean);

      const extractGenderAge = (p) => {
        let gender = p?.gender;
        let age = p?.age;

        if (gender == null || age == null) {
          const s = String(p?.genderAge || "").trim();
          if (s) {
            const ageMatch = s.match(/(\d{1,3})/);
            if (age == null && ageMatch) age = Number(ageMatch[1]);
            if (gender == null) {
              // احذف الأرقام والفواصل والشرطات والـ / واترك حروف فقط (يدعم العربية)
              gender = s
                .replace(/\d+/g, "")
                .replace(/[/\-|,،]+/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            }
          }
        }
        return { gender, age };
      };

      const deriveBirthDate = (age, currentBirthDate) => {
        if (!Number.isFinite(age) || age <= 0) return null;

        const today = new Date();
        let y = today.getFullYear() - age;
        let m = 0,
          d = 1;

        if (currentBirthDate) {
          const cur = new Date(currentBirthDate);
          if (!isNaN(cur)) {
            m = cur.getMonth();
            d = cur.getDate();
          }
        }
        const dt = new Date(y, m, d);
        const yyyy = dt.getFullYear();
        const mm = String(dt.getMonth() + 1).padStart(2, "0");
        const dd = String(dt.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      };

      const ensureFormData = (p) => {
        if (p instanceof FormData) return p;
        const fd = new FormData();

        // توقعات الحقول (عدّل الأسماء حسب الباك)
        if (p.name != null) fd.append("first_name", p.name);
        if (p.location != null) fd.append("address", p.location);
        // if (p.phone != null) fd.append("phone", p.phone);

        const { gender, age } = extractGenderAge(p);
        if (gender != null && String(gender).trim() !== "") {
          fd.append("gender", String(gender).trim());
        }
        if (age != null && !Number.isNaN(Number(age))) {
          fd.append("age", String(Number(age)));
        }
        if (Number.isFinite(Number(age))) {
          const nAge = Number(age);
          // بعض الـ APIs بتتجاهل age وبتعتمد birth_date
          fd.append("age", String(nAge));

          const bd = deriveBirthDate(nAge, existing?.birth_date);
          if (bd) {
            // جرّب أشهر المفاتيح الشائعة — الزيادة ما بتضر (السيرفر بيتجاهل الزايد)
            fd.append("birthday", bd);
          }
        }
        if (p.blood != null) fd.append("blood_group", p.blood);
        console.log(fd);
        if (p.height != null)
          fd.append("height", p.height === "" ? "" : String(p.height));

        if (p.weight != null)
          fd.append("weight", p.weight === "" ? "" : String(p.weight));

        const appendArr = (key, arr) => {
          toArray(arr).forEach((v) => fd.append(`[${key}][]`, v));
        };

        if (p.chronic_diseases != null)
          appendArr("chronic_diseases", p.chronic_diseases);
        if (p.hereditary_diseases != null)
          appendArr("hereditary_diseases", p.hereditary_diseases);
        if (p.new_diseases != null) appendArr("new_diseases", p.new_diseases);
        if (p.allergies != null) appendArr("allergies", p.allergies);

        // أمثلة ملفات:
        // if (p.avatarFile) fd.append("avatar", p.avatarFile);

        return fd;
      };

      const body = ensureFormData(payload);
      console.log(body);
      const { data } = await axiosInstanceR.post(
        "/updateProfilePatient",
        body
        // لا تضيف Content-Type مع FormData — axios يضبطه تلقائيًا
      );
      console.log(data);
      return data; // يُفضّل يرجّع الباك النسخة المحدّثة
    } catch (e) {
      return rejectWithValue(e?.response?.data || e?.message || "Save failed");
    }
  }
);

const dashBoardSlice = createSlice({
  name: "dashBoardSlice",
  initialState: {
    sessions: [],
    doctors: [],
    appointments: [],
    profileData: {},
    mess: "",
    // sections: [],
    status: "idle", // idle | loading | succeeded | failed
    status1: "idle", // idle | loading | succeeded | failed
    status4: "idle", // idle | loading | succeeded | failed
    error: null,

    saveStatus: "idle",
    saveError: null,
  },
  reducers: {
    resetPdata: (st) => (st.profileData = {}),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedDigData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedDigData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.sessions = action.payload.data;
      })
      .addCase(fetchMedDigData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchPateintDoctor.pending, (state) => {
        state.status1 = "loading";
      })
      .addCase(fetchPateintDoctor.fulfilled, (state, action) => {
        state.status1 = "succeeded";
        // console.log(action.payload);
        state.doctors = action.payload;
      })
      .addCase(fetchPateintDoctor.rejected, (state, action) => {
        state.status1 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.status4 = "loading";
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.status4 = "succeeded";
        // console.log(action.payload);
        state.profileData = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.status4 = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(savePatientProfile.pending, (s) => {
        s.saveStatus = "loading";
        s.saveError = null;
      })
      .addCase(savePatientProfile.fulfilled, (s, a) => {
        s.saveStatus = "succeeded";
        s.mess = a.payload; // خزّن النسخة المحدثة لو رجعت من الباك
      })
      .addCase(savePatientProfile.rejected, (s, a) => {
        s.saveStatus = "failed";
        s.saveError = a.payload || a.error?.message || "Error";
      });
  },
});
export const { resetPdata } = dashBoardSlice.actions;

export default dashBoardSlice.reducer;
