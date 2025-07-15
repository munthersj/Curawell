/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import { useRef, useState } from "react";
import {
  MoveRight,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";

export default function SlideComp() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  //   الداتا يلي بدك تعرضها جوا الكرادات
  const data = [
    {
      title: "Dental Clinic",
      sub: "Quality dental care with a gentle touch. We offer general, cosmetic, and emergency services in a friendly, modern setting.",
      image: "src/assets/special.png",
    },
    {
      title: "Dental Clinic",
      sub: "Quality dental care with a gentle touch. We offer general, cosmetic, and emergency services in a friendly, modern setting.",
      image: "src/assets/special.png",
    },
    {
      title: "Dental Clinic",
      sub: "Quality dental care with a gentle touch. We offer general, cosmetic, and emergency services in a friendly, modern setting.",
      image: "src/assets/special.png",
    },
    {
      title: "Dental Clinic",
      sub: "Quality dental care with a gentle touch. We offer general, cosmetic, and emergency services in a friendly, modern setting.",
      image: "src/assets/special.png",
    },
  ];
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
  const settings1 = {
    infinite: true, // يجعل السلايدر لا نهائي
    speed: 1000, // سرعة الانتقال
    slidesToShow: 5, // عدد الكروت الظاهرة
    slidesToScroll: 1, // كم كرت ينزاح
    autoplay: true, // تشغيل تلقائي
    autoplaySpeed: 4000, // كل كم ملي ثانية ينتقل (3 ثواني هنا)
    arrows: false, // يمكن إخفاء الأسهم إن أردت
    dots: true, // يمكن إظهار النقاط
    pauseOnHover: false,
    fade: true,
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
  //   توابع الانتقال تبع الاسهم
  const prevSlide = () => {
      if (currentIndex > 0) {
    sliderRef.current.slickPrev();
  }
  };

  const nextSlide = () => {
    if (currentIndex < data.length - 1) {
      sliderRef.current.slickNext();
    }
  };
  return (
    <div class="w-100 sm:w-500   left-90 mt-20 sm:mr-60 ">
      {/* الاسهم والنقاط */}
      <div className="  left-400 mb-20 sm:mb-0  flex ml-5 sm:ml-200 items-center  justify-center pr-5 hover:cursor-pointer ">
        <button onClick={prevSlide} class="">
          <ArrowLeft className={`${currentIndex <= 0 ? "text-gray-400" : "text-curawell hover:cursor-pointer"}`} size={34} />
        </button>
        <div className=" flex gap-2 ">
          {data.map((_, index) => (
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
          <ArrowRight className={`${currentIndex >= data.length - 1 ? "text-gray-400" : "text-curawell  hover:cursor-pointer"}`}  size={34} />
        </button>
      </div>
      {/* السلايدر وبالريتيرن تبع الماب بتظبط شكل كل كارد متغير السيتينغ هيك بتمرقه والريف مشان ينربط بالبالاسهم والنقاط  */}
      <Slider ref={sliderRef} {...settings}>
        {data.map((d) => {
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
                    {d.title}
                  </h1>
                  <p className="text-md font-cairo ">{d.sub}</p>
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
