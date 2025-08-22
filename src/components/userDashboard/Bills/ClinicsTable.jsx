// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const bills = [
  {
    type: "individual",
    totalBill: "50000 SP",
    department: "Cardiology",
    details: {
      date: "24 Nov",
      time: "3PM",
      doctor: "Dr A",
      billId: "#1",
      notes: "–",
    },
    subBills: [],
  },
  {
    type: "multiple",
    totalBill: "40000 SP",
    department: "Neurology",
    details: {},
    subBills: [
      {
        date: "25 Nov",
        time: "10AM",
        doctor: "Dr B",
        billId: "#2",
        paidBill: "20000 SP",
        extraBill: "5000 SP",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
      {
        date: "26 Nov",
        time: "11AM",
        doctor: "Dr C",
        billId: "#3",
        paidBill: "15000 SP",
        extraBill: "0",
        notes: "-",
      },
    ],
  },
  {
    type: "individual",
    totalBill: "50000 SP",
    department: "Cardiology",
    details: {
      date: "24 Nov",
      time: "3PM",
      doctor: "Dr A",
      billId: "#1",
      notes: "–",
    },
    subBills: [],
  },
  {
    type: "individual",
    totalBill: "50000 SP",
    department: "Cardiology",
    details: {
      date: "24 Nov",
      time: "3PM",
      doctor: "Dr A",
      billId: "#1",
      notes: "–",
    },
    subBills: [],
  },
  {
    type: "individual",
    totalBill: "50000 SP",
    department: "Cardiology",
    details: {
      date: "24 Nov",
      time: "3PM",
      doctor: "Dr A",
      billId: "#1",
      notes: "–",
    },
    subBills: [],
  },
];

export default function ClinicsTable() {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const parseBill = (bill) => parseInt(bill.replace(/[^0-9]/g, "")) || 0;

  return (
    <div className="  flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-full overflow-hidden">
        {bills.map((bill, index) => {
          const { type, totalBill, department, details, subBills } = bill;

          const totalWithExtras =
            type === "multiple"
              ? parseBill(totalBill) +
                subBills.reduce(
                  (acc, b) => acc + parseBill(b.extraBill || "0"),
                  0
                )
              : parseBill(totalBill);

          const totalPaid =
            type === "multiple"
              ? subBills.reduce((acc, b) => acc + parseBill(b.paidBill), 0)
              : parseBill(totalBill);

          const status =
            type === "individual"
              ? "Paid"
              : totalPaid === totalWithExtras
              ? "Paid"
              : "UnPaid";

          const statusStyles =
            status === "Paid"
              ? "bg-[#24A99C38] text-[#24A99CFF]"
              : "bg-[#972F6A38] text-[#972F6AFF]";

          const expanded = expandedRows[index];

          return (
            <div key={index} className="border-b border-gray-200">
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
                    {type === "multiple"
                      ? totalWithExtras.toLocaleString() + " SP"
                      : totalBill}
                  </p>
                </div>

                {/* Paid Bill */}
                <div>
                  <p className="text-xs text-gray-400">Paid Bill</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {type === "multiple"
                      ? totalPaid.toLocaleString() + " SP"
                      : totalBill}
                  </p>
                </div>

                {/* Department */}
                <div>
                  <p className="text-xs text-gray-400">Department</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {department}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusStyles}`}
                  >
                    {status}
                  </span>
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
              </div>

              {/* Expanded Panel */}
              {expanded && (
                <div className="bg-[#f5f5f558] px-6 py-4 space-y-6 border-t border-gray-100">
                  {type === "individual" ? (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-400">Date</p>
                          <p className="text-sm text-gray-800">
                            {details.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Time</p>
                          <p className="text-sm text-gray-800">
                            {details.time || "–"}
                          </p>
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
                            {details.billId || "–"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">
                            Doctor/Nurse Notes
                          </p>
                          <p className="text-sm text-gray-800">
                            {details.notes || "–"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    subBills.map((sub, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 gap-6 border-t first:border-t-0 pt-4"
                      >
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-400">Date</p>
                            <p className="text-sm text-gray-800">{sub.date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Time</p>
                            <p className="text-sm text-gray-800">{sub.time}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Doctor</p>
                            <p className="text-sm text-gray-800">
                              {sub.doctor}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-gray-400">Bill ID</p>
                            <p className="text-sm font-semibold text-[#972F6AFF]">
                              {sub.billId}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Paid Bill</p>
                            <p className="text-sm text-gray-800">
                              {sub.paidBill}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Extra Bill</p>
                            <p className="text-sm text-gray-800">
                              {sub.extraBill || "–"}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400">
                            Doctor/Nurse Notes
                          </p>
                          <p className="text-sm text-gray-800">
                            {sub.notes || "–"}
                          </p>
                        </div>
                      </div>
                    ))
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
