import React, { useState } from 'react';
import { Logo } from './Logo';
import { CYBER_SOCIETY_LINKS, CRAC_LINKS } from '../constants';
import { CodeOfConductModal } from './CodeOfConductModal';
import { Check, Copy, ArrowRight, Terminal, ShieldCheck, Activity } from 'lucide-react';
import { HackerText } from './HackerText';

const Footer: React.FC = () => {
  const [showCoC, setShowCoC] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
    } else if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyEmail = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const FOOTER_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'Memories', href: '#memories' },
    { label: 'Speakers', href: '#speakers' },
    { label: 'Register', href: '#tickets' },
  ];

  const renderLink = (link: any) => {
    const isEmail = link.url.startsWith('mailto:');
    const email = isEmail ? link.name : null;
    const isCopied = email && copiedEmail === email;

    return (
      <li key={link.name}>
        {isEmail ? (
          <div className="flex items-center gap-3 group w-full">
            <a
              href={link.url}
              className="text-sm text-retro-text/60 hover:text-white flex items-center gap-2 transition-colors flex-1 min-w-0"
            >
              <div className={`p-1.5 rounded bg-white/5 border border-white/5 group-hover:border-${link.color.split('-')[1] || 'white'}/30 transition-colors`}>
                <link.icon className={`w-3.5 h-3.5 transition-colors ${link.color.replace('hover:', '')}`} />
              </div>
              <span className="break-all font-mono text-xs">{link.name}</span>
            </a>
            <button
              onClick={(e) => handleCopyEmail(e, email!)}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-retro-text/40 hover:text-retro-cyan transition-colors shrink-0 border border-transparent hover:border-retro-cyan/30"
              title="Copy Email"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        ) : (
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-retro-text/60 hover:text-white flex items-center gap-3 group"
          >
            <div className="p-1.5 rounded bg-white/5 border border-white/5 group-hover:border-retro-cyan/30 group-hover:bg-retro-cyan/10 transition-all duration-300">
              <link.icon className="w-3.5 h-3.5 group-hover:text-retro-cyan transition-colors" />
            </div>
            <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
          </a>
        )}
      </li>
    );
  };

  return (
    <>
      <footer id="footer" className="bg-nothing-black border-t border-nothing-border relative z-20 overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-nothing-black via-transparent to-nothing-black pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative z-10">

          {/* Newsletter / Terminal Section */}
          <div className="mb-20 p-1 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md">
            <div className="bg-nothing-black/80 rounded-xl border border-white/10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">

              {/* Visual Glitch Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-retro-cyan/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-retro-cyan/10 transition-colors duration-500"></div>

              <div className="flex-1 space-y-4 relative z-10">
                <div className="flex items-center gap-2 text-retro-cyan mb-2">
                  <Terminal className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-widest">System Broadcast</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  <HackerText text="JOIN THE NEURAL NETWORK" />
                </h3>
                <p className="text-retro-text/60 max-w-md">
                  Subscribe to receive encrypted updates, CTF hints, and exclusive access codes directly to your inbox.
                </p>
              </div>

              <div className="w-full md:w-auto min-w-[320px] relative z-10">
                <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-xl focus-within:border-retro-cyan/50 focus-within:bg-white/10 transition-all duration-300">
                  <input
                    type="email"
                    placeholder="enter_email_address..."
                    className="bg-transparent border-none text-white placeholder-white/30 text-sm font-mono px-4 py-3 w-full focus:outline-none"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <button className="px-6 py-3 bg-retro-cyan text-nothing-black font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white transition-colors flex items-center gap-2 group/btn">
                    <span>Inject</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3 pl-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono text-green-500/80 uppercase tracking-wider">Gateway Secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-nothing-border pb-16">

            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              <div
                className="flex items-center gap-3 cursor-pointer group w-fit"
                onClick={(e) => handleNavClick(e, '#home')}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-retro-cyan/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Logo className="w-12 h-12 relative z-10 transition-transform duration-500 group-hover:rotate-180" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-2xl tracking-tighter text-white group-hover:text-retro-cyan transition-colors">HACKEXPO</span>
                  <span className="text-[10px] font-mono text-retro-text/50 uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">Security Conf. 2026</span>
                </div>
              </div>
              <p className="text-retro-text/60 max-w-sm font-mono text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                Authentic. Secure. Future-proof. <br />
                The interface for the next generation of security professionals.
              </p>
              <div className="flex gap-4">

              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2">
              <h4 className="font-mono text-xs uppercase text-retro-cyan mb-8 flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-cyan rounded-full"></span>
                Index
              </h4>
              <ul className="space-y-4">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-retro-text/60 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setShowCoC(true)}
                    className="text-sm text-retro-text/60 hover:text-retro-cyan transition-all text-left hover:translate-x-2 inline-block"
                  >
                    Code of Conduct
                  </button>
                </li>
              </ul>
            </div>

            {/* CyberSociety */}
            <div className="lg:col-span-3">
              <h4 className="font-mono text-xs uppercase text-retro-cyan mb-8 flex items-center gap-2">
                <span className="w-1 h-1 bg-retro-cyan rounded-full"></span>
                CyberSociety
              </h4>
              <ul className="space-y-3">
                {CYBER_SOCIETY_LINKS.map(renderLink)}
              </ul>
            </div>

            {/* CRAC */}
            <div className="lg:col-span-3">
              <h4 className="font-mono text-xs uppercase text-purple-400 mb-8 flex items-center gap-2">
                <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                CRAC Learning
              </h4>
              <ul className="space-y-3">
                {CRAC_LINKS.map(renderLink)}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-retro-text/40 uppercase">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
              <ShieldCheck className="w-3 h-3 text-green-500" />
              <span className="text-green-500/80">System Normal</span>
              <span className="w-1 h-1 rounded-full bg-white/20 mx-1"></span>
              <span>v2.0.24</span>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <p>© 2026 HackExpo Security Conf.</p>
              <span className="hidden md:inline text-white/10">|</span>
              <p className="hover:text-retro-cyan transition-colors cursor-pointer">Design: System_Override</p>
            </div>
          </div>

        </div>
      </footer>

      <CodeOfConductModal isOpen={showCoC} onClose={() => setShowCoC(false)} />
    </>
  );
};

export default Footer;
