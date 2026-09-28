import React from 'react';
import { Tunnel } from '../types';
import { X, ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, Cpu, Clock, Key, Activity, Layers, Download } from 'lucide-react';

interface TunnelDetailModalProps {
  tunnel: Tunnel | null;
  onClose: () => void;
}

export const TunnelDetailModal: React.FC<TunnelDetailModalProps> = ({ tunnel, onClose }) => {
  if (!tunnel) return null;

  const isHighRisk = tunnel.securityScore < 70;
  const isHealthy = tunnel.securityScore >= 85;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-navy-900 border border-cyber-blue/40 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-navy-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Title and Sector Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy-800 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                tunnel.sector === 'Government'
                  ? 'bg-blue-500/20 text-cyan-300 border border-blue-500/40'
                  : tunnel.sector === 'Defence'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {tunnel.sector} Network
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-status-danger/20 text-red-300 border border-status-danger/40 font-mono uppercase">
                {tunnel.criticality} Criticality
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-100 mt-1">
              {tunnel.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {tunnel.endpoints.siteA} ({tunnel.endpoints.ipA}) ↔ {tunnel.endpoints.siteB} ({tunnel.endpoints.ipB})
            </p>
          </div>

          {/* Large Score Card */}
          <div className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl border ${
            isHealthy
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
              : isHighRisk
              ? 'bg-red-950/50 border-red-500/50 text-red-300'
              : 'bg-amber-950/50 border-amber-500/50 text-amber-300'
          }`}>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">Security Score</div>
              <div className="text-3xl font-extrabold font-mono leading-none">
                {tunnel.securityScore}<span className="text-sm font-normal text-slate-400">/100</span>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
              isHealthy
                ? 'bg-emerald-500/20 text-emerald-400'
                : isHighRisk
                ? 'bg-red-500/20 text-red-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              {tunnel.riskStatus} Risk
            </span>
          </div>
        </div>

        {/* Technical Attributes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-5">
          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Mode & IKE</span>
            <span className="text-xs font-bold text-slate-100">{tunnel.mode} Mode ({tunnel.ikeVersion})</span>
          </div>

          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Cipher Suite</span>
            <span className="text-xs font-bold text-slate-100 truncate block">{tunnel.encryption}</span>
          </div>

          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">PFS Status</span>
            <span className={`text-xs font-bold ${
              tunnel.pfs === 'Enabled' ? 'text-emerald-400' : 'text-status-danger'
            }`}>
              {tunnel.pfs}
            </span>
          </div>

          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Replay Protection</span>
            <span className={`text-xs font-bold ${
              tunnel.replayProtection === 'Enabled' ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {tunnel.replayProtection}
            </span>
          </div>

          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Child SA Lifetime</span>
            <span className={`text-xs font-mono font-bold ${
              tunnel.childSaLifetime > tunnel.policyMaxLifetime ? 'text-status-danger' : 'text-emerald-400'
            }`}>
              {tunnel.childSaLifetime.toLocaleString()}s (Max: {tunnel.policyMaxLifetime}s)
            </span>
          </div>

          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">IKE Failures (10m)</span>
            <span className={`text-xs font-mono font-bold ${
              tunnel.failedIkeAttemptsLast10Min > 0 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {tunnel.failedIkeAttemptsLast10Min} Attempts
            </span>
          </div>

          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Metadata Exposure</span>
            <span className="text-xs font-mono font-bold text-vajra-gold">
              {tunnel.metadataExposureScore}/100 Exposure
            </span>
          </div>

          <div className="bg-navy-950/80 p-3 rounded-xl border border-navy-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Tunnel Status</span>
            <span className={`text-xs font-bold flex items-center space-x-1 ${
              tunnel.tunnelStatus === 'Active' ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              <span>{tunnel.tunnelStatus}</span>
            </span>
          </div>
        </div>

        {/* AI Traffic Pattern Inference */}
        <div className="mb-5 p-3.5 rounded-xl bg-navy-950/90 border border-cyber-blue/30">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-cyan-300 flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>AI Metadata Inference: {tunnel.trafficClassification.label}</span>
            </span>
            <span className="font-mono text-vajra-gold text-[11px]">
              Confidence: {tunnel.trafficClassification.confidence}%
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {tunnel.trafficClassification.reason}
          </p>
          <div className="mt-1 text-[10px] text-slate-500 font-mono italic">
            * Metadata-Based Inference — Payload Not Inspected (ESP Remains Encrypted)
          </div>
        </div>

        {/* Findings Panel */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>Evidence-Linked Findings ({tunnel.findings.length})</span>
            <span className="text-[10px] text-slate-400 font-mono">Ground Truth Verified</span>
          </h4>

          {tunnel.findings.length === 0 ? (
            <div className="p-4 rounded-xl bg-navy-950 border border-emerald-500/30 text-emerald-400 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No policy or cryptographic risks detected. Compliant with sovereign VPN guidelines.</span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {tunnel.findings.map((f) => (
                <div
                  key={f.id}
                  className="p-3 rounded-xl bg-navy-950 border border-navy-800 hover:border-navy-700 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold mt-0.5 ${
                        f.severity === 'High'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : f.severity === 'Medium'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-blue-500/20 text-cyan-300 border border-blue-500/40'
                      }`}>
                        {f.id}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-slate-100">{f.title}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          <strong>Evidence:</strong> {f.evidence} ({f.evidenceType})
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-300">
                      {f.status}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-emerald-300/90 bg-navy-900/80 p-2 rounded border border-navy-750">
                    <strong>Action:</strong> {f.recommendation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Recommendations */}
        <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
            Priority Action Plan
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
            {tunnel.recommendations.map((rec, idx) => (
              <li key={idx} className="leading-relaxed">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-3 border-t border-navy-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">
            VajraNet AI Evidence Core • Non-Decryption Architecture
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-slate-200 border border-navy-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
