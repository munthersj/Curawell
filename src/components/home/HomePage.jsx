/* eslint-disable no-unused-vars */
import NavBar from "../NavBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";
import {
  Search,
  FlaskConical,
  MoveRight,
  SquareActivity,
  House,
  Siren,
  Hospital,
  ArrowRight,
  ArrowLeft,
  Sliders,
} from "lucide-react";
import Slider from "react-slick";
import { useRef } from "react";

export default function HomePage() {
  const sliderRef = useRef(null);
  const sliderRef1 = useRef(null);
  const feedbacks = [
    {
      name: "Ahmad Saleh",
      image: "https://i.pravatar.cc/100?img=11",
      rating: 5,
      comment:
        "خدمة ممتازة وسرعة استجابة رائعة. شكراً لكم على هذا المستوى الراقي.",
    },
    {
      name: "Lina Omar",
      image: "https://i.pravatar.cc/100?img=12",
      rating: 4,
      comment: "تجربة رائعة لكن واجهتني مشكلة صغيرة وتم حلها بسرعة.",
    },
    {
      name: "Yousef Ali",
      image: "https://i.pravatar.cc/100?img=13",
      rating: 5,
      comment: "أفضل خدمة حصلت عليها على الإطلاق! أنصح بها الجميع.",
    },
    {
      name: "Sara Mahmoud",
      image: "https://i.pravatar.cc/100?img=14",
      rating: 3,
      comment: "الخدمة جيدة ولكن يوجد مجال للتحسين في التواصل.",
    },
    {
      name: "Omar Khaled",
      image: "https://i.pravatar.cc/100?img=15",
      rating: 5,
      comment: "سرعة واحترافية، فريق عمل ممتاز ومتعاون.",
    },
    {
      name: "Rania Adel",
      image: "https://i.pravatar.cc/100?img=16",
      rating: 4,
      comment: "تجربتي كانت إيجابية بشكل عام وسأتعامل معكم مجددًا.",
    },
    {
      name: "Mohammad Nabil",
      image: "https://i.pravatar.cc/100?img=17",
      rating: 5,
      comment: "كل شيء كان مثالي، من البداية حتى النهاية.",
    },
    {
      name: "Dina Fathy",
      image: "https://i.pravatar.cc/100?img=18",
      rating: 4,
      comment: "أحببت التنظيم والاهتمام بالتفاصيل. بالتوفيق دائمًا.",
    },
    {
      name: "Khaled Tamer",
      image: "https://i.pravatar.cc/100?img=19",
      rating: 5,
      comment: "رائعين جداً! وخصوصًا الدعم الفني المتعاون.",
    },
  ];

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
  const data1 = [
    {
      title: "Beauty Clinic offer of the year !",
      sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      image: "src/assets/offers.png",
    },
    {
      title: "Beauty Clinic offer of the year !",
      sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      image: "src/assets/offers.png",
    },
    {
      title: "Beauty Clinic offer of the year !",
      sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      image: "src/assets/offers.png",
    },
  ];
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
  return (
    <div className="flex flex-col items-center ">
      <NavBar />
      <div className="flex flex-col justify-center relative w-full mt-10 sm:mt-0 ">
        <img
          className="w-full h-auto object-cover"
          src="src/assets/home.png"
          alt="1"
        />

        {/* Small Container Over Image */}
        <div className="sm:absolute  sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 w-screen sm:w-9/12 bg-grayc text-black px-4 sm:px-8 pt-5 sm:pt-7 pb-6 rounded-lg shadow-lg">
          {/* First Row */}
          <div className="flex flex-row items-start sm:items-center justify-between w-full gap-4">
            <h1 className="text-2xl sm:text-3xl font-cairo font-bold">
              How Can We Help?
            </h1>
            <button className="bg-curawell text-white text-sm sm:text-base rounded-3xl px-4 py-2 hover:bg-gray-400 transition">
              Schedule Appointment
            </button>
          </div>

          {/* Search */}
          <div className="w-3/4 flex items-center pt-5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search specialties, locations and services"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-curawell/50 focus:border-curawell text-sm sm:text-base"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 text-curawell" />
            </div>
          </div>

          {/* Cards Section */}
          <div className="flex flex-col lg:flex-row flex-wrap  gap-10 pt-5">
            {/* Card Group 1 */}
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <Card
                icon={<FlaskConical size={38} className="text-blimo mt-2" />}
                title="Laboratory"
              />
              <Card
                icon={<SquareActivity size={38} className="text-blimo mt-2" />}
                title="Radiology"
              />
            </div>

            {/* Other Cards */}
            <CardLarge
              icon={<House size={52} className="text-blimo mt-2" />}
              title="Home care"
              description="trusted care, right at home"
            />
            <CardLarge
              icon={<Siren size={52} className="text-blimo mt-2" />}
              title="Emergency"
              description="emergency care, anytime"
            />
            <CardLarge
              icon={<Hospital size={52} className="text-blimo mt-2" />}
              title="Clinics"
              description="Specialties & Scheduling"
            />
          </div>
        </div>
        {/* Small Container Over Image */}
      </div>
      <div className="flex flex-col w-full pl-24 md:mt-96  ">
        <h1 className="text-5xl font-bold font-cairo">
          Our Specialized Clinics
        </h1>
        <div className="flex items-center w-full justify-end gap-4 pr-10 ">
          <button onClick={prevSlide} className="">
            <ArrowLeft className="text-curawell" size={34} />
          </button>
          <div className=" flex gap-2">
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
            <ArrowRight className="text-curawell" size={34} />
          </button>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {data.map((d) => {
            return (
              <div className="p-14 cursor-pointer ">
                <div className="flex flex-col shadow-2xl rounded-2xl  ">
                  <img
                    src={d.image}
                    alt=""
                    className=" w-fit h-fit rounded-t-2xl"
                  />
                  <div className="flex flex-col px-6 pt-4 pb-6">
                    <h1 className="text-2xl font-cairo font-bold ">
                      {d.title}
                    </h1>
                    <p className="text-sm font-cairo ">{d.sub}</p>
                    <button className="flex items-center">
                      <p className="font-cairo text-curawell text-xl">
                        Learn More
                      </p>
                      <MoveRight className="text-curawell ml-4" size={25} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="flex flex-col w-full">
        <Slider {...settings1}>
          {data1.map((d) => {
            return (
              <div className=" flex w-full flex-col">
                <img src={d.image} alt="" className="object-cover relative " />
                <div className="bg-[#e7e6e4]/90 flex flex-col absolute h-3/4 left-10 top-20 p-10 rounded-2xl w-96">
                  <h1 className="font-cairo font-bold text-3xl mt-10">
                    {d.title}
                  </h1>
                  <p className=" font-cairo text-[17px] text-[#52575e] mt-10 ">
                    {d.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="flex flex-col w-full pl-24 md:mt-20 ">
        <h1 className="text-4xl font-bold font-cairo">
          Articals that matches your interests
        </h1>

        <Slider ref={sliderRef1} {...settings2}>
          {data.map((d) => {
            return (
              <div className="flex pl-28 pr-56 py-5 ">
                <div className="flex justify-between   ">
                  <div className="flex flex-col w-1/4  ">
                    <h1 className="font-cairo text-xl underline">
                      How does water and good sleep help your mental health
                    </h1>
                    <h2 className="text-curawell text-xl font-cairo underline">
                      Family blog
                    </h2>
                    <p className="text-[#51565e] font-cairo my-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.{" "}
                    </p>
                    <button className="bg-curawell rounded-xl mt-5 text-white w-1/2 p-2 font-cairo">
                      Read more
                    </button>
                  </div>
                  <div className="flex w-1/4">
                    <img
                      src={d.image}
                      alt=""
                      className="object-cover rounded-2xl "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
        <div className="flex items-center w-full justify-center gap-4  pr-50">
          <button onClick={prevSlide1} className="">
            <ArrowLeft className="text-curawell" size={44} />
          </button>
          <div className=" flex gap-2">
            {data.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-curawell border-2 transition-all ${
                  index === currentIndex1 ? "bg-curawell" : "bg-white"
                }`}
              />
            ))}
          </div>
          <button onClick={nextSlide1}>
            <ArrowRight className="text-curawell" size={44} />
          </button>
        </div>
      </div>

      <div className="relative w-full bg-curawell h-80 flex justify-center items-center mt-10 mb-32 ">
        {/* العنوان */}
        <h1 className="text-white font-bold font-cairo text-4xl mb-10 z-10">
          Patients feedbacks
        </h1>

        {/* السلايدر نصفه داخل الهيدر ونصفه خارج */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-3/4 px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1} // الافتراضي للموبايل
            breakpoints={{
              640: { slidesPerView: 1 }, // شاشة صغيرة
              768: { slidesPerView: 2 }, // شاشة متوسطة
              1024: { slidesPerView: 3 }, // شاشة كبيرة
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="rounded-xl"
          >
            {feedbacks.map((f, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-white shadow-xl p-10 rounded-xl text-center ">
                  {/* النجوم */}
                  <div className="text-yellow-400 text-xl mb-2">
                    {"★".repeat(f.rating)}
                    {"☆".repeat(5 - f.rating)}
                  </div>
                  {/* التعليق */}
                  <p className="text-gray-600 mb-4 italic">{f.comment}</p>
                  {/* المستخدم */}
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={f.image}
                      className="w-12 h-12 rounded-full object-cover"
                      alt={f.name}
                    />
                    <span className="font-semibold text-gray-800">
                      {f.name}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <footer className="bg-curawell text-white w-full py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 جميع الحقوق محفوظة.</p>
          <p>تم تصميم الموقع بواسطة محمد</p>
        </div>
      </footer>
    </div>
  );
}

export function Card({ icon, title }) {
  return (
    <button className="flex items-center gap-2 bg-white rounded-2xl cursor-pointer pl-4 pr-20 py-3 w-full sm:w-auto transition-all">
      {icon}
      <div className="flex flex-col gap-1">
        <h1 className="font-cairo font-bold text-lg sm:text-xl">{title}</h1>
        <div className="flex items-center">
          <p className="font-cairo font-bold text-curawell text-sm sm:text-base">
            Explore
          </p>
          <MoveRight className="text-curawell ml-2" />
        </div>
      </div>
    </button>
  );
}

export function CardLarge({ icon, title, description }) {
  return (
    <button className="flex flex-col items-start gap-2 bg-white rounded-2xl cursor-pointer pl-4 pr-10 py-4 w-full sm:w-auto transition-all">
      {icon}
      <div className="flex flex-col gap-1 items-start">
        <h1 className="font-cairo font-bold text-[15px] sm:text-xl">{title}</h1>
        <p className="font-cairo font-bold text-sm  sm:text-base text-[#393c49]">
          {description}
        </p>
        <div className="flex items-center">
          <p className="font-cairo font-bold text-curawell text-sm sm:text-base">
            Explore
          </p>
          <MoveRight className="text-curawell ml-2" />
        </div>
      </div>
    </button>
  );
}
