import React from "react";

export default function Step2KeyServiceCard({
  selectedKeyService,
  setSelectedKeyService,
  renderProgressBar,
}) {
  const keyServices = [
    "Dermatology & Skin Care",
    "Facial & Body Treatments",
    "Aesthetic Medicine (Injectables, Non-surgical Facelift)",
  ];

  return (
    <>
      {renderProgressBar(2)}
      <h2 className="text-lg font-bold text-black mb-4">Choose Key Service</h2>
      <div className="flex flex-col gap-3">
        {keyServices.map((service, index) => {
          const isSelected = selectedKeyService === service;
          return (
            <button
              key={index}
              onClick={() => setSelectedKeyService(service)}
              className={`px-4 py-2 rounded-full text-left font-medium transition-all duration-300 ${
                isSelected
                  ? "bg-[#972F6A26] shadow-lg"
                  : "bg-[#972F6A26] hover:bg-[#972f6a4a]"
              } text-[#922D66FF]`}
            >
              {service}
            </button>
          );
        })}
      </div>
    </>
  );
}
