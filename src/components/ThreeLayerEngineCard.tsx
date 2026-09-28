import React from 'react';
import { Eye, ShieldCheck, Brain, Lock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export const ThreeLayerEngineCard: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-cyber-blue/30 shadow-glass">
      {/* Background cyber accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-700/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-vajra-gold/20 text-vajra-gold border border-vajra-gold/40">
              Core Innovation
            </span>
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <span>Three-Layer Truth Engine</span>
              <Sparkles className="w-4 h-4 text-vajra-gold" />
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict separation of observable packet evidence, verified gateway logs, and explainable AI inference.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono bg-navy-950/80 px-3 py-1.5 rounded-lg border border-navy-700 text-slate-300">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero Payload Decryption • Patient & Defence Data Safe</span>
        </div>
      </div>

      {/* 3 Gates Pipeline Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 relative">
        {/* Gate 1: OBSERVED */}
        <div className="relative group bg-navy-850/90 hover:bg-navy-800 rounded-xl p-4 border border-emerald-500/30 transition-all duration-300 hover:shadow-cyber-green">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-700">
              GATE 1
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Passive PCAP
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/70 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(22,163,74,0.3)]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">OBSERVED DATA</h4>
              <p className="text-[11px] text-slate-400 font-medium">Source Packets & Traffic</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-navy-900/60 p-2.5 rounded-lg border border-navy-700/60">
            Direct evidence from IKE UDP/500, NAT-T/4500, ESP (Protocol 50), SPI hashes, packet timings, sequence progression, and flow bursts.
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-emerald-300">
            <span>Certainty: 100% Raw Evidence</span>
            <ChevronRight className="w-4 h-4 text-slate-500 hidden md:block" />
          </div>
        </div>

        {/* Gate 2: VERIFIED */}
        <div className="relative group bg-navy-850/90 hover:bg-navy-800 rounded-xl p-4 border border-vajra-gold/30 transition-all duration-300 hover:shadow-cyber-gold">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-amber-950 text-vajra-gold border border-amber-700">
              GATE 2
            </span>
            <span className="text-[10px] text-vajra-gold/80 font-mono flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Authorized Telemetry
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-vajra-gold/50 flex items-center justify-center text-vajra-gold shadow-[0_0_15px_rgba(244,180,0,0.3)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">VERIFIED LOGS</h4>
              <p className="text-[11px] text-slate-400 font-medium">Gateway & Policy Audit</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-navy-900/60 p-2.5 rounded-lg border border-navy-700/60">
            Extracted from authorized strongSwan VICI/swanctl exports: AES-256-GCM cipher suite, PFS DH group, anti-replay window, and Child SA lifetimes.
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-vajra-gold">
            <span>Audit: Policy Ground Truth</span>
            <ChevronRight className="w-4 h-4 text-slate-500 hidden md:block" />
          </div>
        </div>

        {/* Gate 3: AI-INFERRED */}
        <div className="relative group bg-navy-850/90 hover:bg-navy-800 rounded-xl p-4 border border-cyber-blue/30 transition-all duration-300 hover:shadow-cyber-blue">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-blue-950 text-cyber-blue border border-blue-700">
              GATE 3
            </span>
            <span className="text-[10px] text-cyan-400 font-mono flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Explainable ML
            </span>
          </div>

          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-950/70 border border-cyber-blue/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(30,136,229,0.3)]">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">AI-INFERRED</h4>
              <p className="text-[11px] text-slate-400 font-medium">Predictive Threat Insights</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-navy-900/60 p-2.5 rounded-lg border border-navy-700/60">
            XGBoost & Isolation Forest inference on encrypted metadata features (packet sizes, timing, bursts) to classify traffic patterns and detect anomalies.
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-cyan-300">
            <span>Inference: Probabilistic Score</span>
            <span className="text-[10px] bg-navy-950 px-1.5 py-0.5 rounded text-slate-400">Zero Guesswork</span>
          </div>
        </div>
      </div>
    </div>
  );
};
