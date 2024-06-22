import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  // ---------------------------------------------------------------------------
  // GSAP on first render
  useGSAP(() => {
    // Animate title
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });

    // Animate links (on the right of the title)
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25, // We want links not to appear at the same time
    });
  }, []);
  // ---------------------------------------------------------------------------
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      {/* Top Section (title + links) */}
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          {/* Title */}
          <h1 id="title" className="section-heading">
            Get the highlights
          </h1>
          {/* Title Links */}
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        {/* Video Carousel */}
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
