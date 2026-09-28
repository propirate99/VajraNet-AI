import React from 'react';
import { mockMetadataRadar } from '../data/mockData';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {
  Activity,
  ShieldAlert,
  Brain,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sliders,
  Info
} from 'lucide-react';

export const MetadataExposure: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Encrypted Traffic Metadata Exposure
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-vajra-gold border border-vajra-gold/40 font-mono">
            FLOW SIGNATURE ANALYSIS
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Evaluate what encrypted packet timing, sizes, bursts, and cadences may reveal to passive adversaries—without payload decryption.
        </p>
      </div>

      {/* Mandatory Defensive Disclaimer */}
      <div className="p-4 rounded-xl bg-navy-950 border border-cyber-blue/40 flex items-start space-x-3 text-xs text-slate-300">
        <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-slate-100 text-sm">
            Ethical & Sovereign Security Guarantee
          </h4>
          <p className="mt-0.5 leading-relaxed text-slate-300">
            <strong>VajraNet AI does not decrypt ESP payloads.</strong> This analysis uses strictly non-payload observable flow metadata: packet length distributions, inter-arrival intervals, upload/download ratios, flow durations, and burst patterns (RFC 4303 Section 2.7 Traffic Flow Confidentiality).
          </p>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Exposure Scoring */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 6-Axis Radar Chart (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-cyber-blue/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <div>
              <span className="text-[10px] font-mono text-vajra-gold uppercase tracking-wider block font-bold">
                Target: Secure-Site-A ↔ Secure-Site-B (Defence Enclave)
              </span>
              <h3 className="text-sm font-bold text-slate-100">
                6-Vector Metadata Leakage Profiler
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-navy-950 px-2.5 py-1 rounded border border-navy-750">
              Score: 68/100 (Moderate Exposure)
            </span>
          </div>

          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={mockMetadataRadar}>
                <PolarGrid stroke="#1B477A" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fontSize: 11, fill: '#cbd5e1' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 9, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#071A33', borderColor: '#1E88E5', borderRadius: '8px', fontSize: '11px' }}
                  formatter={(val: any) => [`${val}% Visibility`, 'Exposure Level']}
                />
                <Radar
                  name="Metadata Visibility"
                  dataKey="value"
                  stroke="#F4B400"
                  fill="#F4B400"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-navy-800 text-center font-mono text-xs">
            <div className="p-2 bg-navy-950/70 rounded border border-navy-750">
              <span className="text-slate-400 text-[10px] block">Timing Pattern</span>
              <span className="text-red-400 font-bold">82% High Leakage</span>
            </div>
            <div className="p-2 bg-navy-950/70 rounded border border-navy-750">
              <span className="text-slate-400 text-[10px] block">Burst Uniqueness</span>
              <span className="text-amber-400 font-bold">78% Moderate</span>
            </div>
            <div className="p-2 bg-navy-950/70 rounded border border-navy-750">
              <span className="text-slate-400 text-[10px] block">Endpoint Exposure</span>
              <span className="text-emerald-400 font-bold">45% Low Risk</span>
            </div>
          </div>
        </div>

        {/* Right: AI Inference Card & Technical Recommendations (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* AI Inference Card */}
          <div className="glass-panel rounded-2xl p-5 border border-cyber-blue/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Brain className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono">
                  AI Metadata Inference
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-vajra-gold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">
                CONFIDENCE: 81%
              </span>
            </div>

            <div className="p-3.5 bg-navy-950 rounded-xl border border-navy-800">
              <div className="text-[11px] text-slate-400 uppercase font-mono">Predicted Flow Profile:</div>
              <div className="text-base font-bold text-slate-100 mt-0.5">
                Video-like UDP Stream (Tactical Video / Telemetry)
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="font-semibold text-slate-200">Observed Heuristic Evidence:</div>
              <p className="text-slate-400 leading-relaxed text-[11px] bg-navy-950/60 p-2.5 rounded border border-navy-800">
                Sustained packet rate of ~64 packets/sec, low inter-arrival time standard deviation (&lt;1.8ms), uniform 1380-byte ESP frame clustering matching H.264/RTP packetization.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-navy-900 border border-slate-700/60 text-[10px] text-slate-400 italic">
              <strong>Evaluation Limitation:</strong> This is a supervised metadata classification in a controlled testbed. It does not infer plaintext content, credentials, or internal packet headers.
            </div>
          </div>

          {/* Hardening Recommendations */}
          <div className="glass-panel rounded-2xl p-5 border border-vajra-gold/30 space-y-3">
            <div className="flex items-center space-x-2 text-vajra-gold">
              <Sliders className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Mitigation & Traffic Shaping Actions
              </h4>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Traffic Flow Confidentiality (TFC):</strong> Enable IPsec dummy packet injection and payload padding on gateway edge to flatten size histograms.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Traffic Shaping:</strong> Smooth peak video bursts via token-bucket rate limiting before ESP encapsulation.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Outer Allowlisting:</strong> Bind IPsec peer public IPs to dedicated leased lines or encrypted MACsec backbones.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
