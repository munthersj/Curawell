import React from "react";

function parseMoney(s) {
  const n = Number.parseFloat(s ?? "0");
  return Number.isFinite(n) ? n : 0;
}

export default function RadioloTable({ items = [] }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-full overflow-hidden ">
        {(items || []).map((bill, index) => (
          <div
            key={bill.bill_num ?? index}
            className="grid grid-cols-5 gap-8 p-4 border-b border-gray-200 last:border-0"
          >
            <div>
              <p className="text-xs text-gray-400">Total Bill</p>
              <p className="text-sm font-semibold text-gray-900">
                {parseMoney(bill.price).toLocaleString()} SP
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Bill ID</p>
              <p className="text-sm font-semibold text-[#972F6AFF]">
                {bill.bill_num || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Date</p>
              <p className="text-sm font-semibold text-gray-900">{bill.date}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Department</p>
              <p className="text-sm font-semibold text-gray-900">
                {bill.department || "Radiology"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-sm font-semibold text-gray-900">
                {bill.name || "—"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
