import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function LensAssembly({ mousePos }) {
  const groupRef = useRef();
  const outerRingRef = useRef();
  const innerElementRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth subtle mouse interaction tilt
      const targetX = (mousePos.y * 0.4);
      const targetY = (mousePos.x * 0.4);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
    }
    if (innerElementRef.current) {
      innerElementRef.current.rotation.z -= delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Metallic Lens Barrel */}
      <mesh ref={outerRingRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[2.4, 2.4, 0.8, 64, 1, true]} />
        <meshStandardMaterial
          color="#18181b"
          metalness={0.95}
          roughness={0.15}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gold Knurled Focus Ring */}
      <mesh position={[0, 0, 0.4]}>
        <torusGeometry args={[2.42, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.9}
          roughness={0.2}
          emissive="#F59E0B"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner Lens Element Glass Shader */}
      <mesh ref={innerElementRef} position={[0, 0, 0.1]}>
        <sphereGeometry args={[2.1, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          thickness={0.8}
          ior={1.6}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#FEF3C7"
        />
      </mesh>

      {/* Aperture Blades Ring (8 blades) */}
      <group position={[0, 0, -0.2]}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <mesh
            key={idx}
            rotation={[0, 0, (angle * Math.PI) / 180]}
            position={[
              Math.cos((angle * Math.PI) / 180) * 0.9,
              Math.sin((angle * Math.PI) / 180) * 0.9,
              0,
            ]}
          >
            <planeGeometry args={[1.2, 0.4]} />
            <meshStandardMaterial color="#09090b" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* Anamorphic Blue/Amber Flare Center Core */}
      <mesh position={[0, 0, -0.5]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 32]} />
        <meshStandardMaterial
          color="#050505"
          emissive="#F59E0B"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

export default function CameraLensScene({ mousePos = { x: 0, y: 0 } }) {
  return (
    <div className="w-full h-full min-h-[420px] relative flex items-center justify-center">
      {/* Background glow behind 3D lens */}
      <div className="absolute w-72 h-72 rounded-full bg-amber-500/15 blur-[90px] pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none translate-x-20" />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full pointer-events-auto"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={2.5} color="#F59E0B" />
        <directionalLight position={[-5, -5, -2]} intensity={1.8} color="#10B981" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#FFFFFF" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
          <LensAssembly mousePos={mousePos} />
        </Float>

        {/* Cinematic Dust & Lens Particle Effects */}
        <Sparkles
          count={80}
          scale={7}
          size={2.5}
          speed={0.4}
          opacity={0.6}
          color="#F59E0B"
        />
        <Sparkles
          count={40}
          scale={6}
          size={2}
          speed={0.6}
          opacity={0.4}
          color="#10B981"
        />

        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Canvas>
    </div>
  );
}
