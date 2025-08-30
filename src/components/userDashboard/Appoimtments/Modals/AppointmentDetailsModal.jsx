// src/components/Modals/AppointmentDetailsModal.jsx
import React, { useMemo, useState } from "react";

export default function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
}) {
  const [activeTab, setActiveTab] = useState("Diagnosis & Report");

  // حضّر الـ info لاستخدامه داخل التابّات
  const info = useMemo(() => {
    if (!appointment?.infoSession) return null;

    const raw = appointment.infoSession;

    // العيادة: array
    if (Array.isArray(raw)) {
      // نأخذ أول جلسة مبدئيًا (نفس التصميم)
      const first = raw[0] || {};
      return {
        isHomeCare: false,
        sessionName: first.session_name || "",
        diagnosisTitle: first?.diagnosis?.diagnosis || "",
        reportText: first?.diagnosis?.report || "",
        symptoms: first?.symptoms || "",
        medicines: first?.medicines || "",
        phone: null,
        notes: null,
        price: null,
        diagnosesObj: null,
      };
    }

    // HomeCare: object
    if (raw && typeof raw === "object") {
      return {
        isHomeCare: true,
        sessionName: null,
        diagnosisTitle: "",
        reportText: "",
        symptoms: "",
        medicines: "",
        phone: raw.your_phone_number ?? "",
        notes: raw.notes ?? "",
        price: raw.price ?? "",
        diagnosesObj: raw.diagnoses ?? null,
      };
    }

    return null;
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Light Gray Overlay */}
      <div
        className="absolute inset-0 bg-[#1D212836] bg-opacity-20"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed justify-start bg-white rounded-2xl shadow-lg w-[750px] h-[700px] max-w-4xl z-50 p-8 right-4 ">
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-black">Appointment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition"
          >
            {/* Back Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        {/* Info Row */}
        <div className="flex justify-between mb-6">
          {/* Appointment Info Card */}
          <div className="bg-[#f3f4f6ab] p-4 rounded-xl w-1/2">
            <p className="text-[#972F6A] font-semibold">
              {appointment.date} {appointment.year || "2025"}
            </p>
            <p className="text-gray-400 text-sm mb-3">{appointment.time}</p>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p className="text-gray-500">Department</p>
              <p className="text-gray-900 font-medium">
                {appointment.department}
              </p>

              <p className="text-gray-500">Type</p>
              <p className="text-gray-900 font-medium">{appointment.type}</p>

              <p className="text-gray-500">Doctor</p>
              <p className="text-gray-900 font-medium">{appointment.doctor}</p>

              {/* فواتير ثابتة من تصميمك الحالي */}
              <p className="text-gray-500">Bill</p>
              <p className="text-gray-900 font-medium">50,000 sp</p>

              <p className="text-gray-500">Paid Bill</p>
              <p className="text-gray-900 font-medium">50,000 sp</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start justify-start w-1/2 ml-8">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              For any inquiries, contact us via:
            </p>
            <p className="text-gray-700 text-sm"> Phone: +963 944 123 456</p>
            <p className="text-gray-700 text-sm"> Email: info@curawell.com</p>
            <p className="text-gray-700 text-sm">
              Location: 123 Medical Street, Damascus, Syria
            </p>
          </div>
        </div>
        {/* Tabs */}
        {info && !info.isHomeCare && (
          <div className="flex items-center justify-end mb-3 ">
            <div className="flex bg-gray-100 rounded-xl p-1 mb-3">
              <button
                onClick={() => setActiveTab("Diagnosis & Report")}
                className={`px-5 py-1 rounded-xl text-sm font-semibold transition ${
                  activeTab === "Diagnosis & Report"
                    ? "bg-[#28BBACFF] text-white"
                    : "text-gray-600"
                }`}
              >
                Diagnosis & Report
              </button>
              <button
                onClick={() => setActiveTab("Treatment & Medicines")}
                className={`px-5 py-1 rounded-xl text-sm font-semibold transition ${
                  activeTab === "Treatment & Medicines"
                    ? "bg-[#28BBACFF] text-white"
                    : "text-gray-600"
                }`}
              >
                Treatment & Medicines
              </button>
            </div>
          </div>
        )}

        <div className="bg-[#f3f4f6ab] p-4 rounded-xl ">
          <div className="text-sm text-gray-700">
            {!info ? (
              <p>No extra details for this appointment.</p>
            ) : info.isHomeCare ? (
              // ======= HomeCare: فقط الحقول الأربعة المطلوبة =======
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="text-gray-900 font-medium">
                      {info.phone || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Price</p>
                    <p className="text-gray-900 font-medium">
                      {info.price || "-"}
                    </p>
                  </div>
                </div>

                <hr className="border-gray-200 my-4" />

                <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                <p>{info.notes || "—"}</p>

                <hr className="border-gray-200 my-4" />

                <h3 className="font-semibold text-gray-900 mb-2">Diagnoses</h3>
                {info.diagnosesObj ? (
                  <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(info.diagnosesObj, null, 2)}
                  </pre>
                ) : (
                  <p>—</p>
                )}
              </>
            ) : activeTab === "Diagnosis & Report" ? (
              // ======= Clinic: نفس العرض القديم للتشخيص والتقرير =======
              <>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">Diagnosis</h3>
                  {info.diagnosisTitle ? (
                    <span className="bg-[#EAD6E1] text-[#972F6A] text-xs font-semibold px-3 py-1 rounded-full">
                      {info.diagnosisTitle}
                    </span>
                  ) : null}
                </div>

                {info.sessionName ? (
                  <p className="mb-2">
                    <span className="font-semibold">Session:</span>{" "}
                    {info.sessionName}
                  </p>
                ) : null}

                {info.reportText ? (
                  <>
                    <hr className="border-gray-200 my-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">Report</h3>
                    <p>{info.reportText}</p>
                  </>
                ) : null}
              </>
            ) : (
              // ======= Clinic: تبويب العلاج والأدوية =======
              <>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Treatment & Medicines
                </h3>
                {info.medicines ? (
                  <p>{info.medicines}</p>
                ) : (
                  <p>No medicines provided.</p>
                )}
                {info.symptoms ? (
                  <>
                    <hr className="border-gray-200 my-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Symptoms
                    </h3>
                    <p>{info.symptoms}</p>
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
