import React, { useState } from "react";

export default function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
}) {
  const [activeTab, setActiveTab] = useState("Diagnosis & Report");

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
              {" "}
              Location: 123 Medical Street, Damascus, Syria
            </p>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Content */}
        <div className="bg-[#f3f4f6ab] p-4 rounded-xl ">
          <div className="text-sm text-gray-700">
            {activeTab === "Diagnosis & Report" && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-semibold text-gray-900">Diagnosis</h3>
                  <span className="bg-[#EAD6E1] text-[#972F6A] text-xs font-semibold px-3 py-1 rounded-full">
                    COVID - 19
                  </span>
                </div>
                <p className="mb-4">
                  Esse id cupidatat nisi quis aliquip do tempor irure labore
                  pariatur officia quis mollit reprehenderit aliqua magna ipsum
                  nostrud. Ipsum officia incididunt aliqua do culpa sit
                  incididunt. Enim anim irure aute sit enim reprehenderit
                  proident officia.
                </p>

                <hr className="border-gray-200 my-4" />

                <h3 className="font-semibold text-gray-900 mb-2">Report</h3>
                <p>
                  In non magna nulla quis velit occaecat et laborum. Ipsum
                  incididunt labore id velit deserunt amet qui consequat ipsum
                  veniam aute ad deserunt ad magna veniam magna consectetur
                  proident. Sint fugiat officia aliqua pariatur velit eiusmod
                  dolor labore duis excepteur mollit exercitation tempor eiusmod
                  occaecat excepteur incididunt magna cillum.
                </p>
              </>
            )}
            {activeTab === "Treatment & Medicines" && (
              <p>
                Treatment and medicines details go here. Include prescriptions,
                dosages, and recommendations.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
