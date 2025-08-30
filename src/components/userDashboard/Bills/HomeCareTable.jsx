export default function HomeCareTable({ items = [] }) {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-full overflow-hidden">
        {(items || []).map((bill, index) => (
          <div
            key={bill.bill_num ?? index}
            className="grid grid-cols-5 gap-8 p-4 border-b border-gray-200 last:border-0"
          >
            <div>
              <p className="text-xs text-gray-400">Total Bill</p>
              <p className="text-sm font-semibold text-gray-900">
                {Number.parseFloat(bill.price ?? "0").toLocaleString()} SP
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
              <p className="text-xs text-gray-400">Service</p>
              <p className="text-sm font-semibold text-gray-900">
                {bill.type || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Nurse</p>
              <p className="text-sm font-semibold text-gray-900">
                {bill.nurse || "—"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
