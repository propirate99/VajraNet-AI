import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export const RemediationWidget: React.FC = () => {
  const [isRemediated, setIsRemediated] = useState<boolean>(false);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-cyber-blue/30 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-700/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40 font-mono">
              SIH Interactive Story
            </span>
            <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
              <span>Remediation Impact Simulator</span>
              <Zap className="w-4 h-4 text-vajra-gold" />
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time before-and-after posture transformation for: <span className="font-semibold text-slate-200">District Office ↔ State Data Centre</span>
          </p>
        </div>

        {/* Action Toggle Button */}
        <button
          onClick={() => setIsRemediated(!isRemediated)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 shadow-md ${
            isRemediated
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-cyber-green'
              : 'bg-gradient-to-r from-vajra-gold to-amber-600 hover:from-amber-500 hover:to-vajra-gold text-navy-950 font-extrabold shadow-cyber-gold'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRemediated ? '' : 'animate-spin-slow'}`} />
          <span>{isRemediated ? 'Reset to Pre-Remediation State' : 'Apply Automated Remediation Fix'}</span>
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* BEFORE REMEDIATION */}
        <div
          className={`rounded-xl p-5 border transition-all duration-300 ${
            !isRemediated
              ? 'bg-status-danger/10 border-status-danger/60 shadow-cyber-red ring-1 ring-status-danger/30'
              : 'bg-navy-850/60 border-navy-700/60 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-status-danger animate-pulse"></span>
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                1. Initial State (Pre-Fix)
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-danger/20 text-red-400 border border-status-danger/40">
              HIGH RISK
            </span>
          </div>

          <div className="flex items-baseline space-x-3 mb-4">
            <span className="text-4xl font-extrabold font-mono text-status-danger">54</span>
            <span className="text-xs text-slate-400 font-mono">/ 100 Posture Score</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start space-x-2 text-red-300/90 bg-status-danger/10 p-2 rounded">
              <AlertTriangle className="w-4 h-4 text-status-danger shrink-0 mt-0.5" />
              <span>Perfect Forward Secrecy (PFS) is <strong>DISABLED</strong> on Child SA</span>
            </div>
            <div className="flex items-start space-x-2 text-red-300/90 bg-status-danger/10 p-2 rounded">
              <AlertTriangle className="w-4 h-4 text-status-danger shrink-0 mt-0.5" />
              <span>Child SA Lifetime is <strong>14,400s</strong> (Exceeds 3,600s threshold)</span>
            </div>
            <div className="flex items-start space-x-2 text-amber-300/90 bg-amber-500/10 p-2 rounded">
              <AlertTriangle className="w-4 h-4 text-vajra-gold shrink-0 mt-0.5" />
              <span>12 failed IKE authentication attempts logged in last 10 minutes</span>
            </div>
            <div className="flex items-start space-x-2 text-slate-400 bg-navy-900 p-2 rounded">
              <span className="text-slate-500">!</span>
              <span>Replay protection status unverified from telemetry</span>
            </div>
          </div>
        </div>

        {/* AFTER REMEDIATION */}
        <div
          className={`rounded-xl p-5 border transition-all duration-300 ${
            isRemediated
              ? 'bg-status-success/15 border-status-success/70 shadow-cyber-green ring-2 ring-status-success/40'
              : 'bg-navy-850/60 border-navy-700/60 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isRemediated ? 'bg-status-success animate-ping' : 'bg-slate-500'}`}></span>
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                2. Post-Remediation State
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-success/20 text-emerald-400 border border-status-success/40">
              LOW / MODERATE RISK
            </span>
          </div>

          <div className="flex items-baseline space-x-3 mb-4">
            <span className="text-4xl font-extrabold font-mono text-status-success">86</span>
            <span className="text-xs text-slate-400 font-mono">/ 100 Posture Score (+32 pts)</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start space-x-2 text-emerald-300/90 bg-status-success/10 p-2 rounded">
              <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
              <span>PFS <strong>ENABLED</strong> with Diffie-Hellman Group 14 (MODP 2048)</span>
            </div>
            <div className="flex items-start space-x-2 text-emerald-300/90 bg-status-success/10 p-2 rounded">
              <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
              <span>Child SA Lifetime enforced to policy baseline: <strong>3,600s</strong></span>
            </div>
            <div className="flex items-start space-x-2 text-emerald-300/90 bg-status-success/10 p-2 rounded">
              <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
              <span>Peer PSK & Certificate trust anchor refreshed; zero auth drops</span>
            </div>
            <div className="flex items-start space-x-2 text-emerald-300/90 bg-status-success/10 p-2 rounded">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Anti-replay protection window verified: 64 packets</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Diff Box */}
      <div className="mt-5 p-3.5 bg-navy-950/90 rounded-xl border border-navy-700/80 font-mono text-xs">
        <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>strongSwan VICI / swanctl.conf Policy Delta:</span>
          <span className="text-vajra-gold text-[10px]">Zero Re-encryption Required</span>
        </div>
        <pre className="text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
          {isRemediated ? (
            <>
              <span className="text-emerald-400">+ esp_proposals = aes256gcm16-modp2048 # PFS Enabled</span>
              {'\n'}
              <span className="text-emerald-400">+ lifetime = 3600s # Policy-Compliant SA Window</span>
              {'\n'}
              <span className="text-emerald-400">+ replay_window = 64 # Anti-Replay Active</span>
            </>
          ) : (
            <>
              <span className="text-red-400">- esp_proposals = aes128-sha256 # Insecure: PFS Disabled</span>
              {'\n'}
              <span className="text-red-400">- lifetime = 14400s # Non-Compliant 4-hour Exposure</span>
              {'\n'}
              <span className="text-slate-500"># Click 'Apply Automated Remediation Fix' above to execute delta</span>
            </>
          )}
        </pre>
      </div>
    </div>
  );
};
