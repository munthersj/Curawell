import { useRef, useState, useEffect } from "react";

export default function useLandingPage() {
  const [isLineSectionInView, setIsLineSectionInView] = useState(false);
  const lineSectionRef = useRef(null);

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
  };
}
