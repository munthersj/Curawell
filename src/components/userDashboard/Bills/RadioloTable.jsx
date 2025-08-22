import React from "react";

const bills = [
  {
    total: "50,000 SP",
    billId: "#12435689",
    date: "24,Nov Tue",
    Department: "Radiology",
    name: "X-Ray",
  },
  {
    total: "50,000 SP",
    billId: "#12435689",
    date: "24,Nov Tue",
    Department: "Radiology",
    name: "X-Ray",
  },
  {
    total: "50,000 SP",
    billId: "#12435689",
    date: "24,Nov Tue",
    Department: "Radiology",
    name: "X-Ray",
  },
];

export default function RadioloTable() {
  return (
    <div className="  flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-full overflow-hidden ">
        {bills.map((bill, index) => (
          <div
            key={index}
            className="grid grid-cols-5 gap-8 p-4 border-b border-gray-200 last:border-0  "
          >
            {/* Total Bill */}
            <div>
              <p className="text-xs text-gray-400">Total Bill</p>
              <p className="text-sm font-semibold text-gray-900">
                {bill.total}
              </p>
            </div>

            {/* Bill ID */}
            <div>
              <p className="text-xs text-gray-400">Bill ID</p>
              <p className="text-sm font-semibold text-[#972F6AFF]">
                {bill.billId}
              </p>
            </div>

            {/* Date */}
            <div>
              <p className="text-xs text-gray-400">Date</p>
              <p className="text-sm font-semibold text-gray-900">{bill.date}</p>
            </div>

            {/* Service */}
            <div>
              <p className="text-xs text-gray-400">Department</p>
              <p className="text-sm font-semibold text-gray-900">
                {bill.Department}
              </p>
            </div>

            {/* Nurse */}
            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-sm font-semibold text-gray-900">{bill.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
