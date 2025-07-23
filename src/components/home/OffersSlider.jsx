import Slider from "react-slick";

export default function OffersSlider({ settings1, offers }) {
  return (
    <div className="flex flex-col w-full">
      <Slider {...settings1}>
        {offers.map((d) => {
          return (
            <div className=" flex w-full flex-col">
              <img
                src="src/assets/offers.png"
                alt=""
                className="object-cover relative "
              />
              <div className="bg-[#e7e6e4]/90 flex flex-col absolute h-3/4 left-10 top-20 p-10 rounded-2xl w-96">
                <h1 className="font-cairo font-bold text-3xl mt-10">
                  {d.name_en}
                </h1>
                <p className=" font-cairo text-[17px] text-[#52575e] mt-10 ">
                  {d.description_en}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
