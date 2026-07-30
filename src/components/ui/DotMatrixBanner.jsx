import React, { useState, useEffect } from 'react';
import { Radio, Film, Cpu, ShieldCheck } from 'lucide-react';

export default function DotMatrixBanner() {
  const [fps, setFps] = useState(60);
  const [timecode, setTimecode] = useState('00:01:00:00');

  useEffect(() => {
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
    <div className="w-full bg-[#050505] border-b border-white/10 py-2 px-4 overflow-hidden relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400">
        {/* Left Status HUD */}
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 text-white font-semibold uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <Radio className="w-3.5 h-3.5 text-zinc-300" />
            A MINUTE FILM // TELEMETRY OS
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 text-zinc-500 border-l border-zinc-800 pl-4">
            <Film className="w-3.5 h-3.5 text-zinc-400" />
            SENSOR: ARRI ALEXA 35 4.5K OPEN GATE
          </span>
        </div>

        {/* Center Live Ticker Marquee */}
        <div className="hidden lg:flex items-center gap-6 text-zinc-500 uppercase text-[10px]">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-zinc-400" />
            WEBGL SHADER ENGINE: ONLINE
          </span>
          <span className="text-zinc-800">/</span>
          <span>ANAMORPHIC SQUEEZE: 2.0X</span>
          <span className="text-zinc-800">/</span>
          <span>COLOR METRICS: ACEScc D65</span>
          <span className="text-zinc-800">/</span>
          <span className="text-zinc-300 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> 60 FPS STABLE
          </span>
        </div>

        {/* Right HUD Metrics */}
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded text-white font-mono text-[10px]">
            TC {timecode}
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300 font-mono text-[10px]">
            {fps} FPS
          </div>
        </div>
      </div>
    </div>
  );
}
