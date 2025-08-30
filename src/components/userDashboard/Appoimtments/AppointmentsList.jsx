/* eslint-disable no-unused-vars */
// src/components/AppointmentsList.jsx
import { useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import useUserDashboardSlice from "../../../hooks/useUserDashboard";
import AppointmentDetailsModal from "./Modals/AppointmentDetailsModal";
import LogoLoader from "../../LogoLoader";
/**
 * Helper: parse date (YYYY-MM-DD) to readable "DD, MMM ddd"
 * بدون ما نضيف مكتبات؛ تنسيق بسيط يحافظ على التصميم العام
 */
function formatDate(d) {
  try {
    const date = new Date(d);
    const opts = { day: "2-digit", month: "short", weekday: "short" };
    // Example: "24, Nov Tue"
    const day = String(date.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
      date
    );
    const weekday = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
      date
    );
    return `${day}, ${month} ${weekday}`;
  } catch {
    return d || "";
  }
}

/**
 * Helper: extract year from "YYYY-MM-DD"
 */
function extractYear(d) {
  if (!d) return "";
  const m = String(d).match(/^(\d{4})-/);
  return m ? m[1] : "";
}

/**
 * Helper: keep time as "HH:MM:SS" or "HH:MM"
 */
function formatTime(t) {
  if (!t) return "";
  // keep “HH:MM” فقط
  const [hh = "", mm = ""] = String(t).split(":");
  return `${hh}:${mm}`;
}

/**
 * Normalize API response to a unified list for the UI without changing design.
 * - doctor field يبقى مستخدم مثل ما هو بالتصميم (بالـ HomeCare منبدّل nurse => doctor)
 * - infoSession: نخزّن أي "info session" (object أو array) كما هي لعرضها بالمودال
 */
function normalizeAppointments(apiData, sortOrder = "desc") {
  const clinicRaw = apiData?.appointments?.clinic ?? [];
  const homeCareRaw = apiData?.appointments?.homeCare ?? [];

  const clinic = clinicRaw.map((it) => ({
    dateRaw: it.date,
    date: formatDate(it.date),
    year: extractYear(it.date),
    time: formatTime(it.time),
    department: it.department,
    type: it.type || "Clinic",
    doctor: it.doctor, // كما هي
    status: it.status,
    mode: it.mode,
    // قد تكون array داخل العيادة
    infoSession: it["info session"] ?? null,
    // للحفظ لو بدك ترجع للـ raw لاحقاً
    _raw: it,
  }));

  const homeCare = homeCareRaw.map((it) => ({
    dateRaw: it.date,
    date: formatDate(it.date),
    year: extractYear(it.date),
    time: formatTime(it.time),
    department: it.department,
    type: it.type || "HomeCare",
    doctor: it.nurse, // نعيّن nurse ضمن doctor لنحافظ على نفس التصميم
    status: it.status,
    mode: it.mode,
    // بالهوم كير عادةً object
    infoSession: it["info session"] ?? null,
    _raw: it,
  }));

  // دمج الكل
  const merged = [...clinic, ...homeCare];

  // ترتيب اختياري (أحدث تاريخ/ساعة أولاً)
  merged.sort((a, b) => {
    const da = new Date(`${a.dateRaw}T${a._raw?.time || "00:00:00"}`).getTime();
    const db = new Date(`${b.dateRaw}T${b._raw?.time || "00:00:00"}`).getTime();
    return sortOrder === "asc" ? da - db : db - da;
  });

  return merged;
}

export default function AppointmentsList({
  apiData,
  sortOrder = "desc",
  status,
}) {
  const { getStatusStyle } = useUserDashboardSlice();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // طبع/دمج البيانات القادمة من API
  const appointments = useMemo(
    () => normalizeAppointments(apiData, sortOrder),
    [apiData, sortOrder]
  );

  const openModal = (appt) => {
    setSelectedAppointment(appt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  // شرط تفعيل زر See more: status === "Don" ووجود infoSession
  const canSeeMore = (appt) => {
    if (!appt?.infoSession) return false;
    // Clinic ⇒ Don
    if (appt?.type === "Clinic") return appt.status === "Don";
    // HomeCare ⇒ Completed
    if (appt?.type === "HomeCare") return appt.status === "Completed";
    return false;
  };

  return (
    <div className="bg-white rounded-2xl p-6 max-w-6xl mx-auto shadow-sm h-[550px] overflow-auto no-scrollbar ">
      {status == "loading" ? (
        <div className="flex items-center w-full h-full justify-center">
          <LogoLoader size={42} speed={1.2} />
        </div>
      ) : appointments.length === 0 && status == "succeeded" ? (
        <p className="text-center text-gray-500 font-medium py-6">
          No appointments
        </p>
      ) : (
        appointments.map((appt, index) => (
          <div key={index}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 rounded-xl transition-transform transform hover:scale-[1.07] hover:shadow-lg bg-white">
              {/* Date */}
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="text-gray-400 text-sm font-medium">Date</p>
                <p className="text-gray-900 font-semibold">{appt.date}</p>
              </div>

              {/* Time */}
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="text-gray-400 text-sm font-medium">Time</p>
                <p className="text-gray-900 font-semibold">{appt.time}</p>
              </div>

              {/* Department */}
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="text-gray-400 text-sm font-medium">Department</p>
                <p className="text-gray-900 font-semibold">{appt.department}</p>
              </div>

              {/* Type */}
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="text-gray-400 text-sm font-medium">Type</p>
                <p className="text-gray-900 font-semibold">{appt.type}</p>
              </div>

              {/* Doctor (أو Nurse مموّهة كـ doctor للحفاظ على نفس التصميم) */}
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="text-gray-400 text-sm font-medium">Doctor</p>
                <p className="text-gray-900 font-semibold">{appt.doctor}</p>
              </div>

              {/* Status */}
              <div className="flex-1 mb-3 sm:mb-0">
                <p className="text-gray-400 text-sm font-medium">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    appt.status
                  )}`}
                >
                  {appt.status}
                </span>
              </div>

              {/* See More Button */}
              <div className="flex-1 flex sm:justify-end">
                {canSeeMore(appt) ? (
                  <button
                    onClick={() => openModal(appt)}
                    className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                    type="button"
                  >
                    See more <FiArrowRight />
                  </button>
                ) : (
                  // حافظنا على مكان الزر بدون تفعيله (نفس التصميم)
                  <button
                    disabled
                    className="flex items-center gap-1 bg-gray-100 text-gray-400 px-3 py-1 rounded-full text-sm font-medium cursor-not-allowed"
                    type="button"
                    title="Details available only when status is Don"
                  >
                    See more <FiArrowRight />
                  </button>
                )}
              </div>
            </div>

            {/* HR separator */}
            {index < appointments.length - 1 && (
              <hr className="border-gray-200 my-2" />
            )}
          </div>
        ))
      )}

      {/* Modal */}
      <AppointmentDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        appointment={selectedAppointment}
      />
    </div>
  );
}
