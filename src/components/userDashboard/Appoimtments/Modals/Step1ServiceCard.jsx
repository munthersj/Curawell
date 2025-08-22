import React from "react";

export default function Step1ServiceCard({
  selectedService,
  setSelectedService,
  renderProgressBar,
}) {
  const services = [
    "Ophthalmology",
    "Dental Clinic",
    "Cosmetic Clinic",
    "Neurology",
    "Obstetrics & Gynecology",
    "Home Care",
    "Dermatology",
    "Psychiatry",
    "Pediatrics",
    "Orthopedics",
  ];

  return (
    <div>
      {renderProgressBar(1)}
      <h2 className="text-lg font-bold text-black mb-4">Choose Service</h2>

      {/* big container with hidden scrollbar */}
      <div className="max-h-80 overflow-y-scroll pr-2 custom-scrollbar">
        {services.map((service, index) => {
          const isSelected = selectedService === service;

          return (
            <div key={index}>
              {/* Service container */}
              <div
                onClick={() => setSelectedService(service)}
                className={`flex items-center justify-center py-4 px-4 rounded-xl cursor-pointer transition-transform transform 
                  ${
                    isSelected
                      ? "bg-white border-[#922D66FF] shadow-lg scale-x-98 scale-y-110 "
                      : "bg-white hover:scale-x-98 hover:scale-y-110 hover:shadow-xl"
                  }`}
              >
                <p
                  className={`font-medium text-xl ${
                    isSelected ? "text-[#922D66FF]" : "text-[#922D66FF]"
                  }`}
                >
                  {service}
                </p>
              </div>

              {/* Separator */}
              {index < services.length - 1 && (
                <hr className="border-gray-200 my-2" />
              )}
            </div>
          );
        })}
      </div>

      {/* style to hide scrollbar */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }
      `}</style>
    </div>
  );
}
