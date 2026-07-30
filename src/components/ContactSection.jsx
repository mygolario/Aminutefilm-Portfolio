import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, Globe, ArrowUpRight, Film } from 'lucide-react';
import { DIRECTOR_BIO } from '../data/projects';

export default function ContactSection({ onCursorChange }) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');

  const email = "contact@aminutefilm.com";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="w-full py-24 px-6 md:px-16 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main CTA Title */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL INQUIRIES & COMMISSIONS</span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-none">
            COMMISSION A <br />
            <span className="text-zinc-400 font-light">
              60-SECOND FILM.
            </span>
          </h2>

          <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            Directing commercials, short narrative films, and music videos globally. Available for worldwide travel.
          </p>
        </div>

        {/* Email Copy Box & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 p-8 rounded bg-zinc-900/60 border border-zinc-800 space-y-6">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block">
              DIRECT EMAIL
            </span>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded bg-zinc-950 border border-zinc-800">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white" />
                <span className="font-mono text-base md:text-lg text-white font-bold">
                  {email}
                </span>
              </div>

              <button
                onClick={copyEmail}
                className={`px-5 py-3 rounded font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-emerald-500 text-zinc-950'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
                onMouseEnter={() => onCursorChange({ type: 'hover', text: copied ? 'COPIED' : 'COPY' })}
                onMouseLeave={() => onCursorChange({ type: 'default' })}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 pt-2 border-t border-zinc-800">
              <span>LOS ANGELES LOCAL TIME</span>
              <span className="text-white font-bold">{time || '12:00:00 PM'} PST</span>
            </div>
          </div>

          {/* Representation & Social */}
          <div className="lg:col-span-5 p-8 rounded bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-4">
                PLATFORMS & CHANNELS
              </span>

              <div className="space-y-3 font-mono text-sm">
                {[
                  { name: "VIMEO / AMINUTEFILM", link: "https://vimeo.com" },
                  { name: "INSTAGRAM / @AMINUTEFILM", link: "https://instagram.com" },
                  { name: "IMDb / AMINUTEFILM DIRECTOR", link: "https://imdb.com" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-all group"
                    onMouseEnter={() => onCursorChange({ type: 'hover', text: 'VISIT' })}
                    onMouseLeave={() => onCursorChange({ type: 'default' })}
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            <div className="font-mono text-[11px] text-zinc-400 border-t border-zinc-800 pt-4 flex items-center justify-between">
              <span>REPRESENTATION: {DIRECTOR_BIO.representation}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-zinc-400" />
            <span>© {new Date().getFullYear()} AMINUTEFILM. ALL RIGHTS RESERVED.</span>
          </div>

          <div>
            <span>CINEMATOGRAPHY PORTFOLIO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
