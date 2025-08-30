/* eslint-disable no-unused-vars */
import LogoLoader from "../../LogoLoader";
export default function MedicationsCard({ sessions, status }) {
  return (
    <div className="bg-white rounded-2xl shadow-md w-[240px] max-w-sm font-['Cairo'] h-[280px] overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      {/* Title */}
      <div className="px-4 py-3 bg-white z-10 rounded-t-2xl">
        <h2 className="text-lg font-semibold text-gray-800">Medications</h2>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {status == "loading" ? (
          <div className="flex items-center w-full h-full justify-center">
            <LogoLoader size={42} speed={1.2} />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((med, i) => (
            <div key={med.info_session[0].session_id}>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <span>{med.date}</span>
              </div>

              <div className="text-[#972f6a] font-semibold mb-1">
                {med.info_session[0].session_name}
              </div>
              <div className="text-sm text-[#CE9DB9] mb-2">
                {med.info_session[0].medicines}
              </div>

              {i < sessions.length - 1 && (
                <hr className="my-4 border-t-[1.5px] border-[#F3F4F6]" />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">No medications</p>
        )}
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
