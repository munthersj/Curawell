/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { motion } from "framer-motion";

/**
 * CosmeticHeroSection
 * - كتلة تقديمية بسيطة مع عنوان ونص وصورة
 * - أنيميشن دخول لطيف + ريسبونسيف
 * - اللون الأساسي المقترح: #972e6a (مستخدم كظل/توهّج ناعم)
 */
export default function CosmeticHeroSection({
  title = "Curawell Cosmetic Care",
  details, // نص طويل: details.details
  imageSrc = "src/assets/cosmi.png",
}) {
  // Variants
  const container = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <section className="relative flex w-full justify-center mt-24 sm:mt-40 md:mt-56 lg:mt-72 px-6">
      {/* decorative blur accents */}
      <div className="pointer-events-none absolute -top-24 left-10 h-56 w-56 rounded-full blur-3xl opacity-20 bg-[#972e6a]" />
      <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full blur-3xl opacity-10 bg-[#972e6a]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 w-full max-w-6xl"
      >
        {/* Copy */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-6 w-full lg:w-1/2 font-cairo"
        >
          <h1 className="font-[600] text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-[#972e6a] to-[#972e6a]/60 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-prose">
            {details?.details ?? details}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={fadeUp}
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
        >
          <img
            src={imageSrc}
            alt="Cosmetic"
            className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[460px] h-auto drop-shadow-[0_30px_60px_rgba(151,46,106,0.25)] rounded-2xl"
            loading="lazy"
          />
          {/* subtle ring */}
          <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[#972e6a]/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

CosmeticHeroSection.propTypes = {
  title: PropTypes.string,
  details: PropTypes.shape({ details: PropTypes.string }),
  imageSrc: PropTypes.string,
};

// Usage Example:
// <CosmeticHeroSection title="Curawell Cosmetic Care" details={details} imageSrc="src/assets/cosmi.png" />
