import { MoveRight } from "lucide-react";
export default function CardLarge({ icon, title, description }) {
  return (
    <button className="flex flex-col items-start gap-2 bg-white rounded-2xl cursor-pointer pl-4 pr-10 py-4 w-full sm:w-auto transition-all">
      {icon}
      <div className="flex flex-col gap-1 items-start">
        <h1 className="font-cairo font-bold text-[15px] sm:text-xl">{title}</h1>
        <p className="font-cairo font-bold text-sm  sm:text-base text-[#393c49]">
          {description}
        </p>
        <div className="flex items-center">
          <p className="font-cairo font-bold text-curawell text-sm sm:text-base">
            Explore
          </p>
          <MoveRight className="text-curawell ml-2" />
        </div>
      </div>
    </button>
  );
}
