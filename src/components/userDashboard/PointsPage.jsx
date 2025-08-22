import { useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";

import PointsCards from "./Points/PointsCards";
import PointsHistory from "./Points/PointsHistory";
import ExchangedPointsCard from "./Points/Modals/ExchangePointsModal";

export default function PointsPage() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F3F4F6] flex">
      {/* Fixed Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[225px] overflow-y-auto h-screen">
        <TopBar />

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Points</h1>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="bg-[#24A99CFF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition"
          >
            Exchange Points
          </button>
        </div>

        {/* Summary Cards */}
        <div className="px-6">
          <PointsCards />
        </div>

        {/* Point Rows */}
        <div className="mt-6 px-6 space-y-4">
          <PointsHistory />
        </div>
      </div>

      {/* Modal */}
      <ExchangedPointsCard
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}
