import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, UploadCloud, CheckSquare, Square, ShieldCheck, AlertCircle, Loader2, FileCode, CheckCircle2 } from 'lucide-react';

interface NewAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewAssessmentModal: React.FC<NewAssessmentModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [pcapFile, setPcapFile] = useState<string>('district_office_capture.pcap');
  const [telemetryFile, setTelemetryFile] = useState<string>('swanctl_list_sas_dump.txt');
  const [policyFile, setPolicyFile] = useState<string>('sovereign_vpn_policy_2026.yaml');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  if (!isOpen) return null;

  const steps = [
    { title: 'Parsing PCAP metadata', detail: 'Extracting frame times, UDP/500, ESP proto 50, SPI sequences' },
    { title: 'Extracting IKE / ESP / SPI flow features', detail: 'Calculating inter-arrival ms, packet length variance, burst rates' },
    { title: 'Validating gateway telemetry against policy baseline', detail: 'Evaluating cipher suites, Diffie-Hellman PFS, Child SA lifetimes' },
    { title: 'Running metadata classification and risk assessment', detail: 'Executing XGBoost pattern classifier & Isolation Forest anomaly model' }
  ];

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(1);

    // Realistic step progression
    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setCurrentStep(3);
        setTimeout(() => {
          setCurrentStep(4);
          setTimeout(() => {
            setIsAnalyzing(false);
            onClose();
            // Navigate to tunnel detail
            navigate('/tunnels?detail=tun-02');
          }, 1000);
        }, 900);
      }, 900);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-navy-900 border border-cyber-blue/40 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isAnalyzing}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-navy-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center text-cyber-blue">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Create Authorized VPN Assessment</h3>
            <p className="text-xs text-slate-400">
              Local, air-gapped security ingestion engine. No payload decryption.
            </p>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="mb-5 p-3 rounded-xl bg-navy-950 border border-navy-750 flex items-start space-x-2.5 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-emerald-400">Strict Privacy Guarantee:</span> Analysis operates solely on packet headers, timing intervals, and authorized gateway configurations. Payload remains 100% encrypted.
          </div>
        </div>

        {isAnalyzing ? (
          /* Step-by-Step Progress Display */
          <div className="py-6 space-y-4">
            <div className="text-center mb-6">
              <Loader2 className="w-10 h-10 text-vajra-gold animate-spin mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-100">
                Executing Local Analysis Pipeline
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Air-gapped on-premises engine active
              </p>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isDone = currentStep > stepNum;
                const isActive = currentStep === stepNum;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      isDone
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : isActive
                        ? 'bg-cyber-blue/15 border-cyber-blue text-slate-100 shadow-cyber-blue'
                        : 'bg-navy-950/40 border-navy-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center space-x-2">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isActive ? (
                          <Loader2 className="w-4 h-4 text-vajra-gold animate-spin" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px]">
                            {stepNum}
                          </span>
                        )}
                        <span>{`Step ${stepNum}: ${step.title}`}</span>
                      </span>
                      <span className="font-mono text-[10px]">
                        {isDone ? 'COMPLETED' : isActive ? 'PROCESSING' : 'QUEUED'}
                      </span>
                    </div>
                    {isActive && (
                      <p className="text-[11px] text-slate-400 mt-1 pl-6">
                        {step.detail}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Upload Fields */
          <div className="space-y-4">
            {/* Field 1: PCAP */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>1. Authorized PCAP File (IKE / ESP / NAT-T)</span>
                <span className="text-[10px] text-slate-400 font-mono">.pcap / .pcapng</span>
              </label>
              <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-navy-950 border border-navy-700 text-xs">
                <FileCode className="w-4 h-4 text-cyber-blue shrink-0" />
                <span className="font-mono text-slate-200 truncate flex-1">{pcapFile}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-navy-800 text-slate-400">14.8 MB</span>
              </div>
            </div>

            {/* Field 2: Gateway Telemetry */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>2. Gateway Telemetry File (swanctl --list-sas output)</span>
                <span className="text-[10px] text-slate-400 font-mono">.txt / .json</span>
              </label>
              <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-navy-950 border border-navy-700 text-xs">
                <FileCode className="w-4 h-4 text-vajra-gold shrink-0" />
                <span className="font-mono text-slate-200 truncate flex-1">{telemetryFile}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-navy-800 text-slate-400">142 KB</span>
              </div>
            </div>

            {/* Field 3: Policy YAML */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>3. Approved Security Policy YAML</span>
                <span className="text-[10px] text-slate-400 font-mono">.yaml / .yml</span>
              </label>
              <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-navy-950 border border-navy-700 text-xs">
                <FileCode className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-slate-200 truncate flex-1">{policyFile}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-navy-800 text-slate-400">8.4 KB</span>
              </div>
            </div>

            {/* Mandatory Authorization Checkbox */}
            <div
              onClick={() => setIsAuthorized(!isAuthorized)}
              className="mt-4 p-3 rounded-xl bg-navy-950/80 border border-vajra-gold/30 hover:border-vajra-gold/60 cursor-pointer flex items-start space-x-3 transition select-none"
            >
              <button
                type="button"
                className="mt-0.5 text-vajra-gold focus:outline-none"
              >
                {isAuthorized ? (
                  <CheckSquare className="w-4 h-4 text-vajra-gold" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
              </button>
              <div className="text-xs text-slate-300">
                <p className="font-semibold text-slate-200">
                  I confirm that I am authorized to analyze this network data.
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Assessment complies with organizational cybersecurity policy and air-gapped guidelines.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-navy-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-navy-800 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!isAuthorized}
                onClick={handleStartAnalysis}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                  isAuthorized
                    ? 'bg-gradient-to-r from-cyber-blue to-blue-700 hover:from-blue-600 hover:to-cyber-blue text-white shadow-cyber-blue cursor-pointer'
                    : 'bg-navy-800 text-slate-600 border border-navy-700 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Run Local Assessment Engine</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
