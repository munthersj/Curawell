import { useState, useMemo, useEffect } from "react";
import Step1ServiceCard from "./Step1ServiceCard";
import Step2KeyServiceCard from "./Step2KeyServiceCard";
import Step3DoctorCard from "./Step3DoctorCard";
import Step4DateTimeCard from "./Step4DateTimeCard";
import { useDispatch, useSelector } from "react-redux";
import {
  bookApointmentD,
  restMessage,
} from "../../../../features/data/dashboard/appointmentsSlice";
import { toast } from "sonner";

import ToastCopm from "../../../clinics/components/ToastComp";
export default function ExchangePointsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { message1, message2 } = useSelector((s) => s.appointmentsData);
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  useEffect(() => {
    if (!message1 && !message2) return;
    toast.custom((t) => (
      <ToastCopm
        message1={message1 || message2}
        onClick={() => toast.dismiss(t)}
      />
    ));
    dispatch(restMessage());

    // تأمين إضافي إذا تسكّر الكمبوننت
    return () => {
      dispatch(restMessage());
    };
  }, [dispatch, message1, message2]);

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  // const [isHomeCare, setisHomeCare] = useState(false);
  const [selectedKeyService, setSelectedKeyService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [taxiOrder, setTaxiOrder] = useState(false);
  const [location, setLocation] = useState("");
  // const [gender, setGender] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!isOpen) return null;

  const handleBack = () => {
    step > 1 && setStep(step - 1);
    // step == 2 && setisHomeCare(null);
  };
  // const toYMD = (d) => {
  //   const pad = (n) => String(n).padStart(2, "0");
  //   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  // };
  const handleSubmit = () => {
    const payload = {
      doctor_id: selectedDoctor,
      doctor_session_id: selectedTime,
      phone: phone.trim(),
      taxi_order: taxiOrder,
      ...(taxiOrder ? { location: location.trim() } : {}),
      mode: "Point",
    };

    dispatch(bookApointmentD(payload));
    setSelectedSlot(null);
    // setGender("");
    setLocation("");
    setTaxiOrder(false);
    setSelectedTime("");
    // setisHomeCare(false);
    setStep(1);
    setSelectedService(null);
    setSelectedKeyService(null);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setPhone("");

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
  console.log(selectedTime);
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1ServiceCard
            // setIsHomeCare={setisHomeCare}
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
            // isHomeCare={isHomeCare}
            selectedKeyService={selectedKeyService}
            setSelectedKeyService={(s) => {
              setSelectedKeyService(s);
              setStep(3);
            }}
            selectedService={selectedService}
            renderProgressBar={renderProgressBar}
          />
        );
      case 3:
        return (
          <Step3DoctorCard
            // doctors={doctors}
            selectedService={selectedService}
            selectedKeyService={selectedKeyService}
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={(d) => {
              setSelectedDoctor(d);
              setStep(4);
            }}
            phone={phone}
            setPhone={setPhone}
            renderProgressBar={renderProgressBar}
            // gender={gender}
            // setGender={(d) => {
            //   setGender(d);
            //   setStep(4);
            // }}
            // isHomeCare={isHomeCare}
          />
        );
      case 4:
        return (
          <Step4DateTimeCard
            // isHomeCare={isHomeCare}
            selectedDoctor={selectedDoctor}
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
            // timeSlots={timeSlots}
            setSelectedSlot={setSelectedSlot}
            selectedSlot={selectedSlot}
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
        className="bg-white rounded-2xl shadow-lg w-full h-[600px] max-w-2xl p-6 relative flex flex-col"
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
