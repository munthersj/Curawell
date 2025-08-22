import { useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import PieChartCard from "./Bills/PieChartCard";
import ClinicsTable from "./Bills/ClinicsTable";
import HomeCareTable from "./Bills/HomeCareTable";
import LabTable from "./Bills/LabTable";
import RadioloTable from "./Bills/RadioloTable";

export default function BillsPage() {
  const [activeTab, setActiveTab] = useState("Clinics");

  const renderTable = () => {
    switch (activeTab) {
      case "Clinics":
        return <ClinicsTable />;
      case "Home Care":
        return <HomeCareTable />;
      case "Lab":
        return <LabTable />;
      case "Radiology":
        return <RadioloTable />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F3F4F6] flex">
      {/* Fixed Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[225px] overflow-y-auto h-screen">
        <TopBar />

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Bills</h1>
        </div>

        {/* Summary Cards */}
        <div className="px-6">
          <PieChartCard />
        </div>

        {/* Tabs Navigation */}
        <div className="mt-6 px-6">
          <div className="bg-white rounded-2xl shadow-sm p-1 flex space-x-2 w-fit">
            {["Clinics", "Home Care", "Lab", "Radiology"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-[#972F6AFF] text-white font-semibold"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Billing Rows */}
        <div className="mt-1 px-6 space-y-4">{renderTable()}</div>
      </div>
    </div>
  );
}
