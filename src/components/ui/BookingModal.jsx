import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldCheck, Film } from 'lucide-react';
import { playClick, playSuccess } from '../../utils/audioSystem';

export default function BookingModal({ isOpen, onClose, estimateData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [brief, setBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    playSuccess();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#09090d] border border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl z-10 glass-panel"
        >
          {/* Header */}
          <div className="bg-[#0f0f15] px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Film className="w-4 h-4" />
              <span>DIRECTOR CONSULTATION // INITIATION</span>
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-zinc-800 hover:bg-amber-500 text-zinc-400 hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-white">BOOK A 60-SEC PRODUCTION</h3>
                  <p className="text-xs text-zinc-400 font-sans">
                    Estimated Investment: <strong className="text-amber-400">${estimateData?.totalEstimate?.toLocaleString() || '30,000'}</strong> ({estimateData?.filmType || 'Commercial'} // {estimateData?.timeline || '4'} Wks)
                  </p>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="text-zinc-400 block mb-1">YOUR FULL NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Vance"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 px-4 py-3 rounded-xl text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-400 block mb-1">WORK EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@brand.com"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 px-4 py-3 rounded-xl text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">COMPANY / STUDIO</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Vance Media"
                        className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 px-4 py-3 rounded-xl text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">PROJECT VISION / BRIEF</label>
                    <textarea
                      rows={3}
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      placeholder="Tell us about your brand narrative and target audience..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500 px-4 py-3 rounded-xl text-white outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>CONFIRM & TRANSMIT BRIEF</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">BRIEF TRANSMITTED!</h3>
                <p className="text-xs text-zinc-300 font-mono leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-amber-400">{name}</strong>. Our executive director team will review your project parameters and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white"
                >
                  CLOSE WINDOW
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
