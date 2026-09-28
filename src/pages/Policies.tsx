import React, { useState, useEffect } from 'react';
import { ShieldCheck, BookOpen, Check, AlertCircle, FileText, Download, Sliders, Shield, Lock, Layers } from 'lucide-react';
import { apiService, SecurityPolicy } from '../services/api';

export const Policies: React.FC = () => {
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [selectedPolicy, setSelectedPolicy] = useState<SecurityPolicy | null>(null);
  const [filterSector, setFilterSector] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPolicies() {
      setIsLoading(true);
      const data = await apiService.getPolicies();
      setPolicies(data);
      if (data.length > 0) {
        setSelectedPolicy(data[0]);
      }
      setIsLoading(false);
    }
    loadPolicies();
  }, []);

  const filteredPolicies = policies.filter(p => {
    if (filterSector === 'All') return true;
    return p.sector === filterSector;
  });

  const handleExportYAML = (policy: SecurityPolicy) => {
    const yamlContent = `# VajraNet AI Security Policy Baseline Export
policy_name: "${policy.name}"
sector: "${policy.sector}"
authority: "Sovereign Cybersecurity Directive 2026"
cryptographic_standards:
  ike_version: "${policy.required_ike_version}"
  ciphers: [${policy.allowed_encryption.split(',').map(s => `"${s.trim()}"`).join(', ')}]
  pfs_required: ${policy.required_pfs}
  replay_protection: ${policy.required_replay_protection}
  max_child_sa_lifetime_seconds: ${policy.max_child_sa_lifetime}
  min_security_score: ${policy.min_security_score}
evidence_requirements:
  zero_payload_decryption: true
  gateway_telemetry_mandated: true
`;
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${policy.name.toLowerCase().replace(/\s+/g, '_')}_baseline.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-navy-700/60">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyber-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>SOVEREIGN BASELINE ENFORCEMENT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Security Policy & Baseline Rules
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Deterministic cryptographic criteria, lifetime thresholds, and anti-replay constraints per national sector.
          </p>
        </div>

        {/* Sector Filter Tabs */}
        <div className="flex items-center space-x-1 bg-navy-800/80 p-1 rounded-xl border border-navy-700">
          {['All', 'Government', 'Defence', 'Healthcare'].map((sector) => (
            <button
              key={sector}
              onClick={() => setFilterSector(sector)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterSector === sector
                  ? 'bg-cyber-500/20 text-cyber-300 border border-cyber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Policy Cards + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Policy Baseline List */}
        <div className="space-y-4 lg:col-span-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Enforced Baselines ({filteredPolicies.length})</span>
            <span className="text-emerald-400 text-[10px] font-mono">100% On-Premises</span>
          </div>

          {filteredPolicies.map((pol) => {
            const isSelected = selectedPolicy?.id === pol.id;
            return (
              <div
                key={pol.id}
                onClick={() => setSelectedPolicy(pol)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-navy-800/90 border-cyber-500/60 shadow-lg shadow-cyber-500/10'
                    : 'bg-navy-900/60 border-navy-700/60 hover:bg-navy-800/40 hover:border-navy-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                      pol.sector === 'Government' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      pol.sector === 'Defence' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {pol.sector}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">ID: POL-0{pol.id}</span>
                  </div>
                  <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Active</span>
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white mt-2.5">
                  {pol.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {pol.description}
                </p>

                <div className="mt-3 pt-3 border-t border-navy-700/50 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Score Threshold:</span>
                  <span className="text-cyber-400 font-bold">{pol.min_security_score}/100</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Policy Rule Inspector */}
        <div className="lg:col-span-2">
          {selectedPolicy ? (
            <div className="bg-navy-900/80 border border-navy-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-navy-800">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-mono text-gold-400 font-semibold uppercase">
                      {selectedPolicy.sector} Enclave Standard
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-mono text-slate-400">Version 2.4 (2026)</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {selectedPolicy.name}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedPolicy.description}
                  </p>
                </div>

                <button
                  onClick={() => handleExportYAML(selectedPolicy)}
                  className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-600 text-xs font-medium text-slate-200 flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyber-400" />
                  <span>Export YAML Baseline</span>
                </button>
              </div>

              {/* Baseline Parameter Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                    <Lock className="w-4 h-4 text-cyber-400" />
                    <span>Cryptographic Suite</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">IKE Protocol:</span>
                      <span className="text-emerald-400 font-bold">{selectedPolicy.required_ike_version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Approved Ciphers:</span>
                      <span className="text-slate-200">{selectedPolicy.allowed_encryption}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Integrity:</span>
                      <span className="text-slate-200">AEAD / HMAC-SHA256+</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                    <Sliders className="w-4 h-4 text-gold-400" />
                    <span>Forward Secrecy & Lifetime</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">PFS Required:</span>
                      <span className={selectedPolicy.required_pfs ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                        {selectedPolicy.required_pfs ? "Enforced (DH Group >= 14)" : "Optional"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Max Child SA Lifetime:</span>
                      <span className="text-slate-200">{selectedPolicy.max_child_sa_lifetime}s ({selectedPolicy.max_child_sa_lifetime / 3600}h)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Anti-Replay Window:</span>
                      <span className={selectedPolicy.required_replay_protection ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                        {selectedPolicy.required_replay_protection ? ">= 64 Packets" : "Optional"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evidence Verification Matrix */}
              <div className="p-4 rounded-xl bg-navy-950/60 border border-navy-800 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>3-Layer Truth Verification Protocol</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">1. Observed (PCAP)</div>
                    <div className="text-slate-300 mt-1">Verifies active SPI headers, packet cadence, and zero-payload encapsulation.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800">
                    <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">2. Verified (Telemetry)</div>
                    <div className="text-slate-300 mt-1">Validates strongSwan VICI states, PFS key groups, and anti-replay counters.</div>
                  </div>
                  <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800">
                    <div className="text-[10px] font-mono text-purple-400 uppercase font-semibold">3. AI-Inferred</div>
                    <div className="text-slate-300 mt-1">Estimates traffic fingerprintability without inspecting inner packet bytes.</div>
                  </div>
                </div>
              </div>

              {/* Non-Negotiable Compliance Constraints */}
              <div className="p-4 rounded-xl bg-cyber-500/10 border border-cyber-500/30 flex items-start space-x-3">
                <Shield className="w-5 h-5 text-cyber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-cyber-300 block">Sovereign Compliance Guarantee</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    This baseline prohibits private key exfiltration, payload decryption, or transmission of sensitive metadata to unapproved external endpoints. Any tunnel failing PFS or exceeding maximum lifetime is automatically flagged for triage.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 text-slate-500 text-xs">
              Select a baseline policy from the left to view detailed cryptographic specifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
