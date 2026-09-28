import React, { useState } from 'react';
import { mockTunnels } from '../data/mockData';
import { Tunnel, Sector, RiskLevel } from '../types';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Shield,
  Building2,
  Activity,
  ArrowUpDown
} from 'lucide-react';

interface TunnelInventoryProps {
  onSelectTunnel: (tunnelId: string) => void;
}

export const TunnelInventory: React.FC<TunnelInventoryProps> = ({ onSelectTunnel }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredTunnels = mockTunnels.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.endpoints.siteA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.endpoints.siteB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.endpoints.ipA.includes(searchTerm) ||
      t.endpoints.ipB.includes(searchTerm);

    const matchesSector = selectedSector === 'All' || t.sector === selectedSector;
    const matchesRisk = selectedRisk === 'All' || t.riskStatus === selectedRisk;
    const matchesStatus = selectedStatus === 'All' || t.tunnelStatus === selectedStatus;

    return matchesSearch && matchesSector && matchesRisk && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            IPsec Tunnel Inventory
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40 font-mono">
            {filteredTunnels.length} TUNNELS LOADED
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Live posture view of authorized VPN tunnels across sovereign Indian sectors.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-xl p-4 border border-cyber-blue/30 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tunnel name, site or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-navy-950/80 border border-navy-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyber-blue font-mono"
            />
          </div>

          {/* Sector Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium">Sector:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="flex-1 py-2 px-2.5 bg-navy-950/80 border border-navy-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyber-blue"
            >
              <option value="All">All Sectors</option>
              <option value="Government">Government</option>
              <option value="Defence">Defence</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium">Risk:</span>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="flex-1 py-2 px-2.5 bg-navy-950/80 border border-navy-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyber-blue"
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Moderate">Moderate Risk</option>
              <option value="High">High Risk</option>
              <option value="Critical">Critical Risk</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 py-2 px-2.5 bg-navy-950/80 border border-navy-700 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-cyber-blue"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Unstable">Unstable</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tunnels Table */}
      <div className="glass-panel rounded-2xl border border-cyber-blue/30 overflow-hidden shadow-glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-navy-950/90 text-slate-400 font-mono uppercase text-[11px] border-b border-navy-750">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Tunnel Name & Endpoints</th>
                <th className="py-3.5 px-3 font-semibold">Sector</th>
                <th className="py-3.5 px-3 font-semibold">Criticality</th>
                <th className="py-3.5 px-3 font-semibold">Mode / IKE</th>
                <th className="py-3.5 px-3 font-semibold">PFS Status</th>
                <th className="py-3.5 px-3 font-semibold text-center">Score</th>
                <th className="py-3.5 px-3 font-semibold">Risk Rating</th>
                <th className="py-3.5 px-3 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {filteredTunnels.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    No authorized tunnels match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredTunnels.map((tunnel) => {
                  const isHighRisk = tunnel.securityScore < 70;
                  const isHealthy = tunnel.securityScore >= 85;

                  return (
                    <tr
                      key={tunnel.id}
                      className="hover:bg-navy-800/50 transition-colors group"
                    >
                      {/* Name & Endpoints */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-100 group-hover:text-cyber-blue transition-colors">
                          {tunnel.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-xs">
                          {tunnel.endpoints.ipA} ↔ {tunnel.endpoints.ipB}
                        </div>
                      </td>

                      {/* Sector Badge */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                            tunnel.sector === 'Government'
                              ? 'bg-blue-500/20 text-cyan-300 border border-blue-500/40'
                              : tunnel.sector === 'Defence'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {tunnel.sector === 'Government' && <Building2 className="w-3 h-3 mr-0.5" />}
                          {tunnel.sector === 'Defence' && <Shield className="w-3 h-3 mr-0.5" />}
                          {tunnel.sector === 'Healthcare' && <Activity className="w-3 h-3 mr-0.5" />}
                          <span>{tunnel.sector}</span>
                        </span>
                      </td>

                      {/* Criticality */}
                      <td className="py-3.5 px-3">
                        <span className={`text-[11px] font-mono font-semibold ${
                          tunnel.criticality === 'Critical' ? 'text-status-danger' : 'text-slate-300'
                        }`}>
                          {tunnel.criticality}
                        </span>
                      </td>

                      {/* Mode / IKE */}
                      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-300">
                        {tunnel.mode} ({tunnel.ikeVersion})
                      </td>

                      {/* PFS */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            tunnel.pfs === 'Enabled'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                              : tunnel.pfs === 'Disabled'
                              ? 'bg-red-950 text-red-400 border border-red-700'
                              : 'bg-amber-950 text-amber-400 border border-amber-700'
                          }`}
                        >
                          {tunnel.pfs === 'Enabled' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {tunnel.pfs === 'Disabled' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {tunnel.pfs}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`font-mono text-sm font-extrabold px-2 py-1 rounded ${
                            isHealthy
                              ? 'text-emerald-400 bg-emerald-950/60'
                              : isHighRisk
                              ? 'text-status-danger bg-red-950/60'
                              : 'text-vajra-gold bg-amber-950/60'
                          }`}
                        >
                          {tunnel.securityScore}
                        </span>
                      </td>

                      {/* Risk */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                            tunnel.riskStatus === 'Low'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : tunnel.riskStatus === 'Moderate'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {tunnel.riskStatus}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span
                          className={`flex items-center space-x-1.5 text-[11px] font-semibold ${
                            tunnel.tunnelStatus === 'Active'
                              ? 'text-emerald-400'
                              : 'text-amber-400'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                          <span>{tunnel.tunnelStatus}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectTunnel(tunnel.id)}
                          className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-cyber-blue hover:text-white text-slate-300 border border-navy-700 text-xs font-semibold transition flex items-center space-x-1 ml-auto"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
