import { CircleX } from "lucide-react";

export default function ToastCopm({ message1, onClick }) {
  return (
    <div className="flex items-center gap-3 bg-green-50 border-l-4 border-curawell text-curawell p-4 rounded-md shadow-md">
      {/* <span className="font-bold"></span> */}
      <span className="ml-2 font-bold font-cairo">{message1}</span>
      <button
        onClick={onClick}
        className="ml-auto text-curawell hover:text-black font-bold cursor-pointer"
      >
        <CircleX className="" />
      </button>
    </div>
  );
}
