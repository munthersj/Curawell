/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo } from "react";
import {
  fetchAKeyServices,
  fetchHomeCareAKeyServices,
} from "../../../../features/data/dashboard/appointmentsSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoLoader from "../../../LogoLoader";

export default function Step2KeyServiceCard({
  selectedService,
  selectedKeyService,
  setSelectedKeyService,
  renderProgressBar,
  isHomeCare,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isHomeCare) {
      dispatch(fetchHomeCareAKeyServices(selectedService));
    } else {
      dispatch(fetchAKeyServices(selectedService));
    }
  }, [dispatch, isHomeCare, selectedService]);
  const { KeyServices1, homeCareKeyServices, status } = useSelector(
    (s) => s.appointmentsData
  );
  // console.log(KeyServices1);
  // console.log(selectedService);
  function extractCompetences(data) {
    console.log(data);
    return data.map((item) => {
      const c = isHomeCare ? item : item.competences;
      console.log(JSON.stringify(c));
      return isHomeCare
        ? {
            competence_id: c.id,
            competence_name_en: c.name_en,
          }
        : {
            competence_id: c.competence_id,
            competence_name_en: c.competence_name_en,
          };
    });
  }
  const keyServices = isHomeCare
    ? extractCompetences(homeCareKeyServices)
    : extractCompetences(KeyServices1);

  console.log(homeCareKeyServices);

  // [
  //   "Dermatology & Skin Care",
  //   "Facial & Body Treatments",
  //   "Aesthetic Medicine (Injectables, Non-surgical Facelift)",
  // ];

  return (
    <>
      {renderProgressBar(2)}
      <h2 className="text-lg font-bold text-black mb-4">Choose Key Service</h2>
      <div className="flex flex-col gap-3">
        {status == "loading" || keyServices == undefined ? (
          <div className="flex items-center w-full h-full justify-center">
            <LogoLoader size={42} speed={1.2} />
          </div>
        ) : (
          keyServices.map((service, index) => {
            const isSelected = selectedKeyService === service.competence_id;
            return (
              <button
                key={index}
                onClick={() =>
                  setSelectedKeyService(
                    isHomeCare
                      ? service.competence_name_en
                      : service.competence_id
                  )
                }
                className={`px-4 py-2 rounded-full text-left font-medium transition-all duration-300 ${
                  isSelected
                    ? "bg-[#972F6A26] shadow-lg"
                    : "bg-[#972F6A26] hover:bg-[#972f6a4a]"
                } text-[#922D66FF]`}
              >
                {service.competence_name_en}
              </button>
            );
          })
        )}
      </div>
    </>
  );
}
