import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Radio,
  FileCode,
  ShieldCheck,
  Brain,
  Sliders,
  CheckCircle2,
  Lock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      num: 1,
      name: 'IPsec VPN Testbed',
      tech: 'strongSwan / Linux VICI',
      desc: 'Two or more multi-node strongSwan gateway instances running in tunnel/transport modes across simulated wide-area network links. Configured with both sovereign secure profiles (IKEv2, AES-256-GCM, PFS) and non-compliant legacy profiles.'
    },
    {
      num: 2,
      name: 'Traffic Capture Layer',
      tech: 'tcpdump / TShark / Wireshark',
      desc: 'Non-intrusive network tap capturing live IKE UDP/500, NAT-T UDP/4500, and ESP (Protocol 50) datagrams. Generates local PCAP files alongside simultaneous gateway telemetry logs (swanctl --list-sas).'
    },
    {
      num: 3,
      name: 'Feature Extraction Engine',
      tech: 'Python / Scapy / PyShark / Pandas',
      desc: 'Parses raw packet traces to extract non-payload flow features: SPI sequences, packet timing intervals, inter-arrival standard deviations, frame size distributions, burst durations, and directional ratios.'
    },
    {
      num: 4,
      name: 'AI & Compliance Engines',
      tech: 'Protocol Analysis + YAML Rules + XGBoost',
      desc: 'Triple-engine analysis: 1) Protocol engine checks IKE/ESP syntax; 2) Rule engine validates cryptographic compliance against sovereign baseline YAML; 3) ML engine executes supervised Random Forest / XGBoost models and Isolation Forest anomaly detectors on flow metadata.'
    },
    {
      num: 5,
      name: 'Risk Core (Evidence-Aware Scoring)',
      tech: 'Weighted Truth Matrix',
      desc: 'Synthesizes observed PCAP proof, verified gateway telemetry, and probabilistic AI inferences into a deterministic 0-100 posture score. Builds the 5x5 Threat Matrix and prioritizes findings by national enclave criticality.'
    },
    {
      num: 6,
      name: 'Presentation Layer',
      tech: 'React 19 + TypeScript + Tailwind + FastAPI',
      desc: 'Air-gapped cybersecurity command dashboard. Renders real-time SA Digital Twin timelines, interactive topology nodes, 6-vector metadata radars, and executive/technical PDF audit dossiers.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            VajraNet AI System Architecture
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-vajra-gold/20 text-vajra-gold border border-vajra-gold/40 font-mono">
            SIH 2026 SPECIFICATION
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          End-to-end sovereign pipeline: from strongSwan testbed to evidence-aware scoring and air-gapped reporting.
        </p>
      </div>

      {/* Official Architecture Diagram Display (From User Image 3) */}
      <div className="glass-panel rounded-2xl p-4 border border-cyber-blue/40 overflow-hidden relative group">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800">
          <span className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyber-blue" />
            <span>Architecture Blueprint (Official Reference)</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            6-STAGE MODULAR STACK
          </span>
        </div>

        <div className="mt-3 rounded-xl overflow-hidden border border-navy-750 bg-navy-950 flex items-center justify-center p-2">
          <img
            src="/assets/system-architecture.jpg"
            alt="VajraNet AI System Architecture"
            className="w-full max-h-[420px] object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Interactive 6-Stage Pipeline Explorer */}
      <div className="glass-panel rounded-2xl p-6 border border-cyber-blue/30 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800">
          <div>
            <span className="text-[10px] font-mono text-vajra-gold uppercase tracking-wider block font-bold">
              Pipeline Component Breakdown
            </span>
            <h3 className="text-sm font-bold text-slate-100">
              Inspect Each Tier of the Sovereign Architecture
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Click any stage below to inspect</span>
        </div>

        {/* Stage Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stages.map((stg) => {
            const isActive = activeStage === stg.num;
            return (
              <button
                key={stg.num}
                onClick={() => setActiveStage(stg.num)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-cyber-blue/20 border-cyber-blue text-white shadow-cyber-blue ring-1 ring-cyber-blue'
                    : 'bg-navy-950/80 border-navy-750 text-slate-400 hover:text-slate-200 hover:bg-navy-900'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span>STAGE 0{stg.num}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />}
                </div>
                <div className="text-xs font-bold truncate text-slate-100">{stg.name}</div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        {(() => {
          const current = stages.find(s => s.num === activeStage)!;
          return (
            <div className="p-5 rounded-xl bg-navy-950/90 border border-cyber-blue/30 space-y-3 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-navy-800 gap-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyber-blue text-white">
                    Stage {current.num}
                  </span>
                  <h4 className="text-base font-bold text-slate-100">{current.name}</h4>
                </div>
                <span className="text-xs font-mono text-vajra-gold bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/80">
                  Tech: {current.tech}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {current.desc}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Sovereign Security Guarantee Enforced</span>
                </span>
                <span className="text-slate-400">Air-Gapped Operation Capable</span>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
