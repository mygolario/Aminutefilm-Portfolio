import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Award, Eye, Filter, ArrowUpRight, Sparkles } from 'lucide-react';
import { playClick } from '../../utils/audioSystem';

export const REEL_DATA = [
  {
    id: 'film-1',
    title: 'CYBER NOIR: CHRONOS',
    category: 'Commercial',
    duration: '00:01:00',
    year: '2026',
    image: '/assets/images/film_noir_amber.jpg',
    description: 'A 60-second futuristic timepiece commercial combining high-speed anamorphic tracking shots with atmospheric amber lighting and volumetric neon fog.',
    quote: 'In 60 seconds, time becomes tangible.',
    awards: ['Cannes Gold Lion 2026', 'Awwwards Site of the Month', 'Red Dot Design Award'],
    breakdown: [
      { timecode: '00:00 - 00:15', title: 'Macro Lens Entrance', desc: 'Extreme close-up of internal tourbillon gearing with 3D depth of field.' },
      { timecode: '00:15 - 00:40', title: 'Cyber City Pursuit', desc: 'Anamorphic tracking vehicle shot on rain-slicked neon highways.' },
      { timecode: '00:40 - 01:00', title: 'Climax & Brand Reveal', desc: 'Volumetric light beam converging into floating brand insignia.' }
    ],
    specs: {
      camera: 'RED V-Raptor XL 8K',
      lens: 'Cooke Anamorphic /i Full Frame 35mm',
      color: 'ACEScg DaVinci Film Print Emulation',
      fps: '24 FPS / 180° Shutter'
    }
  },
  {
    id: 'film-2',
    title: 'THE EMERALD HORIZON',
    category: 'Sci-Fi',
    duration: '00:01:00',
    year: '2026',
    image: '/assets/images/sci_fi_emerald.jpg',
    description: 'An immersive science fiction teaser exploring deep space discovery, featuring custom WebGL particle shaders and emerald luminescent glow.',
    quote: 'Beyond the atmosphere lies absolute silence.',
    awards: ['SIGGRAPH Best VFX Short', 'FWA of the Day', 'Vimeo Staff Pick'],
    breakdown: [
      { timecode: '00:00 - 00:20', title: 'Orbital Descent', desc: 'High-altitude planetary entry with reactive atmospheric burn.' },
      { timecode: '00:20 - 00:45', title: 'Alien Specimen Discovery', desc: 'Luminescent emerald fluid dynamics physics simulation.' },
      { timecode: '00:45 - 01:00', title: 'Hyperspace Jump', desc: 'Kinetic light streak warp velocity transition.' }
    ],
    specs: {
      camera: 'ARRI Alexa 35',
      lens: 'ARRI Master Anamorphic 50mm',
      color: 'Custom LUT - Emerald Deep Space',
      fps: '48 FPS High Frame Rate'
    }
  },
  {
    id: 'film-3',
    title: 'MONOCHROME: HAUTE COUTURE',
    category: 'Fashion',
    duration: '00:01:00',
    year: '2025',
    image: '/assets/images/fashion_monochrome.jpg',
    description: 'A striking high-contrast black-and-white fashion editorial film exploring architectural geometry, shadowplay, and silk liquid motion.',
    quote: 'Elegance distilled into light and shadow.',
    awards: ['Vogue International Film Award', 'Clios Fashion Gold'],
    breakdown: [
      { timecode: '00:00 - 00:18', title: 'Architectural Shadows', desc: 'High-contrast geometric sunlit shadows across concrete columns.' },
      { timecode: '00:18 - 00:42', title: 'Slow-Motion Fabric Drift', desc: '120 FPS high-speed phantom flex silk movement.' },
      { timecode: '00:42 - 01:00', title: 'Monochrome Portraiture', desc: 'Razor-sharp silver haloid film texture reveal.' }
    ],
    specs: {
      camera: 'Phantom Flex 4K',
      lens: 'Leica Summilux-C Primes',
      color: 'Monochrome Silver Halide',
      fps: '120 FPS Super Slow Motion'
    }
  },
  {
    id: 'film-4',
    title: 'CRIMSON DUSK NARRATIVE',
    category: 'Narrative',
    duration: '00:01:00',
    year: '2025',
    image: '/assets/images/narrative_dusk.jpg',
    description: 'An emotional 60-second micro-narrative captured during golden hour in remote mountain terrain, featuring cinematic dusk horizons.',
    quote: 'Every horizon holds a story waiting to be told.',
    awards: ['Sundance Micro-Short Winner', 'Short of the Week'],
    breakdown: [
      { timecode: '00:00 - 00:15', title: 'Ridge Line Silhouette', desc: 'Golden hour backlit landscape with anamorphic lens flare.' },
      { timecode: '00:15 - 00:45', title: 'Emotional Confrontation', desc: 'Intimate portrait lighting with natural wind motion.' },
      { timecode: '00:45 - 01:00', title: 'Twilight Fade', desc: 'Deep crimson twilight horizon dissolving to black.' }
    ],
    specs: {
      camera: 'Sony Venice 2 8K',
      lens: 'Panavision C Series Anamorphic 85mm',
      color: 'Kodak 5219 Film Stock Emulation',
      fps: '24 FPS'
    }
  }
];

export default function ReelMatrixSection({ onSelectFilm }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Commercial', 'Sci-Fi', 'Fashion', 'Narrative'];

  const filteredFilms = activeFilter === 'All'
    ? REEL_DATA
    : REEL_DATA.filter((f) => f.category === activeFilter);

  return (
    <section id="reel" className="py-24 px-4 relative bg-[#070709] border-t border-zinc-800/80">
      {/* Glow background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest">
              <Film className="w-4 h-4" />
              <span>MODULE 01 // SHOWCASE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-tight">
              THE 60-SECOND REEL MATRIX
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl font-sans">
              Click any film card to launch the interactive Cinema Stage, inspect shot breakdowns, camera specs, and director's cut.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 glass-panel p-1.5 rounded-xl border border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setActiveFilter(cat);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                  activeFilter === cat
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Film Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFilms.map((film, idx) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => {
                playClick();
                onSelectFilm(film);
              }}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-zinc-800/80 hover:border-amber-500/50 transition-all duration-500 cursor-pointer shadow-xl"
            >
              {/* Card Image Stage */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/20 to-transparent" />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-black/70 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold tracking-wider">
                    {film.category}
                  </span>
                  <span className="bg-black/70 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-mono text-zinc-300">
                    {film.duration}
                  </span>
                </div>

                {/* Hover Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-16 h-16 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-2xl shadow-amber-500/50 transform group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Flare */}
                <div className="absolute inset-x-0 bottom-0 anamorphic-flare opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Content Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                    {film.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">{film.year}</span>
                </div>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2">
                  {film.description}
                </p>

                {/* Award badges */}
                <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-amber-300/80">
                  <span className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                    <Award className="w-3 h-3 text-amber-400" />
                    {film.awards[0]}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
