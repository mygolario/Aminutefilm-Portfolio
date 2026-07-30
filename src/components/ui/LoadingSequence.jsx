import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingSequence({ onComplete }) {
  const [frameCounter, setFrameCounter] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 24fps frame counter countdown logic
    const interval = setInterval(() => {
      setFrameCounter((prev) => {
        if (prev >= 24) {
          clearInterval(interval);
          return 24;
        }
        return prev + 1;
      });
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(100, prev + Math.floor(Math.random() * 8) + 4);
      });
    }, 50);

    const timer = setTimeout(() => {
      setIsFinished(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800);
    }, 1700);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const padNumber = (num) => String(num).padStart(2, '0');

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#060608] p-8 md:p-14 select-none"
        >
          {/* Top Bar: Timecode Telemetry */}
          <div className="flex items-center justify-between text-xs font-mono-code tracking-widest text-zinc-500 uppercase">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>REC // 24.00 FPS</span>
            </div>
            <span>TC // 00:00:{padNumber(frameCounter)}:00</span>
          </div>

          {/* Center Brand Title & Progress */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <h1 className="text-3xl md:text-6xl font-light tracking-[0.25em] text-white uppercase font-mono">
                A MINUTE FILM
              </h1>
              <p className="text-xs md:text-sm tracking-[0.4em] text-zinc-400 uppercase font-light">
                Architectural Studio & Luxury Motion
              </p>
            </motion.div>

            {/* Subtle Shutter Progress Bar */}
            <div className="mt-12 w-48 md:w-64 h-[2px] bg-zinc-800 relative overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <div className="mt-3 text-[10px] font-mono-code tracking-widest text-zinc-600">
              INITIALIZING LENS ENGINE [{progress}%]
            </div>
          </div>

          {/* Bottom Bar: Soundstage Coordinates */}
          <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-600 tracking-wider">
            <span>SOUNDSTAGE 01 // AMF-2026</span>
            <span>4K // ANAMORPHIC DNG</span>
          </div>

          {/* Shutter Blade Exit Animations */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#060608] z-10 origin-top pointer-events-none"
            exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#060608] z-10 origin-bottom pointer-events-none"
            exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
