import { useState } from "react";
import NavBar from "./NavBar";
import ClinicMap from "./ClinicMap";
import LocationPicker from "./LocationPicker";
export default function ContactUsPage() {
  // ====== Redux hooks (uncomment if wired) ======
  // const dispatch = useDispatch();
  // const info = useSelector(selectContactInfo);
  // const fetchStatus = useSelector(selectContactStatus);
  // const submitStatus = useSelector(selectSubmitStatus);
  // const submitMessage = useSelector(selectSubmitMessage);
  // const error = useSelector(selectContactError);

  // For canvas preview: temporary mocks (delete when wiring Redux)
  const info = { phone: "0999999345", email: "curawellmedcenter@gmail.com" };
  const fetchStatus = "succeeded";
  const submitStatus = "idle";
  const submitMessage = "";
  const error = null;

  // ====== Local form state & validation ======
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    message: false,
  });

  const isSyrianMobile = (s) => /^09\d{8}$/.test(s); // 09 + 8 digits (10 total)
  const nameErr = touched.name && name.trim().length < 3;
  const phoneErr = touched.phone && !isSyrianMobile(phone);
  const msgErr = touched.message && message.trim().length < 10;
  const formInvalid =
    nameErr || phoneErr || msgErr || !name || !phone || !message;

  // React.useEffect(() => { if (fetchStatus === "idle") dispatch(fetchContactInfo()); }, [fetchStatus, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, message: true });
    if (formInvalid) return;
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    };
    // dispatch(sendContactMessage(payload));
    alert("Submitting: " + JSON.stringify(payload, null, 2)); // remove when wiring Redux
  };

  // if (submitStatus === "succeeded") {
  //   // Optionally show toast then reset
  //   setName(""); setPhone(""); setMessage(""); setTouched({ name:false, phone:false, message:false });
  //   dispatch(resetSubmitState());
  // }
  // const handlePick = ({ lat, lon, address }) => {
  //   // مثال: dispatch(updateLocation({ lat, lon, address }))
  //   console.log(lat, lon, address);
  // };
  return (
    <div className="w-full">
      {/* Hero */}
      <NavBar />
      <div className="relative h-[280px] sm:h-[340px] md:h-[420px] w-full overflow-hidden  pt-32">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop"
          alt="Contact hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-end mb-10">
          <div className="max-w-6xl mx-20  px-6 py-8 sm:py-0">
            <h1 className="text-white font-cairo font-extrabold text-3xl sm:text-4xl md:text-5xl drop-shadow">
              Contact Us
            </h1>
            <p className="text-white/80 font-cairo mt-2">
              Cillum est adipiscing aliqua magna lab
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12 relative">
        {/* Left: text & contacts */}
        <div className="relative">
          <h2 className="text-3xl font-cairo font-bold text-[#972e6a]">
            Get in Touch
          </h2>
          <p className="text-slate-600 mt-3 leading-relaxed max-w-prose">
            Elusmod aliquip ullamco labore sint laborum nisi irure excepteur.
            Duis pariatur minim cillum deserunt laborum ea occaecat sit in ipsum
            do Lorem commodo.
          </p>

          <div className="mt-8 space-y-5">
            {/* phone */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#81d8cf]/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#81d8cf]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.3 22 2 13.7 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
                </svg>
              </div>
              <div className="font-cairo">
                <p className="text-slate-500 text-sm">Phone</p>
                <p className="text-slate-900 font-semibold">
                  {fetchStatus === "loading" ? "…" : info.phone || "—"}
                </p>
              </div>
            </div>
            {/* email */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#81d8cf]/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#81d8cf]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="font-cairo">
                <p className="text-slate-500 text-sm">Email</p>
                <p className="text-slate-900 font-semibold break-all">
                  {fetchStatus === "loading" ? "…" : info.email || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Decorative dashed curve */}
          {/* <div className="hidden lg:block absolute -right-40 top-0 w-64 h-64 rounded-full border-2 border-dashed border-[#81d8cf]/40" /> */}
        </div>

        {/* Right: form card */}
        <div className="bg-white rounded-2xl shadow-md ring-1 ring-black/5 p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 font-cairo">
                Name
              </label>
              <input
                type="text"
                className={`mt-1 w-full rounded-lg border p-3 outline-none font-cairo ${
                  nameErr
                    ? "border-red-400"
                    : "border-slate-200 focus:border-[#972e6a]"
                }`}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              />
              {nameErr && (
                <p className="text-red-500 text-xs mt-1">
                  Enter at least 3 characters.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 font-cairo">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="^09\\d{8}$"
                className={`mt-1 w-full rounded-lg border p-3 outline-none font-cairo ${
                  phoneErr
                    ? "border-red-400"
                    : "border-slate-200 focus:border-[#972e6a]"
                }`}
                placeholder="09XXXXXXXX"
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(digits);
                }}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              />
              {phoneErr && (
                <p className="text-red-500 text-xs mt-1">
                  Use a valid Syrian mobile (09XXXXXXXX).
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 font-cairo">
                Message
              </label>
              <textarea
                rows={4}
                className={`mt-1 w-full rounded-lg border p-3 outline-none font-cairo resize-none ${
                  msgErr
                    ? "border-red-400"
                    : "border-slate-200 focus:border-[#972e6a]"
                }`}
                placeholder="Please describe what service you are interested in"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              />
              {msgErr && (
                <p className="text-red-500 text-xs mt-1">
                  Message should be at least 10 characters.
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="inline-flex items-center justify-center rounded-lg bg-[#972e6a] px-6 py-2.5 text-white font-cairo shadow hover:bg-[#872a60] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitStatus === "loading" ? "Submitting…" : "Submit"}
              </button>
              {submitStatus === "succeeded" && (
                <span className="ml-3 text-green-600 text-sm font-cairo">
                  {submitMessage || "Sent successfully"}
                </span>
              )}
              {submitStatus === "failed" && (
                <span className="ml-3 text-red-600 text-sm font-cairo">
                  {error || "Something went wrong"}
                </span>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Map placeholder section */}
      <div className="mt-16">
        <div className="w-full mt-8">
          <ClinicMap
            lat={40.5138}
            lon={36.2765}
            zoom={15}
            className="rounded-xl"
          />
        </div>
        {/* <div className="w-full h-[320px] sm:h-[380px] bg-[#eef1f5]"> */}
        {/* drop in your map/image here */}
        {/* <div className="w-full h-full flex items-center justify-center text-slate-400 font-cairo"> */}
        {/* Map / Location */}
        {/* </div>
        </div> */}
        {/* <div className="max-w-4xl mx-auto">
          <LocationPicker onChange={handlePick} />
        </div> */}
      </div>
    </div>
  );
}
