/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

/**
 * 404 Not Found Page
 * - React + Tailwind + Framer Motion
 * - Primary theme color: #972f6a
 *
 * Drop this component into your routes as the catch-all path ("*").
 */
export default function NotFoundPage() {
  const navigate = useNavigate();

  const digits = ["4", "0", "4"]; // animated one by one

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Soft radial background with brand color tint */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(151,47,106,0.12)_0%,rgba(151,47,106,0.06)_40%,transparent_70%)]" />

      {/* Floating blobs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none  absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #972f6a33, transparent)",
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(closest-side, #972f6a22, transparent)",
        }}
      />

      <main className="mx-auto grid max-w-4xl place-items-center px-6 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-2xl border border-white/10 bg-white p-8 shadow-2xl backdrop-blur-md "
        >
          {/* Icon + eyebrow */}
          <div className="mb-6 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#972f6a]/10">
              <AlertTriangle className="h-5 w-5 text-[#972f6a]" />
            </span>
            <span className="text-sm font-medium tracking-wide text-[#972f6a]">
              Oops! Page not found
            </span>
          </div>

          {/* Animated 404 */}
          <div className="mb-2 flex select-none items-baseline justify-start gap-2 sm:gap-4">
            {digits.map((d, i) => (
              <motion.span
                key={i}
                initial={{ y: 30, opacity: 0, rotate: -6 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: 0.1 * i,
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}
                className="text-7xl font-black leading-none sm:text-8xl"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #972f6a, #972f6aAA)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {d}
              </motion.span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mb-2 text-2xl font-cairo font-semibold text-neutral-900 "
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mb-8 max-w-prose font-cairo text-neutral-600 "
          >
            Might be a wrong route
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Link
              to="/"
              className="inline-flex items-center font-cairo justify-center rounded-xl bg-[#972f6a] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#972f6a]/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-[#972f6a]/30"
            >
              Go to Main
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center font-cairo justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50 focus:outline-none focus:ring-4 focus:ring-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
            >
              Go Back
            </button>
          </motion.div>

          {/* subtle bouncing dots */}
          <motion.div
            aria-hidden
            className="mt-8 flex items-center gap-1"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-2 w-2 rounded-full bg-[#972f6a]"
                variants={{
                  hidden: { y: 0, opacity: 0.4 },
                  show: { y: [0, -6, 0], opacity: 1 },
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.08,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
