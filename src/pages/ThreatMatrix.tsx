import React, { useState } from 'react';
import { mockThreatMatrix } from '../data/mockData';
import { ThreatMatrixItem, Sector, EvidenceType } from '../types';
import {
  ShieldAlert,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Search,
  Grid,
  List,
  Building2,
  Shield,
  Activity,
  ArrowRight
} from 'lucide-react';

export const ThreatMatrix: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [filterSector, setFilterSector] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredThreats = mockThreatMatrix.filter((t) => {
    const matchesSev = filterSeverity === 'All' || t.severity === filterSeverity;
    const matchesSec = filterSector === 'All' || t.sector === filterSector;
    const matchesSearch =
      t.finding.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tunnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSev && matchesSec && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Threat Matrix and Remediation
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-status-danger/20 text-red-400 border border-status-danger/40 font-mono">
            EVIDENCE-LINKED TRIAGE
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Cryptographic weaknesses, SA policy violations, and metadata leakage prioritized by national enclave criticality.
        </p>
      </div>

      {/* 5x5 Risk Heatmap & Severity Counts (Inspired by Image 1 & 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 5x5 Risk Matrix Canvas (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-cyber-blue/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-navy-800">
            <div>
              <span className="text-[10px] font-mono text-vajra-gold uppercase tracking-wider block font-bold">
                Dynamic 5x5 Risk Matrix
              </span>
              <h3 className="text-sm font-bold text-slate-100">
                Threat Impact vs Exposure Probability
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-950 text-slate-400 border border-navy-750">
              Correlated with Gateway Ground Truth
            </span>
          </div>

          {/* 5x5 Heatmap Grid */}
          <div className="relative p-2 bg-navy-950/80 rounded-xl border border-navy-750">
            <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
              {/* Row 5: Critical Impact */}
              <div className="p-2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 flex items-center justify-center h-14">
                MED
              </div>
              <div className="p-2 rounded bg-orange-600/30 text-orange-300 font-bold border border-orange-500/50 flex items-center justify-center h-14">
                HIGH
              </div>
              <div className="p-2 rounded bg-red-600/40 text-red-300 font-bold border border-red-500/60 flex flex-col items-center justify-center h-14 shadow-cyber-red">
                <span>CRITICAL</span>
                <span className="text-[9px] text-white font-mono bg-red-950 px-1 rounded">PFS-001</span>
              </div>
              <div className="p-2 rounded bg-red-700/60 text-white font-extrabold border border-red-400 flex items-center justify-center h-14">
                CRIT+
              </div>

              {/* Row 4: High Impact */}
              <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center justify-center h-14">
                MED
              </div>
              <div className="p-2 rounded bg-orange-600/30 text-orange-300 font-bold border border-orange-500/50 flex flex-col items-center justify-center h-14">
                <span>HIGH</span>
                <span className="text-[9px] text-white font-mono bg-orange-950 px-1 rounded">PFS-003</span>
              </div>
              <div className="p-2 rounded bg-orange-600/40 text-red-300 font-bold border border-orange-500/60 flex items-center justify-center h-14">
                HIGH
              </div>
              <div className="p-2 rounded bg-red-600/40 text-red-300 font-bold border border-red-500/60 flex items-center justify-center h-14">
                CRIT
              </div>

              {/* Row 3: Medium Impact */}
              <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 flex flex-col items-center justify-center h-14">
                <span>MED</span>
                <span className="text-[9px] text-white font-mono bg-amber-950 px-1 rounded">LIFE-001</span>
              </div>
              <div className="p-2 rounded bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 flex flex-col items-center justify-center h-14">
                <span>MED</span>
                <span className="text-[9px] text-white font-mono bg-amber-950 px-1 rounded">AUTH-001</span>
              </div>
              <div className="p-2 rounded bg-orange-600/30 text-orange-300 font-bold border border-orange-500/50 flex flex-col items-center justify-center h-14">
                <span>MED</span>
                <span className="text-[9px] text-white font-mono bg-orange-950 px-1 rounded">META-001</span>
              </div>
              <div className="p-2 rounded bg-orange-600/30 text-orange-300 font-bold border border-orange-500/50 flex items-center justify-center h-14">
                HIGH
              </div>

              {/* Row 2: Low Impact */}
              <div className="p-2 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-emerald-500/30 text-emerald-300 font-bold border border-emerald-500/40 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center justify-center h-14">
                MED
              </div>
              <div className="p-2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center justify-center h-14">
                MED
              </div>
              <div className="p-2 rounded bg-orange-600/20 text-orange-300 font-bold border border-orange-500/40 flex items-center justify-center h-14">
                HIGH
              </div>

              {/* Row 1: Negligible Impact */}
              <div className="p-2 rounded bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30 flex flex-col items-center justify-center h-14">
                <span>INFO</span>
                <span className="text-[9px] text-white font-mono bg-blue-950 px-1 rounded">COMPLY-001</span>
              </div>
              <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center justify-center h-14">
                LOW
              </div>
              <div className="p-2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center justify-center h-14">
                MED
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
              <span>← Minimal Exposure Probability</span>
              <span>Extreme Exposure Probability →</span>
            </div>
          </div>
        </div>

        {/* Right: Severity Breakdown & Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-cyber-blue/30 space-y-3">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
              Severity Heatmap Categories
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-red-950/60 border border-status-danger/40 text-red-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-danger"></span>
                  <span className="font-bold">Critical / High Severity</span>
                </div>
                <span className="font-mono font-bold">2 Findings</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-amber-950/60 border border-status-warning/40 text-amber-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-warning"></span>
                  <span className="font-bold">Medium Severity</span>
                </div>
                <span className="font-mono font-bold">4 Findings</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-blue-950/60 border border-cyber-blue/40 text-cyan-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-blue"></span>
                  <span className="font-bold">Informational / Compliant</span>
                </div>
                <span className="font-mono font-bold">1 Finding</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border border-vajra-gold/30">
            <div className="flex items-center space-x-2 mb-2 text-vajra-gold">
              <Shield className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                CERT-In Baseline Alignment
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              All findings correlate against the Government of India Cyber Security Directions (2022/2026), mandating continuous verification of remote access systems, PFS enforcement, and anti-replay auditability.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-xl p-4 border border-cyber-blue/30 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search finding ID, description or tunnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyber-blue font-mono"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="py-2 px-3 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyber-blue"
          >
            <option value="All">All Severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Informational">Informational</option>
          </select>

          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="py-2 px-3 bg-navy-950 border border-navy-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyber-blue"
          >
            <option value="All">All Sectors</option>
            <option value="Government">Government</option>
            <option value="Defence">Defence</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      {/* Threat Matrix Table */}
      <div className="glass-panel rounded-2xl border border-cyber-blue/30 overflow-hidden shadow-glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950/90 text-slate-400 font-mono uppercase text-[11px] border-b border-navy-750">
              <tr>
                <th className="py-3.5 px-3 font-semibold">ID</th>
                <th className="py-3.5 px-4 font-semibold">Finding Description</th>
                <th className="py-3.5 px-3 font-semibold">Tunnel Name</th>
                <th className="py-3.5 px-3 font-semibold">Sector</th>
                <th className="py-3.5 px-3 font-semibold">Severity</th>
                <th className="py-3.5 px-3 font-semibold">Evidence Type</th>
                <th className="py-3.5 px-3 font-semibold">Confidence</th>
                <th className="py-3.5 px-4 font-semibold">Recommended Action</th>
                <th className="py-3.5 px-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {filteredThreats.map((item) => (
                <tr key={item.id} className="hover:bg-navy-800/50 transition-colors">
                  {/* ID */}
                  <td className="py-3.5 px-3 font-mono font-bold text-cyber-blue">
                    {item.id}
                  </td>

                  {/* Finding */}
                  <td className="py-3.5 px-4 font-semibold text-slate-100 max-w-xs">
                    {item.finding}
                  </td>

                  {/* Tunnel */}
                  <td className="py-3.5 px-3 font-mono text-slate-300">
                    {item.tunnel}
                  </td>

                  {/* Sector */}
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-navy-950 border border-navy-700 text-slate-300">
                      {item.sector}
                    </span>
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        item.severity === 'High'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : item.severity === 'Medium'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-blue-500/20 text-cyan-300 border border-blue-500/40'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </td>

                  {/* Evidence Type */}
                  <td className="py-3.5 px-3">
                    <span className="text-[11px] font-mono text-slate-300 bg-navy-950 px-2 py-0.5 rounded border border-navy-800">
                      {item.evidenceType}
                    </span>
                  </td>

                  {/* Confidence */}
                  <td className="py-3.5 px-3 font-mono font-semibold text-vajra-gold">
                    {item.confidence}
                  </td>

                  {/* Recommended Action */}
                  <td className="py-3.5 px-4 text-emerald-300 text-xs">
                    {item.recommendedAction}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.status === 'Open'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : item.status === 'Investigating'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
