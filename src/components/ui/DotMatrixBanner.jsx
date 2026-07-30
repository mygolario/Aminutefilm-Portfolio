import React, { useState, useEffect } from 'react';
import { Radio, ShieldCheck, Film, Cpu } from 'lucide-react';

export default function DotMatrixBanner() {
  const [fps, setFps] = useState(60);
  const [timecode, setTimecode] = useState('00:01:00:00');

  useEffect(() => {
    // Dynamic FPS & Timecode generator simulation
    const interval = setInterval(() => {
      setFps(59 + Math.floor(Math.random() * 2));
      const now = new Date();
      const ms = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');
      const sec = now.getSeconds().toString().padStart(2, '0');
      const min = now.getMinutes().toString().padStart(2, '0');
      setTimecode(`00:${min}:${sec}:${ms}`);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0c]/90 border-y border-amber-500/20 py-2.5 px-4 overflow-hidden relative backdrop-blur-md">
      {/* Background dot matrix grid */}
      <div className="absolute inset-0 bg-dot-matrix-dense opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-amber-500/90 tracking-wider">
        {/* Left Status Indicators */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-amber-400 font-semibold uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <Radio className="w-3.5 h-3.5" />
            A MINUTE FILM OS // v3.0
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-zinc-400">
            <Film className="w-3.5 h-3.5 text-amber-500" />
            REEL: 60-SEC ANAMORPHIC RAW
          </span>
        </div>

        {/* Center Live Ticker Marquee */}
        <div className="hidden lg:flex items-center gap-8 overflow-hidden whitespace-nowrap text-zinc-400">
          <span className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            3D WEBGL SHADER: ACTIVE
          </span>
          <span className="text-amber-500/40">|</span>
          <span>AUDIO ENGINE: SYNTHESIS READY</span>
          <span className="text-amber-500/40">|</span>
          <span>COLOR METRICS: DCI-P3 PURE NOIR</span>
          <span className="text-amber-500/40">|</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% 60FPS TARGET
          </span>
        </div>

        {/* Right HUD Metrics */}
        <div className="flex items-center gap-4 text-right">
          <div className="bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded text-amber-400 font-bold">
            TC: {timecode}
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-400 font-bold">
            {fps} FPS
          </div>
        </div>
      </div>
    </div>
  );
}
