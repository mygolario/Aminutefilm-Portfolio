import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Cpu, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import DirectorsSimulator from '../3d/DirectorsSimulator';

export default function SimulatorSection() {
  return (
    <section id="simulator" className="py-24 px-4 relative bg-[#050507] border-t border-zinc-800/80">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full glass-panel-emerald">
            <Cpu className="w-4 h-4" />
            <span>MODULE 02 // WEBGL SHADER ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
            THE 3D DIRECTOR'S SUITE
          </h2>

          <p className="text-sm text-zinc-400 font-sans leading-relaxed">
            Interact with our real-time 3D camera shader simulator. Swap lighting environments, adjust optical focal lengths, and inspect live WebGL sensor telemetry.
          </p>
        </div>

        {/* Simulator Component Stage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <DirectorsSimulator />
        </motion.div>
      </div>
    </section>
  );
}
