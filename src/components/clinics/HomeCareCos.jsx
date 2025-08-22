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
import { useLocation, useParams } from "react-router-dom";
import classNames from "classnames";
import { Pagination, Autoplay } from "swiper/modules";

import { useHomeCareCos } from "../../hooks/useHomeCareCos";
export default function HomeCareCos() {
  const { serviceId } = useParams();
  const logic = useHomeCareCos(serviceId);
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
  // console.log(logic.comments);
  return logic.status == "loading" ||
    logic.status2 == "loading" ||
    !logic.sectionData ? (
    <LogoLoader fullscreen size={140} speed={1.8} />
  ) : (
    <div className="flex flex-col ">
      <HomeCareBooking
        imageSrc={"/images/cosmictic.png"}
        defaultClassNames={defaultClassNames}
        phone={logic.phone}
        setPhone={logic.setPhone}
        query={logic.query}
        showDropdown={logic.showDropdown}
        setShowDropdown={logic.setShowDropdown}
        filteredOptions={logic.filteredOptions}
        handleInputChange={logic.handleInputChange}
        toggleDropdown={logic.toggleDropdown}
        handleSelect={logic.handleSelect}
        doctorsDisabled={!logic.selectedService}
        query1={logic.query1}
        showDropdown1={logic.showDropdown1}
        setShowDropdown1={logic.setShowDropdown1}
        filteredOptions1={logic.filteredOptions1}
        handleInputChange1={logic.handleInputChange1}
        toggleDropdown1={logic.toggleDropdown1}
        handleSelect1={logic.handleSelect1}
        enableWebsite={logic.enableWebsite}
        setEnableWebsite={logic.setEnableWebsite}
        location={logic.location}
        setlocation={logic.setlocation}
        today={logic.today}
        selectedDate={logic.selectedDate}
        setSelectedDate={logic.setSelectedDate}
        status1={logic.status1}
        homeCareTimes={logic.homeCareTimes}
        selectedSlot={logic.selectedSlot}
        setSelectedSlot={logic.setSelectedSlot}
        setselectedTime={logic.setselectedTime}
        toYMD={logic.toYMD}
        handelSubmit={logic.handelSubmit}
        phoneError={logic.phoneError}
        setPhoneTouched={logic.setPhoneTouched}
        note={logic.note}
        setNote={logic.setNote}
      />
      <CosmeticHeroSection
        title="Curawell Cosmetic Care"
        details={logic.sectionData.brief_description_en} // يمرّحلها نفس كائن details اللي عندك { details: "..." }
        imageSrc="/images/cosmi.png" // أو استورد الصورة كـ import
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
