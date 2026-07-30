import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HorizontalReel from './components/HorizontalReel';
import ProjectModal from './components/ProjectModal';
import BioSection from './components/BioSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';
import { PROJECTS_DATA } from './data/projects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [cursorState, setCursorState] = useState({ type: 'default', text: '' });

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleCursorChange = (newState) => {
    setCursorState(newState);
  };

  const handleOpenMasterReel = () => {
    setSelectedProject(PROJECTS_DATA[0]);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white selection:bg-amber-500 selection:text-zinc-950">
      {/* Film Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Custom Contextual Cursor */}
      <CustomCursor cursorState={cursorState} />

      {/* Glass Navigation Bar */}
      <Navbar
        onOpenReel={handleOpenMasterReel}
        onCursorChange={handleCursorChange}
      />

      {/* Hero Section */}
      <Hero
        onOpenReel={handleOpenMasterReel}
        onCursorChange={handleCursorChange}
      />

      {/* Core Scroll-Driven Horizontal Film Reel Track */}
      <HorizontalReel
        onSelectProject={(project) => setSelectedProject(project)}
        onCursorChange={handleCursorChange}
      />

      {/* Director Bio & Gear Section */}
      <BioSection onCursorChange={handleCursorChange} />

      {/* Contact & Footer Section */}
      <ContactSection onCursorChange={handleCursorChange} />

      {/* Interactive Project Lightbox Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onCursorChange={handleCursorChange}
        />
      )}
    </div>
  );
}
