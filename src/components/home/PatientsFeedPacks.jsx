import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function PatientsFeedPacks({ comments = [] }) {
  return (
    <section
      className="relative py-10"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    >
      <div className="mx-auto w-11/12 md:w-10/12 lg:w-4/5 rounded-xl overflow-hidden bg-white">
        <div className="bg-[#972e6a] py-8 md:py-20 text-center">
          <h2 className="text-white font-cairo font-bold text-2xl md:text-3xl">
            Customer feedbacks
          </h2>
        </div>

        <div className="-mt-8 md:-mt-10 px-4 sm:px-6 md:px-8 pb-12">
          <Swiper
            className="feedback-swiper"
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides
            grabCursor
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }, // إذا ظلّوا 3 عناصر فقط → بتشوف نقطة وحدة
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3200, disableOnInteraction: false }}
            loop
            watchOverflow={false} // 👈 لا تخفي النقاط حتى لو مافي أكثر من صفحة
          >
            {comments.map((f, idx) => (
              <SwiperSlide key={idx}>
                <article className="relative h-56 rounded-2xl bg-white p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)] ring-1 ring-black/5 flex flex-col">
                  <svg
                    className="absolute top-3 right-3 h-12 w-12 text-[#972e6a]/10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7.17 6.17C5.19 7.4 4 9.27 4 11.5 4 14.54 6.46 17 9.5 17c.83 0 1.5-.67 1.5-1.5S10.33 14 9.5 14C7.57 14 6 12.43 6 10.5c0-1.45.85-2.7 2.08-3.29.34-.16.42-.61.18-.9-.28-.35-.76-.48-1.09-.14zM16.17 6.17C14.19 7.4 13 9.27 13 11.5c0 3.04 2.46 5.5 5.5 5.5.83 0 1.5-.67 1.5-1.5S19.33 14 18.5 14C16.57 14 15 12.43 15 10.5c0-1.45.85-2.7 2.08-3.29.34-.16.42-.61.18-.9-.28-.35-.76-.48-1.09-.14z" />
                  </svg>

                  <p className="text-slate-700 font-cairo leading-relaxed flex-1">
                    {f?.comment}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={
                        f?.patient?.avatar_url ||
                        `https://i.pravatar.cc/100?img=${(idx % 70) + 1}`
                      }
                      alt=""
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#81d8cf] shadow-sm"
                      loading="lazy"
                    />
                    <span className="font-cairo font-semibold text-slate-800">
                      {f?.patient?.name_patient || "Fullname"}
                    </span>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <style>{`
            .feedback-swiper .swiper-pagination {
              position: static !important;
              margin-top: 14px;
              display: flex !important;
              justify-content: center;
              gap: 8px;
            }
            .feedback-swiper .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              background: rgba(151, 46, 106, 0.35);
              opacity: 1;
              transition: transform .2s ease, background-color .2s ease;
            }
            .feedback-swiper .swiper-pagination-bullet-active {
              background: #972e6a;
              transform: scale(1.25);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
