/* eslint-disable no-unused-vars */
import NavBar from "../NavBar";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import {
  fetchHomeClinicsData,
  fetchHomeOffersData,
  fetchHomeCommentsData,
  fetchArticelsData,
  fetchLandingSectionsData,
} from "../../features/data/homeSlice";
import useHomePage from "../../hooks/useHomePage";
import AbsoiluteDiv from "./AbsoluteDiv";
import SpecializedSlider from "./SpecializedSlider";
import OffersSlider from "./OffersSlider";
import ArticalsSlider from "./ArticelsSlider";
import PatientsFeedPacks from "./PatientsFeedPacks";
import LogoLoader from "../LogoLoader";
export default function HomePage() {
  const {
    dispatch,
    sliderRef,
    sliderRef1,
    clinics,
    articels,
    comments,
    offers,
    sections,
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
    status1,
  } = useHomePage();
  useEffect(() => {
    dispatch(fetchHomeCommentsData());
    dispatch(fetchHomeClinicsData());
    dispatch(fetchHomeOffersData());
    dispatch(fetchArticelsData());
    dispatch(fetchLandingSectionsData());
  }, []);
  // console.log(comments);
  return status1 == "loading" || status == "loading" ? (
    <LogoLoader fullscreen size={140} speed={1.8} />
  ) : (
    <div className="flex flex-col  ">
      <AbsoiluteDiv data={sections} />
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
    </div>
  );
}
