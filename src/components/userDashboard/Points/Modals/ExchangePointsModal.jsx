import React, { useState } from "react";
import Step1ServiceCard from "./Step1ServiceCard";
import Step2KeyServiceCard from "./Step2KeyServiceCard";
import Step3DoctorCard from "./Step3DoctorCard";
import Step4DateTimeCard from "./Step4DateTimeCard";

export default function ExchangedPointsCard({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedKeyService, setSelectedKeyService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [taxiOrder, setTaxiOrder] = useState(false);
  const [location, setLocation] = useState("");

  const doctors = [
    {
      name: "Dr. John Doe",
      department: "Ophthalmology",
    },
    {
      name: "Dr. Jane Smith",
      department: "Dermatology",
    },
    {
      name: "Dr. Emily Brown",
      department: "Dental Clinic",
    },
    {
      name: "Dr. Ahmed Khan",
      department: "Cardiology",
    },
    {
      name: "Dr. Ahmed Khan",
      department: "Cardiology",
    },
    {
      name: "Dr. Ahmed Khan",
      department: "Cardiology",
    },
    {
      name: "Dr. Ahmed Khan",
      department: "Cardiology",
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
  ];

  if (!isOpen) return null;

  const handleBack = () => step > 1 && setStep(step - 1);

  const handleSubmit = () => {
    console.log({
      selectedService,
      selectedKeyService,
      selectedDoctor,
      phone,
      selectedDate,
      selectedTime,
      taxiOrder,
      location,
    });
    onClose();
  };

  // Stepper in separated style " - - - - "
  const renderProgressBar = (currentStep) => (
    <div className="flex gap-2 mb-6">
      {[1, 2, 3, 4].map((num) => (
        <div
          key={num}
          className={`h-2 flex-1 rounded-full transition-all duration-500 ${
            currentStep >= num ? "bg-teal-500" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1ServiceCard
            selectedService={selectedService}
            setSelectedService={(s) => {
              setSelectedService(s);
              setStep(2); // auto move forward
            }}
            renderProgressBar={renderProgressBar}
          />
        );
      case 2:
        return (
          <Step2KeyServiceCard
            selectedKeyService={selectedKeyService}
            setSelectedKeyService={(s) => {
              setSelectedKeyService(s);
              setStep(3);
            }}
            renderProgressBar={renderProgressBar}
          />
        );
      case 3:
        return (
          <Step3DoctorCard
            doctors={doctors}
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={(d) => {
              setSelectedDoctor(d);
              setStep(4);
            }}
            phone={phone}
            setPhone={setPhone}
            renderProgressBar={renderProgressBar}
          />
        );
      case 4:
        return (
          <Step4DateTimeCard
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            taxiOrder={taxiOrder}
            setTaxiOrder={setTaxiOrder}
            location={location}
            setLocation={setLocation}
            renderProgressBar={renderProgressBar}
            handleSubmit={handleSubmit}
            timeSlots={timeSlots}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose} // close when clicking outside
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full h-[500px] max-w-2xl p-6 relative flex flex-col"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <div className="flex-1 overflow-y-auto">{renderStepContent()}</div>

        {/* Back button fixed bottom left */}
        {step > 1 && (
          <div className="absolute bottom-4 left-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
