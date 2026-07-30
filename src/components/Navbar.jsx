import React from 'react';
import { Film, Play } from 'lucide-react';

export default function Navbar({ onOpenReel, onCursorChange }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 nav-glass px-6 md:px-12 py-5 flex items-center justify-between">
      {/* Brand Logo */}
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => scrollTo('hero')}
        onMouseEnter={() => onCursorChange({ type: 'hover', text: 'TOP' })}
        onMouseLeave={() => onCursorChange({ type: 'default' })}
      >
        <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-zinc-200 group-hover:border-white transition-all">
          <Film className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-extrabold text-base md:text-lg tracking-widest text-white block leading-none">
            AMINUTEFILM
          </span>
          <span className="font-mono text-[10px] tracking-widest text-zinc-300 uppercase hidden sm:inline">
            // CINEMATOGRAPHY
          </span>
        </div>
      </div>

      {/* Nav Section Links */}
      <nav className="hidden md:flex items-center gap-10">
        <button 
          onClick={() => scrollTo('reel')}
          className="text-xs font-mono tracking-widest text-zinc-300 hover:text-white transition-colors uppercase"
          onMouseEnter={() => onCursorChange({ type: 'hover', text: 'WORK' })}
          onMouseLeave={() => onCursorChange({ type: 'default' })}
        >
          [ 01 — WORK ]
        </button>
        <button 
          onClick={() => scrollTo('bio')}
          className="text-xs font-mono tracking-widest text-zinc-300 hover:text-white transition-colors uppercase"
          onMouseEnter={() => onCursorChange({ type: 'hover', text: 'ABOUT' })}
          onMouseLeave={() => onCursorChange({ type: 'default' })}
        >
          [ 02 — ABOUT ]
        </button>
        <button 
          onClick={() => scrollTo('contact')}
          className="text-xs font-mono tracking-widest text-zinc-300 hover:text-white transition-colors uppercase"
          onMouseEnter={() => onCursorChange({ type: 'hover', text: 'CONTACT' })}
          onMouseLeave={() => onCursorChange({ type: 'default' })}
        >
          [ 03 — CONTACT ]
        </button>
      </nav>

      {/* Quick Play Showreel Button */}
      <div>
        <button
          onClick={onOpenReel}
          className="px-4 py-2 rounded bg-zinc-900 border border-zinc-700/80 text-white text-xs font-mono hover:bg-white hover:text-black hover:border-white transition-all flex items-center gap-2"
          onMouseEnter={() => onCursorChange({ type: 'hover', text: 'PLAY' })}
          onMouseLeave={() => onCursorChange({ type: 'default' })}
        >
          <Play className="w-3 h-3 fill-current" />
          <span>SHOWREEL (1:00)</span>
        </button>
      </div>
    </header>
  );
}
