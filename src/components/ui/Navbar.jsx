import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Sparkles } from 'lucide-react';
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
    <header className="fixed top-5 inset-x-0 z-40 px-4 md:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto glass-slate rounded-full px-5 md:px-7 py-3 flex items-center justify-between pointer-events-auto shadow-2xl transition-all border border-white/10 hover:border-white/20">
        
        {/* Brand Monolith Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          data-cursor="magnetic"
          className="flex items-center gap-3 group text-left transition-transform hover:scale-102"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-extrabold font-mono text-xs tracking-tighter shadow-md group-hover:rotate-12 transition-transform duration-300">
            AMF
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-semibold text-white tracking-[0.2em] uppercase block font-mono">
              A MINUTE FILM
            </span>
            <span className="text-[9px] text-zinc-400 font-mono tracking-[0.15em] block -mt-0.5">
              HIGH-FASHION CINEMA
            </span>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-7 text-[11px] font-mono tracking-widest text-zinc-400">
          {[
            { id: 'reel', label: '01. REEL MATRIX' },
            { id: 'simulator', label: '02. DIRECTOR SIM' },
            { id: 'process', label: '03. WORKFLOW' },
            { id: 'estimator', label: '04. ESTIMATOR' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              data-cursor="hover"
              className="hover:text-white transition-all uppercase relative group py-1"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Soundscape Synthesizer Engine Toggle */}
          <button
            onClick={handleAudioToggle}
            data-cursor="hover"
            className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider flex items-center gap-2 border transition-all ${
              !audioMuted
                ? 'bg-white/10 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {!audioMuted ? (
              <>
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-white animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-white animate-bounce" />
                  <span className="w-0.5 h-4/5 bg-white animate-pulse" />
                </div>
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>MUTED</span>
              </>
            )}
          </button>

          {/* Book Production CTA */}
          <button
            onClick={() => {
              playClick();
              onOpenBooking();
            }}
            data-cursor="magnetic"
            className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-[11px] font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all hover:scale-105 shadow-xl active:scale-95"
          >
            <span>START PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

