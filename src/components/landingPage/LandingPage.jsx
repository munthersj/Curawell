import NavBar from "./NavBar";
import IntroducingSection from "./IntroducingSection";
import LineSection from "./LineSection";

import ServicesSection from "./ServicesSection";
import AboutClinics from "./AboutClinics";
import ContactSection from "./ContactSection";
import DoctorsSection from "./DoctorsSection";
import OffersSection from "./OffersSection";
import QuickSub from "./QuickSub";
import CurwellFooter from "../CurwellFooter";
import useLandingPage from "../../hooks/useLandingPage";
import SlideCompView from "./SlideCompView";

export default function LandingPage() {
  const {
    isLineSectionInView,
    isContactSectionInView,
    lineSectionRef,
    contactSectionRef,
    sections,
    offers,
    doctors,
    comments,
    contactInfo,
    clinics,
    intruduce,
  } = useLandingPage();

  return (
    <>
      <NavBar />
      <IntroducingSection introduce={intruduce} />

      {/* LineSection with its own observer */}
      <div ref={lineSectionRef}>
        <LineSection isInView={isLineSectionInView} introduce={intruduce} />
      </div>

      <ServicesSection cards={sections} />
      <AboutClinics clinics={clinics} />

      {/* ContactSection with its own observer */}
      <div ref={contactSectionRef}>
        <ContactSection
          isInView={isContactSectionInView}
          aboutInfo={contactInfo}
        />
      </div>
      <DoctorsSection doctors={doctors} />
      <div class="w-full h-screen pt-10 bg-grayc">
        <SlideCompView comments={comments} />
      </div>
      <OffersSection offers={offers} />
      <QuickSub />
      <CurwellFooter />
    </>
  );
}
