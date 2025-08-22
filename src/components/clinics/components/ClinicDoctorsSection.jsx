/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Phone } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import LogoLoader from "../../LogoLoader";
import { motion, AnimatePresence } from "framer-motion";
import "@smastrom/react-rating/style.css";

/**
 * ClinicDoctorsSectionAnimated
 * - نفس الـ API تبعك تمامًا (نفس props)
 * - أضفنا أنيميشن + تحسينات ريسبونسيف
 * - ما لمسنا أي متغيرات/مصفوفات/ربط — بس UI/animations
 */
export default function ClinicDoctorsSection({
  status = "idle",
  doctorsFallback = [],
  selectedDoctorId,
  setSelectedDoctorId,
  selectedDoctor,
  classNames,
}) {
  const cx = (...args) =>
    typeof classNames === "function"
      ? classNames(...args)
      : args.filter(Boolean).join(" ");

  const avatarSrc = `data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
      <rect width='64' height='64' rx='12' fill='%23E5E7EB'/>
      <circle cx='32' cy='24' r='12' fill='%23C7CDD2'/>
      <path d='M12 56c0-11 9-20 20-20s20 9 20 20' fill='%23C7CDD2'/>
    </svg>`;

  const list = doctorsFallback;

  // framer variants
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 18 },
    },
  };

  return (
    <section className="flex flex-col justify-center mt-5 w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-[600] mx-6 sm:mx-12 md:mx-20 font-cairo mb-6 md:mb-10 tracking-tight">
        This clinic doctors
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full px-6 sm:px-12 md:px-20 min-h-[520px]">
        {/* Left List */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4 max-h-[500px] overflow-y-auto pr-1"
        >
          {status === "loading" ? (
            <div className=" flex justify-center items-center h-full">
              <LogoLoader size={92} speed={1.2} />
            </div>
          ) : list.length === 0 ? (
            <p className="text-gray-400">No doctors to show.</p>
          ) : (
            <AnimatePresence initial={false}>
              {list.map((doctor) => {
                const isActive = selectedDoctorId === doctor.doctor_id;
                return (
                  <motion.div
                    key={doctor.doctor_id}
                    variants={item}
                    whileHover={{ y: -2, scale: 1.0001 }}
                    whileTap={{ scale: 0.995 }}
                    onClick={() => setSelectedDoctorId?.(doctor.doctor_id)}
                    className={cx(
                      "p-4 mx-1 mt-1 flex items-center bg-white/90 backdrop-blur border shadow-curawell/50 border-gray-200 shadow-sm hover:shadow-md rounded-2xl cursor-pointer transition-all",
                      isActive && " ring-1 ring-curawell shadow-lg "
                    )}
                  >
                    <img
                      src={avatarSrc}
                      alt="avatar"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{`${doctor.first_name} ${doctor.last_name}`}</h4>
                      {doctor.competence_name && (
                        <p className="text-sm text-gray-500 truncate">
                          {doctor.competence_name}
                        </p>
                      )}
                      <div className="mt-1 text-yellow-500">
                        <Rating
                          value={Number(doctor.evaluation) || 0}
                          readOnly
                          style={{ maxWidth: 90 }}
                        />
                      </div>
                    </div>
                    <span className="hidden sm:inline text-[10px] text-[#972e6a] font-bold mt-10">
                      View profile
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Right Doctor Info */}
        <AnimatePresence mode="wait">
          {selectedDoctor ? (
            <motion.div
              key={selectedDoctor.doctor_id ?? "details"}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
            >
              <div className="flex flex-col">
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
                />

                <h3 className="text-xl sm:text-2xl md:text-[24px] mt-4 sm:mt-5 font-bold font-cairo">
                  {`${selectedDoctor.first_name} ${selectedDoctor.last_name}`}
                </h3>

                {selectedDoctor.respective_en && (
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {selectedDoctor.respective_en}
                  </p>
                )}

                {selectedDoctor.competence_name && (
                  <p className="mt-6 text-sm text-gray-600">
                    {selectedDoctor.competence_name}
                  </p>
                )}

                {selectedDoctor.address && (
                  <p className="text-sm text-gray-600">
                    {selectedDoctor.address}
                  </p>
                )}

                <p className="mt-4 inline-block font-medium">
                  Schedule an appointment
                </p>
                {selectedDoctor.phone && (
                  <p className="text-[#972e6a] mt-2 flex gap-2 items-center">
                    <Phone size={16} /> {selectedDoctor.phone}
                  </p>
                )}

                {Array.isArray(selectedDoctor.services_en) &&
                  selectedDoctor.services_en.length > 0 && (
                    <p className="mt-6 text-sm text-gray-600 whitespace-pre-line">
                      {selectedDoctor.services_en.join("\n")}
                    </p>
                  )}
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-center mt-10"
            >
              Select a doctor to see details
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

ClinicDoctorsSection.propTypes = {
  status: PropTypes.string,
  doctors: PropTypes.arrayOf(PropTypes.object),
  doctorsFallback: PropTypes.arrayOf(PropTypes.object),
  selectedDoctorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setSelectedDoctorId: PropTypes.func,
  selectedDoctor: PropTypes.object,
  classNames: PropTypes.func,
};
