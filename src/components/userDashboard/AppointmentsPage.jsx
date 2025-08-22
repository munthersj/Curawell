import { useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import { ChevronDown } from "lucide-react";
import AppointmentsList from "./Appoimtments/AppointmentsList";
import ScheduleAppointmentModal from "./Appoimtments/Modals/ScheduleAppointmentModal";

export default function AppointmentsPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const filters = {
    Date: ["Latest", "Earliest"],
    Department: ["Cosmetic", "Dental"],
    Type: ["In Clinic", "Home Service"],
    Status: ["Pending", "New", "Done", "Canceled"],
  };

  const toggleDropdown = (filter) => {
    setOpenDropdown(openDropdown === filter ? null : filter);
  };

  return (
    <div className="relative min-h-screen bg-[#F3F4F6] flex">
      {/* Fixed Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-[225px] overflow-y-auto h-screen">
        <TopBar />

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Appointments</h1>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="bg-[#24A99CFF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition"
          >
            Schedule Appointment
          </button>
        </div>

        {/* Filters */}
        <div className="px-18 flex justify-end gap-3 mb-6">
          {Object.entries(filters).map(([filter, options]) => (
            <div key={filter} className="relative">
              <button
                onClick={() => toggleDropdown(filter)}
                className={`flex items-center justify-between w-[140px] px-3 py-2 rounded-lg shadow-sm text-sm font-medium border transition-colors duration-200 ${
                  openDropdown === filter
                    ? "bg-[#ebcfdea8] border-[#972F6AFF] text-[#972F6AFF]"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-[#ebcfdea8] hover:border-[#ebcfdea8] hover:text-[#972F6AFF]"
                }`}
              >
                {filter}
                <ChevronDown
                  size={16}
                  className={`ml-2 transition-transform ${
                    openDropdown === filter
                      ? "rotate-180 text-[#972F6AFF]"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {openDropdown === filter && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#972F6AFF] cursor-pointer"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Appointment List */}
        <div className="px-6 pb-10">
          <AppointmentsList />
        </div>
      </div>

      {/* Modal */}
      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}
