import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";

const Model = () => {
  // ---------------------------------------------------------------------------
  // Selected phone size to show
  const [phoneSize, setPhoneSize] = useState<"small" | "large">("small");
  // ---------------------------------------------------------------------------
  // Selected Phone Model
  const [model, setModel] = useState<{
    title: string;
    color: string[];
    img: string;
  }>({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"], // Colors used for model mesh
    img: yellowImg,
  });
  // ---------------------------------------------------------------------------
  // Refs for camera control for the model view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  // ---------------------------------------------------------------------------
  // Model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());
  // ---------------------------------------------------------------------------
  // Model Rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
  // ---------------------------------------------------------------------------
  // GSAP Animation
  useGSAP(() => {
    // Animate the heading
    gsap.to("#heading", {
      opacity: 1,
      y: 0,
    });
  }, []);
  // ---------------------------------------------------------------------------
  // GSAP Timeline
  const tl = gsap.timeline();
  // Run animation when phone size changes
  useEffect(() => {
    if (phoneSize === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }

    if (phoneSize === "small") {
      animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [phoneSize]);
  // ---------------------------------------------------------------------------
  return (
    <section className="common-padding">
      <div className="screen-max-width ">
        {/* Heading */}
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>
        {/* Model Container */}
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* Small Phone Model */}
            <ModelView
              index={1}
              groupRef={small}
              gsapType={"view1"}
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={phoneSize}
            />
            {/* Large Phone Model */}
            <ModelView
              index={2}
              groupRef={large}
              gsapType={"view2"}
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={phoneSize}
            />
            {/* Canvas */}
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")!}
            >
              <View.Port />
            </Canvas>
          </div>

          {/* Controls */}
          <div className="mx-auto w-full">
            {/* Model Title */}
            <p className="font-light text-2xl text-center mb-5">
              {model.title}
            </p>
            {/* Color Selector */}
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              {/* Size Selector */}
              <button className="size-btn-container">
                {/* Map over sizes an render a span that's clickable */}
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor:
                        phoneSize === value ? "white" : "transparent",
                      color: phoneSize === value ? "black" : "white",
                    }}
                    onClick={() => setPhoneSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
