/* eslint-disable no-unused-vars */
// LogoLoader.jsx

import { motion } from "framer-motion";
// عدّل المسار حسب مشروعك:
// import logo from "src/assets/lo1go.png"; // أو "./lo1go.png"

export default function LogoLoader({
  fullscreen = false,
  size = 120, // حجم الشعار بالبكسل
  speed = 1.6, // سرعة الدورة (ثواني للدورة)
}) {
  const Spinner = (
    <div
      className="relative grid place-items-center"
      style={{ width: size + 28, height: size + 28 }}
    >
      {/* حلقة خفيفة عكسية */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-[#972e6a]/20"
        style={{ boxShadow: "0 12px 30px -12px rgba(151,46,106,0.35)" }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: speed * 1.6, ease: "linear" }}
      />
      {/* توهج لطيف */}
      <span className="absolute -inset-6 rounded-full blur-2xl bg-[#972e6a]/15" />
      {/* الشعار */}
      <motion.img
        src={"/images/lo1go.png"}
        alt="Loading..."
        width={size}
        height={size}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: speed, ease: "easeInOut" }}
        className="select-none drop-shadow-[0_18px_40px_rgba(151,46,106,0.28)]"
        draggable={false}
      />
    </div>
  );

  if (!fullscreen) return Spinner;

  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-white/65 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {Spinner}
      </motion.div>
    </div>
  );
}
