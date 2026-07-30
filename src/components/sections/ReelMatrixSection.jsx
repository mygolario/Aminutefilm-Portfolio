import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play, Award, ArrowUpRight } from 'lucide-react';
import { playClick } from '../../utils/audioSystem';

export const REEL_DATA = [
  {
    id: 'film-1',
    title: 'CHRONOS: ANAMORPHIC TIMEPIECE',
    category: 'Commercial',
    duration: '00:01:00',
    year: '2026',
    image: '/assets/images/film_noir_amber.jpg',
    description: 'A 60-second luxury timepiece commercial combining high-speed anamorphic tracking shots with atmospheric shadow dynamics.',
    quote: 'In 60 seconds, time becomes tangible.',
    awards: ['Cannes Gold Lion 2026', 'Awwwards Site of the Month', 'Red Dot Design Award'],
    breakdown: [
      { timecode: '00:00 - 00:15', title: 'Macro Lens Entrance', desc: 'Extreme close-up of internal tourbillon gearing with 3D depth of field.' },
      { timecode: '00:15 - 00:40', title: 'Monochrome Pursuit', desc: 'Anamorphic tracking vehicle shot across architectural structures.' },
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
    description: 'An immersive science fiction teaser exploring deep space discovery, featuring custom WebGL particle shaders and volumetric lighting.',
    quote: 'Beyond the atmosphere lies absolute silence.',
    awards: ['SIGGRAPH Best VFX Short', 'FWA of the Day', 'Vimeo Staff Pick'],
    breakdown: [
      { timecode: '00:00 - 00:20', title: 'Orbital Descent', desc: 'High-altitude planetary entry with reactive atmospheric burn.' },
      { timecode: '00:20 - 00:45', title: 'Specimen Discovery', desc: 'Luminescent fluid dynamics physics simulation.' },
      { timecode: '00:45 - 01:00', title: 'Hyperspace Transition', desc: 'Kinetic light streak warp velocity transition.' }
    ],
    specs: {
      camera: 'ARRI Alexa 35',
      lens: 'ARRI Master Anamorphic 50mm',
      color: 'Custom LUT - Monochromatic Deep Space',
      fps: '48 FPS High Frame Rate'
    }
  },
  {
    id: 'film-3',
    title: 'HAUTE COUTURE ARCHITECTURE',
    category: 'Fashion',
    duration: '00:01:00',
    year: '2025',
    image: '/assets/images/fashion_monochrome.jpg',
    description: 'A striking high-contrast fashion editorial film exploring architectural geometry, shadowplay, and fluid silk motion.',
    quote: 'Elegance distilled into light and shadow.',
    awards: ['Vogue International Film Award', 'Clios Fashion Gold'],
    breakdown: [
      { timecode: '00:00 - 00:18', title: 'Geometric Shadows', desc: 'High-contrast geometric sunlit shadows across concrete columns.' },
      { timecode: '00:18 - 00:42', title: 'Fabric Drift', desc: '120 FPS high-speed phantom flex silk movement.' },
      { timecode: '00:42 - 01:00', title: 'Silver Halide Texture', desc: 'Razor-sharp silver film texture reveal.' }
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
    description: 'An emotional 60-second micro-narrative captured during golden hour in remote mountain terrain, featuring cinematic horizons.',
    quote: 'Every horizon holds a story waiting to be told.',
    awards: ['Sundance Micro-Short Winner', 'Short of the Week'],
    breakdown: [
      { timecode: '00:00 - 00:15', title: 'Silhouette Entrance', desc: 'Golden hour backlit landscape with anamorphic flare.' },
      { timecode: '00:15 - 00:45', title: 'Portraiture', desc: 'Intimate portrait lighting with natural wind motion.' },
      { timecode: '00:45 - 01:00', title: 'Twilight Resolve', desc: 'Deep twilight horizon dissolving to black.' }
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
    <section id="reel" className="py-28 px-4 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest">
              <Film className="w-4 h-4 text-white" />
              <span>MODULE 01 // SHOWCASE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              THE REEL MATRIX
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl font-sans">
              Select any film card to launch the high-resolution Cinema Viewport, inspect camera telemetry, lens specifications, and scene breakdowns.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-zinc-900/80 p-1.5 rounded-full border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setActiveFilter(cat);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  activeFilter === cat
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
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
              className="group relative rounded-3xl overflow-hidden glass-panel glass-panel-hover border border-white/10 cursor-pointer"
            >
              {/* Card Image Stage */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-[10px]">
                  <span className="bg-black/80 border border-white/20 px-3 py-1 rounded-full text-white uppercase tracking-wider font-bold">
                    {film.category}
                  </span>
                  <span className="bg-black/80 border border-white/10 px-3 py-1 rounded-full text-zinc-300">
                    {film.duration}
                  </span>
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Content Info */}
              <div className="p-6 space-y-3 font-mono">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center gap-2 uppercase">
                    {film.title}
                    <ArrowUpRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <span className="text-xs text-zinc-500">{film.year}</span>
                </div>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2">
                  {film.description}
                </p>

                {/* Award badges */}
                <div className="pt-2 flex flex-wrap gap-2 text-[10px]">
                  <span className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-white/10 text-zinc-300">
                    <Award className="w-3 h-3 text-white" />
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
