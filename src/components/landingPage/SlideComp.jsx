/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import { useRef, useState } from "react";
import { MoveRight, ArrowRight, ArrowLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

export default function SlideComp({ clinics }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const quarterLength = Math.ceil(clinics.length / 2); // نستخدم ceil لو بدك تضم الزيادة
  const quarterArray = clinics.slice(0, quarterLength);
  //   الداتا يلي بدك تعرضها
  // متغير الاعدادات للسلايدر
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current) => setCurrentIndex(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  // متغير الاعدادات للسلايدر بغير يلي قبل بكم شغلة

  //   توابع الانتقال تبع الاسهم
  const prevSlide = () => {
    if (currentIndex > 0) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (currentIndex < quarterArray.length - 1) {
      sliderRef.current.slickNext();
    }
  };
  return (
    <div class="w-100 sm:w-500 mx-36 left-90 mt-20 sm:mr-60 ">
      {/* الاسهم والنقاط */}
      <div className="  left-400 mb-20 sm:mb-0  flex ml-5 sm:ml-200 items-center  justify-center pr-5 hover:cursor-pointer ">
        <button onClick={prevSlide} class="">
          <ArrowLeft
            className={`${
              currentIndex <= 0
                ? "text-gray-400"
                : "text-curawell hover:cursor-pointer"
            }`}
            size={34}
          />
        </button>
        <div className=" flex gap-2 ">
          {quarterArray.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full border-curawell border-2 transition-all ${
                index === currentIndex ? "bg-curawell" : "bg-white"
              }`}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="  ">
          <ArrowRight
            className={`${
              currentIndex >= quarterArray.length - 1
                ? "text-gray-400"
                : "text-curawell  hover:cursor-pointer"
            }`}
            size={34}
          />
        </button>
      </div>
      {/* السلايدر وبالريتيرن تبع الماب بتظبط شكل كل كارد متغير السيتينغ هيك بتمرقه والريف مشان ينربط بالبالاسهم والنقاط  */}
      <Slider ref={sliderRef} {...settings}>
        {clinics.map((d) => {
          return (
            <div className=" px-2 pr-3 sm:pr-0 sm:px-5 py-4  cursor-pointer ">
              <div className="flex flex-col bg-white shadow-md shadow-gray-600/50 rounded-2xl   ">
                <FontAwesomeIcon
                  icon={faTooth}
                  style={{
                    fontSize: "100px",
                    color: "#22ccb2",
                    marginTop: "20px",
                  }}
                />
                <div className="flex flex-col px-6 pt-4 pb-6">
                  <h1 className="text-2xl font-cairo font-bold pb-3 ">
                    {d.name_en}
                  </h1>
                  <p className="text-md font-cairo h-20 ">
                    {d.details_services_en.brief_description}
                  </p>
                  <button className="flex items-center">
                    <p className="font-cairo text-curawell text-md mt-3">
                      Explore Dentail Care
                    </p>

                    <MoveRight className="text-curawell ml-4 " size={25} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
