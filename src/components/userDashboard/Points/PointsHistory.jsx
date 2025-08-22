import React from "react";

const collectedPoints = [
  // Example: leave empty to test message []
  { date: "24, Nov Tue", source: "Online reservation", points: 40 },
  { date: "23, Nov Mon", source: "Clinic Visit", points: 25 },
  { date: "22, Nov Sun", source: "Home Care Booking", points: 30 },
];

const exchangedPoints = [
  // Example: leave empty to test message []
  /*{ date: "24, Nov Tue", exchangeWith: "Online reservation", points: 40 },
  { date: "23, Nov Mon", exchangeWith: "Gift Card", points: 25 },
  { date: "22, Nov Sun", exchangeWith: "Voucher", points: 30 },*/
];

export default function PointsHistoryTable() {
  return (
    <div className="bg-[#F3F4F6] p-6 flex flex-col md:flex-row gap-6">
      {/* Collected Points Table */}
      <div className="flex-1">
        <h2 className="text-[#972F6AFF] font-bold text-lg mb-4">
          Collected Points
        </h2>
        <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden">
          {collectedPoints.length === 0 ? (
            <div className="p-4 text-center text-gray-400 font-semibold">
              No points collected
            </div>
          ) : (
            collectedPoints.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-6 p-4 border-b border-gray-200 last:border-0"
              >
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {row.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Source</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {row.source}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Points</p>
                  <p className="text-sm font-semibold text-[#972F6AFF]">
                    <span className="font-semibold text-[#972F6AFF]">
                      {row.points}
                    </span>{" "}
                    points
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Exchanged Points Table */}
      <div className="flex-1">
        <h2 className="text-[#972F6AFF] font-bold text-lg mb-4">
          Exchanged Points
        </h2>
        <div className="bg-white rounded-2xl shadow-md w-full overflow-hidden">
          {exchangedPoints.length === 0 ? (
            <div className="p-4 text-center text-gray-400 font-semibold">
              No exchanged points
            </div>
          ) : (
            exchangedPoints.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-6 p-4 border-b border-gray-200 last:border-0"
              >
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {row.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">exchange with</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {row.exchangeWith}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Points</p>
                  <p className="text-sm font-semibold text-[#972F6AFF]">
                    <span className="font-semibold text-[#972F6AFF]">
                      {row.points}
                    </span>{" "}
                    points
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
