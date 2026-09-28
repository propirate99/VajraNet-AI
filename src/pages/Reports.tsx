import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Printer,
  X
} from 'lucide-react';

export const Reports: React.FC = () => {
  const [activeReportModal, setActiveReportModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleGenerate = (type: string) => {
    setToastMessage('Report generated locally. No sensitive data was exported.');
    setActiveReportModal(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 shadow-2xl flex items-center space-x-3 animate-bounce">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Assessment Reports
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40 font-mono">
            AIR-GAPPED COMPILATION
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Generate evidence-aware executive summaries, technical audit briefs, and sovereign policy-drift dossiers locally.
        </p>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Executive Security Report */}
        <div className="glass-panel rounded-2xl p-6 border border-cyber-blue/30 flex flex-col justify-between hover:border-cyber-blue/60 transition group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-cyber-blue/20 text-cyber-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">
              Executive Security Report
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Designed for CISOs and ministry leadership. Features high-level posture scores (78/100), national sector impact, top critical vulnerabilities, and executive remediation priorities.
            </p>

            <div className="mt-4 pt-3 border-t border-navy-750 space-y-1.5 text-[11px] text-slate-300 font-mono">
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>3-Page Briefing Format</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400">
                <span>Audience: CISO / Director General</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleGenerate('Executive')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyber-blue to-blue-700 hover:from-blue-600 hover:to-cyber-blue text-white text-xs font-bold shadow-cyber-blue transition flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-vajra-gold" />
            <span>Generate Executive PDF</span>
          </button>
        </div>

        {/* Card 2: Technical Security Report */}
        <div className="glass-panel rounded-2xl p-6 border border-vajra-gold/30 flex flex-col justify-between hover:border-vajra-gold/60 transition group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-vajra-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">
              Technical Security Report
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Complete engineering audit. Details PCAP extraction proofs, IKEv2 negotiation timestamps, SPI rollover timelines, strongSwan VICI telemetry, and exact swanctl.conf remediation snippets.
            </p>

            <div className="mt-4 pt-3 border-t border-navy-750 space-y-1.5 text-[11px] text-slate-300 font-mono">
              <div className="flex items-center space-x-1.5 text-vajra-gold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deep Packet & SA Diagnostics</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400">
                <span>Audience: SOC Lead / Network Architect</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleGenerate('Technical')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-vajra-gold to-amber-600 hover:from-amber-500 hover:to-vajra-gold text-navy-950 font-extrabold shadow-cyber-gold transition flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-navy-950" />
            <span>Generate Technical PDF</span>
          </button>
        </div>

        {/* Card 3: Compliance & Policy Drift Report */}
        <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-500/60 transition group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-100">
              Compliance & Policy Drift Report
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Automated delta auditor. Compares organizational policy baselines against deployed gateway runtime configurations, flagging unapproved ciphers, disabled PFS, and excessive SA lifetimes.
            </p>

            <div className="mt-4 pt-3 border-t border-navy-750 space-y-1.5 text-[11px] text-slate-300 font-mono">
              <div className="flex items-center space-x-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CERT-In & ABDM Compliance Matrix</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400">
                <span>Audience: Compliance Auditor / CERT-In</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleGenerate('Compliance')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-cyber-green transition flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Generate Compliance PDF</span>
          </button>
        </div>
      </div>

      {/* Report Scope Card */}
      <div className="glass-panel rounded-2xl p-6 border border-cyber-blue/30 space-y-3">
        <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Sovereign Report Scope & Security Safeguards</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-navy-950/80 rounded-xl border border-navy-800">
            <span className="font-semibold text-emerald-400 block mb-1">✓ Authorized Metadata Only</span>
            <span className="text-slate-400 text-[11px]">Compiled strictly from local PCAP headers, timing intervals, and gateway telemetry dumps.</span>
          </div>

          <div className="p-3 bg-navy-950/80 rounded-xl border border-navy-800">
            <span className="font-semibold text-emerald-400 block mb-1">✓ Zero External Cloud Export</span>
            <span className="text-slate-400 text-[11px]">All charts, metrics, and PDFs render directly on-premises. Zero public cloud AI calls.</span>
          </div>

          <div className="p-3 bg-navy-950/80 rounded-xl border border-navy-800">
            <span className="font-semibold text-emerald-400 block mb-1">✓ Payload Remains Encrypted</span>
            <span className="text-slate-400 text-[11px]">Zero plaintext inspection. Compliant with ABDM patient data safety and defence secrecy.</span>
          </div>

          <div className="p-3 bg-navy-950/80 rounded-xl border border-navy-800">
            <span className="font-semibold text-emerald-400 block mb-1">✓ Cryptographic Audit Trail</span>
            <span className="text-slate-400 text-[11px]">Includes SHA-256 integrity fingerprints for audit repeatability in CERT-In reviews.</span>
          </div>
        </div>
      </div>

      {/* Mock Report Preview Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-navy-900 border border-cyber-blue/40 rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto font-sans">
            <button
              onClick={() => setActiveReportModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-navy-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Document Header */}
            <div className="pb-4 border-b border-navy-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src="/assets/vajranet-logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-100 uppercase tracking-wide">
                    VAJRANET AI • {activeReportModal.toUpperCase()} DOSSIER
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Classification: RESTRICTED // SOVEREIGN ASSESSMENT // SIH-2026
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800">
                HASH: 8F3D...E921
              </span>
            </div>

            {/* Report Content Body */}
            <div className="my-5 p-5 bg-navy-950 rounded-xl border border-navy-800 space-y-4 text-xs text-slate-300">
              <div className="flex justify-between border-b border-navy-850 pb-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Target Network Environment</span>
                  <span className="font-bold text-slate-100">National Sovereign IPsec Testbed</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Assessment Timestamp</span>
                  <span className="font-mono text-slate-100">2026-09-28 04:20:00 IST</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">1. Executive Posture Synthesis</h4>
                <p className="leading-relaxed text-slate-300">
                  During this assessment cycle, 12 authorized IPsec VPN tunnels were evaluated across Government, Defence, and Healthcare enclaves. The global composite posture score is <strong>78/100 (Moderate Risk)</strong>. Seven tunnels meet sovereign cryptographic baselines, while two links exhibit urgent vulnerabilities requiring immediate remediation.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-status-danger/10 border border-status-danger/40">
                <h5 className="font-bold text-red-300 mb-1">Primary Vulnerability Finding: PFS-001</h5>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  <strong>District Office ↔ State Data Centre (Government Enclave):</strong> Child SA negotiation negotiated without Diffie-Hellman Group (PFS Disabled). Child SA Lifetime configured at 14,400s (400% above 3,600s threshold). 12 failed authentication attempts detected in a 10-minute window.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-100 text-sm mb-1">2. Evidence Separation Ledger</h4>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                  <div className="p-2 bg-navy-900 rounded border border-navy-750">
                    <span className="text-emerald-400 font-bold block">Observed Evidence</span>
                    <span>IKEv2 UDP/500, ESP Protocol 50, SPI Rollovers</span>
                  </div>
                  <div className="p-2 bg-navy-900 rounded border border-navy-750">
                    <span className="text-vajra-gold font-bold block">Verified Telemetry</span>
                    <span>AES-256-GCM, PFS State, 64-pkt Replay Window</span>
                  </div>
                  <div className="p-2 bg-navy-900 rounded border border-navy-750">
                    <span className="text-cyan-400 font-bold block">AI-Inferred</span>
                    <span>Flow Metadata Classification (81% Confidence)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-navy-900/80 rounded border border-navy-750 text-[11px] text-slate-400">
                <strong>Certified Security Assertion:</strong> VajraNet AI confirms zero decrypted packets were generated, stored, or transferred during this evaluation.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-navy-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">
                Generated via VajraNet AI On-Premises Engine
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold border border-navy-700 flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setActiveReportModal(null)}
                  className="px-4 py-1.5 rounded-lg bg-cyber-blue hover:bg-blue-600 text-white text-xs font-semibold shadow-cyber-blue"
                >
                  Download Signed PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
