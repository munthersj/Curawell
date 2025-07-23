/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchLandingClinicsData,
  fetchLandingOffersData,
  fetchLandingCommentsData,
  fetchLandingIntruduceData,
  fetchLandingSectionsData,
  fetchLandingContactData,
  fetchLandingDoctors,
} from "../features/data/landingPageSlice";
export default function useLandingPage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {
    sections,
    offers,
    doctors,
    comments,
    clinics,
    contactInfo,
    intruduce,
    status,
  } = useSelector((state) => state.landingData);

  const [isLineSectionInView, setIsLineSectionInView] = useState(false);
  const lineSectionRef = useRef(null);
  useEffect(() => {
    dispatch(fetchLandingClinicsData());
    dispatch(fetchLandingOffersData());
    dispatch(fetchLandingCommentsData());
    dispatch(fetchLandingIntruduceData());
    dispatch(fetchLandingSectionsData());
    dispatch(fetchLandingContactData());
    dispatch(fetchLandingDoctors());
  }, [dispatch]);
  // For ContactSection
  const [isContactSectionInView, setIsContactSectionInView] = useState(false);
  const contactSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLineSectionInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
      }
    );

    const currentRef = lineSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Observer for ContactSection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsContactSectionInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    const currentRef = contactSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return {
    isLineSectionInView,
    setIsLineSectionInView,
    isContactSectionInView,
    setIsContactSectionInView,
    lineSectionRef,
    contactSectionRef,
    sections,
    offers,
    doctors,
    comments,
    clinics,
    intruduce,
    dispatch,
    contactInfo,
    status,
  };
}
