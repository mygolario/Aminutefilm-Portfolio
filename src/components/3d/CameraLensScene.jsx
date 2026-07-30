import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function LensAssembly({ mousePos }) {
  const groupRef = useRef();
  const outerRingRef = useRef();
  const innerElementRef = useRef();
  const apertureGroupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = (mousePos.y * 0.35);
      const targetY = (mousePos.x * 0.35);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.06);
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.12;
    }
    if (innerElementRef.current) {
      innerElementRef.current.rotation.z -= delta * 0.18;
    }
    if (apertureGroupRef.current) {
      // Subtle iris blade movement simulation
      const time = state.clock.getElapsedTime();
      apertureGroupRef.current.rotation.z = Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Titanium Anodized Outer Lens Barrel */}
      <mesh ref={outerRingRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.9, 64, 1, true]} />
        <meshStandardMaterial
          color="#121215"
          metalness={0.98}
          roughness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hairline Chrome Focus Ring */}
      <mesh position={[0, 0, 0.45]}>
        <torusGeometry args={[2.52, 0.04, 24, 120]} />
        <meshStandardMaterial
          color="#E4E4E7"
          metalness={0.95}
          roughness={0.08}
        />
      </mesh>

      {/* Front Optical Convex Glass Element */}
      <mesh ref={innerElementRef} position={[0, 0, 0.15]}>
        <sphereGeometry args={[2.2, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.98}
          roughness={0.03}
          clearcoat={1}
          clearcoatRoughness={0.05}
          thickness={0.7}
          ior={1.62}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.15}
          color="#FFFFFF"
        />
      </mesh>

      {/* 9-Blade Cinema Iris Aperture Assembly */}
      <group ref={apertureGroupRef} position={[0, 0, -0.15]}>
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, idx) => (
          <mesh
            key={idx}
            rotation={[0, 0, (angle * Math.PI) / 180]}
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.95,
              Math.sin((angle * Math.PI) / 180) * 0.95,
              0,
            ]}
          >
            <planeGeometry args={[1.3, 0.35]} />
            <meshStandardMaterial color="#0A0A0C" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Internal Monochromatic Coated Rear Element */}
      <mesh position={[0, 0, -0.45]}>
        <cylinderGeometry args={[1.6, 1.6, 0.1, 32]} />
        <meshStandardMaterial
          color="#050505"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function CameraLensScene({ mousePos = { x: 0, y: 0 } }) {
  return (
    <div className="w-full h-full min-h-[440px] relative flex items-center justify-center">
      {/* Subtle depth lighting background */}
      <div className="absolute w-72 h-72 rounded-full bg-white/5 blur-[100px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full pointer-events-auto"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 8, 6]} intensity={3.0} color="#FFFFFF" />
        <directionalLight position={[-6, -6, -3]} intensity={1.5} color="#A1A1AA" />
        <pointLight position={[0, 0, 3]} intensity={1.2} color="#FFFFFF" />

        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
          <LensAssembly mousePos={mousePos} />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  );
}
