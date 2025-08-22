/* eslint-disable no-unused-vars */
import { useState } from "react";

export default function MedicationsCard() {
  const medications = []; // Empty for fallback demo

  return (
    <div className="bg-white rounded-2xl shadow-md w-[240px] max-w-sm font-['Cairo'] h-[280px] overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      {/* Title */}
      <div className="px-4 py-3 bg-white z-10 rounded-t-2xl">
        <h2 className="text-lg font-semibold text-gray-800">Medications</h2>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {medications.length > 0 ? (
          medications.map((med, i) => (
            <div key={med.id}>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <span>{med.date}</span>
              </div>

              <div className="text-[#972f6a] font-semibold mb-1">
                {med.name}
              </div>
              <div className="text-sm text-[#CE9DB9] mb-2">
                {med.department}
              </div>

              {i < medications.length - 1 && (
                <hr className="my-4 border-t-[1.5px] border-[#F3F4F6]" />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No medications</p>
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
