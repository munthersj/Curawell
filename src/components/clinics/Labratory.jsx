/* eslint-disable no-unused-vars */
import { getDefaultClassNames } from "react-day-picker";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import HomeCareBooking from "./components/HomeCareBooking";
import HomeCareKeyServices from "./components/HomeCareKeyServices";
import CurwellFooter from "../CurwellFooter";
import ToastCopm from "./components/ToastComp";
import LogoLoader from "../LogoLoader";
import CosmeticHeroSection from "./components/CosmeticHeroSection";
import PatientsFeedPacks from "../home/PatientsFeedPacks";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { Pagination, Autoplay } from "swiper/modules";

import { useHomeCareCos } from "../../hooks/useHomeCareCos";
export default function Labratory() {
  const location1 = useLocation();
  const { service_id, details } = location1.state || {};
  const logic = useHomeCareCos(service_id);
  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    if (logic.status2 === "succeeded" && logic.message2) {
      toast.custom((t) => (
        <ToastCopm message1={logic.message2} onClick={() => toast.dismiss(t)} />
      ));
      logic.resetForm();
      logic.resetAction();
    }
  }, [logic.status2, logic.message2, logic]);

  const { error } = useSelector((s) => s.cosmeticData);
  useEffect(() => {
    if (logic.status2 === "failed" && error) {
      toast.custom((t) => (
        <ToastCopm message1={logic.message2} onClick={() => toast.dismiss(t)} />
      ));
    }
  }, [logic.status2, error, logic.message1]);
  console.log(logic.comments);
  return logic.status == "loading" ? (
    <LogoLoader fullscreen size={140} speed={1.8} />
  ) : (
    <div className="flex flex-col ">
      <CosmeticHeroSection
        title="Curawell Cosmetic Care"
        details={details} // يمرّحلها نفس كائن details اللي عندك { details: "..." }
        imageSrc="src/assets/cosmi.png" // أو استورد الصورة كـ import
      />
      <HomeCareKeyServices
        keyServices={logic.homeCareKeyServices}
        activeServiceId={logic.activeServiceId}
        setActiveServiceId={logic.setActiveServiceId}
        classNames={classNames}
        title="Our key services"
        subtitle="Dolore excepteur non non non ipsum ipsum voluptate minim culpa. Labore voluptate excepteur."
      />
      <PatientsFeedPacks
        Autoplay={Autoplay}
        Pagination={Pagination}
        comments={logic.comments}
      />
    </div>
  );
}
