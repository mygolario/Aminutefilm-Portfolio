import React from 'react';
import { ArrowDown, Play } from 'lucide-react';

export default function Hero({ onOpenReel, onCursorChange }) {
  const scrollToReel = () => {
    const el = document.getElementById('reel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen flex flex-col justify-between px-6 md:px-16 pt-32 pb-12 overflow-hidden bg-zinc-950">
      {/* Background Video Reel Loop */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover filter contrast-125 brightness-75 scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-road-at-night-42288-large.mp4" type="video/mp4" />
        </video>
        {/* Subtle Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/90"></div>
      </div>

      {/* Top Metadata */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/60 pb-4">
        <div className="font-mono text-xs text-zinc-400 tracking-widest uppercase flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-200"></span>
          <span>FILM & CINEMATOGRAPHY</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 font-mono text-xs text-zinc-400 tracking-widest">
          <span>LA • LDN • TYO</span>
          <span>ARRI 16MM & ALEXA 35</span>
        </div>
      </div>

      {/* Hero Title & Statement */}
      <div className="relative z-10 max-w-5xl my-auto">
        <h1 className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[0.95] mb-6">
          ONE MINUTE <br />
          <span className="text-zinc-400 font-light">
            OF CINEMA.
          </span>
        </h1>

        <p className="max-w-2xl text-base md:text-xl text-zinc-300 font-light leading-relaxed mb-8">
          Stripping away narrative filler to distill raw human emotion, atmosphere, and cinematography into sixty seconds.
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <button
            onClick={scrollToReel}
            className="px-8 py-4 rounded bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-3"
            onMouseEnter={() => onCursorChange({ type: 'hover', text: 'EXPLORE' })}
            onMouseLeave={() => onCursorChange({ type: 'default' })}
          >
            <span>EXPLORE ARCHIVE</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenReel}
            className="px-6 py-4 rounded bg-zinc-900 border border-zinc-800 text-zinc-200 font-mono text-xs uppercase tracking-wider hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-3"
            onMouseEnter={() => onCursorChange({ type: 'hover', text: 'PLAY' })}
            onMouseLeave={() => onCursorChange({ type: 'default' })}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PLAY SHOWREEL (1:00)</span>
          </button>
        </div>
      </div>

      {/* Scroll Prompt Footer */}
      <div className="relative z-10 flex items-end justify-between border-t border-zinc-800/60 pt-6">
        <div className="font-mono text-xs text-zinc-400 flex items-center gap-8">
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase">SELECTED WORKS</span>
            <span className="text-white font-bold">06 FILMS</span>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase">FESTIVALS</span>
            <span className="text-zinc-200 font-bold">VIMEO STAFF PICK / CANNES / TRIBECA</span>
          </div>
        </div>

        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={scrollToReel}
          onMouseEnter={() => onCursorChange({ type: 'hover', text: 'DOWN' })}
          onMouseLeave={() => onCursorChange({ type: 'default' })}
        >
          <span className="font-mono text-xs text-zinc-400 tracking-widest group-hover:text-white transition-colors uppercase hidden sm:block">
            Scroll to glide film strip
          </span>
          <div className="w-8 h-8 rounded border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-white group-hover:text-white transition-all">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </section>
  );
}
