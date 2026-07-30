import React, { useState } from 'react';
import DotMatrixBanner from './components/ui/DotMatrixBanner';
import Navbar from './components/ui/Navbar';
import HeroSection from './components/sections/HeroSection';
import ReelMatrixSection from './components/sections/ReelMatrixSection';
import SimulatorSection from './components/sections/SimulatorSection';
import ProcessTimelineSection from './components/sections/ProcessTimelineSection';
import ProjectEstimatorSection from './components/sections/ProjectEstimatorSection';
import Footer from './components/ui/Footer';
import CinemaModal from './components/ui/CinemaModal';
import BookingModal from './components/ui/BookingModal';
import LoadingSequence from './components/ui/LoadingSequence';
import CustomCursor from './components/ui/CustomCursor';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingEstimate, setBookingEstimate] = useState(null);

  const handleOpenFilm = (film) => {
    setSelectedFilm(film);
    setIsCinemaOpen(true);
  };

  const handleOpenBooking = (estimateData = null) => {
    if (estimateData) {
      setBookingEstimate(estimateData);
    }
    setIsBookingOpen(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-white selection:text-black relative">
      {/* Cinematic 24fps Loading Sequence */}
      {isLoading && <LoadingSequence onComplete={() => setIsLoading(false)} />}

      {/* Dual-Layer Spring-Dampened Custom Cursor & Spotlight */}
      <CustomCursor />

      {/* Top Kinetic Dot-Matrix Telemetry Ticker */}
      <DotMatrixBanner />

      {/* Floating Architectural Glassmorphic Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="relative">
        <HeroSection
          onExploreReel={() => scrollToSection('reel')}
          onOpenSimulator={() => scrollToSection('simulator')}
        />

        <ReelMatrixSection onSelectFilm={handleOpenFilm} />

        <SimulatorSection />

        <ProcessTimelineSection />

        <ProjectEstimatorSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CinemaModal
        film={selectedFilm}
        isOpen={isCinemaOpen}
        onClose={() => setIsCinemaOpen(false)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        estimateData={bookingEstimate}
      />
    </div>
  );
}

