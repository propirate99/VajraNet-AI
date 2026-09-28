import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Network,
  Clock,
  ShieldAlert,
  Activity,
  FileText,
  Settings,
  HelpCircle,
  Cpu,
  Lock,
  Layers,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface SidebarProps {
  onOpenGlossary: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenGlossary }) => {
  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/tunnels', label: 'Tunnel Inventory', icon: Network },
    { to: '/sa-timeline', label: 'SA Digital Twin', icon: Clock },
    { to: '/threat-matrix', label: 'Threat Matrix', icon: ShieldAlert },
    { to: '/metadata-exposure', label: 'Metadata Exposure', icon: Activity },
    { to: '/policies', label: 'Security Policies', icon: ShieldCheck },
    { to: '/reports', label: 'Reports', icon: FileText },
    { to: '/architecture', label: 'System Architecture', icon: Layers },
    { to: '/settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-navy-950/80 backdrop-blur-xl border-r border-navy-650 flex flex-col h-screen sticky top-0 z-40 select-none">
      {/* Brand Header with Insignia */}
      <div className="p-4 border-b border-navy-700/80 flex items-center space-x-3">
        <div className="relative group">
          <div className="w-11 h-11 rounded-lg bg-navy-800 border border-vajra-gold/50 flex items-center justify-center shadow-cyber-gold overflow-hidden">
            <img 
              src="/assets/vajranet-logo.png" 
              alt="VajraNet AI Logo" 
              className="w-9 h-9 object-contain transform group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                // Fallback to CSS Shield + Lightning if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Fallback Icon */}
            <div className="text-vajra-gold font-bold text-lg hidden">⚡</div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1.5">
            <h1 className="text-base font-extrabold tracking-wider text-slate-100 uppercase">
              VajraNet <span className="text-vajra-gold">AI</span>
            </h1>
          </div>
          <p className="text-[10px] text-slate-400 font-medium tracking-tight truncate">
            Sovereign VPN Security Intelligence
          </p>
        </div>
      </div>

      {/* Tagline Banner */}
      <div className="px-4 py-2 bg-navy-900/60 border-b border-navy-750 flex items-center space-x-2">
        <span className="text-vajra-gold text-xs">⚡</span>
        <span className="text-[11px] font-medium text-slate-300 italic tracking-wide">
          “Verify the Tunnel. Protect the Mission.”
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          Security Console
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/40 shadow-cyber-blue font-semibold'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-navy-800/80 hover:border hover:border-navy-650'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 mr-3 transition-colors ${
                      isActive ? 'text-cyber-blue' : 'text-slate-400 group-hover:text-vajra-gold'
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyber-blue shadow-[0_0_8px_#1E88E5]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Sector & Air-Gapped Badges */}
      <div className="p-3 border-t border-navy-700/80 bg-navy-950/60 space-y-2 text-[11px]">
        {/* Air Gapped Indicator */}
        <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-navy-900 border border-emerald-500/30 text-emerald-400">
          <div className="flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold text-[10px] tracking-wide">AIR-GAPPED MODE</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">
            SECURE
          </span>
        </div>

        {/* Engine status */}
        <div className="flex items-center justify-between px-2 text-[10px] text-slate-400">
          <span className="flex items-center space-x-1">
            <Cpu className="w-3 h-3 text-vajra-gold" />
            <span>Local Engine</span>
          </span>
          <span className="font-mono text-slate-300 text-[10px]">strongSwan VICI</span>
        </div>

        {/* Glossary button */}
        <button
          onClick={onOpenGlossary}
          className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-xs text-slate-300 hover:text-vajra-gold hover:bg-navy-800/80 rounded border border-navy-700 transition"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>IPsec Glossary & Help</span>
        </button>
      </div>

      {/* Mini Footer */}
      <div className="px-3 py-1.5 text-center text-[9px] text-slate-400 border-t border-navy-800 font-mono">
        VajraNet AI • SIH 2026 Sovereign Edition
      </div>
    </aside>
  );
};
