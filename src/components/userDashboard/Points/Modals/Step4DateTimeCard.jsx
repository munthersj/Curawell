// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import Calendar from "../../Calendar";

export default function Step4DateTimeCard({
  selectedTime,
  setSelectedTime,
  taxiOrder,
  setTaxiOrder,
  location,
  setLocation,
  renderProgressBar,
  handleSubmit,
  timeSlots,
}) {
  return (
    <>
      {renderProgressBar(4)}

      {/* Header + Submit */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Choose Date</h2>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-2xl bg-[#972F6AFF] text-white hover:bg-[#7f1551]"
        >
          Submit
        </button>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        {/* Calendar */}
        <Calendar />
        {/* Time slots */}
        <div className="grid grid-cols-3 gap-x-2 gap-y-1.5">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-1 rounded-md text-sm h-[40px] transition ${
                  isSelected
                    ? "bg-[#972f6a30] border border-[#972F6AFF] text-[#972F6AFF]"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional Options */}
      <div className="flex justify-between items-center gap-4 mt-1">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={taxiOrder}
            onChange={(e) => setTaxiOrder(e.target.checked)}
            className="accent-[#972F6AFF]"
          />
          <span className="text-gray-800 font-medium">Taxi Order</span>
        </label>

        <div
          className={`flex items-center rounded-2xl px-3 py-2 w-full max-w-xs ${
            taxiOrder ? "bg-gray-100" : "bg-gray-200"
          }`}
        >
          <MapPin className="text-[#972F6AFF] mr-2" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            disabled={!taxiOrder}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent w-full focus:outline-none text-gray-600 disabled:cursor-not-allowed disabled:text-gray-400"
          />
        </div>
      </div>
    </>
  );
}
