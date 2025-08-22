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
export default function AbsoiluteDiv({ data }) {
  function normalizeKey(s = "") {
    return s.toLowerCase().replace(/\s+/g, "");
  }
  const get = indexByNameOrType(data);

  // نلقط العناصر المطلوبة بالاسم أو النوع (مع فواصل/مسافات مختلفة)
  const lab = get("Laboratory");
  const radio = get("Radiography") || get("Radiology");
  const homeCare = get("HomeCare") || get("Home care");
  const emergency = get("Emergency");
  const clinics = get("Clinic") || get("Clinics");
  function indexByNameOrType(arr = []) {
    const map = {};
    arr.forEach((it) => {
      if (it?.name_en) map[normalizeKey(it.name_en)] = it;
      if (it?.section_type) map[normalizeKey(it.section_type)] = it;
    });
    return (key) => map[normalizeKey(key)];
  }
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

        {lab && (
          <div className="flex flex-col lg:flex-row flex-wrap gap-10 pt-5">
            {/* Card Group 1 (صغيرين عمودياً) */}
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <Card
                icon={<FlaskConical size={38} className="text-blimo mt-2" />}
                title={lab.name_en}
                payload={lab}
              />
              <Card
                icon={<SquareActivity size={38} className="text-blimo mt-2" />}
                title={radio?.name_en ?? "Radiology"}
                payload={radio}
              />
            </div>

            {/* Other Cards (الكبيرة) */}
            <CardLarge
              icon={<House size={52} className="text-blimo mt-2" />}
              title={homeCare?.name_en ?? "Home care"}
              description="trusted care, right at home"
              payload={homeCare} // نخزّن كامل العنصر
            />
            <CardLarge
              icon={<Siren size={52} className="text-blimo mt-2" />}
              title={emergency?.name_en ?? "Emergency"}
              description="emergency care, anytime"
              payload={emergency}
            />
            <CardLarge
              icon={<Hospital size={52} className="text-blimo mt-2" />}
              title={clinics?.name_en ?? "Clinics"}
              description="Specialties & Scheduling"
              payload={clinics} // إذا بدك تمرّر data القديمة كمان، خليه كما هو
            />
          </div>
        )}
      </div>
      {/* Small Container Over Image */}
    </div>
  );
}
// نفس الاستيرادات اللي عندك لبطاقاتك وأيقوناتك
// import { FlaskConical, SquareActivity, House, Siren, Hospital } from "lucide-react";
// import Card from "./Card";
// import CardLarge from "./CardLarge";
