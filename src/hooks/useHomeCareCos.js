// hooks/useAppointmentBooking.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHomeCareKeyServices,
  fetchHomeCareTimes,
  HomeCarebookApointment,
  reset,
  fetchLHomeCareComments,
  fetchHomeCareSectionsData,
} from "../features/data/cosmeticSlice"; // عدّل المسار حسب مشروعك

export function useHomeCareCos(sectionId) {
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
    status,
    homeCareKeyServices,
    times,
    message2,
    homeCareTimes,
    status1,
    status2,
    comments,
    sections,
  } = useSelector((s) => s.cosmeticData);

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

  //Note
  const [note, setNote] = useState("");

  //validator
  const [phoneTouched, setPhoneTouched] = useState(false);

  // regex: 09 + 8 digits
  const isSyrianMobile = (s) => /^09\d{8}$/.test(s);
  const phoneError = phoneTouched && !isSyrianMobile(phone);

  //deatails
  const sectionData = sections.find((s) => s.id == sectionId);
  console.log(sections);
  console.log(sectionData);
  // ===== Init fetch =====
  useEffect(() => {
    if (sectionId != null) {
      dispatch(fetchHomeCareKeyServices(sectionId));
      dispatch(
        fetchLHomeCareComments({ comment_type: "Section", id: sectionId })
      );
      dispatch(fetchHomeCareSectionsData());
    }
    // أطباء اليوم بدون فلترة اختصاص بالبداية
  }, [dispatch, sectionId, today, toYMD]);

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  // ===== Derived lists =====
  const homeCareKeyServicesName = useMemo(
    () => (homeCareKeyServices ?? []).map((item) => item.name_en),
    [homeCareKeyServices]
  );

  const filteredOptions = useMemo(() => {
    if (!query) return homeCareKeyServicesName;
    return homeCareKeyServicesName.filter((opt) =>
      opt?.toLowerCase?.().includes(query.toLowerCase())
    );
  }, [query, homeCareKeyServicesName]);

  const genderSelect = ["male", "female"];

  const filteredOptions1 = useMemo(() => {
    if (!query1) return genderSelect;
    return genderSelect.filter((opt) =>
      opt?.toLowerCase?.().includes(query1.toLowerCase())
    );
  }, [genderSelect, query1]);

  // doctorId المعتمد للطلبات (من اختيار الاسم في الـ dropdown)

  // ===== Fetch times when date & doctor selected =====
  useEffect(() => {
    if (!selectedDate) return;
    dispatch(
      fetchHomeCareTimes({
        date: toYMD(selectedDate),
      })
    );
  }, [dispatch, selectedDate, toYMD]);

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
    if (!isSyrianMobile(phone))
      if (
        !selectedTime ||
        !selectedSlot ||
        !phone.trim() ||
        !isSyrianMobile(phone)
      ) {
        return;
      }

    const payload = {
      period_id: selectedTime,
      phone: phone.trim(),
      gender: query1,
      service_type: query,
      location: location.trim(),
      date: toYMD(selectedDate),
      note: note,
    };

    dispatch(HomeCarebookApointment(payload));
    dispatch(fetchHomeCareKeyServices(sectionId));
    dispatch(
      fetchLHomeCareComments({ comment_type: "Section", id: sectionId })
    );
  }, [
    selectedTime,
    selectedSlot,
    phone,
    query1,
    query,
    location,
    toYMD,
    selectedDate,
    dispatch,
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

  const doctorsDisabled = !selectedService;

  return {
    // redux data
    status,
    status2,
    times,
    message2,
    homeCareTimes,
    status1,

    // dates
    today,
    toYMD,

    //validator
    phoneError,
    setPhoneTouched,

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

    phone,
    setPhone,
    settings1,

    note,
    setNote,

    sectionData,

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
    homeCareKeyServices,
    homeCareKeyServicesName,
    filteredOptions,
    genderSelect,

    filteredOptions1,

    doctorsDisabled,

    // handlers
    handleInputChange,
    toggleDropdown,
    handleSelect,
    handleInputChange1,
    toggleDropdown1,
    handleSelect1,
    handelSubmit,
    resetForm,

    comments,

    // actions (لو بدك تستخدمهم خارجيًا)
    resetAction: () => dispatch(reset()),
  };
}
