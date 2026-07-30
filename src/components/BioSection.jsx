import React from 'react';
import { Award, Camera, MapPin, CheckCircle2, Film } from 'lucide-react';
import { DIRECTOR_BIO } from '../data/projects';

export default function BioSection({ onCursorChange }) {
  return (
    <section id="bio" className="w-full py-24 px-6 md:px-16 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">
              <Film className="w-3.5 h-3.5" />
              <span>DIRECTOR STATEMENT & PROFILE</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-white">
              ABOUT AMINUTEFILM
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 bg-zinc-900 px-4 py-2 rounded border border-zinc-800 self-start md:self-auto">
            <MapPin className="w-4 h-4 text-white" />
            <span>{DIRECTOR_BIO.location}</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Director Portrait */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] rounded overflow-hidden border border-zinc-800 bg-zinc-900 group shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                alt="Aminutefilm Director Portrait"
                className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs text-zinc-400 block mb-1 uppercase font-bold">
                  {DIRECTOR_BIO.title}
                </span>
                <p className="font-display text-xl font-extrabold text-white">
                  "{DIRECTOR_BIO.tagline}"
                </p>
              </div>
            </div>
          </div>

          {/* Bio Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Statement */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                [ DIRECTOR STATEMENT ]
              </h3>
              <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed">
                "{DIRECTOR_BIO.statement}"
              </p>
            </div>

            {/* Selected Festival Honors */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4 text-white" />
                <span>SELECTED FESTIVAL SELECTIONS & HONORS</span>
              </h3>

              <div className="space-y-2">
                {DIRECTOR_BIO.awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded bg-zinc-900/60 border border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-zinc-400">
                        {award.year}
                      </span>
                      <div>
                        <span className="font-display text-sm font-bold text-white block">
                          {award.festival}
                        </span>
                        <span className="font-mono text-xs text-zinc-400">
                          Film: {award.project}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment Package */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <Camera className="w-4 h-4 text-white" />
                <span>OWNED CAMERA & OPTICAL KITS</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DIRECTOR_BIO.equipment.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                    <span className="font-mono text-xs text-zinc-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
