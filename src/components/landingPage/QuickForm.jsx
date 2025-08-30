/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuickForm() {
  const navigate = useNavigate();
  const handleCLick = () => {
    navigate("/login");
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Build a clean object with the current field values
    const formData = {
      fullName: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      message: form.message,
      submittedAt: new Date().toISOString(), // (optional metadata)
    };

    // For now just log it — replace with POST request / email service etc.
    console.log("📨 Form data ready to send:", formData);

    // (Optional) clear the form after submit
    // setForm({ name: "", email: "", phone: "", service: "", message: "" });
  };

  return (
    <div className="absolute sm:hover:-top-65 top-80 sm:-top-60 right-0 sm:right-70 w-full sm:w-[42rem] bg-white shadow-xl hover:shadow-2xl shadow-gray-600/60 rounded-xl  sm:px-10 sm:py-10 transition-all duration-300">
      <form
        onSubmit={handleCLick}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8  sm:gap-y-12"
      >
        {/* Name */}

        <label className="flex flex-col justify-center items-center sm:items-start text-sm font-semibold text-gray-800 space-y-2 px-3 py-3 sm:px-3 sm:py-3">
          <span className="font-bold">Name</span>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
          />
        </label>

        {/* Email */}
        <label className="flex flex-col justify-center items-center sm:items-start text-sm font-semibold text-gray-800 space-y-2 px-3 py-1 sm:px-0 sm:py-0">
          <span className="font-bold">Email Address</span>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
          />
        </label>

        {/* Phone */}
        <label className="flex flex-col justify-center items-center sm:items-start text-sm font-semibold text-gray-800 space-y-2 px-3 py-1 sm:px-0 sm:py-0">
          <span className="font-bold">Phone Number</span>
          <input
            type="tel"
            name="phone"
            placeholder="(123) - 840 3987"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
          />
        </label>

        {/* Service */}
        <label className="flex flex-col justify-center items-center sm:items-start text-sm font-semibold text-gray-800 space-y-2 px-3 py-1 sm:px-0 sm:py-0">
          <span className="font-bold">Service</span>
          <input
            type="text"
            name="service"
            placeholder="Ex. Dental Implants"
            value={form.service}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-gray-300"
          />
        </label>

        {/* Message – full width */}
        <label className="flex flex-col justify-center items-center sm:items-start md:col-span-2 text-sm font-semibold text-gray-800 space-y-2 px-3 py-1 sm:px-0 sm:py-0">
          <span className="font-bold">Message</span>
          <textarea
            name="message"
            placeholder="Please describe what service you are interested in"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-3 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-0 focus:border-gray-300"
          />
        </label>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-start pl-5 ">
          <button
            type="submit"
            className="mt-2 inline-block rounded-md bg-curawell px-10 py-4 text-white focus:outline-none focus:ring-0 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
