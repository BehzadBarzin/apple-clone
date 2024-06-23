import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (
  target: gsap.DOMTarget,
  animationProps: gsap.TweenVars,
  scrollProps: ScrollTrigger.Vars
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: MutableRefObject<any>,
  rotationState: number,
  firstTarget: "#view1" | "#view2",
  secondTarget: "#view1" | "#view2",
  animationProps: gsap.TweenVars
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
