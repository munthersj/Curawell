import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function parseMoney(s) {
  const n = Number.parseFloat(s ?? "0");
  return Number.isFinite(n) ? n : 0;
}

export default function LabTable({ items = [] }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-full overflow-hidden">
        {(items || []).map((bill, index) => {
          const expanded = expandedRows[index];
          const price = parseMoney(bill.price);

          return (
            <div
              key={bill.bill_num ?? index}
              className="border-b border-gray-200 "
            >
              {/* Main Row */}
              <div
                className={`grid grid-cols-5 gap-4 px-6 py-4 cursor-pointer transition-colors duration-200 ${
                  expanded
                    ? "bg-gray-50 border-l-4 border-[#24A99CFF]"
                    : "bg-white"
                }`}
                onClick={() => toggleRow(index)}
              >
                <div>
                  <p className="text-xs text-gray-400">Total Bill</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {price.toLocaleString()} SP
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
                  <p className="text-sm font-semibold text-gray-800">
                    {bill.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Department</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {bill.department || "Laboratory"}
                  </p>
                </div>

                <button className="flex items-center space-x-2 h-8 px-3 py-0.5 text-xs font-medium rounded-3xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition ml-auto">
                  <span>{expanded ? "See Less" : "See More"}</span>
                  {expanded ? (
                    <ChevronUp size={14} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={14} className="text-gray-500" />
                  )}
                </button>
              </div>

              {/* Expanded */}
              {expanded && (
                <div className="bg-white px-6 py-4 space-y-2 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">Doctor</p>
                        <p className="text-sm text-gray-800">
                          {bill.doctor_name || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Service Name</p>
                        <p className="text-sm text-gray-800">
                          {bill.name || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">Analyzes</p>
                        <div className="text-sm text-gray-800 space-y-1">
                          {(bill.analyzes_name ?? []).map((n, i) => (
                            <div
                              key={i}
                              className="px-2 py-1 bg-gray-50 rounded-md border"
                            >
                              {n}
                            </div>
                          ))}
                          {!(bill.analyzes_name ?? []).length && <span>—</span>}
                        </div>
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
