import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  // ---------------------------------------------------------------------------
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);
  // ---------------------------------------------------------------------------
  const [videoState, setVideoState] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  // ---------------------------------------------------------------------------
  // Destructure the video state for ease
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = videoState;
  // ---------------------------------------------------------------------------
  // Setup GSAP animation
  useGSAP(() => {
    // Animate the slider
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    // Play video when it's in view
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideoState((previousVideoState) => ({
          ...previousVideoState,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);
  // ---------------------------------------------------------------------------
  // Holds an array of the video elements's metadata that are loaded
  const [loadedVideoMetadata, setLoadedVideoMetadata] = useState<
    SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);
  // ---------------------------------------------------------------------------
  // Called when onLoadedMetadata of the video element is triggered
  const handleLoadedMetadata = (
    event: SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setLoadedVideoMetadata((prev) => [...prev, event]);
  };
  // ---------------------------------------------------------------------------
  // Side-effect that runs when loadedVideoMetadata changes
  useEffect(() => {
    // If at least 3 video elements have loaded their metadata
    if (loadedVideoMetadata.length > 3) {
      if (!isPlaying) {
        // If we reached the end and we no longer are playing, then pause the video
        videoRef.current[videoId].pause();
      } else if (startPlay) {
        // Otherwise, play the video
        videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedVideoMetadata]);
  // ---------------------------------------------------------------------------
  // Run side-effect every time videoId or startPlay changes in the video state
  // We'll use this to animate the progress
  useEffect(() => {
    let currentProgress = 0;

    // Get the span element of the currently playing video
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate the progress of the video
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "7vw"
                  : "4vw",
            });

            // Animate the width of the span to current progress
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px", // Return back to normal (a circular dot)
            });

            gsap.to(span[videoId], {
              backgroundColor: "#AFAFAF",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);
  // ---------------------------------------------------------------------------
  // Helper function that's called on video control button click
  const handleProcess = (
    action: "video-end" | "video-last" | "video-reset" | "play" | "pause",
    idx?: number
  ) => {
    switch (action) {
      case "video-end":
        setVideoState((prevVideoState) => ({
          ...prevVideoState,
          isEnd: true,
          videoId: idx! + 1,
        }));
        break;
      case "video-last":
        setVideoState((prevVideoState) => ({
          ...prevVideoState,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideoState((prevVideoState) => ({
          ...prevVideoState,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideoState((prevVideoState) => ({
          ...prevVideoState,
          isPlaying: true,
        }));
        break;
      case "pause":
        setVideoState((prevVideoState) => ({
          ...prevVideoState,
          isPlaying: false,
        }));
        break;
    }
  };
  // ---------------------------------------------------------------------------
  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((h, idx) => {
          return (
            <div key={h.id} id="slider" className="sm:pr-20 pr-10">
              <div className="video-carousel_container">
                {/* Video */}
                <div className="w-full h-full flex-center overflow-hidden rounded-3xl bg-black">
                  <video
                    id="video"
                    className={`${
                      h.id == 2 && "translate-x-44"
                    } pointer-events-none`}
                    playsInline
                    preload="auto"
                    muted
                    ref={(el) => (videoRef.current[idx] = el!)}
                    onPlay={() => {
                      setVideoState((prevVideoState) => ({
                        ...prevVideoState,
                        isPlaying: true,
                      }));
                    }}
                    onLoadedMetadata={(e) => handleLoadedMetadata(e)}
                    onEnded={() => {
                      idx !== 3
                        ? handleProcess("video-end", idx)
                        : handleProcess("video-last");
                    }}
                  >
                    <source src={h.video} type="video/mp4" />
                  </video>
                </div>
                {/* Content */}
                <div className="absolute top-12 left-[5%] z-10">
                  {h.textLists.map((t) => {
                    return (
                      <p key={t} className="md:text-2xl text-xl font-medium">
                        {t}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Video Controls and Progress */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, idx) => {
            return (
              <span
                key={idx}
                ref={(el) => (videoDivRef.current[idx] = el!)}
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              >
                <span
                  className="absolute h-full w-full rounded-full"
                  ref={(el) => (videoSpanRef.current[idx] = el!)}
                />
              </span>
            );
          })}
        </div>
        {/* Play/Pause/Replay Button */}
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
