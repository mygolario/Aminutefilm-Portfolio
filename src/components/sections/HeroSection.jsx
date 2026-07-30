import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sliders, ArrowRight, Disc, Camera, Shield, Gauge } from 'lucide-react';
import CameraLensScene from '../3d/CameraLensScene';
import { playClick } from '../../utils/audioSystem';

export default function HeroSection({ onExploreReel, onOpenSimulator }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1;
    const y = -(e.clientY / innerHeight) * 2 + 1;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-36 pb-24 px-4 flex flex-col justify-center items-center overflow-hidden bg-grid-pattern"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Editorial Text & Studio HUD (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Telemetry Status Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 text-[11px] font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>CINEMATIC ARCHITECTURE // 60-SEC ANAMORPHIC</span>
            <span className="text-zinc-600">|</span>
            <span className="text-white font-bold">$30K+ AGENCY GRADE</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] uppercase">
            WE CRAFT <br />
            <span className="text-zinc-400 font-serif italic font-normal">60-SECOND</span> <br />
            MASTERPIECES.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed">
            An agency operating system uniting 8K RAW cinema photography with interactive 3D WebGL shaders. Engineered for brands that demand perfection in every frame.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                playClick();
                onExploreReel();
              }}
              className="px-8 py-4 rounded-full bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 shadow-2xl"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>EXPLORE THE REEL MATRIX</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onOpenSimulator();
              }}
              className="px-8 py-4 rounded-full glass-panel glass-panel-hover text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105"
            >
              <Sliders className="w-4 h-4 text-zinc-300" />
              <span>LAUNCH 3D SIMULATOR</span>
            </button>
          </div>

          {/* Key Metrics HUD Grid */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-xl font-mono">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">$30K+</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">PROD VALUE</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">60 SEC</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">HIGH CONVERSION</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">4.5K RAW</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">ALEXA 35 SENSOR</span>
            </div>
          </div>
        </motion.div>

        {/* Right 3D Interactive Camera Lens Model (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="w-full aspect-square glass-panel rounded-3xl border border-white/10 p-2 shadow-2xl relative group overflow-hidden">
            {/* Top HUD Frame Info */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-black/80 px-3.5 py-1.5 rounded-full border border-white/10">
              <Disc className="w-3.5 h-3.5 text-white animate-spin" />
              <span>3D OPTICAL ASSEMBLY // INTERACTIVE</span>
            </div>

            <CameraLensScene mousePos={mousePos} />

            {/* Bottom HUD Metadata Tag */}
            <div className="absolute bottom-4 right-4 z-20 text-[10px] font-mono text-zinc-400 bg-black/80 px-3.5 py-1.5 rounded-full border border-white/10">
              CLICK & DRAG TO INSPECT LENS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
