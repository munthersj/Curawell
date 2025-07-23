import {
  Search,
  FlaskConical,
  SquareActivity,
  House,
  Siren,
  Hospital,
} from "lucide-react";
import Card from "./Card";
import CardLarge from "./CardLarge";
export default function AbsoiluteDiv() {
  return (
    <div className="flex flex-col justify-center relative w-full mt-10 sm:mt-0 ">
      <img
        className="w-full h-auto object-cover"
        src="src/assets/home.png"
        alt="1"
      />

      {/* Small Container Over Image */}
      <div className="sm:absolute  sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 w-screen sm:w-9/12 bg-grayc text-black px-4 sm:px-8 pt-5 sm:pt-7 pb-6 rounded-lg shadow-lg">
        {/* First Row */}
        <div className="flex flex-row items-start sm:items-center justify-between w-full gap-4">
          <h1 className="text-2xl sm:text-3xl font-cairo font-bold">
            How Can We Help?
          </h1>
          <button className="bg-curawell text-white text-sm sm:text-base rounded-3xl px-4 py-2 hover:bg-gray-400 transition">
            Schedule Appointment
          </button>
        </div>

        {/* Search */}
        <div className="w-3/4 flex items-center pt-5">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search specialties, locations and services"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-curawell/50 focus:border-curawell text-sm sm:text-base"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-curawell" />
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col lg:flex-row flex-wrap  gap-10 pt-5">
          {/* Card Group 1 */}
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <Card
              icon={<FlaskConical size={38} className="text-blimo mt-2" />}
              title="Laboratory"
            />
            <Card
              icon={<SquareActivity size={38} className="text-blimo mt-2" />}
              title="Radiology"
            />
          </div>

          {/* Other Cards */}
          <CardLarge
            icon={<House size={52} className="text-blimo mt-2" />}
            title="Home care"
            description="trusted care, right at home"
          />
          <CardLarge
            icon={<Siren size={52} className="text-blimo mt-2" />}
            title="Emergency"
            description="emergency care, anytime"
          />
          <CardLarge
            icon={<Hospital size={52} className="text-blimo mt-2" />}
            title="Clinics"
            description="Specialties & Scheduling"
          />
        </div>
      </div>
      {/* Small Container Over Image */}
    </div>
  );
}
