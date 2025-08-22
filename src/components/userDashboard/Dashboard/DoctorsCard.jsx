import useUserDashboardSlice from "../../../hooks/useUserDashboard";

export default function DoctorsCard() {
  const { doctors, getImage } = useUserDashboardSlice();

  return (
    <div className="bg-white rounded-2xl shadow-md w-[270px] max-w-sm font-['Cairo'] h-[280px] overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      {/* Header */}
      <div className="px-4 py-3 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-semibold">Your Doctors</h2>
      </div>

      {/* Doctors list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 scrollbar-hide">
        {doctors.length > 0 ? (
          doctors.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <img
                  src={getImage(doc.img)}
                  alt={doc.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm">{doc.name}</div>
                  <div className="text-xs text-[#CE9DB9]">{doc.specialty}</div>
                </div>
              </div>
              <i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No doctors</p>
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
