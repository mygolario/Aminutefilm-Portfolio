import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Award, Camera, Layers, Sparkles } from 'lucide-react';
import { playClick } from '../../utils/audioSystem';

export default function CinemaModal({ film, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !film) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0A0A0C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 glass-panel"
        >
          {/* Top Bar Header */}
          <div className="bg-[#050505] px-6 py-4 border-b border-white/10 flex items-center justify-between font-mono">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs text-white uppercase tracking-widest">
                CINEMA MASTER SHOWCASE // {film.category}
              </span>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-zinc-900 border border-white/10 hover:bg-white hover:text-black text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Film Video Player Canvas Stage */}
          <div className="relative aspect-video bg-black overflow-hidden group">
            <img
              src={film.image}
              alt={film.title}
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-black/40" />

            {/* Video Controls HUD Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-20 font-mono">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    playClick();
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-3.5 rounded-full bg-white text-black hover:bg-zinc-200 transition-all font-bold"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <div>
                  <h3 className="text-lg font-extrabold text-white tracking-wide uppercase">{film.title}</h3>
                  <p className="text-xs text-zinc-400">RUNTIME: {film.duration} // RED V-RAPTOR 8K</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    playClick();
                    setIsMuted(!isMuted);
                  }}
                  className="p-2.5 rounded-full bg-black/80 border border-white/10 text-white hover:border-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 py-3 bg-[#050505] border-b border-white/10 flex items-center gap-4 text-xs font-mono">
            {[
              { id: 'overview', label: 'OVERVIEW & CONCEPT', icon: Sparkles },
              { id: 'breakdown', label: 'SHOT BREAKDOWN', icon: Layers },
              { id: 'specs', label: 'TECH & CAMERA SPECS', icon: Camera },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-full transition-all ${
                    active
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Modal Tab Content */}
          <div className="p-6 max-h-72 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {film.description}
                  </p>
                  <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 font-mono italic">
                    "{film.quote}" — Director's Note
                  </div>
                </div>

                <div className="space-y-3 bg-zinc-900 border border-white/10 p-4 rounded-2xl text-xs font-mono">
                  <div className="flex items-center gap-2 text-white font-bold mb-2 uppercase">
                    <Award className="w-4 h-4 text-white" /> RECOGNITION
                  </div>
                  <ul className="space-y-1.5 text-zinc-400">
                    {film.awards.map((award, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'breakdown' && (
              <div className="space-y-4 font-mono">
                <h4 className="text-xs text-white uppercase tracking-widest">
                  60-SECOND SCENE TIMELINE BREAKDOWN
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {film.breakdown.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-900 border border-white/10 space-y-2">
                      <span className="text-xs text-zinc-400 font-bold">{item.timecode}</span>
                      <h5 className="text-xs font-bold text-white uppercase">{item.title}</h5>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <span className="text-zinc-500 block mb-1">CAMERA SYSTEM</span>
                  <span className="text-white font-bold">{film.specs.camera}</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <span className="text-zinc-500 block mb-1">LENS GLASS</span>
                  <span className="text-white font-bold">{film.specs.lens}</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <span className="text-zinc-500 block mb-1">COLOR WORKFLOW</span>
                  <span className="text-white font-bold">{film.specs.color}</span>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10">
                  <span className="text-zinc-500 block mb-1">FPS / SHUTTER</span>
                  <span className="text-white font-bold">{film.specs.fps}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
