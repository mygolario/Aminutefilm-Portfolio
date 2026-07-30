import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Send, Check, Sparkles, Clock, ShieldCheck, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playSuccess } from '../../utils/audioSystem';

export default function ProjectEstimatorSection({ onOpenBooking }) {
  const [filmType, setFilmType] = useState('Commercial');
  const [deliverables, setDeliverables] = useState(['3d-webgl', '8k-raw', 'dolby']);
  const [timeline, setTimeline] = useState('4'); // 4 weeks

  const FILM_TYPES = [
    { name: 'Commercial', base: 25000 },
    { name: 'Sci-Fi Teaser', base: 32000 },
    { name: 'High-Fashion', base: 28000 },
    { name: 'Narrative Short', base: 35000 },
  ];

  const DELIVERABLE_OPTIONS = [
    { id: '3d-webgl', name: 'Interactive 3D WebGL OS Site', price: 8000 },
    { id: '8k-raw', name: '8K RED Anamorphic RAW Master', price: 4000 },
    { id: 'dolby', name: 'Dolby Atmos Spatial Audio Mix', price: 3000 },
    { id: 'social', name: '60-Sec Social Cutdowns (9:16)', price: 2000 },
  ];

  const toggleDeliverable = (id) => {
    playClick();
    if (deliverables.includes(id)) {
      setDeliverables(deliverables.filter((d) => d !== id));
    } else {
      setDeliverables([...deliverables, id]);
    }
  };

  // Calculate dynamic estimate
  const currentTypeObj = FILM_TYPES.find((t) => t.name === filmType) || FILM_TYPES[0];
  const deliverableSum = deliverables.reduce((acc, id) => {
    const item = DELIVERABLE_OPTIONS.find((d) => d.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  // Expedited timeline surcharge (2 weeks +20%)
  const timelineMultiplier = timeline === '2' ? 1.2 : 1.0;
  const totalEstimate = Math.round((currentTypeObj.base + deliverableSum) * timelineMultiplier);

  const handleInitiateBooking = () => {
    playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#FFFFFF'],
    });
    onOpenBooking({ filmType, deliverables, timeline, totalEstimate });
  };

  return (
    <section id="estimator" className="py-24 px-4 relative bg-[#050507] border-t border-zinc-800/80">
      {/* Glow */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest px-3 py-1 rounded-full glass-panel-amber">
            <Calculator className="w-4 h-4" />
            <span>MODULE 04 // PROJECT ESTIMATOR & HUBS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            ESTIMATE YOUR 60-SEC PRODUCTION
          </h2>

          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            Configure your film parameters to receive an instant studio estimate and initiate director booking.
          </p>
        </div>

        {/* Main Estimator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls (7 Cols) */}
          <div className="lg:col-span-7 glass-panel rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-8">
            {/* Step 1: Film Type */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                01. SELECT FILM CATEGORY
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {FILM_TYPES.map((type) => {
                  const active = filmType === type.name;
                  return (
                    <button
                      key={type.name}
                      onClick={() => {
                        playClick();
                        setFilmType(type.name);
                      }}
                      className={`py-3 px-2 rounded-xl border text-xs font-mono transition-all text-center ${
                        active
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold shadow-lg'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {type.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Deliverables */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                02. SELECT PRODUCTION DELIVERABLES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DELIVERABLE_OPTIONS.map((item) => {
                  const active = deliverables.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleDeliverable(item.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                        active
                          ? 'border-emerald-500 bg-emerald-500/10 text-white font-bold shadow-md'
                          : 'border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center ${active ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-700'}`}>
                          {active && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        {item.name}
                      </span>
                      <span className="text-emerald-400">+${item.price.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Turnaround Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <label className="text-amber-400 uppercase tracking-widest">
                  03. ESTIMATED PRODUCTION TIMELINE
                </label>
                <span className="text-white font-bold">{timeline} WEEKS</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '2', label: '2 Weeks (Rush)' },
                  { value: '4', label: '4 Weeks (Standard)' },
                  { value: '6', label: '6 Weeks (Extended)' },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      playClick();
                      setTimeline(t.value);
                    }}
                    className={`py-2.5 rounded-xl border text-xs font-mono transition-all ${
                      timeline === t.value
                        ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary & Booking CTA (5 Cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl border border-amber-500/30 p-8 space-y-6 bg-gradient-to-b from-[#0e0e14] to-[#07070a] shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> ESTIMATE BREAKDOWN
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                100% TRANSPARENT
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs text-zinc-300">
              <div className="flex items-center justify-between">
                <span>Film Category ({filmType}):</span>
                <span className="text-white font-bold">${currentTypeObj.base.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Deliverables ({deliverables.length}):</span>
                <span className="text-white font-bold">${deliverableSum.toLocaleString()}</span>
              </div>
              {timeline === '2' && (
                <div className="flex items-center justify-between text-amber-400">
                  <span>Rush Production (2 Wks):</span>
                  <span>+20%</span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                TOTAL ESTIMATED INVESTMENT
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-black text-amber-400 tracking-tight text-glow-amber">
                ${totalEstimate.toLocaleString()}
              </div>
              <p className="text-[11px] font-mono text-zinc-500">
                Includes RED V-Raptor 8K shoot, director fee, 3D WebGL site OS, & cinema sound master.
              </p>
            </div>

            <button
              onClick={handleInitiateBooking}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-500/25 hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>INITIATE DIRECTOR BOOKING</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
