import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';
import { Camera, Aperture, Sun, Layers, RefreshCw, Check } from 'lucide-react';
import { playClick, playLensRotate } from '../../utils/audioSystem';

const LIGHTING_PRESETS = {
  noir: {
    name: 'Monochromatic Studio',
    ambient: '#0A0A0C',
    dir1: '#FFFFFF',
    dir2: '#52525B',
    accent: '#FFFFFF',
  },
  anamorphic: {
    name: 'Anamorphic Titanium',
    ambient: '#050505',
    dir1: '#E4E4E7',
    dir2: '#27272A',
    accent: '#E4E4E7',
  },
  highcontrast: {
    name: 'High Contrast Key',
    ambient: '#000000',
    dir1: '#FFFFFF',
    dir2: '#18181B',
    accent: '#FFFFFF',
  },
};

const LENS_SPECS = {
  '24mm': { name: '24mm Ultra-Wide', fov: 65, distortion: 0.45, speed: 1.5, iris: 'f/1.4' },
  '35mm': { name: '35mm Anamorphic', fov: 45, distortion: 0.25, speed: 2.0, iris: 'f/1.8' },
  '50mm': { name: '50mm Prime Cinema', fov: 32, distortion: 0.15, speed: 2.5, iris: 'f/1.2' },
  '85mm': { name: '85mm Portrait Master', fov: 22, distortion: 0.05, speed: 3.0, iris: 'f/1.4' },
};

function SubjectModel({ focalLens, presetKey }) {
  const currentPreset = LIGHTING_PRESETS[presetKey];
  const spec = LENS_SPECS[focalLens];

  return (
    <group>
      <Float speed={spec.speed} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Sculptural Aperture Core */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.6, 2]} />
          <MeshDistortMaterial
            color={currentPreset.accent}
            roughness={0.12}
            metalness={0.92}
            distort={spec.distortion}
            speed={2}
          />
        </mesh>

        {/* Concentric Precision Rings */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.2, 0.03, 16, 100]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.95} roughness={0.05} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.6, 0.02, 16, 100]} />
          <meshStandardMaterial color="#71717A" metalness={0.9} roughness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function DirectorsSimulator() {
  const [presetKey, setPresetKey] = useState('noir');
  const [focalLens, setFocalLens] = useState('35mm');
  const [aspectRatio, setAspectRatio] = useState('2.39:1');
  const [iso, setIso] = useState(800);

  const preset = LIGHTING_PRESETS[presetKey];
  const spec = LENS_SPECS[focalLens];

  const handlePresetChange = (key) => {
    playClick();
    setPresetKey(key);
  };

  const handleLensChange = (lens) => {
    playLensRotate();
    setFocalLens(lens);
  };

  return (
    <div className="w-full glass-slate rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl">
      {/* Top Header */}
      <div className="bg-[#060608] border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-white">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
              3D DIRECTOR'S TELEMETRY & LENS SIMULATOR
            </h3>
            <p className="text-[11px] text-zinc-500 font-mono">REAL-TIME WEBGL OPTICAL ENGINE</p>
          </div>
        </div>

        {/* Telemetry Indicators */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="bg-zinc-900/90 border border-zinc-800 text-white px-3 py-1 rounded-full">
            LENS: {spec.name}
          </span>
          <span className="bg-zinc-900/90 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
            IRIS: {spec.iris}
          </span>
          <span className="bg-zinc-900/90 border border-zinc-800 text-zinc-400 px-3 py-1 rounded-full">
            RATIO: {aspectRatio}
          </span>
        </div>
      </div>

      {/* Main Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left 3D Viewport (8 Cols) */}
        <div
          data-cursor="magnetic"
          data-cursor-text="ROTATE 3D"
          className="lg:col-span-8 relative bg-[#060608] flex items-center justify-center min-h-[380px] overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10"
        >
          {/* Anamorphic Frame Overlay Grid */}
          <div className="absolute inset-x-0 top-0 h-8 bg-black/90 backdrop-blur-md border-b border-white/10 z-10 flex items-center justify-between px-4 text-[10px] font-mono text-zinc-500">
            <span>[TOP MATTE // {aspectRatio}]</span>
            <span>SENSOR: ALEXA 35 4.5K OPEN GATE</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-black/90 backdrop-blur-md border-t border-white/10 z-10 flex items-center justify-between px-4 text-[10px] font-mono text-zinc-500">
            <span>[BOTTOM MATTE // {aspectRatio}]</span>
            <span>COLOR SPACE: ACEScg D65</span>
          </div>

          <Canvas camera={{ position: [0, 0, 7], fov: spec.fov }} className="w-full h-full">
            <ambientLight intensity={0.6} color={preset.ambient} />
            <directionalLight position={[6, 6, 6]} intensity={3.0} color={preset.dir1} />
            <directionalLight position={[-6, -6, -4]} intensity={1.5} color={preset.dir2} />

            <SubjectModel focalLens={focalLens} presetKey={presetKey} />

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.0} />
          </Canvas>

          {/* Central Target Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full pointer-events-none flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>

        {/* Right Controls Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0a0a0d] p-6 flex flex-col justify-between gap-6">
          {/* Lighting Rigs Selector */}
          <div>
            <label className="text-[11px] font-mono text-white uppercase tracking-widest block mb-3 flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-zinc-400" /> LIGHTING RIG PRESET
            </label>
            <div className="space-y-2">
              {Object.keys(LIGHTING_PRESETS).map((key) => {
                const item = LIGHTING_PRESETS[key];
                const active = presetKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => handlePresetChange(key)}
                    data-cursor="hover"
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                      active
                        ? 'border-white bg-white/10 text-white font-bold'
                        : 'border-white/5 bg-zinc-900/50 text-zinc-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    {active && <Check className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lens Focal Length */}
          <div>
            <label className="text-[11px] font-mono text-white uppercase tracking-widest block mb-3 flex items-center gap-2">
              <Aperture className="w-3.5 h-3.5 text-zinc-400" /> FOCAL LENGTH
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(LENS_SPECS).map((lens) => {
                const active = focalLens === lens;
                return (
                  <button
                    key={lens}
                    onClick={() => handleLensChange(lens)}
                    data-cursor="hover"
                    className={`p-2.5 rounded-xl border text-xs font-mono transition-all text-center ${
                      active
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    {lens}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio & ISO Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> ASPECT RATIO
                </span>
                <span className="text-white font-bold">{aspectRatio}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['16:9', '2.39:1', '4:3'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => {
                      playClick();
                      setAspectRatio(ratio);
                    }}
                    data-cursor="hover"
                    className={`py-1.5 rounded-lg border text-xs font-mono transition-all ${
                      aspectRatio === ratio
                        ? 'border-white bg-white/20 text-white font-bold'
                        : 'border-white/10 bg-zinc-900 text-zinc-500'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <span className="text-zinc-400">SENSOR ISO</span>
                <span className="text-white font-bold">ISO {iso}</span>
              </div>
              <input
                type="range"
                min="100"
                max="6400"
                step="100"
                value={iso}
                onChange={(e) => setIso(Number(e.target.value))}
                className="w-full accent-white bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Reset Action */}
          <button
            onClick={() => {
              playClick();
              setPresetKey('noir');
              setFocalLens('35mm');
              setAspectRatio('2.39:1');
              setIso(800);
            }}
            data-cursor="hover"
            className="w-full py-2.5 rounded-xl border border-white/10 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs font-mono flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> RESET PARAMETERS
          </button>
        </div>
      </div>
    </div>
  );
}

