import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { Sliders, Sun, Eye, Camera, Aperture, Check, Layers, RefreshCw } from 'lucide-react';
import { playClick, playLensRotate } from '../../utils/audioSystem';

const LIGHTING_PRESETS = {
  noir: {
    name: 'Noir Gold',
    ambient: '#0f0c06',
    dir1: '#F59E0B',
    dir2: '#78350F',
    bgGlow: 'from-amber-500/20 via-amber-950/10 to-transparent',
    accent: '#F59E0B',
  },
  cyber: {
    name: 'Cyber Neon',
    ambient: '#041619',
    dir1: '#10B981',
    dir2: '#06B6D4',
    bgGlow: 'from-emerald-500/20 via-cyan-950/10 to-transparent',
    accent: '#10B981',
  },
  monolith: {
    name: 'Monolith Silver',
    ambient: '#111827',
    dir1: '#F3F4F6',
    dir2: '#4B5563',
    bgGlow: 'from-zinc-400/20 via-zinc-900/10 to-transparent',
    accent: '#E5E7EB',
  },
  crimson: {
    name: 'Crimson Dusk',
    ambient: '#1a0505',
    dir1: '#EF4444',
    dir2: '#B91C1C',
    bgGlow: 'from-red-500/20 via-red-950/10 to-transparent',
    accent: '#EF4444',
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
      <Float speed={spec.speed} rotationIntensity={0.8} floatIntensity={1}>
        {/* Abstract Cinematic Sculpture */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.6, 2]} />
          <MeshDistortMaterial
            color={currentPreset.accent}
            roughness={0.15}
            metalness={0.85}
            distort={spec.distortion}
            speed={2}
          />
        </mesh>

        {/* Floating Concentric Aperture Rings */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.2, 0.04, 16, 100]} />
          <meshStandardMaterial color={currentPreset.accent} metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[2.6, 0.03, 16, 100]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.95} roughness={0.05} />
        </mesh>
      </Float>

      <Sparkles count={50} scale={6} size={2} color={currentPreset.accent} />
    </group>
  );
}

export default function DirectorsSimulator() {
  const [presetKey, setPresetKey] = useState('noir');
  const [focalLens, setFocalLens] = useState('35mm');
  const [aspectRatio, setAspectRatio] = useState('2.39:1'); // Anamorphic standard
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
    <div className="w-full glass-panel rounded-2xl border border-zinc-800/80 overflow-hidden relative shadow-2xl">
      {/* Top Simulator Header Bar */}
      <div className="bg-[#0b0b0e] border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              3D DIRECTOR'S SUITE & LENS SIMULATOR
            </h3>
            <p className="text-xs text-zinc-400">Real-time WebGL Shader & Lighting Engine</p>
          </div>
        </div>

        {/* HUD Live Stats */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="bg-zinc-900 border border-zinc-800 text-amber-400 px-3 py-1 rounded-md">
            LENS: {spec.name}
          </span>
          <span className="bg-zinc-900 border border-zinc-800 text-emerald-400 px-3 py-1 rounded-md">
            IRIS: {spec.iris}
          </span>
          <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-md">
            RATIO: {aspectRatio}
          </span>
        </div>
      </div>

      {/* Main Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Left Interactive WebGL Canvas Viewport (8 Cols) */}
        <div className="lg:col-span-8 relative bg-black flex items-center justify-center min-h-[380px] overflow-hidden">
          {/* Ambient Glow Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${preset.bgGlow} transition-all duration-700 pointer-events-none`} />

          {/* Anamorphic Frame Overlay Grid */}
          <div className="absolute inset-x-0 top-0 h-10 bg-black/90 border-b border-zinc-800 z-10 flex items-center justify-between px-4 text-[10px] font-mono text-zinc-500">
            <span>[ANAMORPHIC TOP MATTE]</span>
            <span>SENSOR: RED V-RAPTOR XL 8K</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-black/90 border-t border-zinc-800 z-10 flex items-center justify-between px-4 text-[10px] font-mono text-zinc-500">
            <span>[ANAMORPHIC BOTTOM MATTE]</span>
            <span>COLOR SPACE: ACEScg</span>
          </div>

          <Canvas camera={{ position: [0, 0, 7], fov: spec.fov }} className="w-full h-full">
            <ambientLight intensity={0.6} color={preset.ambient} />
            <directionalLight position={[6, 6, 6]} intensity={2.5} color={preset.dir1} />
            <directionalLight position={[-6, -6, -4]} intensity={1.8} color={preset.dir2} />

            <SubjectModel focalLens={focalLens} presetKey={presetKey} />

            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
          </Canvas>

          {/* Bottom Viewport HUD Crosshairs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full pointer-events-none flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
          </div>
        </div>

        {/* Right Controls Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-[#0d0d12] border-t lg:border-t-0 lg:border-l border-zinc-800 p-6 flex flex-col justify-between gap-6">
          {/* Lighting Presets Selector */}
          <div>
            <label className="text-xs font-mono text-amber-500 uppercase tracking-widest block mb-3 flex items-center gap-2">
              <Sun className="w-4 h-4" /> LIGHTING SETUP
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.keys(LIGHTING_PRESETS).map((key) => {
                const item = LIGHTING_PRESETS[key];
                const active = presetKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => handlePresetChange(key)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                      active
                        ? 'border-amber-500 bg-amber-500/10 text-white shadow-lg'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{item.name}</span>
                      {active && <Check className="w-3.5 h-3.5 text-amber-500" />}
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden flex mt-2">
                      <div className="w-1/2 h-full" style={{ backgroundColor: item.dir1 }} />
                      <div className="w-1/2 h-full" style={{ backgroundColor: item.dir2 }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focal Length Selector */}
          <div>
            <label className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-3 flex items-center gap-2">
              <Aperture className="w-4 h-4" /> LENS OPTICS
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.keys(LENS_SPECS).map((lens) => {
                const active = focalLens === lens;
                return (
                  <button
                    key={lens}
                    onClick={() => handleLensChange(lens)}
                    className={`p-3 rounded-xl border text-xs font-mono transition-all text-center ${
                      active
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold shadow-lg'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {lens}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Aspect Ratio & ISO Toggles */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-500" /> ASPECT RATIO
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
                    className={`py-1.5 rounded border text-xs font-mono transition-all ${
                      aspectRatio === ratio
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400 font-bold'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">SENSOR ISO</span>
                <span className="text-amber-400 font-bold">ISO {iso}</span>
              </div>
              <input
                type="range"
                min="100"
                max="6400"
                step="100"
                value={iso}
                onChange={(e) => setIso(Number(e.target.value))}
                className="w-full accent-amber-500 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Reset / Live Feedback */}
          <button
            onClick={() => {
              playClick();
              setPresetKey('noir');
              setFocalLens('35mm');
              setAspectRatio('2.39:1');
              setIso(800);
            }}
            className="w-full py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 text-xs font-mono flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> RESET SIMULATOR PARAMETERS
          </button>
        </div>
      </div>
    </div>
  );
}
