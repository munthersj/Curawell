import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useServicesSection(cards) {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    if (!cards || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const cardsDom = cardRefs.current;
      const totalCards = cardsDom.length;

      gsap.set(cardsDom[0], { y: "0%", opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${150 * totalCards}%`,
          scrub: true,
          pin: true,
        },
      });

      cardsDom.slice(1).forEach((ref) => {
        tl.fromTo(
          ref,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, ease: "none" },
          "+=0.5"
        );
      });

      // Refresh لضمان احتساب أطوال العناصر الجديدة
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [cards]);

  return {
    sectionRef,
    cardRefs,
  };
}
