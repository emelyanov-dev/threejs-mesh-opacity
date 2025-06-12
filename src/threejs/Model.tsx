import * as THREE from "three";
import React, { JSX, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Sphere: THREE.Mesh;
  };
  materials: {
    CubeMaterial: THREE.MeshStandardMaterial;
    SphereMaterial: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/model.glb") as unknown as GLTFResult;

  const meshRef = useRef<THREE.Mesh | null>(null);

  const { opacity } = useControls({
    opacity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  useEffect(() => {
    if (!meshRef.current) return;

    const material = Array.isArray(meshRef.current.material)
      ? meshRef.current.material[0]
      : meshRef.current.material;

    material.transparent = true;
    
    material.opacity = opacity;

  }, [opacity]);

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          ref={meshRef}
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.CubeMaterial}
        />
        <mesh
          name="Sphere"
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials.SphereMaterial}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/model.glb");
