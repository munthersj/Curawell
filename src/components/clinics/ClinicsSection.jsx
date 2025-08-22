/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClinicsSections({ clinics }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const getSlice = () => {
    const slice = clinics.slice(index, index + 5);
    if (slice.length < 5) {
      return [...slice, ...clinics.slice(0, 5 - slice.length)];
    }
    return slice;
  };

  const visibleCards = getSlice();

  const handleNext = () => {
    setIndex((prev) => (prev + 5) % clinics.length);
  };
  return (
    <div className="bg-[#8f2a64] h-[500px] mt-10 rounded-2xl relative flex  items-center justify-center p-8 mb-52">
      <h1 className="text-white text-2xl font-cairo font-bold absolute left-60 top-30">
        Highlight <br /> the benefits of working <br /> with your company
      </h1>
      <div className="grid grid-cols-3 grid-rows-2 gap-6 max-w-6xl items-center  ">
        {/* Card 1 - Top Left */}
        <motion.div
          onClick={() => {
            navigate(`/cosmeticClinic/${visibleCards[0].id}`);
          }}
          key={visibleCards[0].id}
          className="bg-white p-6 rounded-lg shadow-lg  absolute top-10 left-150 hover:top-5 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">{visibleCards[0].name_en}</h2>
          <p className="text-[14px] font-cairo w-56">
            {visibleCards[0].details_services_en.brief_description}
          </p>
          <div className="flex w-full justify-end cursor-pointer">
            <button className="text-curawell font-cairo  cursor-pointer  text-[13px] ">
              Learn More{" "}
            </button>
            <ChevronRight className="text-curawell" size={20} />
          </div>

          <img
            src="src/assets/clinics.png"
            alt=""
            className="object-cover  h-44 rounded-2xl w-full"
          />
        </motion.div>

        {/* Card 2 - Top Middle */}
        <motion.div
          onClick={() => {
            navigate("/cosmeticClinic", {
              state: {
                sectionId: visibleCards[1].id,
                details: visibleCards[1].details_services_en,
              },
            });
          }}
          key={visibleCards[1].id}
          className="bg-white p-6 rounded-lg shadow-lg absolute top-10 right-80 hover:top-5 transition-all duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">{visibleCards[1].name_en}</h2>
          <p className="text-[14px] font-cairo w-56">
            {visibleCards[1].details_services_en.brief_description}
          </p>
          <div className="flex w-full justify-end cursor-pointer">
            <button className="text-curawell font-cairo  cursor-pointer  text-[13px] ">
              Learn More{" "}
            </button>
            <ChevronRight className="text-curawell" size={20} />
          </div>

          <img
            src="src/assets/clinics.png"
            alt=""
            className="object-cover  h-44 rounded-2xl w-full"
          />
        </motion.div>

        {/* Card 4 - Top Right */}
        <motion.div
          onClick={() => {
            navigate("/cosmeticClinic", {
              state: {
                sectionId: visibleCards[3].id,
                details: visibleCards[3].details_services_en,
              },
            });
          }}
          key={visibleCards[3].id}
          className="bg-white p-6 rounded-lg shadow-lg absolute top-105 right-80 hover:top-100 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">{visibleCards[3].name_en}</h2>
          <p className="text-[14px] font-cairo w-56">
            {visibleCards[3].details_services_en.brief_description}
          </p>
          <div className="flex w-full justify-end cursor-pointer">
            <button className="text-curawell font-cairo  cursor-pointer  text-[13px] ">
              Learn More{" "}
            </button>
            <ChevronRight className="text-curawell" size={20} />
          </div>

          <img
            src="src/assets/clinics.png"
            alt=""
            className="object-cover  h-44 rounded-2xl w-full"
          />
        </motion.div>

        {/* Spacer for row 2, column 1 */}
        <div></div>

        {/* Card 3 - Bottom Middle */}
        <motion.div
          onClick={() => {
            navigate("/cosmeticClinic", {
              state: {
                sectionId: visibleCards[2].id,
                details: visibleCards[2].details_services_en,
              },
            });
          }}
          key={visibleCards[2].id}
          className="bg-white p-6 rounded-lg shadow-lg absolute top-110 left-150 hover:top-105 transition-all duration-300 "
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">{visibleCards[2].name_en}</h2>
          <p className="text-[14px] font-cairo w-56">
            {visibleCards[2].details_services_en.brief_description}
          </p>
          <div className="flex w-full justify-end cursor-pointer">
            <button className="text-curawell font-cairo  cursor-pointer  text-[13px] ">
              Learn More{" "}
            </button>
            <ChevronRight className="text-curawell" size={20} />
          </div>

          <img
            src="src/assets/clinics.png"
            alt=""
            className="object-cover h-44 rounded-2xl w-full"
          />
        </motion.div>

        {/* Card 5 - Bottom Right */}
        <motion.div
          onClick={() => {
            navigate("/cosmeticClinic", {
              state: {
                sectionId: visibleCards[4].id,
                details: visibleCards[4].details_services_en,
              },
            });
          }}
          key={visibleCards[4].id}
          className="bg-white p-6 rounded-lg shadow-lg absolute top-80 left-75 hover:top-75 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold">{visibleCards[4].name_en}</h2>
          <p className="text-[14px] font-cairo w-56">
            {visibleCards[4].details_services_en.brief_description}
          </p>
          <div className="flex w-full justify-end cursor-pointer">
            <button className="text-curawell font-cairo  cursor-pointer  text-[13px] ">
              Learn More{" "}
            </button>
            <ChevronRight className="text-curawell" size={20} />
          </div>

          <img
            src="src/assets/clinics.png"
            alt=""
            className="object-cover h-44 rounded-2xl w-full "
          />
        </motion.div>
      </div>

      <button
        onClick={handleNext}
        className="mt-8 bg-white text-[#8f2a64] font-bold px-6 py-2 rounded shadow absolute right-10"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
