/* eslint-disable no-unused-vars */

import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function KeyServicesSectionAnimated({
  keyServices = [],
  activeServiceId,
  setActiveServiceId,
  title = "Our key services",
  subtitle = "Dolore excepteur non non non ipsum ipsum voluptate minim culpa. Labore voluptate excepteur.",
}) {
  const cx = (...args) => args.filter(Boolean).join(" ");

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, delayChildren: 0.12 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 18 },
    },
    hover: { y: -3, scale: 1.01 },
    tap: { scale: 0.99 },
  };

  return (
    <div className="relative flex flex-col mt-10 justify-center h-96 bg-gray-100 overflow-hidden rounded-xl">
      {/* soft vignette / accent blur */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-20 bg-[#972e6a]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-10 bg-[#972e6a]" />

      <section className="relative flex ml-8 md:ml-32">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center w-full md:w-2/5 pr-6"
        >
          <h2 className="text-3xl md:text-4xl font-[600] font-cairo mb-2 tracking-tight text-gray-900">
            <span className="bg-gradient-to-r from-[#972e6a] to-[#972e6a]/60 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-[#972e6a]/80 mb-6 max-w-prose leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7 w-full md:w-3/5 md:mx-52"
        >
          {keyServices?.map((service, idx) => {
            const competenceId = service?.competences?.competence_id;
            const isActive = activeServiceId === competenceId;
            const name = service?.competences?.competence_name_en ?? "Service";

            return (
              <motion.button
                key={service?.id ?? competenceId ?? idx}
                type="button"
                variants={card}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setActiveServiceId?.(competenceId)}
                className={cx(
                  "group relative p-5 rounded-lg text-left bg-white/90 backdrop-blur border border-gray-200 shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2",
                  "focus-visible:ring-[#972e6a]",
                  isActive &&
                    "ring-2 ring-[#972e6a] shadow-[0_12px_30px_-10px_#972e6a]"
                )}
                aria-pressed={isActive}
              >
                {/* Accent top border */}
                {/* <span
                  className={cx(
                    "absolute inset-x-0 -top-px h-0.5 rounded-t-2xl transition-opacity",
                    isActive
                      ? "opacity-100 bg-[#972e6a]"
                      : "opacity-0 group-hover:opacity-100 bg-[#972e6a]/70"
                  )}
                /> */}

                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl select-none">🩺</span>
                  <div className="flex flex-col items-start">
                    <h3 className="font-cairo text-base md:text-lg font-medium text-gray-900">
                      {name}
                    </h3>
                    <span className="text-[11px] md:text-xs font-cairo text-[#972e6a] font-bold flex items-center gap-1">
                      Learn more
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707A1 1 0 0 1 8.707 5.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* subtle sheen on hover */}
                <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-transparent via-[#972e6a]/5 to-transparent" />
              </motion.button>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}

KeyServicesSectionAnimated.propTypes = {
  keyServices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      competences: PropTypes.shape({
        competence_id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        competence_name_en: PropTypes.string,
      }),
    })
  ),
  activeServiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setActiveServiceId: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
