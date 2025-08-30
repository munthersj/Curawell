// hooks/useAppointmentBooking.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKeyServices,
  fetchSectionDoctors,
  fetchTimes,
  bookApointment,
  reset,
  fetchCosOffersData,
} from "../features/data/cosmeticSlice"; // عدّل المسار حسب مشروعك
import { fetchClinicsData } from "../features/data/clinicsSlice";

export function useCosmetic(sectionId) {
  const dispatch = useDispatch();

  // ===== Helpers =====
  const toYMD = useCallback((d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // ===== Redux state =====
  const {
    keyServices,
    status,
    status1,
    status2,
    status3,
    times,
    message1,
    doctors1,
    offers,
    // sections,
  } = useSelector((s) => s.cosmeticData);
  // const sectionData = sections.find((s) => s.id == sectionId);

  const { clinics } = useSelector((s) => s.clinicsData);
  // console.log(keyServices);
  // ===== Local UI state =====
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTime, setselectedTime] = useState(null);
  const settings1 = {
    infinite: true, // يجعل السلايدر لا نهائي
    speed: 1000, // سرعة الانتقال
    slidesToShow: 1, // عدد الكروت الظاهرة
    slidesToScroll: 1, // كم كرت ينزاح
    autoplay: true, // تشغيل تلقائي
    autoplaySpeed: 4000, // كل كم ملي ثانية ينتقل (3 ثواني هنا)
    arrows: false, // يمكن إخفاء الأسهم إن أردت
    dots: false, // يمكن إظهار النقاط
    pauseOnHover: false,
    fade: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const [phone, setPhone] = useState("");

  // Key Services field
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Doctors field
  const [query1, setQuery1] = useState("");
  const [showDropdown1, setShowDropdown1] = useState(false);

  // Location
  const [enableWebsite, setEnableWebsite] = useState(false);
  const [location, setlocation] = useState("");

  //validator
  const [phoneTouched, setPhoneTouched] = useState(false);

  // validator: 09 + 8 digits (total 10), no spaces
  const isSyrianMobile = (s) => /^09\d{8}$/.test(s);
  const phoneError = phoneTouched && !isSyrianMobile(phone);
  //deatails
  const sectionData = clinics.find((s) => s.id == sectionId);

  console.log(sectionData);

  // ===== Init fetch =====
  useEffect(() => {
    if (sectionId != null) dispatch(fetchKeyServices(sectionId));
    // أطباء اليوم بدون فلترة اختصاص بالبداية
    dispatch(fetchSectionDoctors({ date: toYMD(today), sectionId }));
    dispatch(fetchCosOffersData());
    dispatch(fetchClinicsData());
  }, [dispatch, sectionId, today, toYMD]);

  // ===== Derived lists =====
  const keyServicesNames = useMemo(
    () =>
      (keyServices ?? []).map((item) => item.competences?.competence_name_en),
    [keyServices]
  );

  const filteredOptions = useMemo(() => {
    if (!query) return keyServicesNames;
    return keyServicesNames.filter((opt) =>
      opt?.toLowerCase?.().includes(query.toLowerCase())
    );
  }, [query, keyServicesNames]);

  const doctorsOptions = useMemo(() => {
    if (!selectedService) return [];
    const found = keyServices.find(
      (item) => item.competences?.competence_name_en === selectedService
    );
    return found
      ? found.competences?.competence_doctors?.map((doc) => doc.doctor_name) ??
          []
      : [];
  }, [keyServices, selectedService]);

  const doctorsOptionsId = useMemo(() => {
    if (!selectedService) return [];
    const found = keyServices.find(
      (item) => item.competences?.competence_name_en === selectedService
    );
    return found
      ? found.competences?.competence_doctors?.map((doc) => ({
          doctorId: doc.doctor_id,
          doctorName: doc.doctor_name,
        })) ?? []
      : [];
  }, [keyServices, selectedService]);

  const filteredOptions1 = useMemo(() => {
    if (!query1) return doctorsOptions;
    return doctorsOptions.filter((opt) =>
      opt?.toLowerCase?.().includes(query1.toLowerCase())
    );
  }, [query1, doctorsOptions]);

  // doctorId المعتمد للطلبات (من اختيار الاسم في الـ dropdown)
  const selectedDoctorIdForFetch = useMemo(() => {
    const hit = doctorsOptionsId.find((d) => d.doctorName === query1);
    return hit?.doctorId ?? null;
  }, [doctorsOptionsId, query1]);

  // ===== React to service change -> fetch doctors by competence =====
  useEffect(() => {
    if (activeServiceId != null) {
      dispatch(
        fetchSectionDoctors({
          date: toYMD(today),
          competence_id: activeServiceId,
          sectionId,
        })
      );
    }
  }, [activeServiceId, dispatch, today, toYMD, sectionId]);

  // ===== Fetch times when date & doctor selected =====
  useEffect(() => {
    if (!selectedDate || !selectedDoctorIdForFetch) return;
    dispatch(
      fetchTimes({
        date: toYMD(selectedDate),
        id: selectedDoctorIdForFetch,
      })
    );
  }, [dispatch, selectedDate, selectedDoctorIdForFetch, toYMD]);

  // ===== Handlers =====
  const handleInputChange = useCallback((e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  }, []);

  const toggleDropdown = useCallback(() => {
    setShowDropdown((s) => !s);
  }, []);

  const handleSelect = useCallback((item) => {
    setQuery(item);
    setSelectedService(item);
    setShowDropdown(false);
    // reset doctors when service changes
    setQuery1("");
    setShowDropdown1(false);
  }, []);

  const handleInputChange1 = useCallback(
    (e) => {
      const doctorsDisabled = !selectedService;
      if (doctorsDisabled) return;
      setQuery1(e.target.value);
      setShowDropdown1(true);
    },
    [selectedService]
  );

  const toggleDropdown1 = useCallback(() => {
    const doctorsDisabled = !selectedService;
    if (doctorsDisabled) return;
    setShowDropdown1((s) => !s);
  }, [selectedService]);

  const handleSelect1 = useCallback(
    (item) => {
      const doctorsDisabled = !selectedService;
      if (doctorsDisabled) return;
      setQuery1(item);
      setShowDropdown1(false);
    },
    [selectedService]
  );

  const handelSubmit = useCallback(() => {
    if (
      !selectedTime ||
      !selectedSlot ||
      !selectedDoctorIdForFetch ||
      !phone.trim() ||
      !isSyrianMobile(phone)
    ) {
      return;
    }
    if (enableWebsite && !location.trim()) {
      // خليه يتعامل بالواجهة (toast) لو بدك
      return;
    }

    const payload = {
      doctor_id: selectedDoctorIdForFetch,
      doctor_session_id: selectedTime,
      phone: phone.trim(),
      taxi_order: enableWebsite,
      ...(enableWebsite ? { location: location.trim() } : {}),
      mode: "Electronically",
    };

    dispatch(bookApointment(payload));
    dispatch(fetchKeyServices(sectionId));
    dispatch(fetchSectionDoctors({ date: toYMD(today), sectionId }));
  }, [
    selectedTime,
    selectedSlot,
    selectedDoctorIdForFetch,
    phone,
    enableWebsite,
    location,
    dispatch,
    sectionId,
    toYMD,
    today,
  ]);

  const resetForm = useCallback(() => {
    setPhone("");
    setEnableWebsite(false);
    setlocation("");

    setQuery("");
    setSelectedService(null);
    setShowDropdown(false);
    setQuery1("");
    setShowDropdown1(false);

    setSelectedDate(null);
    setSelectedSlot(null);

    setActiveServiceId(null);
    setSelectedDoctorId(null);
    setselectedTime(null);
  }, []);

  // راقب حقل Key Services: تفريغ الأطباء عند حذف الاستعلام
  useEffect(() => {
    if (!query) {
      setSelectedService(null);
      setQuery1("");
      setShowDropdown1(false);
    }
  }, [query]);

  // selected doctor object (يمين التفاصيل)
  const selectedDoctor = useMemo(() => {
    return (
      doctors1?.find((d) => d.doctor_id === Number(selectedDoctorId)) ?? null
    );
  }, [doctors1, selectedDoctorId]);

  const doctorsDisabled = !selectedService;

  return {
    // redux data
    keyServices,
    status,
    status1,
    status2,
    status3,
    times,
    message1,
    doctors1,
    offers,
    // dates
    today,
    toYMD,

    // selections & UI state
    activeServiceId,
    setActiveServiceId,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    selectedTime,
    setselectedTime,

    sectionData,

    phone,
    setPhone,
    settings1,
    phoneError,
    setPhoneTouched,
    query,
    setQuery,
    showDropdown,
    setShowDropdown,
    selectedService,
    setSelectedService,

    query1,
    setQuery1,
    showDropdown1,
    setShowDropdown1,

    enableWebsite,
    setEnableWebsite,
    location,
    setlocation,

    // derived
    keyServicesNames,
    filteredOptions,
    doctorsOptions,
    doctorsOptionsId,
    filteredOptions1,
    selectedDoctorIdForFetch,
    doctorsDisabled,
    selectedDoctor,

    // handlers
    handleInputChange,
    toggleDropdown,
    handleSelect,
    handleInputChange1,
    toggleDropdown1,
    handleSelect1,
    handelSubmit,
    resetForm,
    // sectionData,
    // actions (لو بدك تستخدمهم خارجيًا)
    resetAction: () => dispatch(reset()),
  };
}
