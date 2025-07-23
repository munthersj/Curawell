import { Swiper, SwiperSlide } from "swiper/react";

export default function PatientsFeedPacks({ Pagination, Autoplay, comments }) {
  return (
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
          {comments.map((f, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white relative shadow-xl p-5 h-56 rounded-xl text-center ">
                {/* التعليق */}
                <p className="text-gray-600 mb-4 italic font-cairo">
                  {f.comment_en}
                </p>
                {/* المستخدم */}
                <div className="flex absolute bottom-5 items-center justify-center gap-4">
                  <img
                    src="https://i.pravatar.cc/100?img=18"
                    className="w-12 h-12 rounded-full object-cover"
                    alt=""
                  />
                  <span className="font-semibold font-cairo text-start text-gray-800">
                    {f.patient.name_patient}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
