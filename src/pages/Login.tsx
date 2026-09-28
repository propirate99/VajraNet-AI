import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, AlertTriangle, Key, CheckCircle, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';

interface LoginProps {
  onLoginSuccess?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('analyst@vajranet.local');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<'Analyst' | 'Admin' | 'Auditor'>('Analyst');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRolePreset = (role: 'Analyst' | 'Admin' | 'Auditor') => {
    setSelectedRole(role);
    setErrorMessage(null);
    if (role === 'Analyst') {
      setEmail('analyst@vajranet.local');
      setPassword('password123');
    } else if (role === 'Admin') {
      setEmail('admin@vajranet.local');
      setPassword('password123');
    } else if (role === 'Auditor') {
      setEmail('auditor@vajranet.local');
      setPassword('password123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await apiService.login(email, password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      navigate('/overview');
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] bg-cyber-500/10 rounded-full blur-3xl pointer-events-none -top-32 -left-32"></div>
      <div className="absolute w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none -bottom-32 -right-32"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-navy-900/90 border border-navy-700/80 rounded-2xl shadow-2xl backdrop-blur-xl p-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 border border-cyber-500/40 shadow-lg shadow-cyber-500/10 mb-4 p-2">
            <img src="/assets/vajranet-logo.png" alt="VajraNet AI" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            VAJRANET <span className="text-cyber-400">AI</span>
          </h1>
          <p className="text-xs text-gold-400/90 font-medium tracking-wide uppercase mt-1">
            Verify the Tunnel. Protect the Mission.
          </p>
          <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Air-Gapped Sovereign Enclave</span>
          </div>
        </div>

        {/* 1-Click Role Presets for Evaluators */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
            One-Click Evaluator Presets
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleRolePreset('Analyst')}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-center ${
                selectedRole === 'Analyst'
                  ? 'bg-cyber-500/20 border-cyber-500 text-cyber-300 shadow-sm shadow-cyber-500/20'
                  : 'bg-navy-800/60 border-navy-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="font-bold">Analyst</div>
              <div className="text-[10px] text-slate-400">Triage & Fix</div>
            </button>
            <button
              type="button"
              onClick={() => handleRolePreset('Admin')}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-center ${
                selectedRole === 'Admin'
                  ? 'bg-gold-500/20 border-gold-500 text-gold-300 shadow-sm shadow-gold-500/20'
                  : 'bg-navy-800/60 border-navy-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="font-bold">Admin</div>
              <div className="text-[10px] text-slate-400">Full Control</div>
            </button>
            <button
              type="button"
              onClick={() => handleRolePreset('Auditor')}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-center ${
                selectedRole === 'Auditor'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm shadow-emerald-500/20'
                  : 'bg-navy-800/60 border-navy-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="font-bold">Auditor</div>
              <div className="text-[10px] text-slate-400">Read & PDF</div>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Sovereign Identity / Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors pl-9 font-mono"
                placeholder="analyst@vajranet.local"
              />
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Passphrase / Credential
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyber-500 transition-colors pl-9 font-mono"
                placeholder="••••••••••••"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyber-500 to-cyber-600 hover:from-cyber-400 hover:to-cyber-500 text-navy-950 font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-cyber-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-navy-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Authenticating Enclave...</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <span>Enter Sovereign Console</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 pt-4 border-t border-navy-800 text-center">
          <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>RFC 4303 Zero-Payload Decryption Mandate</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            Local SQLite/PostgreSQL Session • No Public Cloud AI Dependency
          </p>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="mt-8 text-center text-xs text-slate-500 font-mono">
        Smart India Hackathon 2026 • Sovereign IPsec VPN Security Assessment Framework
      </div>
    </div>
  );
};
