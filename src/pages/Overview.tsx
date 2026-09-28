import React from 'react';
import { mockTunnels, mockSectorSummaries, mockRiskBarChart } from '../data/mockData';
import { ThreeLayerEngineCard } from '../components/ThreeLayerEngineCard';
import { RemediationWidget } from '../components/RemediationWidget';
import { NetworkTopologyVisual } from '../components/NetworkTopologyVisual';
import {
  Network,
  ShieldCheck,
  AlertTriangle,
  FileWarning,
  Building2,
  Shield,
  Activity,
  ArrowRight,
  TrendingUp,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Link } from 'react-router-dom';

interface OverviewProps {
  onOpenTunnelDetail: (tunnelId: string) => void;
  onOpenNewAssessment: () => void;
}

export const Overview: React.FC<OverviewProps> = ({ onOpenTunnelDetail, onOpenNewAssessment }) => {
  // Overall score: 78/100 Moderate Risk
  const overallScore = 78;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              Security Posture Overview
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-vajra-gold/20 text-vajra-gold border border-vajra-gold/40">
              NATIONAL MONITOR
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authorized IPsec VPN security, stability, and cryptographic compliance for Indian Government, Defence, and Healthcare enclaves.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenNewAssessment}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700 text-xs font-semibold transition"
          >
            <Zap className="w-3.5 h-3.5 text-vajra-gold" />
            <span>Simulate New PCAP</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total */}
        <div className="glass-panel rounded-xl p-4 border border-cyber-blue/30 relative overflow-hidden group hover:border-cyber-blue/60 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Total VPN Tunnels
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/20 text-cyber-blue flex items-center justify-center">
              <Network className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold font-mono text-slate-100">12</span>
            <span className="text-xs text-slate-400 font-mono">Active Lab / SAs</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center space-x-1">
            <span className="text-emerald-400">100%</span>
            <span>authorized telemetry</span>
          </div>
        </div>

        {/* Card 2: Healthy */}
        <div className="glass-panel rounded-xl p-4 border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-500/60 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Healthy Tunnels
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-400">7</span>
            <span className="text-xs text-slate-400 font-mono">/ 12 Low Risk</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400/90 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>PFS & AEAD compliant</span>
          </div>
        </div>

        {/* Card 3: High Risk */}
        <div className="glass-panel rounded-xl p-4 border border-status-danger/30 relative overflow-hidden group hover:border-status-danger/60 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              High-Risk Tunnels
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold font-mono text-status-danger">2</span>
            <span className="text-xs text-slate-400 font-mono">Immediate Remediation</span>
          </div>
          <div className="mt-2 text-[11px] text-red-400/90 flex items-center space-x-1">
            <span>PFS Disabled or Auth Churn</span>
          </div>
        </div>

        {/* Card 4: Policy Drift */}
        <div className="glass-panel rounded-xl p-4 border border-vajra-gold/30 relative overflow-hidden group hover:border-vajra-gold/60 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Policy Drift Detected
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-950 text-vajra-gold flex items-center justify-center">
              <FileWarning className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold font-mono text-vajra-gold">3</span>
            <span className="text-xs text-slate-400 font-mono">Gateway Mismatches</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-400/90 flex items-center space-x-1">
            <span>SA lifetime / Cipher suite</span>
          </div>
        </div>
      </div>

      {/* Main Score Ring & Sector Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Animated Circular Score Ring */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-cyber-blue/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Sovereign Index
          </div>

          <div className="relative w-48 h-48 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Ring */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#0D2847"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Glowing Progress Ring */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#F4B400"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out drop-shadow-[0_0_12px_rgba(244,180,0,0.6)]"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold font-mono text-slate-100">
                {overallScore}
              </span>
              <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                out of 100
              </span>
              <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-vajra-gold border border-vajra-gold/40">
                MODERATE RISK
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-100 mt-2">
            Overall VajraNet Posture Score
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs">
            Composite evaluation of cryptographic profiles, IKE stability, replay status, and metadata exposure across 12 authorized tunnels.
          </p>

          <div className="mt-4 pt-4 border-t border-navy-700/80 w-full flex items-center justify-between text-xs font-mono text-slate-300">
            <span>Air-Gapped Assessment</span>
            <span className="text-emerald-400 flex items-center">
              <Lock className="w-3 h-3 mr-1" /> Verified Safe
            </span>
          </div>
        </div>

        {/* Right: Sector-wise Posture Cards & Critical Findings */}
        <div className="lg:col-span-8 space-y-4">
          {/* Sector Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mockSectorSummaries.map((sector) => {
              const isGovt = sector.sector === 'Government';
              const isDefence = sector.sector === 'Defence';
              const Icon = isGovt ? Building2 : isDefence ? Shield : Activity;
              const color = isGovt ? 'text-cyber-blue' : isDefence ? 'text-purple-400' : 'text-emerald-400';
              const borderColor = isGovt ? 'border-cyber-blue/30' : isDefence ? 'border-purple-500/30' : 'border-emerald-500/30';

              return (
                <div
                  key={sector.sector}
                  className={`glass-panel rounded-xl p-4 border ${borderColor} hover:bg-navy-800/60 transition group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-200">{sector.sector} Networks</span>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>

                  <div className="flex items-baseline justify-between mt-3">
                    <div>
                      <span className="text-2xl font-extrabold font-mono text-slate-100">
                        {sector.averageScore}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">/100</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      sector.riskLevel === 'Low'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {sector.riskLevel} Risk
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-navy-750 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{sector.tunnelsCount} Tunnels Monitored</span>
                    <span className="font-mono text-slate-300">{sector.criticalTunnels} Critical</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Critical Findings Panel */}
          <div className="glass-panel rounded-xl p-5 border border-status-danger/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-status-danger animate-pulse"></span>
                <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide">
                  Top Priority Findings & Policy Alerts
                </h4>
              </div>
              <Link
                to="/threat-matrix"
                className="text-xs text-cyber-blue hover:text-cyan-300 flex items-center space-x-1 font-semibold"
              >
                <span>View Threat Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => onOpenTunnelDetail('tun-02')}
                className="p-2.5 rounded-lg bg-navy-950/80 hover:bg-navy-900 border border-status-danger/40 flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-status-danger/20 text-red-400 border border-status-danger/40">
                    CRITICAL
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    PFS disabled on District Office ↔ State Data Centre
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Government • Score 54</span>
              </div>

              <div
                onClick={() => onOpenTunnelDetail('tun-02')}
                className="p-2.5 rounded-lg bg-navy-950/80 hover:bg-navy-900 border border-amber-500/30 flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    HIGH
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    Child SA lifetime exceeds approved policy threshold (14,400s vs 3,600s)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Government • Score 54</span>
              </div>

              <div
                onClick={() => onOpenTunnelDetail('tun-05')}
                className="p-2.5 rounded-lg bg-navy-950/80 hover:bg-navy-900 border border-amber-500/30 flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    MEDIUM
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    Repeated IKE authentication failures detected (12 events / 10 min)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Government • Unstable</span>
              </div>

              <div
                onClick={() => onOpenTunnelDetail('tun-03')}
                className="p-2.5 rounded-lg bg-navy-950/80 hover:bg-navy-900 border border-blue-500/30 flex items-center justify-between cursor-pointer transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-300 border border-blue-500/40">
                    AI-INFERRED
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    High encrypted-traffic metadata distinguishability (Tactical Video burst)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Defence • Score 84</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three-Layer Truth Engine Visual (Image 2) */}
      <ThreeLayerEngineCard />

      {/* Live Topology Twin & Tunnel Risk Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: National Sovereign IPsec VPN Triad (Image 4) */}
        <div className="lg:col-span-7">
          <NetworkTopologyVisual />
        </div>

        {/* Right: Tunnel Risk Distribution Chart */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-cyber-blue/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
                <span>Tunnel Posture Scores</span>
                <TrendingUp className="w-4 h-4 text-cyber-blue" />
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Green &gt; 80 | Red &lt; 70</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Real-time security posture breakdown across key tested government, defence, and hospital links.
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockRiskBarChart} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 10, fill: '#cbd5e1' }} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#071A33', borderColor: '#1E88E5', borderRadius: '8px', fontSize: '11px' }}
                  formatter={(val: any) => [`${val} / 100 Posture Score`, 'VajraNet Score']}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {mockRiskBarChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-navy-750 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Secure (&gt;85)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Moderate (70-84)</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-danger"></span>
              <span>High Risk (&lt;70)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Before / After Remediation Impact Simulator */}
      <RemediationWidget />
    </div>
  );
};
