
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import About from './components/About';
import Organizers from './components/Organizers';
import Advisory from './components/Advisory';
import ReviewBoard from './components/ReviewBoard';
import Speakers from './components/Speakers';
import Partners from './components/Partners';
import Tickets from './components/Tickets';
import Memories from './components/Memories';
import FlowTeamSection from './components/FlowTeamSection';
import TrustedBy from './components/TrustedBy';
import Footer from './components/Footer';
import CallForPapers from './components/CallForPapers';
import { ScrollReveal } from './components/ScrollReveal';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <BrowserRouter>
      <div className="bg-nothing-black min-h-screen text-retro-text selection:bg-retro-cyan selection:text-nothing-black font-sans overflow-x-hidden relative animate-fade-in">
        {/* Global Grain/Noise Overlay */}
        <div className="bg-noise mix-blend-overlay"></div>

        <Navbar />
        <main className="relative z-10">
          <ScrollReveal>
            <Hero />
          </ScrollReveal>

          <EventDetails />

          <About />

          <Organizers />

          <Advisory />

          <ReviewBoard />

          <Speakers />

          <CallForPapers />

          <Partners />

          <Tickets />

          <TrustedBy />

          <FlowTeamSection />

          <Memories />
        </main>
        <Footer />

        {/* Utility style for fade-in after loading and background animations */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          
          @keyframes slow-pan {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 0%; }
          }
          .animate-slow-pan {
            background-size: 200% 200%;
            animation: slow-pan 30s linear infinite;
          }

          @keyframes breathe {
            0%, 100% { transform: scale(1) translate(-50%, -50%); opacity: 0.5; }
            50% { transform: scale(1.15) translate(-50%, -50%); opacity: 0.8; }
          }
          /* Specialized breathe for centered elements using translate */
          .animate-breathe-center {
            animation: breathe 8s ease-in-out infinite;
            transform-origin: center;
          }
          
          @keyframes breathe-simple {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
          .animate-breathe {
            animation: breathe-simple 10s ease-in-out infinite;
          }

          @keyframes radar {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-radar {
            animation: radar 4s linear infinite;
          }

          @keyframes matrix-rain {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
          }
          .animate-matrix {
            animation: matrix-rain 20s linear infinite;
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}

export default App;
