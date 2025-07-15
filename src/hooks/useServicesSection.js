import { useRef } from "react";
import { useLayoutEffect} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default function useServicesSection () {
        const sectionRef = useRef(null);
      const cardRefs = useRef([]);

      useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const totalCards = cards.length;

      // Make the first card visible
      gsap.set(cards[0], { y: "0%", opacity: 1 });

      // Timeline for remaining cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${150 * totalCards}%`,
          scrub: true,
          pin: true,
        },
      });

      // Animate the rest of the cards
      cards.slice(1).forEach((ref) => {
        tl.fromTo(
          ref,
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, ease: "none" },
          "+=0.5"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return {
    sectionRef,cardRefs
  }
}