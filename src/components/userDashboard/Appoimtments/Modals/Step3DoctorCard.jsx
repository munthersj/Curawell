import React from "react";
import { Phone } from "lucide-react";

export default function Step3DoctorCard({
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  phone,
  setPhone,
  renderProgressBar,
}) {
  return (
    <>
      {renderProgressBar(3)}
      <h2 className="text-lg font-bold text-balck mb-4">Choose Doctor</h2>

      {/* Scrollable horizontal doctors list */}
      <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar mb-8">
        {doctors.map((doc, index) => {
          const isSelected = selectedDoctor === doc.name;
          return (
            <div
              key={index}
              onClick={() => setSelectedDoctor(doc.name)}
              className={`flex flex-col items-center min-w-[150px] p-3 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? "bg-[#d5d5d5aa] shadow-lg scale-[1.02]"
                  : "bg-[#d5d5d52e] hover:shadow-md"
              }`}
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-20 h-20 object-cover rounded-full mb-2"
              />
              <p className="font-medium text-black text-center">{doc.name}</p>
              <p className="text-[#972f6ab8] text-sm text-center">
                {doc.department}
              </p>
            </div>
          );
        })}
      </div>

      <h2 className="text-lg font-bold text-black mb-3">Patient Details</h2>
      <div className="flex items-center bg-gray-100 rounded-2xl px-5 py-3">
        <Phone className="text-[#922D66FF] mr-2" />
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-transparent focus:outline-none w-full text-gray-600"
        />
      </div>

      {/* Hide scrollbar but keep scroll functionality */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }
      `}</style>
    </>
  );
}
