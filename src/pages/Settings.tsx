import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  Lock,
  Save,
  CheckCircle2,
  HardDrive,
  Sliders,
  Server,
  Layers,
  Database
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [ikeVersion, setIkeVersion] = useState('IKEv2');
  const [requirePfs, setRequirePfs] = useState(true);
  const [requireReplay, setRequireReplay] = useState(true);
  const [maxLifetime, setMaxLifetime] = useState(3600);
  const [minAlertScore, setMinAlertScore] = useState(70);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(70);
  const [pcapRetention, setPcapRetention] = useState(30);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Security policy baseline saved locally.');
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            System Settings
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40 font-mono">
            LOCAL ENGINE CONFIG
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Configure on-premises deployment constraints, cryptographic policy baselines, and evidence classification thresholds.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Deployment Settings */}
        <div className="glass-panel rounded-2xl p-6 border border-cyber-blue/30 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-navy-800 text-slate-100">
            <Server className="w-5 h-5 text-cyber-blue" />
            <h3 className="text-base font-bold">1. Deployment Settings</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-navy-950 rounded-xl border border-navy-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Deployment Mode</span>
                <span className="text-slate-400 text-[11px]">Strict Air-Gapped / Sovereign Lab Mode</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold text-[11px]">
                ON-PREMISES
              </span>
            </div>

            <div className="p-3.5 bg-navy-950 rounded-xl border border-navy-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">External Cloud Export</span>
                <span className="text-slate-400 text-[11px]">Outbound PCAP or metadata sync</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-red-950 text-red-400 border border-red-800 font-mono font-bold text-[11px]">
                DISABLED
              </span>
            </div>

            <div className="p-3.5 bg-navy-950 rounded-xl border border-navy-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">External AI API Calls</span>
                <span className="text-slate-400 text-[11px]">Public LLM / cloud inference endpoints</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-red-950 text-red-400 border border-red-800 font-mono font-bold text-[11px]">
                DISABLED
              </span>
            </div>

            <div className="p-3.5 bg-navy-950 rounded-xl border border-navy-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Local Model Execution</span>
                <span className="text-slate-400 text-[11px]">Embedded scikit-learn / XGBoost inference</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold text-[11px]">
                ENABLED
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Security Policy Baseline */}
        <div className="glass-panel rounded-2xl p-6 border border-vajra-gold/30 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-navy-800 text-slate-100">
            <Sliders className="w-5 h-5 text-vajra-gold" />
            <h3 className="text-base font-bold">2. Security Policy Baseline</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Required IKE Protocol Version
              </label>
              <select
                value={ikeVersion}
                onChange={(e) => setIkeVersion(e.target.value)}
                className="w-full py-2 px-3 bg-navy-950 border border-navy-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyber-blue font-mono"
              >
                <option value="IKEv2">IKEv2 (Mandatory Modern Standard)</option>
                <option value="IKEv1">IKEv1 (Legacy Deprecated)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Maximum Child SA Lifetime (Seconds)
              </label>
              <input
                type="number"
                value={maxLifetime}
                onChange={(e) => setMaxLifetime(Number(e.target.value))}
                className="w-full py-2 px-3 bg-navy-950 border border-navy-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyber-blue font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Standard: 3,600s (1 hour)</span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Minimum Score Alert Threshold
              </label>
              <input
                type="number"
                value={minAlertScore}
                onChange={(e) => setMinAlertScore(Number(e.target.value))}
                className="w-full py-2 px-3 bg-navy-950 border border-navy-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyber-blue font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Flags high risk when score &lt; 70</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <label className="p-3 bg-navy-950 rounded-xl border border-navy-800 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-slate-200">
                Enforce Perfect Forward Secrecy (PFS) Mandate
              </span>
              <input
                type="checkbox"
                checked={requirePfs}
                onChange={(e) => setRequirePfs(e.target.checked)}
                className="w-4 h-4 accent-cyber-blue rounded"
              />
            </label>

            <label className="p-3 bg-navy-950 rounded-xl border border-navy-800 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-slate-200">
                Mandatory Anti-Replay Protection Verification
              </span>
              <input
                type="checkbox"
                checked={requireReplay}
                onChange={(e) => setRequireReplay(e.target.checked)}
                className="w-4 h-4 accent-cyber-blue rounded"
              />
            </label>
          </div>
        </div>

        {/* Section 3: Evidence Classification & Data Retention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-navy-800 text-slate-100">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold">3. Evidence Classification</h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-300">Observed PCAP Evidence</span>
                <span className="font-mono text-emerald-400 font-bold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-300">Authorized Telemetry Verification</span>
                <span className="font-mono text-emerald-400 font-bold">ENABLED</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-navy-950 border border-navy-800">
                <span className="text-slate-300">AI Metadata Inference</span>
                <span className="font-mono text-emerald-400 font-bold">ENABLED</span>
              </div>
              <div className="p-2 rounded bg-navy-950 border border-navy-800">
                <label className="block text-slate-300 font-semibold mb-1">
                  AI Confidence Threshold: {aiConfidenceThreshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={aiConfidenceThreshold}
                  onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-cyber-blue"
                />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-cyber-blue/30 space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-navy-800 text-slate-100">
              <Database className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold">4. Data Retention</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  PCAP Trace Retention (Days)
                </label>
                <select
                  value={pcapRetention}
                  onChange={(e) => setPcapRetention(Number(e.target.value))}
                  className="w-full py-2 px-3 bg-navy-950 border border-navy-700 rounded-lg text-slate-100 font-mono"
                >
                  <option value={7}>7 Days (Immediate Triage)</option>
                  <option value={30}>30 Days (Standard Audit)</option>
                  <option value={90}>90 Days (CERT-In Window)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Analysis Report Retention (Days)
                </label>
                <input
                  type="number"
                  defaultValue={180}
                  className="w-full py-2 px-3 bg-navy-950 border border-navy-700 rounded-lg text-slate-100 font-mono"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800 flex items-center justify-between text-slate-300">
                <span>Sensitive Data Export</span>
                <span className="text-red-400 font-mono font-bold">PERMANENTLY BLOCKED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue to-blue-700 hover:from-blue-600 hover:to-cyber-blue text-white text-xs font-bold shadow-cyber-blue transition"
          >
            <Save className="w-4 h-4 text-vajra-gold" />
            <span>Save Settings Locally</span>
          </button>
        </div>
      </form>
    </div>
  );
};
