/* eslint-disable no-unused-vars */
import NavBar from "../NavBar";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import CurwellFooter from "../CurwellFooter";
import {
  fetchHomeClinicsData,
  fetchHomeOffersData,
  fetchHomeCommentsData,
  fetchArticelsData,
} from "../../features/data/homeSlice";
import useHomePage from "../../hooks/useHomePage";
import AbsoiluteDiv from "./AbsoluteDiv";
import SpecializedSlider from "./SpecializedSlider";
import OffersSlider from "./OffersSlider";
import ArticalsSlider from "./ArticelsSlider";
import PatientsFeedPacks from "./PatientsFeedPacks";
export default function HomePage() {
  const {
    dispatch,
    sliderRef,
    sliderRef1,
    clinics,
    articels,
    comments,
    offers,
    status,
    error,
    currentIndex,
    setCurrentIndex,
    currentIndex1,
    setCurrentIndex1,
    settings,
    settings1,
    settings2,
    prevSlide,
    prevSlide1,
    nextSlide,
    nextSlide1,
  } = useHomePage();
  useEffect(() => {
    dispatch(fetchHomeCommentsData());
    dispatch(fetchHomeClinicsData());
    dispatch(fetchHomeOffersData());
    dispatch(fetchArticelsData());
  }, []);

  return (
    <div className="flex flex-col items-center ">
      <NavBar />
      <AbsoiluteDiv />
      <SpecializedSlider
        prevSlide={prevSlide}
        clinics={clinics}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
        nextSlide={nextSlide}
        sliderRef={sliderRef}
        settings={settings}
      />
      <OffersSlider settings1={settings1} offers={offers} />
      <ArticalsSlider
        settings2={settings2}
        sliderRef1={sliderRef1}
        articels={articels}
        prevSlide1={prevSlide1}
        currentIndex1={currentIndex1}
        nextSlide1={nextSlide1}
      />
      <PatientsFeedPacks
        Autoplay={Autoplay}
        Pagination={Pagination}
        comments={comments}
      />
      <CurwellFooter />
    </div>
  );
}
