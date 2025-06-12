'use client';

import Scene from "@/threejs/Scene";
import { Canvas } from "@react-three/fiber";
import { Color, WebGLRenderer } from "three";

export default function Home() {
  return (
    <Canvas
      shadows
      gl={(defaults) =>
        new WebGLRenderer({
          ...defaults,
          preserveDrawingBuffer: true,
          alpha: false,
        })
      }
      scene={{ background: new Color(0xffffff) }}

    >
      <Scene />
    </Canvas>
  );
}
