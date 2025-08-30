import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function parseMoney(s) {
  const n = Number.parseFloat(s ?? "0");
  return Number.isFinite(n) ? n : 0;
}

export default function ClinicsTable({ items = [] }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const data = useMemo(() => {
    return Array.isArray(items) ? items.slice() : [];
  }, [items]);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-full overflow-hidden">
        {data.map((bill, index) => {
          const total = parseMoney(bill.total_bill);
          const paid = parseMoney(bill.paid_of_bill);
          const expanded = expandedRows[index];

          const statusColor =
            (bill.status || "").toLowerCase() === "complete" || paid >= total
              ? "bg-[#24A99C38] text-[#24A99CFF]"
              : "bg-[#972F6A38] text-[#972F6AFF]";

          // اجمع أقسام المواعيد ضمن الفاتورة
          const deps = (bill.bill_appointments ?? [])
            .map((a) => (a?.department || "").trim())
            .filter(Boolean);

          const uniqueDeps = Array.from(new Set(deps));
          let deptLabel = "—";
          if (uniqueDeps.length === 1) {
            deptLabel = uniqueDeps[0];
          } else if (uniqueDeps.length > 1) {
            // بتقدر تغيّر التنسيق هون إذا بتحب كلمة "Multiple"
            // مثال بديل: `${uniqueDeps[0]} +${uniqueDeps.length - 1}`
            deptLabel = "Multiple";
          }

          // أول موعد (للاستعراض داخل الإكسباند)
          const appt = bill.bill_appointments?.[0];

          return (
            <div
              key={bill.bill_id ?? index}
              className="border-b border-gray-200"
            >
              {/* Main Row */}
              <div
                className={`grid grid-cols-6 gap-4 px-6 py-4 cursor-pointer transition-colors duration-200 ${
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
                    {total.toLocaleString()} SP
                  </p>
                </div>

                {/* Paid Bill */}
                <div>
                  <p className="text-xs text-gray-400">Paid Bill</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {paid.toLocaleString()} SP
                  </p>
                </div>

                {/* Doctor */}
                <div>
                  <p className="text-xs text-gray-400">Doctor</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {bill.doctor_name || "—"}
                  </p>
                </div>

                {/* Department — خارج الإكسباند */}
                <div>
                  <p className="text-xs text-gray-400">Department</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {deptLabel}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}
                  >
                    {bill.status || (paid >= total ? "Complete" : "Incomplete")}
                  </span>
                </div>

                {/* Action */}
                <button className="flex items-center justify-end space-x-2 h-8 px-3 py-0.5 text-xs font-medium rounded-3xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition ml-auto">
                  <span>{expanded ? "See Less" : "See More"}</span>
                  {expanded ? (
                    <ChevronUp size={14} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={14} className="text-gray-500" />
                  )}
                </button>
              </div>

              {/* Expanded Panel */}
              {expanded && (
                <div className="bg-[#f5f5f558] px-6 py-4 space-y-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">Bill #</p>
                        <p className="text-sm font-semibold text-[#972F6AFF]">
                          {bill.bill_num ?? `#${bill.bill_id}`}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">
                          Appointments Count
                        </p>
                        <p className="text-sm text-gray-800">
                          {bill.bill_appointments?.length ?? 0}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">
                          Primary Department
                        </p>
                        <p className="text-sm text-gray-800">
                          {appt?.department || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">First Date/Time</p>
                        <p className="text-sm text-gray-800">
                          {appt ? `${appt.date} ${appt.time}` : "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Appointments list */}
                  {!!bill.bill_appointments?.length && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">Appointments</p>
                      {bill.bill_appointments.map((a) => (
                        <div
                          key={a.appointment_bill_id}
                          className="grid grid-cols-4 gap-4 p-3 bg-white rounded-xl border"
                        >
                          <div>
                            <p className="text-xs text-gray-400">Department</p>
                            <p className="text-sm font-medium text-gray-800">
                              {a.department}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Date</p>
                            <p className="text-sm text-gray-800">{a.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Time</p>
                            <p className="text-sm text-gray-800">{a.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">
                              Paid / Total
                            </p>
                            <p className="text-sm text-gray-800">
                              {parseMoney(a.paid_bill).toLocaleString()} /{" "}
                              {parseMoney(a.total_bill).toLocaleString()} SP
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
