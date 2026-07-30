import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Film, Tv, Radio, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { playClick } from '../../utils/audioSystem';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'CONCEPT & ANAMORPHIC STORYBOARD',
    subtitle: 'Narrative Compression',
    desc: 'We compress full feature-length emotional arcs into a 60-second precise script and frame-by-frame anamorphic storyboard.',
    deliverable: '60-Sec Script, Style Bible, Color Palette',
    duration: 'Week 1',
    stat: '100% Precise Timing'
  },
  {
    step: '02',
    title: '3D WEBGL PRE-VISUALIZATION',
    subtitle: 'Spatial World Design',
    desc: 'Before touching a camera, we construct the entire scene in 3D WebGL, mapping virtual lighting, camera lens physics, and motion trajectories.',
    deliverable: '3D Interactive Pre-Vis Model',
    duration: 'Week 2',
    stat: 'Zero On-Set Friction'
  },
  {
    step: '03',
    title: 'RED V-RAPTOR 8K PRODUCTION',
    subtitle: 'Cinema Shooting',
    desc: 'Shot on location or virtual production stages using RED V-Raptor XL 8K cinema cameras, anamorphic lenses, and robotics motion control.',
    deliverable: '8K Uncompressed RAW Footage',
    duration: 'Week 3',
    stat: '8K Anamorphic RAW'
  },
  {
    step: '04',
    title: 'DOLBY ATMOS & COLOR MASTERY',
    subtitle: 'Post-Production',
    desc: 'Finished with ACEScg color grading, spatial 3D WebGL interactive integration, and custom synthesized spatial audio master.',
    deliverable: 'Final 60-Sec Cinema Master + Web OS',
    duration: 'Week 4',
    stat: 'DCI-P3 Color Standard'
  }
];

export default function ProcessTimelineSection() {
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = PROCESS_STEPS[activeStep];

  return (
    <section id="process" className="py-24 px-4 relative bg-[#07070a] border-t border-zinc-800/80">
      {/* Background Dot Matrix */}
      <div className="absolute inset-0 bg-dot-matrix opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>MODULE 03 // STORYTELLING JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            FROM SCRIPT TO 60-SECOND SCREEN
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl font-sans">
            Our systematic 4-phase production operating system for creating high-impact 3D cinema assets.
          </p>
        </div>

        {/* Step Selector Tabs (Grid of 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((item, idx) => {
            const active = activeStep === idx;
            return (
              <button
                key={item.step}
                onClick={() => {
                  playClick();
                  setActiveStep(idx);
                }}
                className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  active
                    ? 'glass-panel-amber border-amber-500/60 shadow-xl shadow-amber-500/10'
                    : 'glass-panel border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-mono font-black ${active ? 'text-amber-400' : 'text-zinc-600'}`}>
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.duration}</span>
                </div>
                <h4 className={`text-sm font-bold tracking-wide ${active ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                  {item.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Step Highlight Card */}
        <motion.div
          key={currentStep.step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel rounded-2xl border border-amber-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Flare */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                PHASE {currentStep.step} // {currentStep.subtitle}
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                {currentStep.title}
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-sans max-w-2xl">
                {currentStep.desc}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>DELIVERABLE: <strong className="text-white">{currentStep.deliverable}</strong></span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-zinc-900/80 border border-zinc-800 p-6 rounded-xl space-y-3 font-mono">
              <span className="text-xs text-zinc-500 uppercase block">KEY QUALITY BENCHMARK</span>
              <span className="text-2xl font-extrabold text-amber-400 block">{currentStep.stat}</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Guaranteed studio standard verified across all 60-second agency projects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
