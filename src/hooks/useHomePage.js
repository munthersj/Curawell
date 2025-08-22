import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useHomePage() {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const sliderRef1 = useRef(null);

  const {
    clinics,
    comments,
    articels,
    offers,
    status,
    error,
    sections,
    status1,
  } = useSelector((state) => state.homeData);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
  const settings1 = {
    infinite: true, // يجعل السلايدر لا نهائي
    speed: 1000, // سرعة الانتقال
    slidesToShow: 1, // عدد الكروت الظاهرة
    slidesToScroll: 1, // كم كرت ينزاح
    autoplay: true, // تشغيل تلقائي
    autoplaySpeed: 4000, // كل كم ملي ثانية ينتقل (3 ثواني هنا)
    arrows: false, // يمكن إخفاء الأسهم إن أردت
    dots: false, // يمكن إظهار النقاط
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
  const settings2 = {
    infinite: true, // يجعل السلايدر لا نهائي
    speed: 1000, // سرعة الانتقال
    slidesToShow: 1, // عدد الكروت الظاهرة
    slidesToScroll: 1, // كم كرت ينزاح
    // تشغيل تلقائي
    autoplaySpeed: 4000, // كل كم ملي ثانية ينتقل (3 ثواني هنا)
    arrows: false, // يمكن إخفاء الأسهم إن أردت
    dots: false, // يمكن إظهار النقاط
    pauseOnHover: false,
    afterChange: (current) => setCurrentIndex1(current),

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
  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const prevSlide1 = () => {
    sliderRef1.current.slickPrev();
  };

  const nextSlide1 = () => {
    sliderRef1.current.slickNext();
  };

  return {
    dispatch,
    sliderRef,
    sliderRef1,
    clinics,
    articels,
    comments,
    offers,
    sections,
    status,
    status1,
    error,
    currentIndex,
    setCurrentIndex,
    currentIndex1,
    setCurrentIndex1,
    settings,
    settings1,
    settings2,
    prevSlide,
    prevSlide1,
    nextSlide,
    nextSlide1,
  };
}
