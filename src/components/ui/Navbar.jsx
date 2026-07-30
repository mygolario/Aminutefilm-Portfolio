import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { toggleGlobalAudio, playClick, startCinemaHum, stopCinemaHum } from '../../utils/audioSystem';

export default function Navbar({ onOpenBooking }) {
  const [audioMuted, setAudioMuted] = useState(true);

  const handleAudioToggle = () => {
    const isUnmuted = toggleGlobalAudio();
    setAudioMuted(!isUnmuted);
    if (isUnmuted) {
      startCinemaHum();
    } else {
      stopCinemaHum();
    }
  };

  const scrollToSection = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-6 inset-x-0 z-40 px-4 pointer-events-none">
      <div className="max-w-6xl mx-auto glass-panel rounded-full border border-white/10 px-6 py-3 flex items-center justify-between pointer-events-auto shadow-2xl backdrop-blur-2xl">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-extrabold font-mono text-xs tracking-tighter group-hover:scale-105 transition-transform">
            1M
          </div>
          <div>
            <span className="text-xs font-bold text-white tracking-widest uppercase block font-mono">
              A MINUTE FILM
            </span>
            <span className="text-[9px] text-zinc-400 font-mono tracking-widest block -mt-0.5">
              3D CINEMATOGRAPHY
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono text-zinc-400">
          <button
            onClick={() => scrollToSection('reel')}
            className="hover:text-white transition-colors uppercase tracking-widest"
          >
            [01] THE REEL
          </button>
          <button
            onClick={() => scrollToSection('simulator')}
            className="hover:text-white transition-colors uppercase tracking-widest"
          >
            [02] 3D SIMULATOR
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="hover:text-white transition-colors uppercase tracking-widest"
          >
            [03] PROCESS
          </button>
          <button
            onClick={() => scrollToSection('estimator')}
            className="hover:text-white transition-colors uppercase tracking-widest"
          >
            [04] ESTIMATOR
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border text-[10px] font-mono flex items-center gap-2 transition-all ${
              !audioMuted
                ? 'bg-white/10 border-white/40 text-white font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            }`}
            title="Toggle Ambient Audio & Sound Synthesizer"
          >
            {!audioMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
                <span className="hidden sm:inline">AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AUDIO: OFF</span>
              </>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              playClick();
              onOpenBooking();
            }}
            className="px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-[11px] font-mono font-bold tracking-widest uppercase flex items-center gap-2 transition-all hover:scale-105 shadow-lg"
          >
            <span>BOOK PRODUCTION</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
