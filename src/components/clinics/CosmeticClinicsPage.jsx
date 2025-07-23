import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CosmeticClinicsPage() {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col justify-center relative w-full mt-20">
        <img
          className="w-full h-auto object-cover"
          src="src/assets/cosmictic.png"
          alt="1"
        />

        {/* Small Container Over Image */}
        <div className="sm:absolute flex items-start sm:h-[400px]  sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 w-screen sm:w-9/12 bg-grayc text-black px-4 sm:px-8 pt-5 sm:pt-7 pb-6 rounded-lg shadow-lg">
          {/* First Row */}
          <div className="flex flex-col items-start sm:items-center justify-between w-1/3 gap-4">
            <h1 className="text-2xl sm:text-3xl font-cairo font-bold">
              Book Appointment :
            </h1>
            {/* <button className="bg-curawell text-white text-sm sm:text-base rounded-3xl px-4 py-2 hover:bg-gray-400 transition">
              Schedule Appointment
            </button> */}
          </div>
          <div className="w-1/3">
            <DayPicker
              mode="single"
              classNames={{
                nav_button:
                  "text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-full transition", // أزرار السهم
                caption: "text-lg font-bold text-center mb-2",
                day: "rounded-full hover:bg-blue-100",
                day_selected: "bg-blue-600 text-white",
                day_today: "border border-blue-600",
              }}
            />
          </div>
        </div>
        {/* Small Container Over Image */}
      </div>
    </div>
  );
}
