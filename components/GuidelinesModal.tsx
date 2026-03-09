import React, { useRef, useState } from "react";

interface GuidelinesModalProps {
  open: boolean;
  onClose: () => void;
  onAcknowledge: () => void;
}

const guidelinesContent = (
  <div className="space-y-8">
    <div>
      <h2 className="text-2xl font-bold text-retro-cyan mb-4">CFP Practicality Guidelines – Please Read Before Submitting</h2>
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-retro-cyan mb-2">1. Submission Requirements</h3>
        <ul className="list-disc pl-6 text-base text-slate-100 mb-2">
          <li>When speakers submit their proposal, the form should explicitly ask how they will meet the practical threshold.</li>
          <li>Practical Breakdown: Require a <span className="font-semibold">"Content Split"</span> section. Ask the speaker to estimate the percentage of time spent on:
            <ul className="list-circle pl-8">
              <li>Theory/Background: <span className="font-semibold">Max 30%</span></li>
              <li>Live Demos/Code Walkthroughs/Lab Exercises: <span className="font-semibold">Target 70%</span></li>
            </ul>
          </li>
          <li>Proof of Concept (PoC): For a professional review, require a link to a GitHub repository, a recorded 2-minute demo video, or a technical whitepaper. This verifies that the "70% practical" claim is backed by working research.</li>
          <li>Hardware/Environment Needs: Since the talk is lab-heavy, ask for specific requirements (e.g., "High-speed internet for cloud labs," "On-stage power for IoT devices," or "Specific RF shielding").</li>
        </ul>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-retro-cyan mb-2">2. Reviewer Scoring Rubric</h3>
        <table className="w-full text-slate-100 text-base mb-2 border border-slate-700">
          <thead>
            <tr className="bg-retro-cyan text-slate-900">
              <th className="p-2">Criteria</th>
              <th className="p-2">5 Points (Excellent)</th>
              <th className="p-2">1 Point (Poor)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Hands-on Utility</td>
              <td className="p-2">Includes a live exploit, a new tool release, or a step-by-step lab.</td>
              <td className="p-2">Entirely slide-based with no demonstration of the concepts.</td>
            </tr>
            <tr>
              <td className="p-2">Technical Replicability</td>
              <td className="p-2">The audience can download the PoC and run it themselves immediately.</td>
              <td className="p-2">The research is proprietary or cannot be replicated by the community.</td>
            </tr>
            <tr>
              <td className="p-2">Demo Risk/Reward</td>
              <td className="p-2">A complex live demo that proves a high level of preparation.</td>
              <td className="p-2">No demo, or a "canned" video of a very simple task.</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-retro-cyan mb-2">3. The "Practicality" Filter</h3>
        <ul className="list-disc pl-6 text-base text-slate-100 mb-2">
          <li>To maintain a professional standard, include a Mandatory <span className="font-semibold">"Show, Don't Tell"</span> Checkbox for reviewers:</li>
          <li className="mt-2">[ ] Does this submission meet the <span className="font-semibold">70% Practical Threshold</span>?</li>
          <li className="mt-2">Reviewer Note: If the abstract suggests a "State of the Industry" or "Product Overview" talk with no technical demonstration, it should be flagged for a lower track or rejected.</li>
        </ul>
      </section>
      <section>
        <h3 className="text-lg font-semibold text-retro-cyan mb-2">Professional Tip: The "Lab-Ready" Speaker</h3>
        <p className="text-base text-slate-100">For speakers who meet the 70% practical requirement, offer a <span className="font-semibold">"Lab-Ready"</span> badge in the conference schedule. This signals to attendees that they should bring their laptops and be prepared to follow along, which significantly raises the perceived value of the session.</p>
      </section>
    </div>
  </div>
);

const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ open, onClose, onAcknowledge }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  if (!open) return null;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
    setScrolledToBottom(atBottom);
  };

  const handleAcknowledge = (checked: boolean) => {
    setAcknowledged(checked);
  };

  const handleSubmit = () => {
    if (acknowledged) {
      onAcknowledge();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-lg my-8 mx-4">
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-retro-cyan"
          onClick={onClose}
          aria-label="Close guidelines"
        >
          ×
        </button>
        <h1 className="text-3xl font-bold text-white mb-6">Guidelines Overview</h1>
        <fieldset className="flex flex-col border-0 p-0">
          <legend className="text-2xl font-bold text-retro-cyan mb-4 text-center w-full px-0">CFP Practicality Guidelines – Please Read Before Submitting</legend>
          <div
            ref={scrollRef}
            className="max-h-[20rem] overflow-y-auto pr-2 text-base text-slate-100 space-y-3 border border-slate-700 rounded-lg mb-6 p-4"
            tabIndex={0}
            onScroll={handleScroll}
            aria-label="CFP Guidelines Scrollable Content"
          >
            {guidelinesContent}
          </div>
          <div className="flex flex-col items-start gap-3 mt-6 mb-4">
            <input
              type="checkbox"
              id="cfp-guidelines-ack-modal"
              checked={acknowledged}
              onChange={e => handleAcknowledge(e.target.checked)}
              className="mt-1 accent-retro-cyan focus:ring-retro-cyan scale-125"
              aria-required="true"
            />
            <label htmlFor="cfp-guidelines-ack-modal" className="text-lg text-retro-cyan font-semibold select-none">
              I have read and agree to the CFP Practicality Guidelines, including the 70% practical content requirement, PoC expectation, and Lab-Ready criteria.
            </label>
          </div>
          <button
            type="button"
            disabled={!acknowledged}
            aria-disabled={!acknowledged}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${acknowledged ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-600 opacity-60 cursor-not-allowed"}`}
            onClick={handleSubmit}
          >
            I have read and agreed
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default GuidelinesModal;
