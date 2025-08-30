import { Phone } from "lucide-react";
import { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../../../features/data/dashboard/appointmentsSlice";
import LogoLoader from "../../../LogoLoader";

export default function Step3DoctorCard({
  // موجودين من قبل
  selectedDoctor,
  setSelectedDoctor,
  phone,
  setPhone,
  renderProgressBar,
  selectedKeyService,
  selectedService,

  // جداد
}) {
  const [phoneError, setPhoneError] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const toYMD = useCallback((d) => {
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  const dispatch = useDispatch();

  // لا تجيب الأطباء إذا الحالة HomeCare
  useEffect(() => {
    dispatch(
      fetchDoctors({
        date: toYMD(today),
        competence_id: selectedKeyService,
        sectionId: selectedService,
      })
    );
  }, [dispatch, selectedKeyService, selectedService, toYMD, today]);

  const { doctors, status1 } = useSelector((s) => s.appointmentsData);

  // 09XXXXXXXX
  const isSyrianMobile = useCallback((s) => /^09\d{8}$/.test(s), []);

  const validate = useCallback(() => {
    const clean = String(phone || "").replace(/\s+/g, "");
    const ok = isSyrianMobile(clean);
    setPhoneError(ok ? "" : "رقم الموبايل لازم يكون 10 أرقام ويبدأ بـ 09");
    return ok;
  }, [phone, isSyrianMobile]);

  const onPhoneChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D+/g, "").slice(0, 10);
    setPhone(onlyDigits);
    if (phoneError) setPhoneError("");
  };

  const phoneOk = isSyrianMobile(String(phone || ""));

  return (
    <>
      {renderProgressBar(3)}

      {/* ======== رأس القسم حسب الوضع ======== */}
      <h2 className="text-lg font-bold text-black mb-4">Choose Doctor</h2>

      {/* ======== محتوى ديناميكي ======== */}
      {
        // ---------- الوضع العادي: قائمة الأطباء ----------
        <div
          className={`flex gap-4 overflow-x-auto pb-6 custom-scrollbar mb-8 ${
            phoneOk ? "" : "pointer-events-none opacity-60"
          }`}
          title={phoneOk ? "" : "أدخل رقم موبايل صحيح لاختيار طبيب"}
        >
          {status1 === "loading" || !doctors ? (
            <div className="flex items-center w-full h-full justify-center">
              <LogoLoader size={42} speed={1.2} />
            </div>
          ) : (
            doctors.map((doc, index) => {
              console.log(doc.doctor_id);
              const isSelected = selectedDoctor === doc.doctor_id;
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (!validate()) return;
                    setSelectedDoctor(doc.doctor_id);
                  }}
                  className={`flex flex-col items-center min-w-[150px] p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#d5d5d5aa] shadow-lg scale-[1.02]"
                      : "bg-[#d5d5d52e] hover:shadow-md"
                  }`}
                >
                  <img
                    src={doc.image}
                    alt={doc.first_name}
                    className="w-20 h-20 object-cover rounded-full mb-2"
                  />
                  <p className="font-medium text-black text-center">
                    {doc.first_name}
                  </p>
                  <p className="text-[#972f6ab8] text-sm text-center">
                    {doc.department}
                  </p>
                </div>
              );
            })
          )}
        </div>
      }

      {/* ======== رقم الموبايل (مشترك بالحالتين) ======== */}
      <h2 className="text-lg font-bold text-black mb-3">Patient Details</h2>
      <div className="space-y-1">
        <div className="flex items-center bg-gray-100 rounded-2xl px-5 py-3">
          <Phone className="text-[#922D66FF] mr-2" />
          <input
            type="tel"
            inputMode="numeric"
            placeholder="09XXXXXXXX"
            value={phone}
            onChange={onPhoneChange}
            onBlur={validate}
            className="bg-transparent focus:outline-none w-full text-gray-600"
            maxLength={10}
          />
        </div>
        {phoneError && (
          <p className="text-red-600 text-sm px-2">{phoneError}</p>
        )}
      </div>

      {/* ======== إخفاء Scrollbar ======== */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
