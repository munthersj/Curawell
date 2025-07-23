/* eslint-disable no-unused-vars */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useServicesSection from "../../hooks/useServicesSection";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection({ cards }) {
  const { sectionRef, cardRefs } = useServicesSection(cards);

  // const cards1 = cards;
  // console.log(cards[0]);
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-white overflow-hidden"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardRefs.current[index] = el;
          }}
          className={`mt-40 absolute top-0 left-1/2 h-130 sm:h-100 -translate-x-1/2 w-4/5 z-[${
            10 + index * 10
          }] bg-grayc flex flex-col sm:flex-row items-center sm:justify-between  rounded-2xl  shadow-xl py-0 sm:py-5 px-0 sm:px-5`}
        >
          <div className="sm:w-1/2 flex flex-col justify-center w-full sm:pl-7   ">
            <h2 className="text-black font-bold text-2xl py-5 sm:py-0 sm:text-4xl flex justify-center sm:justify-start  sm:pb-6 ">
              {card.name_en}
            </h2>
            <p className="text-gray-600 text-xs  sm:text-lg  sm:pr-10 font-cairo leading-5 px-4  sm:px-0 sm:leading-7 flex justify-center items-center sm:justify-start w-full sm:max-w-150">
              {card.brief_description_en}
            </p>
            <div className="flex w-full justify-center sm:justify-start my-3 sm:mt-10">
              <button className="bg-curawell text-grayc text-xs sm:text-lg px-2 py-1 sm:px-6 sm:py-2 rounded-full hover:cursor-pointer shadow-lg shadow-gray-500/50 hover:shadow-xl hover:shadow-gray-500/60  hover:-translate-y-1  transition-all duration-300">
                Arrange a Consultation
              </button>
            </div>
          </div>
          <div className=" w-full sm:w-1/3 h-full overflow-hidden relative rounded-b-2xl sm:rounded-2xl translate-y-px">
            <img
              src="src/assets/Selection (4).png"
              alt=""
              className="block inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
