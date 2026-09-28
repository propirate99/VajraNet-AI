import React from 'react';
import { X, BookOpen, Shield, Key, Lock, RefreshCw, Cpu, Layers } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const terms = [
    {
      abbr: 'IKE',
      full: 'Internet Key Exchange (IKEv2 / RFC 7296)',
      icon: Key,
      color: 'text-cyber-blue',
      desc: 'The protocol used to mutually authenticate peers, establish shared keys, and negotiate cryptographic algorithms before encrypted data transmission. Operates over UDP port 500 (or UDP 4500 for NAT-T).'
    },
    {
      abbr: 'ESP',
      full: 'Encapsulating Security Payload (IPsec / RFC 4303)',
      icon: Lock,
      color: 'text-emerald-400',
      desc: 'The IPsec protocol (IP Protocol 50) that encrypts and authenticates packet payloads. ESP ensures confidentiality, data origin authentication, anti-replay, and connectionless integrity without exposing inner headers.'
    },
    {
      abbr: 'SPI',
      full: 'Security Parameters Index (32-bit Identifier)',
      icon: Cpu,
      color: 'text-vajra-gold',
      desc: 'A unique 32-bit tag carried in the clear header of every ESP packet. It allows the receiving gateway to instantly look up which Security Association (keys, cipher, replay counter) to use for decryption.'
    },
    {
      abbr: 'PFS',
      full: 'Perfect Forward Secrecy',
      icon: Shield,
      color: 'text-cyan-400',
      desc: 'A cryptographic safeguard where Child SAs generate fresh ephemeral Diffie-Hellman keys during rekeying. If the long-term private key or initial IKE SA is compromised later, past session traffic remains secure.'
    },
    {
      abbr: 'SA',
      full: 'Security Association (IKE SA & Child SA)',
      icon: Layers,
      color: 'text-purple-400',
      desc: 'A simplex (one-way) or duplex cryptographic contract between two gateways specifying encryption algorithms, integrity keys, sequence counters, and lifetime thresholds.'
    },
    {
      abbr: 'NAT-T',
      full: 'NAT Traversal (RFC 3948)',
      icon: RefreshCw,
      color: 'text-amber-400',
      desc: 'Encapsulates ESP protocol 50 packets into UDP port 4500 datagrams to allow IPsec tunnels to safely traverse stateful NAT firewalls and public routers without packet corruption.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-navy-900 border border-cyber-blue/40 rounded-2xl shadow-2xl p-6 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-navy-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-navy-800">
          <div className="w-10 h-10 rounded-xl bg-vajra-gold/20 border border-vajra-gold/40 flex items-center justify-center text-vajra-gold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">IPsec Protocol Glossary</h3>
            <p className="text-xs text-slate-400">
              Essential cryptographic and network concepts analyzed by VajraNet AI.
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {terms.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-navy-950/90 border border-navy-750 hover:border-navy-650 transition"
              >
                <div className="flex items-center space-x-2.5 mb-1.5">
                  <div className={`p-1.5 rounded-md bg-navy-900 border border-navy-700 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-100 mr-2 px-1.5 py-0.5 rounded bg-navy-800 border border-navy-700">
                      {item.abbr}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {item.full}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 pl-8 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-navy-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-xs font-semibold text-slate-200 border border-navy-700 transition"
          >
            Close Glossary
          </button>
        </div>
      </div>
    </div>
  );
};
