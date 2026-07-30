import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DustParticles({ count = 80 }) {
  const pointsRef = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scl[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, scl];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function LensAssembly({ mousePos }) {
  const groupRef = useRef();
  const outerRingRef = useRef();
  const innerElementRef = useRef();
  const apertureGroupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = mousePos.y * 0.4;
      const targetY = mousePos.x * 0.4;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.07);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.07);
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
    }
    if (innerElementRef.current) {
      innerElementRef.current.rotation.z -= delta * 0.2;
    }
    if (apertureGroupRef.current) {
      const time = state.clock.getElapsedTime();
      apertureGroupRef.current.rotation.z = Math.sin(time * 0.9) * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Titanium Anodized Outer Lens Barrel */}
      <mesh ref={outerRingRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.95, 64, 1, true]} />
        <meshStandardMaterial
          color="#0e0e12"
          metalness={0.98}
          roughness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Hairline Chrome Focus Ring */}
      <mesh position={[0, 0, 0.48]}>
        <torusGeometry args={[2.52, 0.035, 24, 120]} />
        <meshStandardMaterial
          color="#f4f4f5"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Front Optical Convex Glass Element */}
      <mesh ref={innerElementRef} position={[0, 0, 0.18]}>
        <sphereGeometry args={[2.22, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.42]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.98}
          roughness={0.02}
          clearcoat={1}
          clearcoatRoughness={0.03}
          thickness={0.75}
          ior={1.65}
          chromaticAberration={0.09}
          anisotropy={0.25}
          distortion={0.18}
          color="#ffffff"
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
            <planeGeometry args={[1.35, 0.38]} />
            <meshStandardMaterial color="#060608" metalness={0.95} roughness={0.15} />
          </mesh>
        ))}
      </group>

      {/* Internal Monochromatic Coated Rear Element */}
      <mesh position={[0, 0, -0.48]}>
        <cylinderGeometry args={[1.65, 1.65, 0.1, 32]} />
        <meshStandardMaterial
          color="#060608"
          metalness={0.92}
          roughness={0.08}
        />
      </mesh>
    </group>
  );
}

export default function CameraLensScene({ mousePos = { x: 0, y: 0 } }) {
  return (
    <div className="w-full h-full min-h-[460px] relative flex items-center justify-center">
      {/* Dynamic Backlight Halo */}
      <div className="absolute w-80 h-80 rounded-full bg-white/5 blur-[110px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full pointer-events-auto"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 8, 6]} intensity={3.2} color="#ffffff" />
        <directionalLight position={[-6, -6, -3]} intensity={1.8} color="#a1a1aa" />
        <pointLight position={[0, 0, 3.5]} intensity={1.4} color="#ffffff" />

        <DustParticles count={90} />

        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
          <LensAssembly mousePos={mousePos} />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  );
}

