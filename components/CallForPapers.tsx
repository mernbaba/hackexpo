import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { HackerText } from './HackerText';
import { ExternalLink, FileText, Sparkles } from 'lucide-react';
import GuidelinesModal from './GuidelinesModal';

const CallForPapers: React.FC = () => {
  const [showGuidelines, setShowGuidelines] = React.useState(false);
  const [hasAcknowledged, setHasAcknowledged] = React.useState(false);

  return (
    <section id="cfp" className="py-12 md:py-16 relative border-b border-nothing-border overflow-visible group/cfp bg-nothing-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none animate-slow-pan"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-retro-cyan/5 to-purple-500/5 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="relative rounded-2xl border border-white/10 bg-nothing-card/50 backdrop-blur-md overflow-hidden p-8 md:p-12 text-center">

            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-retro-cyan/10 to-transparent translate-x-[-100%] group-hover/cfp:animate-shimmer pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-retro-cyan/30 bg-retro-cyan/10 backdrop-blur-md shadow-[0_0_15px_rgba(165,243,252,0.2)]">
                <Sparkles className="w-3 h-3 text-retro-cyan" />
                <span className="text-[10px] font-mono uppercase text-retro-cyan tracking-[0.2em] font-bold">Call For Papers</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                <HackerText text="SHARE YOUR RESEARCH" />
              </h2>

              <p className="text-retro-text/60 font-mono text-sm max-w-2xl mx-auto leading-relaxed mb-8">
                We are looking for cutting-edge research, novel exploitation techniques, and case studies.
                Submit your talk to be part of the most elite security conference in the region.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  onClick={() => setShowGuidelines(true)}
                >
                  View Guidelines
                </button>
                <a
                  href={hasAcknowledged ? "https://docs.google.com/forms/d/e/1FAIpQLSfVPz7hk1KFOxsN8cmqgIvrJdHexeOxUdX0GkWc_sDoDV527w/viewform" : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative px-8 py-4 rounded-full font-bold font-mono uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(165,243,252,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] ${hasAcknowledged ? "bg-retro-cyan text-nothing-black hover:bg-white" : "bg-gray-600 text-gray-300 opacity-60 cursor-not-allowed"}`}
                  aria-disabled={!hasAcknowledged}
                  tabIndex={hasAcknowledged ? 0 : -1}
                  onClick={e => {
                    if (!hasAcknowledged) e.preventDefault();
                  }}
                >
                  <span className="flex items-center gap-2">
                    Submit Paper
                    <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-retro-cyan/20 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-retro-cyan/20 rounded-br-2xl"></div>

            {showGuidelines && (
              <GuidelinesModal
                open={showGuidelines}
                onClose={() => setShowGuidelines(false)}
                onAcknowledge={() => setHasAcknowledged(true)}
              />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CallForPapers;