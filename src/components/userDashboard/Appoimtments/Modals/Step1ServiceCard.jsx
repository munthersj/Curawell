import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinicsD } from "../../../../features/data/dashboard/appointmentsSlice";
import LogoLoader from "../../../LogoLoader";

export default function Step1ServiceCard({
  selectedService,
  setSelectedService,
  renderProgressBar,
  setIsHomeCare,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClinicsD());
  }, [dispatch]);
  const { clinics, status1 } = useSelector((s) => s.appointmentsData);
  console.log(clinics);

  const services = clinics.clinics;

  console.log(services);
  return (
    <div>
      {renderProgressBar(1)}
      <h2 className="text-lg font-bold text-black mb-4">Choose Service</h2>

      {/* big container with hidden scrollbar */}
      <div className="max-h-80 overflow-y-scroll pr-2 custom-scrollbar">
        {status1 == "loading" || services == undefined ? (
          <div className="flex items-center w-full h-full justify-center">
            <LogoLoader size={42} speed={1.2} />
          </div>
        ) : (
          services.map((service, index) => {
            const isSelected = selectedService === service.id;

            return (
              <div key={index}>
                {/* Service container */}
                <div
                  onClick={() => setSelectedService(service.id)}
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
                    {service.name_en}
                  </p>
                </div>

                {/* Separator */}
                {index < services.length - 1 && (
                  <hr className="border-gray-200 my-2" />
                )}
              </div>
            );
          })
        )}
        <hr className="border-gray-200 my-2" />

        <div
          onClick={() => {
            setSelectedService(clinics.homeCare_id);
            setIsHomeCare(true);
          }}
          className={`flex items-center justify-center py-4 px-4 rounded-xl cursor-pointer transition-transform transform 
                  ${"bg-white hover:scale-x-98 hover:scale-y-110 hover:shadow-xl"}`}
        >
          <p className={`font-medium text-xl ${"text-[#922D66FF]"}`}>
            Home Care
          </p>
        </div>
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
