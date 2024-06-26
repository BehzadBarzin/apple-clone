// @ts-nocheck
import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  Suspense,
} from "react";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";

import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";

interface IProps {
  index: number;
  groupRef: MutableRefObject<unknown>;
  gsapType: "view1" | "view2";
  controlRef: MutableRefObject<unknown>;
  setRotationState: Dispatch<SetStateAction<number>>;
  item: { title: string; color: string[]; img: string };
  size: "small" | "large";
}

const ModelView: FC<IProps> = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      {/* To control the camera */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        {/* Load IPhone model with Suspense */}
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
