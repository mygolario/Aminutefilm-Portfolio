import React, { useState } from 'react';
import { Calculator, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playSuccess } from '../../utils/audioSystem';

export default function ProjectEstimatorSection({ onOpenBooking }) {
  const [filmType, setFilmType] = useState('Commercial');
  const [deliverables, setDeliverables] = useState(['3d-webgl', '8k-raw', 'dolby']);
  const [timeline, setTimeline] = useState('4');

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

  const currentTypeObj = FILM_TYPES.find((t) => t.name === filmType) || FILM_TYPES[0];
  const deliverableSum = deliverables.reduce((acc, id) => {
    const item = DELIVERABLE_OPTIONS.find((d) => d.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const timelineMultiplier = timeline === '2' ? 1.2 : 1.0;
  const totalEstimate = Math.round((currentTypeObj.base + deliverableSum) * timelineMultiplier);

  const handleInitiateBooking = () => {
    playSuccess();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFFFFF', '#A1A1AA', '#71717A'],
    });
    onOpenBooking({ filmType, deliverables, timeline, totalEstimate });
  };

  return (
    <section id="estimator" className="py-32 px-4 md:px-8 relative bg-[#060608] border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-14 relative z-10 font-mono">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10">
            <Calculator className="w-4 h-4 text-white" />
            <span>MODULE 04 // BUDGET ESTIMATOR</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase font-sans">
            ESTIMATE YOUR PRODUCTION
          </h2>

          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Configure your film parameters to receive an instant studio estimate and initiate director booking.
          </p>
        </div>

        {/* Main Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls (7 Cols) */}
          <div className="lg:col-span-7 glass-slate rounded-3xl border border-white/10 p-6 sm:p-8 space-y-8">
            {/* Step 1: Film Type */}
            <div className="space-y-3">
              <label className="text-xs text-white uppercase tracking-widest block">
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
                      data-cursor="hover"
                      className={`py-3 px-2 rounded-xl border text-xs transition-all text-center ${
                        active
                          ? 'border-white bg-white text-black font-bold shadow-lg'
                          : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
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
              <label className="text-xs text-white uppercase tracking-widest block">
                02. SELECT PRODUCTION DELIVERABLES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DELIVERABLE_OPTIONS.map((item) => {
                  const active = deliverables.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleDeliverable(item.id)}
                      data-cursor="hover"
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                        active
                          ? 'border-white bg-zinc-900 text-white font-bold'
                          : 'border-white/10 bg-zinc-950/60 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center ${active ? 'bg-white border-white text-black' : 'border-zinc-700'}`}>
                          {active && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        {item.name}
                      </span>
                      <span className="text-white">+${item.price.toLocaleString()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Turnaround Timeline */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <label className="text-white uppercase tracking-widest">
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
                    data-cursor="hover"
                    className={`py-2.5 rounded-xl border text-xs transition-all ${
                      timeline === t.value
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-white/10 bg-zinc-950/60 text-zinc-400'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary & Booking CTA (5 Cols) */}
          <div className="lg:col-span-5 glass-slate rounded-3xl border border-white/10 p-8 space-y-6 shadow-2xl bg-[#0a0a0d]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs text-white uppercase tracking-widest flex items-center gap-2">
                ESTIMATE BREAKDOWN
              </span>
              <span className="text-[10px] text-zinc-300 bg-zinc-900 px-2.5 py-1 rounded-full border border-white/10">
                100% TRANSPARENT
              </span>
            </div>

            <div className="space-y-3 text-xs text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Film Category ({filmType}):</span>
                <span className="text-white font-bold">${currentTypeObj.base.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Deliverables ({deliverables.length}):</span>
                <span className="text-white font-bold">${deliverableSum.toLocaleString()}</span>
              </div>
              {timeline === '2' && (
                <div className="flex items-center justify-between text-white font-bold">
                  <span>Rush Production (2 Wks):</span>
                  <span>+20%</span>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <span className="text-xs text-zinc-500 uppercase tracking-widest block">
                TOTAL ESTIMATED INVESTMENT
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
                ${totalEstimate.toLocaleString()}
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Includes RED V-Raptor 8K shoot, director fee, 3D WebGL site OS, & cinema sound master.
              </p>
            </div>

            <button
              onClick={handleInitiateBooking}
              data-cursor="magnetic"
              className="w-full py-4 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl hover:scale-105 active:scale-95"
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

