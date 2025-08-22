import { Bell } from "lucide-react";

const TopBar = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full px-6 py-4 flex items-center justify-end relative bg-transparent">
      {/* Centered Date */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="bg-white text-black px-4 py-1 rounded-md shadow text-sm font-medium font-['Cairo']">
          {today}
        </div>
      </div>

      {/* Bell Icon on Right */}
      <div className="bg-white p-2 rounded-full shadow-md cursor-pointer">
        <Bell className="text-[#972f6a]" size={20} />
      </div>
    </div>
  );
};

export default TopBar;
