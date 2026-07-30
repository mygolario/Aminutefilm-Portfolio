import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sliders, ArrowRight, Disc, Sparkles, Shield, Camera } from 'lucide-react';
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
      className="relative min-h-screen pt-36 pb-24 px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden bg-grid-pattern"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        {/* Left Editorial Text & Studio HUD (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Telemetry Status Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 text-[11px] font-mono tracking-widest uppercase shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>ARCHITECTURAL CINEMATOGRAPHY</span>
            <span className="text-zinc-600">/</span>
            <span className="text-white font-semibold">60-SEC ANAMORPHIC</span>
          </div>

          {/* Main Editorial Headline with Staggered Reveal */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] uppercase font-sans">
            WE CRAFT <br />
            <span className="text-zinc-400 font-serif italic font-normal tracking-wide">60-SECOND</span> <br />
            VISUAL CINEMA.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed">
            An elite creative studio uniting 8K ALEXA 35 cinema photography with interactive 3D WebGL physics. Engineered for visionary brands demanding absolute distinction in every single frame.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                playClick();
                onExploreReel();
              }}
              data-cursor="play"
              data-cursor-text="WATCH"
              className="px-8 py-4 rounded-full bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 shadow-2xl active:scale-95"
            >
              <Play className="w-4 h-4 fill-current text-black" />
              <span>EXPLORE THE REEL MATRIX</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onOpenSimulator();
              }}
              data-cursor="hover"
              className="px-8 py-4 rounded-full glass-slate glass-slate-hover text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
            >
              <Sliders className="w-4 h-4 text-zinc-300" />
              <span>LAUNCH DIRECTOR SIMULATOR</span>
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
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">MAX ENGAGEMENT</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">4.5K RAW</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">ALEXA 35 SENSOR</span>
            </div>
          </div>
        </motion.div>

        {/* Right 3D Interactive Camera Lens Model (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div
            data-cursor="magnetic"
            data-cursor-text="INSPECT 3D"
            className="w-full aspect-square glass-slate rounded-3xl border border-white/10 p-2 shadow-2xl relative group overflow-hidden"
          >
            {/* Top HUD Frame Info */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <Disc className="w-3.5 h-3.5 text-white animate-spin" />
              <span>OPTICAL 3D ENGINE // INTERACTIVE</span>
            </div>

            <CameraLensScene mousePos={mousePos} />

            {/* Bottom HUD Metadata Tag */}
            <div className="absolute bottom-4 right-4 z-20 text-[10px] font-mono text-zinc-400 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              CLICK & DRAG TO TILT LENS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

