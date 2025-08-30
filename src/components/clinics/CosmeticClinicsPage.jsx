/* eslint-disable no-unused-vars */
import { getDefaultClassNames } from "react-day-picker";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import BookingPanel from "./components/BookingPanel";
import KeyServicesSection from "./components/KeyServicesSection";
import ClinicDoctorsSection from "./components/ClinicDoctorsSection";
import OffersSlider from "../home/OffersSlider";
import ToastCopm from "./components/ToastComp";
import LogoLoader from "../LogoLoader";
import CosmeticHeroSection from "./components/CosmeticHeroSection";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useCosmetic } from "../../hooks/useCosmetic";
export default function CosmeticClinicsPage() {
  // const location1 = useLocation();
  // const { sectionId, details } = location1.state || {};
  const { serviceId } = useParams();
  const logic = useCosmetic(serviceId);

  const defaultClassNames = getDefaultClassNames();

  useEffect(() => {
    if (logic.status2 === "succeeded" && logic.message1) {
      toast.custom((t) => (
        <ToastCopm message1={logic.message1} onClick={() => toast.dismiss(t)} />
      ));
      logic.resetForm();
      logic.resetAction();
    }
  }, [logic.status2, logic.message1, logic]);

  const { error } = useSelector((s) => s.cosmeticData);
  useEffect(() => {
    if (logic.status2 === "failed" && error) {
      toast.custom((t) => (
        <ToastCopm message1={logic.message1} onClick={() => toast.dismiss(t)} />
      ));
    }
  }, [logic.status2, error, logic.message1]);

  return logic.status == "loading" || logic.sectionData == undefined ? (
    <LogoLoader fullscreen size={140} speed={1.8} />
  ) : (
    <div className="flex flex-col ">
      <BookingPanel
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
        times={logic.times}
        selectedSlot={logic.selectedSlot}
        setSelectedSlot={logic.setSelectedSlot}
        setselectedTime={logic.setselectedTime}
        toYMD={logic.toYMD}
        handelSubmit={logic.handelSubmit}
        phoneError={logic.phoneError}
        setPhoneTouched={logic.setPhoneTouched}
      />
      <CosmeticHeroSection
        title="Curawell Cosmetic Care"
        details={logic.sectionData.details_services_en.brief_description} // يمرّحلها نفس كائن details اللي عندك { details: "..." }
        imageSrc="/images/cosmi.png" // أو استورد الصورة كـ import
      />
      <KeyServicesSection
        keyServices={logic.keyServices}
        activeServiceId={logic.activeServiceId}
        setActiveServiceId={logic.setActiveServiceId}
        classNames={classNames}
        title="Our key services"
        subtitle="Dolore excepteur non non non ipsum ipsum voluptate minim culpa. Labore voluptate excepteur."
      />

      <ClinicDoctorsSection
        status={logic.status3}
        doctorsFallback={logic.doctors1}
        selectedDoctorId={logic.selectedDoctorId}
        setSelectedDoctorId={logic.setSelectedDoctorId}
        selectedDoctor={logic.selectedDoctor}
        classNames={classNames}
      />
      <OffersSlider settings1={logic.settings1} offers={logic.offers} />
    </div>
  );
}
