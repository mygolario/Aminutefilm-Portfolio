import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Eye, Film } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalReel({ onSelectProject, onCursorChange }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const categories = ['ALL', 'Short Narrative', 'Commercial / Brand', 'Documentary Short', 'Music Video'];

  const filteredProjects = activeFilter === 'ALL'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * filteredProjects.length),
              filteredProjects.length - 1
            );
            setActiveProjectIndex(index);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section 
      id="reel" 
      ref={sectionRef} 
      className="reel-pin-section bg-zinc-950 flex flex-col justify-between py-8"
    >
      {/* Header bar within pinned section */}
      <div className="px-6 md:px-16 flex flex-wrap items-center justify-between gap-4 z-20">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1">
            <Film className="w-3.5 h-3.5" />
            <span>SELECTED FILM ARCHIVE</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-white">
            PROJECT SHOWCASE
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                activeFilter === cat
                  ? 'bg-white text-zinc-950 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
              onMouseEnter={() => onCursorChange({ type: 'hover', text: 'FILTER' })}
              onMouseLeave={() => onCursorChange({ type: 'default' })}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Track */}
      <div className="relative w-full my-auto overflow-visible">
        <div ref={trackRef} className="reel-track">
          {filteredProjects.map((project) => {
            const isHovered = hoveredCardId === project.id;
            return (
              <div
                key={project.id}
                className="reel-card group"
                onClick={() => onSelectProject(project)}
                onMouseEnter={() => {
                  setHoveredCardId(project.id);
                  onCursorChange({ type: 'hover', text: 'VIEW' });
                }}
                onMouseLeave={() => {
                  setHoveredCardId(null);
                  onCursorChange({ type: 'default' });
                }}
              >
                {/* Media Element */}
                {isHovered ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project.poster}
                    alt={project.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all duration-700"
                  />
                )}

                {/* Dark Gradient Overlay */}
                <div className="card-gradient-overlay"></div>

                {/* Top Badges */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 font-mono">
                  <span className="badge-tag">
                    {project.category}
                  </span>
                  <span className="text-xs text-zinc-400">
                    TC {project.timecode}
                  </span>
                </div>

                {/* Center Play Icon Hover Effect */}
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-zinc-950 ml-0.5" />
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="font-mono text-xs text-zinc-400 mb-1 flex items-center gap-2">
                    <span className="text-white font-bold">{project.number}</span>
                    <span>//</span>
                    <span>{project.year}</span>
                    <span>//</span>
                    <span>{project.duration} MIN</span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white group-hover:text-zinc-200 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-300 line-clamp-2 font-light mb-3">
                    {project.logline}
                  </p>

                  <div className="flex items-center justify-between border-t border-zinc-800 pt-3 font-mono text-[11px] text-zinc-400">
                    <span className="uppercase">
                      {project.specs.camera}
                    </span>
                    <span className="text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>OPEN TREATMENT</span>
                      <Eye className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Reel Status & Scroll Progress Bar */}
      <div className="px-6 md:px-16 flex items-center justify-between z-20">
        <div className="font-mono text-xs text-zinc-400">
          <span className="text-white font-bold">
            0{activeProjectIndex + 1}
          </span>
          <span className="mx-2">/</span>
          <span>0{filteredProjects.length} FILMS</span>
        </div>

        {/* Minimal Progress Line */}
        <div className="w-48 md:w-96 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{
              width: `${((activeProjectIndex + 1) / filteredProjects.length) * 100}%`
            }}
          ></div>
        </div>

        <div className="hidden sm:block font-mono text-xs text-zinc-400 uppercase">
          [ SCROLL TO GLIDE ]
        </div>
      </div>
    </section>
  );
}
