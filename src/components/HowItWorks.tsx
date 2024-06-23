import { useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";

const HowItWorks = () => {
  // ---------------------------------------------------------------------------
  // Refs
  const videoRef = useRef<HTMLVideoElement>();
  // ---------------------------------------------------------------------------
  // GSAP animations
  useGSAP(() => {
    // Animate Chip Image
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
        toggleActions: "restart reverse restart reverse",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap(
      ".g_fadeIn",
      {
        opacity: 1,
        stagger: 0.25,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
      },
      {}
    );
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        {/* Chip Image */}
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>
        {/* Text below chip */}
        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro chip.
            <br /> A monster win for gaming.
          </h2>

          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        {/* Phone Game Video */}
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            {/* Phone Frame */}
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            {/* Game Video */}
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                loop
                ref={(el) => el && (videoRef.current = el)}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray italic font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>
        </div>

        {/* Text below phone */}
        <div className="hiw-text-container">
          {/* Promotion 1 */}
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                best graphic performance by far
              </span>
              .
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive
              </span>
              , with incredibly detailed environments and characters.
            </p>
          </div>
          {/* Promotion 2 */}
          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
