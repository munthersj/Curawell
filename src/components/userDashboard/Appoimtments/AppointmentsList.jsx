// src/components/AppointmentsList.jsx
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import useUserDashboardSlice from "../../../hooks/useUserDashboard";
import AppointmentDetailsModal from "./Modals/AppointmentDetailsModal";

export default function AppointmentsList() {
  const { getStatusStyle } = useUserDashboardSlice();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appointments = [
    // جرّب تخليها [] لتشوف النص "No appointments"
    {
      date: "24, Nov Tue",
      time: "12:00PM - 11:00AM",
      department: "Cardiology",
      type: "Check up",
      doctor: "Razan Fathy",
      status: "canceled",
    },
    {
      date: "24, Nov Tue",
      time: "3:00PM - 4:00AM",
      department: "Cardiology",
      type: "Check up",
      doctor: "Razan Fathyyyyyyyy",
      status: "new",
    },
    {
      date: "24, Nov Tue",
      time: "3:00PM - 4:00AM",
      department: "Cardiology yyyyy eeee",
      type: "Check up",
      doctor: "Razan Fathy",
      status: "pending",
    },
    {
      date: "24, Nov Tue",
      time: "3:00PM - 4:00AM",
      department: "Cardiology",
      type: "Check up",
      doctor: "Razan Fathy",
      status: "done",
    },
  ];

  const openModal = (appt) => {
    setSelectedAppointment(appt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 max-w-6xl mx-auto shadow-sm">
      {appointments.length === 0 ? (
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

              {/* Doctor */}
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
                <button
                  onClick={() => openModal(appt)}
                  className="flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                  type="button"
                >
                  See more <FiArrowRight />
                </button>
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
