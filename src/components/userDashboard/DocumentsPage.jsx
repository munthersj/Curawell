import { useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import DocumentCard from "./Documents/DocumentCard"; // تأكد إن المسار صحيح

export default function DocumentsPage() {
  const laboratoryDocs = [
    { title: "Urine test", date: "12/10/2024", status: "pending" },
    { title: "Urine test", date: "12/10/2024", status: "done" },
    { title: "Urine test", date: "12/10/2024", status: "suspended" },
    { title: "Urine test", date: "12/10/2024", status: "pending" },
    { title: "Urine test", date: "12/10/2024", status: "suspended" },
    { title: "Urine test", date: "12/10/2024", status: "pending" },
    { title: "Urine test", date: "12/10/2024", status: "suspended" },
    { title: "Urine test", date: "12/10/2024", status: "pending" },
    { title: "Urine test", date: "12/10/2024", status: "suspended" },
    { title: "Urine test", date: "12/10/2024", status: "pending" },
  ];

  const radiologyDocs = [
    { title: "X - Ray", date: "12/10/2024", status: "done" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "suspended" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "suspended" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "suspended" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "pending" },
    { title: "X - Ray", date: "12/10/2024", status: "suspended" },
  ];

  const [showAllLab, setShowAllLab] = useState(false);
  const [showAllRad, setShowAllRad] = useState(false);

  const displayedLabDocs = showAllLab
    ? laboratoryDocs
    : laboratoryDocs.slice(0, 4);
  const displayedRadDocs = showAllRad
    ? radiologyDocs
    : radiologyDocs.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#F3F4F6] flex">
      {/* Fixed Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-[225px] overflow-y-auto h-screen">
        <TopBar />

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">Documents</h1>
        </div>

        {/* Content */}
        <div className="px-16 pb-10 space-y-8">
          {/* Laboratory Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Laboratory
              </h2>
              {laboratoryDocs.length > 4 && (
                <button
                  onClick={() => setShowAllLab(!showAllLab)}
                  className="text-[#28BBACFF] text-sm font-medium hover:underline mx-9"
                >
                  {showAllLab ? "View Less" : "View All"}
                </button>
              )}
            </div>
            {laboratoryDocs.length === 0 ? (
              <p className="text-gray-400 italic">No documents</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedLabDocs.map((doc, idx) => (
                  <DocumentCard
                    key={idx}
                    title={doc.title}
                    date={doc.date}
                    status={doc.status}
                  />
                ))}
              </div>
            )}
          </div>

          <hr className="my-4 mt-15 mb-8 border-t-2 border-[#bcc1ca58] w-5/6 mx-auto" />

          {/* Radiology Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Radiology</h2>
              {radiologyDocs.length > 4 && (
                <button
                  onClick={() => setShowAllRad(!showAllRad)}
                  className="text-[#28BBACFF] text-sm font-medium hover:underline mx-9"
                >
                  {showAllRad ? "View Less" : "View All"}
                </button>
              )}
            </div>
            {radiologyDocs.length === 0 ? (
              <p className="text-gray-400 italic">No documents</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedRadDocs.map((doc, idx) => (
                  <DocumentCard
                    key={idx}
                    title={doc.title}
                    date={doc.date}
                    status={doc.status}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
