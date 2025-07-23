import Slider from "react-slick";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function ArticalsSlider({
  sliderRef1,
  settings2,
  articels,
  prevSlide1,
  currentIndex1,
  nextSlide1,
}) {
  return (
    <div className="flex flex-col w-full pl-24 md:mt-20 ">
      <h1 className="text-4xl font-bold font-cairo">
        Articals that matches your interests
      </h1>

      <Slider ref={sliderRef1} {...settings2}>
        {articels.map((d) => {
          return (
            <div className="flex  py-5  ">
              <div className="flex justify-center gap-20   ">
                <div className="flex relative flex-col w-1/4  ">
                  <h1 className="font-cairo text-xl underline">{d.title_en}</h1>
                  <a
                    href={d.path_link}
                    className="text-curawell text-xl font-cairo underline"
                  >
                    Family blog
                  </a>
                  <p className="text-[#51565e] font-cairo my-1">
                    {d.brief_description_en}
                  </p>
                  <button className="bg-curawell absolute bottom-5 rounded-xl mt-5 text-white w-1/2 p-2 font-cairo">
                    Read more
                  </button>
                </div>
                <div className="flex w-1/4 h-96">
                  <img
                    src="src/assets/articels(11).png"
                    alt=""
                    className="object-cover rounded-2xl "
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <div className="flex items-center w-full justify-center gap-2">
        <button onClick={prevSlide1} className="">
          <ArrowLeft className="text-curawell" size={44} />
        </button>
        <div className=" flex gap-2">
          {articels.map((_, index) => (
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
  );
}
