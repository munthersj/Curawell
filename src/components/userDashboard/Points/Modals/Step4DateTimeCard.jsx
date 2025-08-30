// eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { DayPicker } from "react-day-picker";
import LogoLoader from "../../../LogoLoader";

import { useDispatch, useSelector } from "react-redux";
import { getDefaultClassNames } from "react-day-picker";

import { useEffect, useMemo } from "react";
import { fetchTimesA } from "../../../../features/data/dashboard/appointmentsSlice";

export default function Step4DateTimeCard({
  // selectedTime,
  setSelectedTime,
  taxiOrder,
  setTaxiOrder,
  location,
  setLocation,
  renderProgressBar,
  handleSubmit,
  // timeSlots,

  selectedDate,
  setSelectedDate,
  selectedDoctor,
  setSelectedSlot,
  selectedSlot,
}) {
  const defaultClassNames = getDefaultClassNames();

  const dispatch = useDispatch();
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const toYMD = (d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  // === Local validation state for HomeCare location ===

  // Submit guard: امنع الإرسال إذا HomeCare والموقع فاضي

  // لا تجيب الأطباء إذا الحالة HomeCare
  useEffect(() => {
    dispatch(
      fetchTimesA({
        date: toYMD(selectedDate),
        id: selectedDoctor,
      })
    );
    setSelectedSlot(null);
  }, [dispatch, selectedDate, selectedDoctor, setSelectedSlot]);

  const { times, status1 } = useSelector((s) => s.appointmentsData);

  return (
    <>
      {renderProgressBar(4)}

      {/* Header + Submit */}
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-bold text-gray-800">Choose Date</h2>
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-2xl text-white hover:bg-[#7f1551] ${"bg-[#972F6AFF]"}`}
        >
          Submit
        </button>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4 ">
        {/* Calendar */}
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          showOutsideDays
          disabled={[{ before: today }].filter(Boolean)}
          classNames={{
            nav: `${defaultClassNames.nav}`,
            button_next: `${defaultClassNames.button_next} !text-gray-500 hover:!text-gray-600`,
            button_previous: `${defaultClassNames.button_previous} !text-gray-500 hover:!text-gray-600`,
            weekdays: ` text-curawell`,
            weekday: `   p-1 font-[500] text-sm  text-curawell`,
            today: "text-curawell font-bold ",
            selected: `rounded-full outline-2 outline-curawell text-curawell font-bold text-center `,
            root: `${defaultClassNames.root}  p-5`,
            chevron: `text-gray-500 hover:text-gray-600 fill-[#9095a0] `,
            outside: "text-gray-300",
          }}
        />

        {/* Time slots */}
        <div className="grid grid-cols-3 gap-x-2 gap-y-1.5 my-10">
          {status1 == "loading" ? (
            <div className="flex items-center w-full h-full justify-center mx-28">
              <LogoLoader size={42} speed={1.2} />
            </div>
          ) : (
            times.map((s, i) => {
              const isAvailable = s.status == "Reserved" ? false : true;
              const isSelected = selectedSlot === s.from;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => {
                    if (!isAvailable) return;
                    setSelectedSlot(s.from);
                    setSelectedTime?.(s.id);
                  }}
                  className={`rounded-md py-2 text-[17px] mx-4 text-center transition ${
                    !isAvailable
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : isSelected
                      ? "border-curawell ring-1 text-curawell ring-curawell bg-curawell/20"
                      : "hover:border-curawell bg-gray-100 hover:bg-curawell/10 cursor-pointer"
                  }`}
                >
                  {s.from}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Additional Options */}
      <div className="flex justify-between items-start gap-4 ">
        {
          <>
            <label className="flex items-center gap-2 mt-2">
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
          </>
        }
      </div>
    </>
  );
}
