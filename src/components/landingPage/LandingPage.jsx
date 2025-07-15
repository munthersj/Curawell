import NavBar from "./NavBar";
import IntroducingSection from "./IntroducingSection";
import LineSection from "./LineSection";

import ServicesSection from "./ServicesSection";
import AboutClinics from "./AboutClinics";
import ContactSection from "./ContactSection";
import DoctorsSection from "./DoctorsSection";
import ViewSection from "./ViewSection";
import OffersSection from "./OffersSection";
import QuickSub from "./QuickSub";
import CurwellFooter from "./CurwellFooter";
import useLandingPage from "../../hooks/useLandingPage";

export default function LandingPage() {
  const{isLineSectionInView ,isContactSectionInView ,  lineSectionRef , contactSectionRef} = useLandingPage()

  return (
    <>
      <NavBar />
      <IntroducingSection />
      
      {/* LineSection with its own observer */}
      <div ref={lineSectionRef}>
        <LineSection isInView={isLineSectionInView} />
      </div>
      
      <ServicesSection />
      <AboutClinics />
      
      {/* ContactSection with its own observer */}
      <div ref={contactSectionRef}>
        <ContactSection isInView={isContactSectionInView} />
      </div>
      <DoctorsSection/>
      <ViewSection/>
      <OffersSection/>
      <QuickSub/>
      <CurwellFooter/>
    </>
  );
}