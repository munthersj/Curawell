/* eslint-disable no-unused-vars */
// src/components/userDashboard/profile.jsx

import SideBar from "../SideBar";
import TopBar from "../TopBar";
import MedicationsCard from "./Dashboard/MedicationCard";
import DiagnosisCard from "./Dashboard/DiagnosisCard";
import DoctorsCard from "./Dashboard/DoctorsCard";
import AppointmentsCard from "./Dashboard/AppointmentsCard";
import PatientInfoCard from "./Dashboard/PatientInfoCard";

import useUserDashboard from "../../hooks/useUserDashboard";
import LogoLoader from "../LogoLoader";

export default function Profile() {
  const {
    sessions,
    status,
    doctors,
    getImage,
    status1,
    appointments,
    status4,
    profileData,
    isEditing,
    formData,
    handleChange,
    formatList,
    toggleEdit,
    scrollRef,
    activeTab,
    setActiveTab,
    saveStatus,
    getStatusStyle,
  } = useUserDashboard();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="absolute top-0 left-[225px] right-0 h-[600px] z-0 bg-[#F3F4F6] min-h-screen">
        <div className="h-[300px] bg-[#972f6a] rounded-b-[22px]">
          {/* Welcome Text - Left */}
          <div className="text-white text-2xl font-['Cairo'] font-semibold px-14 py-9">
            Welcome Back!
          </div>
        </div>
        <div className="h-[900px] bg-[#F3F4F6]"></div>
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex  ">
        {/* Sidebar */}
        <SideBar />

        {/* Right section (TopBar + Content) */}
        <div className="flex-1">
          <TopBar />
          <div
            className="px-70 py-10 grid gap-x-3 gap-y-5"
            style={{
              display: "grid",
              gridTemplateColumns: "250px 250px 270px 300px", // آخر عمود لبطاقة المريض
              gridTemplateRows: "auto auto",
            }}
          >
            {/* Top Cards */}
            <div style={{ gridColumn: "1", gridRow: "1" }}>
              <MedicationsCard sessions={sessions} status={status} />
            </div>

            <div style={{ gridColumn: "2", gridRow: "1" }}>
              <DiagnosisCard sessions={sessions} status={status} />
            </div>

            <div style={{ gridColumn: "3", gridRow: "1" }}>
              <DoctorsCard
                doctors={doctors}
                status={status1}
                getImage={getImage}
              />
            </div>

            {/* بطاقة المريض تمتد على الصفين */}
            <div className="grid-cols-4 grid-rows-1 row-span-2 ml-[9px] ">
              <PatientInfoCard
                status={status1}
                profileData={profileData}
                isEditing={isEditing}
                formData={formData}
                handleChange={handleChange}
                formatList={formatList}
                toggleEdit={toggleEdit}
                scrollRef={scrollRef}
                saveStatus={saveStatus}
              />
            </div>

            {/* Bottom Cards */}
            <div style={{ gridColumn: "1 / span 3", gridRow: "2" }}>
              <AppointmentsCard
                apiData={appointments}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                getStatusStyle={getStatusStyle}
                status={status}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
