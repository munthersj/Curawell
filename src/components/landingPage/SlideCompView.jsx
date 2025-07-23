/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import { useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Quote } from "lucide-react";

export default function SlideComp({ comments }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const data = [
  //   {
  //     title: "Our Patient opinions",
  //     sub: "I really like this app! The user interface is very user-friendly, and the features are quite useful. It has saved me a lot of time.This website has a beautiful design and is well-optimized for mobile. I appreciate how they display information clearly and concisely.",
  //     image: "src/assets/Selection (6).png",
  //   },
  //   {
  //     title: "Our Patient opinions",
  //     sub: "I really like this app! The user interface is very user-friendly, and the features are quite useful. It has saved me a lot of time.This website has a beautiful design and is well-optimized for mobile. I appreciate how they display information clearly and concisely.",
  //     image: "src/assets/Selection (6).png",
  //   },
  //   {
  //     title: "Our Patient opinions",
  //     sub: "I really like this app! The user interface is very user-friendly, and the features are quite useful. It has saved me a lot of time.This website has a beautiful design and is well-optimized for mobile. I appreciate how they display information clearly and concisely.",
  //     image: "src/assets/Selection (6).png",
  //   },
  //   {
  //     title: "Our Patient opinions",
  //     sub: "I really like this app! The user interface is very user-friendly, and the features are quite useful. It has saved me a lot of time.This website has a beautiful design and is well-optimized for mobile. I appreciate how they display information clearly and concisely.",
  //     image: "src/assets/Selection (6).png",
  //   },
  // ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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

  const prevSlide = () => {
    if (currentIndex > 0) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (currentIndex < comments.length - 1) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div className="w-full relative ml-1 sm:ml-0">
      {/* Arrows */}
      <div className="flex justify-between w-full h-full left-0 absolute z-30 px-4 sm:px-10 top-1/2 -translate-y-1/2">
        <button onClick={prevSlide}>
          <ArrowLeft
            className={`${
              currentIndex <= 0
                ? "text-gray-400"
                : "text-curawell hover:cursor-pointer"
            }`}
            size={40}
          />
        </button>
        <button onClick={nextSlide}>
          <ArrowRight
            className={`${
              currentIndex >= comments.length - 1
                ? "text-gray-400"
                : "text-curawell hover:cursor-pointer"
            }`}
            size={40}
          />
        </button>
      </div>

      {/* Slider */}
      <h1 className="text-center text-4xl sm:text-4xl md:text-5xl font-cairo font-bold ">
        Our Patient opinions
      </h1>
      <Slider ref={sliderRef} {...settings}>
        {comments.map((d, index) => (
          <div key={index}>
            <div className="flex flex-col items-center justify-center bg-transparent px-4 py-8 min-h-screen">
              <Quote size={24} className="mb-2 text-gray-600" />
              <p className="text-center text-lg sm:text-lg md:text-2xl text-gray-700 font-cairo w-70 sm:w-full sm:max-w-2xl pb-15 sm:pb-5">
                {d.comment_en}
              </p>
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4">
                <img
                  src="src/assets/max-profile.jpg"
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold mb-2">
                {d.patient.name_patient}
              </h3>
              <div className="flex items-center">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-300 ms-1"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                <svg
                  className="w-4 h-4 ms-1 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
