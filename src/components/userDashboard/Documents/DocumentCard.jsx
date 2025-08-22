import { Download } from "lucide-react";
import { useState } from "react";
import DocumentDetails from "./DocumentDetails";

export default function DocumentCard({ title, date, status, imageUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusStyles = {
    pending: { bg: "bg-[#972F6A38]", text: "text-[#972F6AFF]" },
    done: { bg: "bg-[#24A99C38]", text: "text-[#28BBACFF]" },
    suspended: { bg: "bg-gray-100", text: "text-gray-500" },
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = title; // file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="w-60 h-45 bg-white rounded-2xl shadow-md p-5 pl-[25px] flex flex-col justify-between cursor-pointer transition hover:shadow-2xl"
      >
        {/* Top Row */}
        <div className="flex justify-between items-start">
          {/* Folder Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#8B4A6C"
            className="w-15 h-15 mt-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5V6a2.25 2.25 0 012.25-2.25h4.13c.49 0 .96.175 1.33.494l1.62 1.44h6.42A2.25 2.25 0 0121 7.5v9A2.25 2.25 0 0118.75 18.75H5.25A2.25 2.25 0 013 16.5v-9z"
            />
          </svg>

          {/* Download Button */}
          <Download
            className="text-gray-500 w-5 h-7"
            onClick={(e) => {
              e.stopPropagation(); // prevent modal open
              handleDownload();
            }}
          />
        </div>

        {/* Middle Text */}
        <div>
          <h3 className="text-[#8B4A6C] font-medium">{title}</h3>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>

        {/* Status Tag */}
        <div
          className={`self-end px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status].bg} ${statusStyles[status].text}`}
        >
          {status}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <DocumentDetails
          imageUrl={imageUrl}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
