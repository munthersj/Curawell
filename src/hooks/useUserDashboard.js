import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedDigData,
  fetchPateintDoctor,
  fetchAppointments,
  fetchProfileData,
  resetPdata,
  savePatientProfile,
} from "../features/data/dashboard/dashBoardSlice";
export default function useUserDashboard() {
  // formatAgo("d:1|h:22|m:43") -> "1 day ago"
  function formatAgo(input) {
    const normalizeUnit = (u) => {
      const k = String(u || "").toLowerCase();
      if (["y", "yr", "year", "years"].includes(k)) return "y";
      if (["mo", "mon", "month", "months"].includes(k)) return "mo";
      if (["w", "wk", "week", "weeks"].includes(k)) return "w";
      if (["d", "day", "days"].includes(k)) return "d";
      if (["h", "hr", "hour", "hours"].includes(k)) return "h";
      if (["m", "min", "minute", "minutes"].includes(k)) return "m";
      if (["s", "sec", "second", "seconds"].includes(k)) return "s";
      return "s";
    };

    const plural = (n, word) => (n === 1 ? `1 ${word}` : `${n} ${word}s`);

    const formatPrimary = (unit, value) => {
      if (unit === "d") {
        if (value >= 365) return plural(Math.floor(value / 365), "year");
        if (value >= 30) return plural(Math.floor(value / 30), "month");
        if (value >= 7) return plural(Math.floor(value / 7), "week");
        return plural(value, "day");
      }
      if (unit === "w") return plural(value, "week");
      if (unit === "mo") return plural(value, "month");
      if (unit === "y") return plural(value, "year");
      if (unit === "h") return plural(value, "hour");
      if (unit === "m") return plural(value, "minute");
      if (unit === "s") return plural(value, "second");
      return "just now";
    };

    // parse tokens like "d:1|h:22|m:43"
    const tokens = String(input)
      .split("|")
      .map((t) => t.trim())
      .filter(Boolean);

    const parts = {};
    for (const t of tokens) {
      const [u, raw] = t.split(":");
      const unit = normalizeUnit(u);
      const val = Number(raw);
      if (Number.isFinite(val)) parts[unit] = val;
    }

    // pick the first non-zero value in the same order as input
    for (const t of tokens) {
      const unit = normalizeUnit(t.split(":")[0]);
      const val = parts[unit] || 0;
      if (val > 0) return formatPrimary(unit, val);
    }

    // all zeros or invalid -> fallback
    if ((parts.s || 0) > 0) return plural(parts.s, "second");
    return "just now";
  }

  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMedDigData());
    dispatch(fetchPateintDoctor());
    dispatch(fetchAppointments());
    dispatch(fetchProfileData());
  }, [dispatch]);

  const {
    sessions,
    status,
    doctors,
    status1,
    appointments,
    profileData,
    status4,
    saveStatus,
  } = useSelector((s) => s.dashBoardData);
  // ---------------- Profile State ----------------
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    blood: "",
    height: "",
    weight: "",
    location: "",
    phone: "",
    chronic_diseases: "",
    hereditary_diseases: "",
    new_diseases: "",
    allergies: "",
  });

  //new

  useEffect(() => {
    if (!profileData) return;
    const p = profileData;
    const mh = p?.patient?.medical_history || {};
    const join = (arr) =>
      Array.isArray(arr)
        ? arr
            .map((x) => String(x).trim())
            .filter(Boolean)
            .join(", ")
        : "";
    setFormData({
      name: p?.first_name || "",
      genderAge: [p?.gender, p?.age].filter(Boolean).join(" / "),
      blood: mh.blood_group || "",
      height: mh.height ?? "",
      weight: mh.weight ?? "",
      location: p?.address || "",
      phone: p?.phone || "",
      chronic_diseases: join(mh.chronic_diseases),
      hereditary_diseases: join(mh.hereditary_diseases),
      new_diseases: join(mh.new_diseases),
      allergies: join(mh.allergies),
    });
  }, [profileData]);
  ///

  const scrollRef = useRef(null);
  const scrollPosRef = useRef(0);

  const toggleEdit = async () => {
    if (!isEditing) return setIsEditing(true);

    // حفظ عبر axios/ثانك (POST + FormData)
    const action = await dispatch(savePatientProfile(formData));
    if (action.type === "data/dashboard/savePatientProfile/fulfilled") {
      setIsEditing(false);
      dispatch(fetchProfileData()); // refresh
    } else {
      alert("Failed to save");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollPosRef.current;
    }
  }, [isEditing]);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const formatList = (arr) => {
    if (!Array.isArray(arr)) return "";
    return [
      ...new Set(arr.map((x) => String(x).trim()).filter((x) => x.length > 0)),
    ].join(", ");
  };

  const getImage = (imgUrl) =>
    imgUrl && imgUrl.trim() !== ""
      ? imgUrl
      : "https://via.placeholder.com/40?text=Dr";

  // ---------------- DiagnosisCard Logic ----------------
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

  const diagnosisItems = [
    { title: "Pneumonia", doctor: "Dr. Ahmad Khalil", duration: "2 Weeks" },
    { title: "Seasonal flu", doctor: "Dr. Ahmad Khalil", duration: "1 Week" },
    { title: "Covid-19", doctor: "Dr. Ahmad Khalil", duration: "3 Weeks" },
    { title: "Seasonal flu", doctor: "Dr. Ahmad Khalil", duration: "1 Week" },
  ];

  // ---------------- AppointmentsCard Logic ----------------
  const [activeTab, setActiveTab] = useState("upcoming");

  // const appointments = [
  //   {
  //     date: "24,Nov Tue",
  //     time: "3:00PM - 4:00AM",
  //     department: "Cardiology",
  //     type: "Clinics",
  //     doctor: "Razan Fathy",
  //     status: "pending",
  //   },
  //   {
  //     date: "24,Nov Tue",
  //     time: "3:00PM - 4:00AM",
  //     department: "Cardiology",
  //     type: "Clinics",
  //     doctor: "Razan Fathy",
  //     status: "new",
  //   },
  //   {
  //     date: "24,Nov Tue",
  //     time: "3:00PM - 4:00AM",
  //     department: "Cardiology",
  //     type: "Home care",
  //     doctor: "Razan Fathy",
  //     status: "pending",
  //   },
  // ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Occur":
        return "bg-[#f3dbe9] text-[#972f6a]";
      case "Scheduled":
        return "bg-[#28BBAC3B] text-[#28BBACFF]";
      case "Confirmed":
        return "bg-[#972f6a] text-white";
      case "Don":
        return "bg-gray-200 text-gray-500";
      case "Completed":
        return "bg-gray-200 text-gray-500";
    }
  };

  return {
    // Profile
    isEditing,
    formData,
    handleChange,
    formatList,
    toggleEdit,
    scrollRef,

    // Doctors
    doctors,
    getImage,

    // Diagnosis
    selectedDiagnosis,
    setSelectedDiagnosis,
    diagnosisItems,

    // AppointmentsCard
    activeTab,
    setActiveTab,
    appointments,
    getStatusStyle,

    //backEnd-data
    sessions,
    status,
    formatAgo,
    status1,
    profileData,
    status4,
    resetPdata,
    saveStatus,
  };
}
