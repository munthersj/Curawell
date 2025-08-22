import useUserDashboardSlice from "../../../hooks/useUserDashboard";

export default function DiagnosisCard() {
  const { selectedDiagnosis, setSelectedDiagnosis, diagnosisItems } =
    useUserDashboardSlice();

  return (
    <div className="bg-white rounded-2xl shadow-md w-[240px] max-w-sm font-['Cairo'] h-[280px] overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      {/* Title */}
      <div className="px-4 py-3 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-semibold">Diagnosis</h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-hide">
        {diagnosisItems.length > 0 ? (
          diagnosisItems.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedDiagnosis(i)}
              className={`flex justify-between items-center cursor-pointer p-2 rounded-md transition-colors ${
                selectedDiagnosis === i ? "bg-pink-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex gap-2">
                <div className="bg-[#f3dbe9] text-[#972f6a] text-sm font-semibold px-2 py-1 rounded-md text-center">
                  <div>{item.duration.split(" ")[0]}</div>
                  <div className="text-[10px]">
                    {item.duration.split(" ")[1]}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold py-1">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.doctor}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No diagnosis</p>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
