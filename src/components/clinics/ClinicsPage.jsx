/* eslint-disable no-unused-vars */

import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {
  fetchClinicsData,
  fetchClinicsDoctors,
  fetchQuestionData,
} from "../../features/data/clinicsSlice";
import ClinicsSections from "./ClinicsSection";
import DoctorsSection from "../landingPage/DoctorsSection";
import CurwellFooter from "../CurwellFooter";
export default function ClinicsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchClinicsDoctors());
    dispatch(fetchClinicsData());
    dispatch(fetchQuestionData());
  }, []);
  const { clinics, doctors, questions } = useSelector(
    (state) => state.clinicsData
  );
  const faqData = [
    {
      question: "ما هي ساعات العمل الرسمية؟",
      answer: "ساعات العمل من الأحد إلى الخميس من 9 صباحًا حتى 5 مساءً.",
    },
    {
      question: "هل تقدمون خدمات الاستشارة المجانية؟",
      answer: "نعم، نحن نقدم جلسة استشارية مجانية أولى لجميع العملاء الجدد.",
    },
    {
      question: "كيف يمكنني حجز موعد؟",
      answer:
        "يمكنك الحجز من خلال موقعنا الإلكتروني أو الاتصال برقم خدمة العملاء.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const newQ = questions.slice(0, 5);
  return (
    <div className="flex flex-col ">
      {!clinics || clinics.length < 5 ? (
        <div>loading...</div>
      ) : (
        <>
          <NavBar />
          <img src="src/assets/clin.png" alt="" className="object-cover" />
          <ClinicsSections clinics={clinics} />
          <DoctorsSection doctors={doctors} />

          <div className="flex justify-center items-center mb-5">
            <div className="w-3/5 mx-auto mt-10 space-y-4">
              {newQ.map((item, index) => (
                <div key={index} className=" rounded-lg overflow-hidden shadow">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full text-start px-6 py-4 bg-curawell/30 hover:bg-[#f1f1f1] transition-all duration-200 font-cairo font-bold "
                  >
                    {item.question_en}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 py-4 bg-white text-start font-cairo text-gray-700 text-sm border-t">
                      {item.answer_en}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col w-1/4  ">
              <h1 className="font-cairo text-2xl mb-5">
                Frequently asked <br /> questions
              </h1>
              <h1 className="font-cairo text-[14px] ">
                Our purpose also informs our company culture andvalues. We{" "}
                <br /> strive to create a work fosters creativity
              </h1>
            </div>
          </div>

          <CurwellFooter />
        </>
      )}
    </div>
  );
}
