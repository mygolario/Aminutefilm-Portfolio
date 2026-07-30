import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, CheckCircle2 } from 'lucide-react';
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
    <section id="process" className="py-28 px-4 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 text-left font-mono">
          <div className="inline-flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest">
            <Layers className="w-4 h-4 text-white" />
            <span>MODULE 03 // STORYTELLING JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            PRODUCTION BLUEPRINT
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
                className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden font-mono ${
                  active
                    ? 'bg-zinc-900 border-white text-white shadow-xl'
                    : 'bg-zinc-950 border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-black ${active ? 'text-white' : 'text-zinc-600'}`}>
                    {item.step}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase">{item.duration}</span>
                </div>
                <h4 className="text-xs font-bold tracking-wider uppercase">
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
          className="glass-panel rounded-3xl border border-white/10 p-8 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-white text-xs">
                PHASE {currentStep.step} // {currentStep.subtitle.toUpperCase()}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                {currentStep.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans max-w-2xl">
                {currentStep.desc}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>DELIVERABLE: <strong className="text-white">{currentStep.deliverable}</strong></span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-3">
              <span className="text-[10px] text-zinc-500 uppercase block">QUALITY BENCHMARK</span>
              <span className="text-2xl font-black text-white block">{currentStep.stat}</span>
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
