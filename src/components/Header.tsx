import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Radio,
  FileUp,
  HelpCircle,
  Bell,
  HardDrive
} from 'lucide-react';

interface HeaderProps {
  onOpenNewAssessment: () => void;
  onOpenGlossary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewAssessment,
  onOpenGlossary
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-navy-950/70 backdrop-blur-md border-b border-navy-700/80 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Operational badges */}
      <div className="flex items-center space-x-3">
        {/* On-Premises / Air-Gapped Ready Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 shadow-[0_0_12px_rgba(22,163,74,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase font-mono">
            ON-PREMISES • AIR-GAPPED READY
          </span>
        </div>

        {/* Authorized Analysis Badge */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-navy-800/90 border border-cyber-blue/30 text-cyber-blue text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-cyber-blue" />
          <span>Authorized Analysis Only</span>
        </div>

        {/* Cloud Export Disabled */}
        <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-navy-900 border border-navy-700 text-slate-400 text-[11px] font-mono">
          <Radio className="w-3 h-3 text-vajra-gold animate-pulse" />
          <span>Cloud Export: Disabled</span>
        </div>
      </div>

      {/* Right: Actions, Clock, Notifications */}
      <div className="flex items-center space-x-3">
        {/* Real-time IST Clock */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-navy-900/90 border border-navy-700 text-slate-300 font-mono text-xs">
          <span className="text-vajra-gold text-xs">●</span>
          <span>{timeStr || '04:20:00 IST'}</span>
        </div>

        {/* Quick Help Glossary */}
        <button
          onClick={onOpenGlossary}
          title="IPsec Protocol Glossary"
          className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-vajra-gold hover:bg-navy-700 border border-navy-700 transition"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            title="Active Security Alerts"
            className="p-2 rounded-lg bg-navy-800 text-slate-300 hover:text-slate-100 hover:bg-navy-700 border border-navy-700 transition"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-status-danger text-[10px] font-bold text-white flex items-center justify-center border border-navy-900 animate-pulse">
            4
          </span>
        </div>

        {/* New Assessment CTA Button */}
        <button
          onClick={onOpenNewAssessment}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyber-blue to-blue-700 hover:from-blue-600 hover:to-cyber-blue text-white text-xs font-semibold shadow-cyber-blue transition-all duration-200 transform hover:scale-[1.02] border border-blue-400/30"
        >
          <FileUp className="w-4 h-4 text-vajra-gold" />
          <span>New Assessment</span>
        </button>
      </div>
    </header>
  );
};
