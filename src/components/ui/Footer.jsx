import React from 'react';
import { playClick } from '../../utils/audioSystem';

export default function Footer() {
  const scrollToSection = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#060608] border-t border-white/10 py-20 px-4 md:px-8 font-mono text-xs text-zinc-400 relative">
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-black font-extrabold font-mono text-xs flex items-center justify-center shadow-md">
                AMF
              </div>
              <span className="text-sm font-extrabold text-white tracking-[0.2em] uppercase font-sans">
                A MINUTE FILM
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-md">
              An architectural film production studio operating system specializing in 60-second high-fashion cinematic assets and 3D WebGL motion experiences.
            </p>
          </div>

          {/* Col 2: Studio Locations */}
          <div className="space-y-3">
            <span className="text-white font-bold uppercase tracking-widest block text-[11px]">
              STUDIO HUBS
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LOS ANGELES // 34.0522° N</span>
              </li>
              <li>TOKYO // 35.6762° N</li>
              <li>LONDON // 51.5074° N</li>
            </ul>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div className="space-y-3">
            <span className="text-white font-bold uppercase tracking-widest block text-[11px]">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => scrollToSection('hero')} data-cursor="hover" className="hover:text-white transition-colors">
                  [00] TOP / HERO
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reel')} data-cursor="hover" className="hover:text-white transition-colors">
                  [01] THE REEL MATRIX
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('simulator')} data-cursor="hover" className="hover:text-white transition-colors">
                  [02] 3D SIMULATOR
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('process')} data-cursor="hover" className="hover:text-white transition-colors">
                  [03] PROCESS
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('estimator')} data-cursor="hover" className="hover:text-white transition-colors">
                  [04] ESTIMATOR
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-500">
          <span>© 2026 A MINUTE FILM STUDIO. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-2">
            ENGINEERED WITH REACT 19, THREE.JS & FRAMER MOTION
          </span>
        </div>
      </div>
    </footer>
  );
}

