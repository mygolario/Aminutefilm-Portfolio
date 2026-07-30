import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Camera, Award, Film } from 'lucide-react';

export default function ProjectModal({ project, onClose, onCursorChange }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = React.useRef(null);

  if (!project) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="modal-backdrop overflow-y-auto px-4 md:px-12 py-8 flex flex-col justify-start items-center">
      {/* Top Header Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-6 z-10 sticky top-4 bg-zinc-950/90 p-4 rounded border border-zinc-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs border border-zinc-800">
            {project.number}
          </div>
          <div>
            <span className="font-mono text-[11px] text-zinc-400 block uppercase">
              {project.category} // {project.year} // {project.duration} MIN
            </span>
            <h3 className="font-display font-extrabold text-xl text-white">
              {project.title}
            </h3>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded bg-zinc-900 text-zinc-300 hover:bg-white hover:text-black flex items-center justify-center transition-all border border-zinc-800"
          onMouseEnter={() => onCursorChange({ type: 'hover', text: 'CLOSE' })}
          onMouseLeave={() => onCursorChange({ type: 'default' })}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-6xl space-y-8 mb-12">
        {/* Cinema Video Player Container */}
        <div className="relative w-full aspect-cinema rounded overflow-hidden bg-black border border-zinc-800 group shadow-2xl">
          <video
            ref={videoRef}
            src={project.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Video Controls Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20 font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded bg-white text-zinc-950 flex items-center justify-center font-bold hover:bg-zinc-200 transition-all shadow-lg"
                onMouseEnter={() => onCursorChange({ type: 'hover', text: isPlaying ? 'PAUSE' : 'PLAY' })}
                onMouseLeave={() => onCursorChange({ type: 'default' })}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-zinc-950" /> : <Play className="w-4 h-4 fill-zinc-950 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition-all border border-zinc-700"
                onMouseEnter={() => onCursorChange({ type: 'hover', text: isMuted ? 'UNMUTE' : 'MUTE' })}
                onMouseLeave={() => onCursorChange({ type: 'default' })}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div>

            <div className="text-xs text-zinc-300 bg-zinc-950/90 px-4 py-2 rounded border border-zinc-800">
              TC {project.timecode}
            </div>
          </div>
        </div>

        {/* Narrative Details & Festival Recognition */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-2xl md:text-3xl font-extrabold text-white">
              {project.subtitle}
            </h4>
            <p className="text-zinc-300 text-lg font-light leading-relaxed">
              {project.logline}
            </p>
          </div>

          {project.award && (
            <div className="p-6 rounded bg-zinc-900 border border-zinc-800 flex items-start gap-4">
              <Award className="w-6 h-6 text-zinc-200 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                  FESTIVAL SELECTION & RECOGNITION
                </span>
                <span className="font-display text-sm font-bold text-white leading-snug block mt-1">
                  {project.award}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Technical Production Breakdown */}
        <div className="p-8 rounded bg-zinc-900/60 border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-3">
            <Camera className="w-4 h-4 text-white" />
            <span>PRODUCTION SPECS & CREDITS</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
            <div>
              <span className="text-[11px] text-zinc-400 block mb-1">DIRECTOR / DOP</span>
              <span className="text-sm text-white font-bold">{project.specs.director}</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-1">CAMERA PACKAGE</span>
              <span className="text-sm text-white font-bold">{project.specs.camera}</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-1">LENS OPTICS</span>
              <span className="text-sm text-white font-bold">{project.specs.lenses}</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-1">FILM STOCK / SENSOR</span>
              <span className="text-sm text-white font-bold">{project.specs.filmStock}</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-1">ASPECT RATIO</span>
              <span className="text-sm text-white font-bold">{project.specs.aspectRatio}</span>
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 block mb-1">COLOR WORKFLOW</span>
              <span className="text-sm text-white font-bold">{project.specs.colorGrade}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[11px] text-zinc-400 block mb-1">CLIENT / PRODUCTION</span>
              <span className="text-sm text-white font-bold">{project.specs.client}</span>
            </div>
          </div>
        </div>

        {/* Film Stills & Frame Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <Film className="w-4 h-4 text-white" />
              <span>PRODUCTION STILLS</span>
            </span>
            <span>3 STILLS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.stills.map((still, i) => (
              <div
                key={i}
                className="aspect-video rounded overflow-hidden bg-zinc-900 border border-zinc-800 group"
              >
                <img
                  src={still}
                  alt={`${project.title} Still ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
