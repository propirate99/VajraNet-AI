import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, Activity, EyeOff, CheckCircle2, ArrowRight, Zap, Layers, Server, Globe2, FileText, ChevronRight } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-cyber-500 selection:text-navy-950 relative overflow-x-hidden">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-cyber-500/10 rounded-full blur-3xl pointer-events-none -top-40 -left-40"></div>
      <div className="absolute w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none top-1/3 -right-40"></div>

      {/* Top Sovereign Navigation Bar */}
      <header className="h-18 border-b border-navy-800/80 bg-navy-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-800 to-navy-900 border border-cyber-500/40 p-1.5 shadow-md shadow-cyber-500/10 flex items-center justify-center">
            <img src="/assets/vajranet-logo.png" alt="VajraNet AI" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base tracking-wider text-white">VAJRANET</span>
              <span className="px-1.5 py-0.5 rounded bg-cyber-500/20 text-cyber-400 text-xs font-mono font-bold border border-cyber-500/40">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight block">SOVEREIGN IPSEC ASSESSMENT</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/architecture"
            className="text-xs font-medium text-slate-300 hover:text-cyber-400 transition-colors hidden sm:block"
          >
            Pipeline Architecture
          </Link>
          <Link
            to="/reports"
            className="text-xs font-medium text-slate-300 hover:text-cyber-400 transition-colors hidden sm:block"
          >
            Sample Reports
          </Link>
          <Link
            to="/login"
            className="px-3.5 py-1.5 rounded-lg border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-xs font-medium text-slate-200 transition-all"
          >
            Evaluator Login
          </Link>
          <Link
            to="/overview"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-500 to-cyber-600 hover:from-cyber-400 hover:to-cyber-500 text-navy-950 text-xs font-bold shadow-lg shadow-cyber-500/20 transition-all flex items-center space-x-1.5"
          >
            <span>Launch Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 sm:px-12 pt-16 pb-20 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono mb-6 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-gold-400" />
          <span>Smart India Hackathon 2026 • Sovereign Defensive Cyber Defense</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
          Verify the Tunnel. <br />
          <span className="bg-gradient-to-r from-cyber-400 via-teal-300 to-gold-400 bg-clip-text text-transparent">
            Protect the Mission.
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          An on-premises, evidence-aware cybersecurity platform that assesses authorized IPsec VPN PCAP metadata, gateway telemetry, and baseline policies for Government, Defence, and Healthcare enclaves—<strong className="text-white font-semibold">without decrypting sensitive payloads</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => navigate('/overview')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyber-500 to-cyber-600 hover:from-cyber-400 hover:to-cyber-500 text-navy-950 font-bold text-sm shadow-xl shadow-cyber-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Open Sovereign Operations Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-900/90 hover:bg-navy-800 border border-navy-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>One-Click Evaluator Presets</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Key Guarantees Banner */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl text-left">
          <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold font-mono">
              <EyeOff className="w-4 h-4" />
              <span>ZERO PAYLOAD DECRYPTION</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              RFC 4303 compliant metadata extraction. Operates strictly over outer packet timing, SPIs, and headers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-cyber-400 text-xs font-bold font-mono">
              <Layers className="w-4 h-4" />
              <span>3-LAYER TRUTH ENGINE</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Observed PCAP vs. Verified Gateway Telemetry vs. AI-Inferred Flow Fingerprinting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-900/60 border border-navy-800/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-bold font-mono">
              <Lock className="w-4 h-4" />
              <span>100% AIR-GAPPED READY</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Runs fully on-premises with local Random Forest inference and offline ReportLab cryptographic PDF signing.
            </p>
          </div>
        </div>
      </section>

      {/* Triad Showcase Section */}
      <section className="px-6 sm:px-12 py-16 bg-navy-900/40 border-t border-b border-navy-800/60 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-mono font-bold text-cyber-400 uppercase tracking-widest">
              Critical Infrastructure Sectors
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Unified Security Posture Across The National Triad
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Government */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                  GOVERNMENT
                </span>
                <span className="text-xs font-mono text-slate-400">Score: 74/100</span>
              </div>
              <h4 className="text-lg font-bold text-white">State Data Centres & Secretariats</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monitors inter-departmental links for configuration drift, long SA lifetimes, missing Perfect Forward Secrecy, and unverified anti-replay settings.
              </p>
              <div className="text-xs font-mono text-amber-400/90 pt-2 border-t border-navy-800">
                Key Target: District Office to SDC
              </div>
            </div>

            {/* Defence */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-cyan-500/30 hover:border-cyan-500/60 transition-all shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                  DEFENCE
                </span>
                <span className="text-xs font-mono text-slate-400">Score: 88/100</span>
              </div>
              <h4 className="text-lg font-bold text-white">Tactical Air-Gapped Networks</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enforces ECP-384 Diffie-Hellman, anti-traffic analysis packet padding, strict rekey rotation intervals, and constant packet cadence verification.
              </p>
              <div className="text-xs font-mono text-cyan-400/90 pt-2 border-t border-navy-800">
                Key Target: Command Post to Forward Base
              </div>
            </div>

            {/* Healthcare */}
            <div className="p-6 rounded-2xl bg-navy-900/80 border border-emerald-500/30 hover:border-emerald-500/60 transition-all shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                  HEALTHCARE
                </span>
                <span className="text-xs font-mono text-slate-400">Score: 82/100</span>
              </div>
              <h4 className="text-lg font-bold text-white">Hospitals & Diagnostic Networks</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Protects EHR transmission, organ donor registries, and DICOM imaging tunnels against metadata fingerprinting and retransmission collapse.
              </p>
              <div className="text-xs font-mono text-emerald-400/90 pt-2 border-t border-navy-800">
                Key Target: Hospital HQ to Diagnostic Lab
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-navy-800 bg-navy-950 px-6 sm:px-12 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          <div>
            VAJRANET AI • Sovereign AI-Powered IPsec VPN Security Assessment Framework
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400">RFC 4303 Zero-Payload</span>
            <span>•</span>
            <span className="text-cyber-400">SIH 2026 Sovereign Edition</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
