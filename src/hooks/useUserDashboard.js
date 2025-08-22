import { useState, useRef, useEffect } from "react";

export default function useUserDashboardSlice() {
  // ---------------- Profile State ----------------
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Maha faouzy ahmad",
    genderAge: "Female / 20 years",
    blood: "O+",
    height: "162 cm",
    weight: "54 kg",
    location: "Damascus , Syria",
    phone: "+963 999 999 999",
    chronic: "IHD, chronic thyroid disorder",
    hereditary: "obesity (father)",
    diseases: "liposuction",
    allergies: "asdfghjk",
  });

  const scrollRef = useRef(null);
  const scrollPosRef = useRef(0);

  const toggleEdit = () => {
    if (scrollRef.current) scrollPosRef.current = scrollRef.current.scrollTop;
    setIsEditing((v) => !v);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollPosRef.current;
    }
  }, [isEditing]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const formatList = (text) =>
    text
      .split(/[,،]\s*|\n+/)
      .map((item) => item.trim())
      .filter((item) => item)
      .join(", ");

  // ---------------- DoctorsCard Logic ----------------
  const doctors = [
    {
      name: "Ahmad Khalil",
      specialty: "Dentist",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      name: "Yousef Nour",
      specialty: "Dermatologist",
      img: "",
    },
    {
      name: "Razan Fathy",
      specialty: "Cardiologist",
      img: "",
    },
    {
      name: "Razan Fathy",
      specialty: "Cardiologist",
      img: "",
    },
    {
      name: "Razan Fathy",
      specialty: "Cardiologist",
      img: "",
    },
  ];

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

  const appointments = [
    {
      date: "24,Nov Tue",
      time: "3:00PM - 4:00AM",
      department: "Cardiology",
      type: "Clinics",
      doctor: "Razan Fathy",
      status: "pending",
    },
    {
      date: "24,Nov Tue",
      time: "3:00PM - 4:00AM",
      department: "Cardiology",
      type: "Clinics",
      doctor: "Razan Fathy",
      status: "new",
    },
    {
      date: "24,Nov Tue",
      time: "3:00PM - 4:00AM",
      department: "Cardiology",
      type: "Home care",
      doctor: "Razan Fathy",
      status: "pending",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#f3dbe9] text-[#972f6a]";
      case "new":
        return "bg-[#28BBAC3B] text-[#28BBACFF]";
      case "done":
        return "bg-[#972f6a] text-white";
      case "canceled":
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
  };
}
