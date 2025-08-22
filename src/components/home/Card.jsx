import { MoveRight } from "lucide-react";

export default function Card({ icon, title, payload }) {
  const data = payload;
  return (
    <button
      onClick={() => {
        console.log(data);
      }}
      className="flex items-center gap-2 bg-white rounded-2xl cursor-pointer pl-4 pr-20 py-3 w-full sm:w-auto transition-all"
    >
      {icon}
      <div className="flex flex-col gap-1">
        <h1 className="font-cairo font-bold text-lg sm:text-xl">{title}</h1>
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
