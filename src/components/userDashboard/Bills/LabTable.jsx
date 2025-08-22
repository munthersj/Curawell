import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const bills = [
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      doctor: "Dr A",
      billId: "#1",
      notes: "–",
    },
  },
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      billId: "#1",
      doctor: "Dr A",

      notes: "–",
    },
  },
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      billId: "#1",
      doctor: "Dr A",

      notes: "–",
    },
  },
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      billId: "#1",
      doctor: "Dr A",

      notes: "–",
    },
  },
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      billId: "#1",
      doctor: "Dr A",

      notes: "–",
    },
  },
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      billId: "#1",
      doctor: "Dr A",

      notes: "–",
    },
  },
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      billId: "#1",
      doctor: "Dr A",

      notes: "–",
    },
  },
  {
    totalBill: "50000 SP",
    name: "urine test",
    department: "Laboratory",
    details: {
      date: "24 Nov",

      billId: "#1",
      doctor: "Dr A",

      notes: "–",
    },
  },
];

export default function LabTable() {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-full overflow-hidden">
        {bills.map((bill, index) => {
          const { totalBill, department, name, details } = bill;
          const expanded = expandedRows[index];

          return (
            <div key={index} className="border-b border-gray-200 ">
              {/* Main Row */}
              <div
                className={`grid grid-cols-5 gap-4 px-6 py-4 cursor-pointer transition-colors duration-200 ${
                  expanded
                    ? "bg-gray-50 border-l-4 border-[#24A99CFF]"
                    : "bg-white"
                }`}
                onClick={() => toggleRow(index)}
              >
                {/* Total Bill */}
                <div>
                  <p className="text-xs text-gray-400">Total Bill</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {totalBill}
                  </p>
                </div>

                {/* Paid Bill */}
                <div>
                  <p className="text-xs text-gray-400">Paid Bill</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {totalBill}
                  </p>
                </div>

                {/* Department */}
                <div>
                  <p className="text-xs text-gray-400">Department</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {department}
                  </p>
                </div>

                {/* Name */}
                <div>
                  <p className="text-xs text-gray-400">Name</p>
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                </div>

                {/* Action */}
                <button className="flex items-center space-x-2 h-8 px-3 py-0.5 text-xs font-medium rounded-3xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition ml-auto">
                  <span>{expanded ? "See Less" : "See More"}</span>
                  {expanded ? (
                    <ChevronUp size={14} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={14} className="text-gray-500" />
                  )}
                </button>
                {/*<div className="flex items-center justify-end space-x-1 text-gray-500 text-sm font-medium">
                  <span>{expanded ? "See Less" : "See More"}</span>
                  {expanded ? (
                    <ChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </div> */}
              </div>

              {/* Expanded Panel */}
              {expanded && details && (
                <div className="bg-white px-6 py-4 space-y-2 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-sm text-gray-800">{details.date}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Doctor</p>
                        <p className="text-sm text-gray-800">
                          {details.doctor || "–"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">Bill ID</p>
                        <p className="text-sm font-semibold text-[#972F6AFF]">
                          {details.billId}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Notes</p>
                        <p className="text-sm text-gray-800">
                          {details.notes || "–"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
