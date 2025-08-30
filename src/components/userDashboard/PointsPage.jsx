import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";

import LogoLoader from "../LogoLoader";
import PointsCards from "./Points/PointsCards";
import PointsHistory from "./Points/PointsHistory";
import ExchangedPointsCard from "./Points/Modals/ExchangePointsModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPointData } from "../../features/data/dashboard/pointsSlice";
export default function PointsPage() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPointData());
  }, [dispatch]);
  const { pointsData, status } = useSelector((s) => s.pointsData);
  console.log(pointsData);
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

        {status == "loading" ? (
          <div className="flex items-center w-full h-full justify-center">
            <LogoLoader size={42} speed={1.2} />
          </div>
        ) : (
          <>
            <div className="px-6">
              <PointsCards pointsD={pointsData} />
            </div>

            <div className="mt-6 px-6 space-y-4">
              <PointsHistory
                pointsD={pointsData.points}
                pointsE={pointsData.points_replaced}
                status={status}
              />
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <ExchangedPointsCard
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}
