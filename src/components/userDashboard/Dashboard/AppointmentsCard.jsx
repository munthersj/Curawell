import useUserDashboardSlice from "../../../hooks/useUserDashboard";

export default function AppointmentsCard() {
  const { activeTab, setActiveTab, appointments, getStatusStyle } =
    useUserDashboardSlice();

  return (
    <div className="bg-white rounded-2xl shadow-md px-4 py-5 font-['Cairo'] mt-0">
      {/* Title + Tabs */}
      <div className="flex items-center justify-between mb-0">
        <h2 className="text-xl font-bold mb-4 px-1">Appointments</h2>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-3">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-5 py-1 rounded-xl text-sm font-semibold transition ${
              activeTab === "upcoming"
                ? "bg-white text-[#28BBACFF]"
                : "text-gray-500"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-5 py-1 rounded-xl text-sm font-semibold transition ${
              activeTab === "past"
                ? "bg-white text-[#28BBACFF]"
                : "text-gray-500"
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Appointment List */}
      <div className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#F3F4F6] px-5 py-2 text-sm text-gray-600 shadow-sm transform transition-transform duration-300 hover:scale-105"
              style={{
                display: "grid",
                gridTemplateColumns: "125px 145px 120px 120px 140px 90px",
              }}
            >
              <div className="font-semibold text-black">
                <div className="text-xs text-gray-400 mb-1">Date</div>
                <div>{appointment.date}</div>
              </div>
              <div className="font-semibold text-black">
                <div className="text-xs text-gray-400 mb-1">Time</div>
                <div>{appointment.time}</div>
              </div>
              <div className="font-semibold text-black">
                <div className="text-xs text-gray-400 mb-1">Department</div>
                <div className="font-bold">{appointment.department}</div>
              </div>
              <div className="font-semibold text-black">
                <div className="text-xs text-gray-400 mb-1">Type</div>
                <div>{appointment.type}</div>
              </div>
              <div className="font-semibold text-black">
                <div className="text-xs text-gray-400 mb-1">Doctor</div>
                <div>{appointment.doctor}</div>
              </div>
              <div className="font-semibold text-black">
                <div className="text-xs text-gray-400 mb-1">Status</div>
                <div className="flex items-center">
                  <span
                    className={`inline-block whitespace-nowrap text-xs px-3 py-1 rounded-full ${getStatusStyle(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No appointments</p>
        )}
      </div>
    </div>
  );
}
