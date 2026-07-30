import React from 'react';
import { Film, Radio, ShieldCheck, Heart } from 'lucide-react';
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
    <footer className="bg-[#040406] border-t border-zinc-800/80 py-16 px-4 font-mono text-xs text-zinc-400 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-black font-black font-mono text-sm flex items-center justify-center">
                1M
              </div>
              <span className="text-base font-serif font-bold text-white tracking-wider">
                A MINUTE FILM
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-md">
              A high-end film production studio operating system specializing in 60-second cinematic masterpieces. Engineered for world-class brands.
            </p>
          </div>

          {/* Col 2: Studio Locations */}
          <div className="space-y-3">
            <span className="text-amber-500 font-bold uppercase tracking-wider block">
              STUDIO HUBS
            </span>
            <ul className="space-y-1.5 text-zinc-400">
              <li>LOS ANGELES // 34.0522° N</li>
              <li>TOKYO // 35.6762° N</li>
              <li>LONDON // 51.5074° N</li>
            </ul>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div className="space-y-3">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block">
              NAVIGATION
            </span>
            <ul className="space-y-1.5 text-zinc-400">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-amber-400">
                  00. TOP / HERO
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('reel')} className="hover:text-amber-400">
                  01. THE REEL MATRIX
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('simulator')} className="hover:text-amber-400">
                  02. 3D SIMULATOR
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('estimator')} className="hover:text-amber-400">
                  03. ESTIMATOR
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-500">
          <span>© 2026 A MINUTE FILM STUDIO. ALL RIGHTS RESERVED.</span>
          <span className="flex items-center gap-2">
            ENGINEERED WITH REACT, THREE.JS, & WEBGL
          </span>
        </div>
      </div>
    </footer>
  );
}
