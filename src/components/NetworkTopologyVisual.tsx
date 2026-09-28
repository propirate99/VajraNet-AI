import React, { useState } from 'react';
import { Building2, Shield, Activity, Lock, CheckCircle2, AlertTriangle, ArrowUpRight, Zap } from 'lucide-react';

export const NetworkTopologyVisual: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<'govt' | 'defence' | 'health' | null>('govt');

  const nodeData = {
    govt: {
      name: 'Government Capitol Network (Secure Node 01)',
      gateway: '10.1.1.1 (State Gateway Gateway-A)',
      sector: 'Government',
      subnets: '10.10.1.0/24 (Secretariat & District Hubs)',
      activeTunnels: 6,
      status: 'Warning (PFS Policy Drift in District Office)',
      cipher: 'AES-256-GCM / Fallback AES-CBC',
      pfs: 'Mixed (Action Required)'
    },
    defence: {
      name: 'Military Defence Infrastructure (Secure Node 02)',
      gateway: '10.2.2.1 (Tactical Gateway Edge-B)',
      sector: 'Defence',
      subnets: '10.10.2.0/24 (Operations & Radar Command)',
      activeTunnels: 3,
      status: 'Operational (Strict Sovereign Air-Gapped Mode)',
      cipher: 'AES-256-GCM + Group 19/20 ECP',
      pfs: 'Enforced (100% Compliant)'
    },
    health: {
      name: 'Healthcare & ABDM Grid (Secure Node 03)',
      gateway: '10.3.3.1 (Hospital Apex Gateway-C)',
      sector: 'Healthcare',
      subnets: '10.10.3.0/24 (AIIMS HQ, Diagnostic Labs, Telemedicine)',
      activeTunnels: 3,
      status: 'Operational (Patient-Data-Safe / Zero Plaintext)',
      cipher: 'AES-256-GCM (AEAD Authentication)',
      pfs: 'Enforced (Group 14 MODP 2048)'
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-cyber-blue/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyber-blue/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-700/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono">
              Live Topology Twin
            </span>
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <span>National Sovereign IPsec VPN Triad</span>
              <Lock className="w-4 h-4 text-emerald-400" />
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time inter-site secure connectivity across Government, Defence, and Healthcare enclaves.
          </p>
        </div>

        <span className="text-[11px] font-mono text-cyan-400 bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-700 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Encrypted ESP Protocol 50 Active</span>
        </span>
      </div>

      {/* Triad Visual Canvas */}
      <div className="relative my-6 h-72 rounded-xl bg-navy-950/70 border border-navy-750 flex items-center justify-center p-4 overflow-hidden">
        {/* SVG Laser Beams */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="beamGovtHealth" x1="25%" y1="75%" x2="50%" y2="25%">
              <stop offset="0%" stopColor="#1E88E5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="beamHealthDef" x1="50%" y1="25%" x2="75%" y2="75%">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="beamGovtDef" x1="25%" y1="75%" x2="75%" y2="75%">
              <stop offset="0%" stopColor="#1E88E5" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Triad Connections */}
          <line x1="25%" y1="75%" x2="50%" y2="25%" stroke="url(#beamGovtHealth)" strokeWidth="3" filter="url(#glow)" strokeDasharray="6,4" />
          <line x1="50%" y1="25%" x2="75%" y2="75%" stroke="url(#beamHealthDef)" strokeWidth="3" filter="url(#glow)" strokeDasharray="6,4" />
          <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="url(#beamGovtDef)" strokeWidth="3" filter="url(#glow)" strokeDasharray="6,4" />

          {/* Pulsing data packets */}
          <circle cx="37.5%" cy="50%" r="4" fill="#00D2FF" className="animate-ping" />
          <circle cx="62.5%" cy="50%" r="4" fill="#16A34A" className="animate-ping" />
          <circle cx="50%" cy="75%" r="4" fill="#F4B400" className="animate-ping" />
        </svg>

        {/* Central Label */}
        <div className="absolute z-10 text-center bg-navy-900/90 border border-cyber-blue/40 px-3 py-1.5 rounded-lg shadow-glass backdrop-blur-md">
          <div className="text-[10px] font-mono font-bold text-vajra-gold uppercase tracking-wider">
            AES-256-GCM Tunnel Mode
          </div>
          <div className="text-[9px] text-slate-400 font-mono">
            SPI Rollover Active • Anti-Replay ON
          </div>
        </div>

        {/* Top Node: Healthcare Services */}
        <button
          onClick={() => setSelectedNode('health')}
          className={`absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center group transition-all duration-300 ${
            selectedNode === 'health' ? 'scale-110' : 'hover:scale-105'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-lg ${
            selectedNode === 'health'
              ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-cyber-green'
              : 'bg-navy-800 border-emerald-600/60 text-emerald-400'
          }`}>
            <Activity className="w-7 h-7" />
          </div>
          <span className="mt-1 text-xs font-bold text-slate-100 flex items-center space-x-1">
            <span>Healthcare (Node 03)</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400">10.3.3.1</span>
        </button>

        {/* Bottom Left Node: Government Capitol */}
        <button
          onClick={() => setSelectedNode('govt')}
          className={`absolute bottom-4 left-10 sm:left-16 flex flex-col items-center group transition-all duration-300 ${
            selectedNode === 'govt' ? 'scale-110' : 'hover:scale-105'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-lg ${
            selectedNode === 'govt'
              ? 'bg-blue-950 border-cyber-blue text-cyan-300 shadow-cyber-blue'
              : 'bg-navy-800 border-cyber-blue/60 text-cyber-blue'
          }`}>
            <Building2 className="w-7 h-7" />
          </div>
          <span className="mt-1 text-xs font-bold text-slate-100">
            Government (Node 01)
          </span>
          <span className="text-[10px] font-mono text-cyan-400">10.1.1.1</span>
        </button>

        {/* Bottom Right Node: Military Defence */}
        <button
          onClick={() => setSelectedNode('defence')}
          className={`absolute bottom-4 right-10 sm:right-16 flex flex-col items-center group transition-all duration-300 ${
            selectedNode === 'defence' ? 'scale-110' : 'hover:scale-105'
          }`}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-lg ${
            selectedNode === 'defence'
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-cyber-blue'
              : 'bg-navy-800 border-cyan-600/60 text-cyan-400'
          }`}>
            <Shield className="w-7 h-7" />
          </div>
          <span className="mt-1 text-xs font-bold text-slate-100">
            Military Defence (Node 02)
          </span>
          <span className="text-[10px] font-mono text-cyan-400">10.2.2.1</span>
        </button>
      </div>

      {/* Selected Node Details Card */}
      {selectedNode && (
        <div className="bg-navy-950/80 rounded-xl p-4 border border-navy-700/80 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-navy-800 gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold text-vajra-gold uppercase tracking-wider">
                Inspected Node Details
              </span>
              <h4 className="text-sm font-bold text-slate-100">{nodeData[selectedNode].name}</h4>
            </div>
            <span className="text-xs font-mono text-slate-300 bg-navy-900 px-2.5 py-1 rounded border border-navy-700">
              Gateway: {nodeData[selectedNode].gateway}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-xs">
            <div>
              <span className="text-slate-400 text-[11px] block">Sector Enclave</span>
              <span className="font-semibold text-slate-200">{nodeData[selectedNode].sector}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Active Tunnels</span>
              <span className="font-semibold font-mono text-cyan-400">{nodeData[selectedNode].activeTunnels} Established</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">PFS Status</span>
              <span className="font-semibold text-vajra-gold">{nodeData[selectedNode].pfs}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Operational Status</span>
              <span className="font-semibold text-emerald-400 truncate block">{nodeData[selectedNode].status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
