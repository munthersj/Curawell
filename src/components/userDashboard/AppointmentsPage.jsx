import { useEffect, useMemo, useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import { ChevronDown } from "lucide-react";
import AppointmentsList from "./Appoimtments/AppointmentsList";
import ScheduleAppointmentModal from "./Appoimtments/Modals/ScheduleAppointmentModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAppointments } from "../../features/data/dashboard/appointmentsSlice";

export default function AppointmentsPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const { appointments, status } = useSelector((s) => s.appointmentsData);
  // appointments expected shape:
  // { appointments: { clinic: [...], homeCare: [...] } }

  /* ================= Filters State ================ */
  const [dateSort, setDateSort] = useState("Latest"); // Latest | Earliest
  const [typeFilter, setTypeFilter] = useState("All"); // All | Clinic | HomeCare
  const [departmentFilter, setDepartmentFilter] = useState("All"); // All | <Dept>
  const [statusFilter, setStatusFilter] = useState("All"); // All | <Status>

  const toggleDropdown = (filter) => {
    setOpenDropdown(openDropdown === filter ? null : filter);
  };

  /* =============== Dynamic Options from data =============== */
  const { departmentOptions, statusOptions } = useMemo(() => {
    const clinic = appointments?.appointments?.clinic ?? [];
    const homeCare = appointments?.appointments?.homeCare ?? [];

    const depts = new Set();
    const statuses = new Set();

    clinic.forEach((c) => {
      if (c?.department) depts.add(c.department);
      if (c?.status) statuses.add(c.status);
    });
    homeCare.forEach((h) => {
      if (h?.department) depts.add(h.department);
      if (h?.status) statuses.add(h.status);
    });

    return {
      departmentOptions: ["All", ...Array.from(depts)],
      statusOptions: ["All", ...Array.from(statuses)],
    };
  }, [appointments]);

  /* ================= Apply Filters to raw API =================
     بنفلتر على مستوى الـ raw (clinic/homeCare) وبنمرّر الناتج لـ AppointmentsList
     يلي بدوره بيطبّع/يدمج ويعرض بدون تغيير التصميم.
  ============================================================ */
  const filteredApiData = useMemo(() => {
    const clinic = appointments?.appointments?.clinic ?? [];
    const homeCare = appointments?.appointments?.homeCare ?? [];

    const filterOne = (item, isHomeCare = false) => {
      // Type
      if (typeFilter !== "All") {
        if (typeFilter === "Clinic" && isHomeCare) return false;
        if (typeFilter === "HomeCare" && !isHomeCare) return false;
      }
      // Department
      if (departmentFilter !== "All" && item?.department !== departmentFilter) {
        return false;
      }
      // Status
      if (statusFilter !== "All" && item?.status !== statusFilter) {
        return false;
      }
      return true;
    };

    const fClinic = clinic.filter((c) => filterOne(c, false));
    const fHome = homeCare.filter((h) => filterOne(h, true));

    return { appointments: { clinic: fClinic, homeCare: fHome } };
  }, [appointments, typeFilter, departmentFilter, statusFilter]);

  /* =============== Filter UI config (labels) =============== */
  const filters = [
    {
      key: "Date",
      value: dateSort,
      options: ["Latest", "Earliest"],
      onSelect: (opt) => {
        setDateSort(opt);
        setOpenDropdown(null);
      },
    },
    {
      key: "Type",
      value: typeFilter,
      options: ["All", "Clinic", "HomeCare"],
      onSelect: (opt) => {
        setTypeFilter(opt);
        setOpenDropdown(null);
      },
    },
    {
      key: "Department",
      value: departmentFilter,
      options: departmentOptions,
      onSelect: (opt) => {
        setDepartmentFilter(opt);
        setOpenDropdown(null);
      },
    },
    {
      key: "Status",
      value: statusFilter,
      options: statusOptions,
      onSelect: (opt) => {
        setStatusFilter(opt);
        setOpenDropdown(null);
      },
    },
  ];

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
          {filters.map((f) => (
            <div key={f.key} className="relative">
              <button
                onClick={() => toggleDropdown(f.key)}
                className={`flex items-center justify-between w-[180px] px-3 py-2 rounded-lg shadow-sm text-sm font-medium border transition-colors duration-200 ${
                  openDropdown === f.key
                    ? "bg-[#ebcfdea8] border-[#972F6AFF] text-[#972F6AFF]"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-[#ebcfdea8] hover:border-[#ebcfdea8] hover:text-[#972F6AFF]"
                }`}
                title={f.key}
              >
                <span className="truncate">
                  {f.key}:{" "}
                  <span className="font-semibold">{String(f.value)}</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`ml-2 transition-transform ${
                    openDropdown === f.key
                      ? "rotate-180 text-[#972F6AFF]"
                      : "text-gray-400"
                  }`}
                />
              </button>

              {openDropdown === f.key && (
                <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-72 overflow-auto">
                  {f.options.map((option) => (
                    <div
                      key={option}
                      className={`px-3 py-2 text-sm cursor-pointer ${
                        option === f.value
                          ? "bg-[#ebcfdea8] text-[#972F6AFF] font-semibold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#972F6AFF]"
                      }`}
                      onClick={() => f.onSelect(option)}
                      title={option}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Appointment List (نمرّر الداتا بعد الفلترة + اتجاه الترتيب) */}
        <div className="px-6 pb-10">
          <AppointmentsList
            apiData={filteredApiData}
            sortOrder={dateSort === "Latest" ? "desc" : "asc"}
            status={status}
          />
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
