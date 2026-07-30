import React, { useState } from 'react';
import { Volume2, VolumeX, Film, Sparkles, Sliders, Send } from 'lucide-react';
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
    <header className="fixed top-4 inset-x-0 z-40 px-4 pointer-events-none">
      <div className="max-w-6xl mx-auto glass-panel rounded-2xl border border-zinc-800/80 px-5 py-3 flex items-center justify-between pointer-events-auto shadow-2xl backdrop-blur-xl">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-black font-black font-mono text-base shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            1M
          </div>
          <div>
            <span className="text-sm font-bold text-white font-serif tracking-wider block">
              A MINUTE FILM
            </span>
            <span className="text-[10px] text-amber-500/90 font-mono tracking-widest block -mt-0.5">
              3D CINEMA STUDIO
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-zinc-400">
          <button
            onClick={() => scrollToSection('reel')}
            className="hover:text-amber-400 transition-colors uppercase tracking-wider"
          >
            01. THE REEL
          </button>
          <button
            onClick={() => scrollToSection('simulator')}
            className="hover:text-amber-400 transition-colors uppercase tracking-wider"
          >
            02. 3D SIMULATOR
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="hover:text-amber-400 transition-colors uppercase tracking-wider"
          >
            03. PROCESS
          </button>
          <button
            onClick={() => scrollToSection('estimator')}
            className="hover:text-amber-400 transition-colors uppercase tracking-wider"
          >
            04. ESTIMATOR
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
              !audioMuted
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 font-bold shadow-lg shadow-amber-500/10'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            }`}
            title="Toggle Ambient Audio & Sound Synthesizer"
          >
            {!audioMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">AUDIO: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
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
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg shadow-amber-500/20 hover:scale-105"
          >
            <Send className="w-3.5 h-3.5" />
            <span>BOOK DIRECTORS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
