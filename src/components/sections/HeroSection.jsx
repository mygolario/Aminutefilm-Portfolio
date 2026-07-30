import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Sliders, ArrowRight, ShieldCheck, Film, Disc } from 'lucide-react';
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
      className="relative min-h-screen pt-32 pb-20 px-4 flex flex-col justify-center items-center overflow-hidden bg-dot-matrix"
    >
      {/* Radial Gradient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Copy & Brand Narrative (7 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel-amber border border-amber-500/30 text-amber-400 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>THE 60-SECOND CINEMATIC STUDIO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-black tracking-tight text-white leading-[1.08]">
            WE CRAFT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 text-glow-amber">
              60-SECOND
            </span>{' '}
            MASTERPIECES.
          </h1>

          {/* Anamorphic Flare Accent */}
          <div className="w-48 anamorphic-flare my-2" />

          {/* Subheading */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-sans leading-relaxed">
            A premium $30K+ agency operating system merging Hollywood-grade cinematography with interactive 3D WebGL shaders. Every frame engineered to mesmerize, convert, and endure.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                playClick();
                onExploreReel();
              }}
              className="px-7 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all shadow-xl shadow-amber-500/25 hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>EXPLORE THE REEL MATRIX</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onOpenSimulator();
              }}
              className="px-7 py-4 rounded-xl glass-panel hover:bg-zinc-800/80 border border-zinc-700 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all hover:scale-105"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>LAUNCH 3D SIMULATOR</span>
            </button>
          </div>

          {/* Key Metrics HUD */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800/80 max-w-xl font-mono">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">$30K+</span>
              <span className="text-xs text-zinc-500 uppercase tracking-wider block mt-1">AGENCY VALUE</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">60 SEC</span>
              <span className="text-xs text-zinc-500 uppercase tracking-wider block mt-1">HIGH IMPACT</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">8K RAW</span>
              <span className="text-xs text-zinc-500 uppercase tracking-wider block mt-1">RED ANAMORPHIC</span>
            </div>
          </div>
        </motion.div>

        {/* Right 3D Interactive Camera Lens Model (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="w-full aspect-square glass-panel rounded-3xl border border-amber-500/20 p-2 shadow-2xl relative group overflow-hidden">
            {/* Top HUD Frame Info */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-amber-400 bg-black/60 px-3 py-1 rounded-full border border-amber-500/30">
              <Disc className="w-3.5 h-3.5 animate-spin" />
              <span>3D CANVAS // PARALLAX ACTIVE</span>
            </div>

            <CameraLensScene mousePos={mousePos} />

            {/* Bottom Floating Tag */}
            <div className="absolute bottom-4 right-4 z-20 text-[10px] font-mono text-zinc-400 bg-black/80 px-3 py-1 rounded-full border border-zinc-800">
              DRAG TO ROTATE 3D LENS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
