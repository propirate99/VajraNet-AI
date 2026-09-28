import React, { useState } from 'react';
import { mockSAEvents, mockTunnels } from '../data/mockData';
import {
  Clock,
  Radio,
  ShieldCheck,
  Eye,
  Brain,
  Key,
  Lock,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';

export const SATimeline: React.FC = () => {
  const [selectedTunnelId, setSelectedTunnelId] = useState<string>('tun-01');
  const selectedTunnel = mockTunnels.find(t => t.id === selectedTunnelId) || mockTunnels[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              Security Association Digital Twin
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40 font-mono">
              SA LIFECYCLE MONITOR
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual lifecycle and cryptographic rollover tracking for IKE and Child Security Associations.
          </p>
        </div>

        {/* Tunnel Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Select Tunnel:</span>
          <select
            value={selectedTunnelId}
            onChange={(e) => setSelectedTunnelId(e.target.value)}
            className="py-1.5 px-3 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyber-blue font-mono"
          >
            {mockTunnels.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.sector})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Timeline (8 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-cyber-blue/30 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <div>
              <span className="text-[10px] font-mono text-vajra-gold uppercase tracking-wider block font-bold">
                Target SA Session
              </span>
              <h3 className="text-sm font-bold text-slate-100">{selectedTunnel.name}</h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>IKEv2 Session Active</span>
            </span>
          </div>

          {/* Timeline Stream */}
          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyber-blue before:via-emerald-500 before:to-vajra-gold">
            {mockSAEvents.map((evt, idx) => {
              const isObserved = evt.type === 'Observed';
              const isVerified = evt.type === 'Verified';

              return (
                <div key={evt.id} className="relative group">
                  {/* Timeline Node Point */}
                  <div
                    className={`absolute -left-[29px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-125 shadow-md ${
                      isVerified
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                        : isObserved
                        ? 'bg-blue-950 border-cyber-blue text-cyan-300'
                        : 'bg-amber-950 border-amber-400 text-amber-300'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-750 group-hover:border-navy-650 transition">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-vajra-gold">
                        {evt.time}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          isVerified
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-blue-950 text-cyan-300 border border-blue-800'
                        }`}
                      >
                        {evt.type}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                      <span>{evt.event}</span>
                      {evt.spi && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-800 text-cyan-400 border border-cyber-blue/30">
                          SPI: {evt.spi}
                        </span>
                      )}
                    </h4>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {evt.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-navy-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Rekey Cycle: 1,800s Ephemeral Window</span>
            <span className="text-emerald-400">Zero In-Flight Packet Loss</span>
          </div>
        </div>

        {/* Right: Three-Channel Verification Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Channel 1: Observed Packet Evidence */}
          <div className="glass-panel rounded-2xl p-5 border border-emerald-500/30">
            <div className="flex items-center space-x-2 mb-3 text-emerald-400">
              <Eye className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                Observed Evidence (PCAP)
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>ESP traffic detected (Protocol 50 active)</span>
              </li>
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>2 SPI values detected (0xC54B21D8 & 0xF8A91A43)</span>
              </li>
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>UDP/500 IKEv2 negotiation confirmed</span>
              </li>
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Packet flow stable (Mean inter-arrival: 7.8ms)</span>
              </li>
            </ul>
          </div>

          {/* Channel 2: Verified Gateway Telemetry */}
          <div className="glass-panel rounded-2xl p-5 border border-vajra-gold/30">
            <div className="flex items-center space-x-2 mb-3 text-vajra-gold">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                Verified Gateway Telemetry
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-vajra-gold shrink-0 mt-0.5" />
                <span>Cipher Suite: <strong>{selectedTunnel.encryption}</strong></span>
              </li>
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-vajra-gold shrink-0 mt-0.5" />
                <span>PFS: <strong>{selectedTunnel.pfs}</strong> ({selectedTunnel.dhGroup})</span>
              </li>
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-vajra-gold shrink-0 mt-0.5" />
                <span>Anti-Replay Window: <strong>64 packets</strong></span>
              </li>
              <li className="flex items-start space-x-2 p-2 rounded bg-navy-950/70 border border-navy-800">
                <CheckCircle2 className="w-4 h-4 text-vajra-gold shrink-0 mt-0.5" />
                <span>Child SA Lifetime: <strong>{selectedTunnel.childSaLifetime}s</strong> (Compliant)</span>
              </li>
            </ul>
          </div>

          {/* Channel 3: AI Inference */}
          <div className="glass-panel rounded-2xl p-5 border border-cyber-blue/30">
            <div className="flex items-center space-x-2 mb-3 text-cyan-400">
              <Brain className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                AI Metadata Inference
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-navy-950 border border-navy-800">
                <span className="text-[10px] text-slate-400 font-mono uppercase block">Predicted Pattern:</span>
                <span className="font-bold text-slate-100 text-sm">
                  {selectedTunnel.trafficClassification.label}
                </span>
                <div className="mt-1 flex items-center justify-between text-xs font-mono text-vajra-gold">
                  <span>ML Confidence: {selectedTunnel.trafficClassification.confidence}%</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-cyan-300">
                    Random Forest
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-navy-950 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center space-x-2">
                <Lock className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Payload Status: <strong>Encrypted / Not Inspected</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
