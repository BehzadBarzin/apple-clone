import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { useRef } from "react";
import gsap from "gsap";

const Features = () => {
  // ---------------------------------------------------------------------------
  // Refs
  const exploreVideoRef = useRef<HTMLVideoElement>();
  // ---------------------------------------------------------------------------
  // GSAP Animation
  useGSAP(() => {
    // Animate title
    animateWithGsap("#features_title", { opacity: 1, y: 0 }, {});
    // Animate images
    animateWithGsap(
      ".g_grow",
      { opacity: 1, scale: 1, ease: "power1" },
      {
        scrub: 5.5,
      }
    );
    // Animate text
    animateWithGsap(
      ".g_text",
      { y: 0, opacity: 1, ease: "power2.inOut", duration: 1 },
      {
        start: "top 95%",
      }
    );
    // Animate video
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        exploreVideoRef.current?.play();
      },
    });
  }, []);
  // ---------------------------------------------------------------------------
  return (
    <section className="common-padding h-full bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          {/* Heading */}
          <h1 id="features_title" className="section-heading">
            Explore the full story
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          {/* Sub Headings */}
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-5xl lg:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>
          <div className="flex-center flex-col sm:px-10">
            {/* Explore Video */}
            <div className="relative h-[50vh] w-full flex items-center">
              <video
                playsInline
                id="exploreVideo"
                className="w-full h-full object-cover object-center"
                preload="none"
                muted
                autoPlay
                ref={(el) => el && (exploreVideoRef.current = el)}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            {/* Images */}
            <div className="flex flex-col w-full relative">
              <div className="feature-video-container">
                {/* Image 1 */}
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>
                {/* Image 2 */}
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img}
                    alt="titanium2"
                    className="feature-video g_grow"
                  />
                </div>
              </div>
              {/* Text */}
              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design
                    </span>
                    , using the same alloy that spacecrafts use for missions to
                    Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
