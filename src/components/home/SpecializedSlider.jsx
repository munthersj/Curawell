import { MoveRight, ArrowRight, ArrowLeft } from "lucide-react";
import Slider from "react-slick";

export default function SpecializedSlider({
  prevSlide,
  clinics,
  setCurrentIndex,
  currentIndex,
  nextSlide,
  sliderRef,
  settings,
}) {
  return (
    <div className="flex flex-col w-full pl-24 md:mt-80">
      <h1 className="text-5xl font-bold font-cairo">Our Specialized Clinics</h1>
      <div className="flex items-center w-full justify-end gap-4 pr-10 ">
        <button onClick={prevSlide} className="">
          <ArrowLeft className="text-curawell" size={34} />
        </button>
        <div className=" flex gap-2">
          {clinics.map((_, index) => (
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
        {clinics.map((d) => {
          return (
            <div className="p-14 cursor-pointer ">
              <div className="flex flex-col shadow-2xl h-96 rounded-2xl relative  ">
                <img
                  src="src/assets/special.png"
                  alt=""
                  className=" w-fit h-fit rounded-t-2xl"
                />
                <div className="flex flex-col px-6 pt-4 pb-6">
                  <h1 className="text-2xl font-cairo font-bold ">
                    {d.name_en}
                  </h1>
                  <p className="text-sm font-cairo ">
                    {d.details_services_en.brief_description}
                  </p>
                  <button className="flex items-center absolute bottom-2 mt-10">
                    <p className="font-cairo text-curawell text-xl ">
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
  );
}
