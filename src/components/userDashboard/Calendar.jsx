// src/components/Calendar.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2022, 1)); // Feb 2022
  const [selectedDay, setSelectedDay] = useState(null); // For active selection

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );
  const prevMonthDays = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1
  );

  const handlePrev = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  const handleNext = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );

  const days = [];
  let dayCounter = 1;
  let nextMonthDay = 1;

  for (let i = 0; i < 42; i++) {
    if (i < (startDay === 0 ? 6 : startDay - 1)) {
      days.push({
        day: prevMonthDays - (startDay === 0 ? 6 : startDay - 1) + i + 1,
        type: "prev",
      });
    } else if (dayCounter <= daysInMonth) {
      days.push({ day: dayCounter, type: "current" });
      dayCounter++;
    } else {
      days.push({ day: nextMonthDay, type: "next" });
      nextMonthDay++;
    }
  }

  return (
    <div className="w-[300px] h-[280px] p-4 rounded-2xl shadow-md bg-white font-Cairo">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-black">
          {currentMonth.toLocaleString("default", { month: "long" })}{" "}
          {currentMonth.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 text-center mb-2">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="text-sm font-medium text-[#972F6AFF]">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {days.map((d, i) => (
          <div
            key={i}
            onClick={() => d.type === "current" && setSelectedDay(d.day)}
            className={`cursor-pointer text-sm text-gray-600 rounded-full py-1 ${
              selectedDay === d.day ? "bg-[#972f6a3b] font-semibold" : ""
            } ${d.type !== "current" ? "opacity-50" : ""}`}
          >
            {d.day}
          </div>
        ))}
      </div>
    </div>
  );
}
