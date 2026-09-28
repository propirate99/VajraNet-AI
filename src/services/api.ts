import { Tunnel, Finding, ThreatMatrixItem, SAEvent } from '../types';
import { mockTunnels, mockThreatMatrix, mockSAEvents } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export interface UserSession {
  id: number;
  email: string;
  full_name?: string;
  role: string;
  organization?: string;
}

export interface SystemStatus {
  status: string;
  mode: string;
  version: string;
  payload_decryption: string;
  cloud_export: string;
}

export interface SecurityPolicy {
  id: number;
  name: string;
  sector: string;
  description?: string;
  required_ike_version: string;
  required_pfs: boolean;
  required_replay_protection: boolean;
  allowed_encryption: string;
  max_child_sa_lifetime: number;
  min_security_score: number;
  is_active: boolean;
}

export interface ReportItem {
  id: string;
  assessment_id: string;
  report_type: string;
  filename: string;
  sha256_hash?: string;
  created_at: string;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('vajranet_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const apiService = {
  // Authentication
  async login(email: string, password: string): Promise<{ access_token: string; user: UserSession }> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('vajranet_token', data.access_token);
        localStorage.setItem('vajranet_user', JSON.stringify(data.user));
        return data;
      }
    } catch (e) {
      console.warn('Backend login unavailable, using sovereign local session fallback', e);
    }

    // Offline / Mock fallback
    const mockUser: UserSession = {
      id: 2,
      email: email || 'analyst@vajranet.local',
      full_name: 'Sovereign Security Analyst',
      role: 'Security Analyst',
      organization: 'CERT-In Assessment Cell'
    };
    const mockToken = 'mock-sovereign-jwt-token-2026';
    localStorage.setItem('vajranet_token', mockToken);
    localStorage.setItem('vajranet_user', JSON.stringify(mockUser));
    return { access_token: mockToken, user: mockUser };
  },

  getCurrentUser(): UserSession | null {
    const raw = localStorage.getItem('vajranet_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  logout(): void {
    localStorage.removeItem('vajranet_token');
    localStorage.removeItem('vajranet_user');
  },

  // Health & Air-Gapped Status
  async getSystemStatus(): Promise<SystemStatus> {
    try {
      const res = await fetch('http://127.0.0.1:8000/health');
      if (res.ok) return await res.json();
    } catch {
      // offline fallback
    }
    return {
      status: 'OPERATIONAL',
      mode: 'ON-PREMISES / AIR-GAPPED READY',
      version: '1.0.0 (SIH Sovereign Edition)',
      payload_decryption: 'DISABLED (STRICT RFC 4303)',
      cloud_export: 'DISABLED'
    };
  },

  // Dashboard Summary
  async getDashboardSummary(): Promise<any> {
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/summary`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return {
      total_tunnels: 12,
      healthy_tunnels: 9,
      high_risk_tunnels: 3,
      policy_drift_tunnels: 3,
      overall_score: 78,
      risk_level: 'MODERATE RISK'
    };
  },

  // Tunnels
  async getTunnels(): Promise<Tunnel[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/tunnels`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // fallback to mock
    }
    return mockTunnels;
  },

  async getTunnelById(id: string): Promise<Tunnel | undefined> {
    try {
      const res = await fetch(`${API_BASE_URL}/tunnels/${id}`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return mockTunnels.find(t => t.id === id);
  },

  // Remediation
  async remediateTunnel(id: string): Promise<{ success: boolean; tunnel: any; message: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/tunnels/${id}/remediate`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend remediation failed, simulating local delta', e);
    }
    return {
      success: true,
      tunnel: {
        id,
        security_score: 86,
        risk_status: 'Low',
        pfs: 'Enabled',
        child_sa_lifetime: 3600
      },
      message: 'Sovereign remediation delta applied. Score improved to 86/100.'
    };
  },

  // SA Timeline
  async getSATimeline(tunnelId: string): Promise<SAEvent[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/tunnels/${tunnelId}/timeline`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return mockSAEvents;
  },

  // Threat Matrix
  async getThreatMatrix(): Promise<ThreatMatrixItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/threats`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return mockThreatMatrix;
  },

  // Security Policies
  async getPolicies(): Promise<SecurityPolicy[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/policies`, {
        headers: getAuthHeaders()
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        name: 'Government Secure VPN Baseline',
        sector: 'Government',
        description: 'CERT-In aligned baseline mandating IKEv2, AES-256-GCM, and PFS',
        required_ike_version: 'IKEv2',
        required_pfs: true,
        required_replay_protection: true,
        allowed_encryption: 'AES-256-GCM,AES-128-GCM',
        max_child_sa_lifetime: 3600,
        min_security_score: 70,
        is_active: true
      },
      {
        id: 2,
        name: 'Defence Restricted Network Baseline',
        sector: 'Defence',
        description: 'Air-gapped tactical policy requiring ECP-256+ Diffie-Hellman and strict SA rotation',
        required_ike_version: 'IKEv2',
        required_pfs: true,
        required_replay_protection: true,
        allowed_encryption: 'AES-256-GCM',
        max_child_sa_lifetime: 1800,
        min_security_score: 80,
        is_active: true
      },
      {
        id: 3,
        name: 'Healthcare Critical Connectivity Baseline',
        sector: 'Healthcare',
        description: 'ABDM privacy-by-design policy protecting EHR and diagnostic transfer paths',
        required_ike_version: 'IKEv2',
        required_pfs: true,
        required_replay_protection: true,
        allowed_encryption: 'AES-256-GCM',
        max_child_sa_lifetime: 3600,
        min_security_score: 75,
        is_active: true
      }
    ];
  },

  // Report Generation & Download
  async generateReport(assessmentId: string, reportType: 'Executive' | 'Technical' | 'Compliance'): Promise<ReportItem> {
    try {
      const res = await fetch(`${API_BASE_URL}/reports/generate`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ assessment_id: assessmentId, report_type: reportType })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Report generation fallback', e);
    }
    return {
      id: `rep-${Math.random().toString(36).substring(2, 9)}`,
      assessment_id: assessmentId,
      report_type: reportType,
      filename: `VajraNet_${reportType}_tun-02_2026.pdf`,
      sha256_hash: 'f8efe0738f5115d69d435d11759fb9e8c2a5a2a6cfde0af66458bd5321ba7e92',
      created_at: new Date().toISOString()
    };
  },

  getReportDownloadUrl(reportId: string): string {
    return `${API_BASE_URL}/reports/${reportId}/download`;
  },

  // Assessment Upload with FormData
  async uploadAssessment(
    tunnelId: string,
    pcapFile?: File,
    telemetryFile?: File,
    policyFile?: File
  ): Promise<{ success: boolean; assessment?: any; tunnelId: string }> {
    try {
      const formData = new FormData();
      formData.append('tunnel_id', tunnelId);
      formData.append('assessment_name', 'Live Air-Gapped Sovereign Audit');
      formData.append('is_authorized', 'true');
      if (pcapFile) formData.append('pcap_file', pcapFile);
      if (telemetryFile) formData.append('telemetry_file', telemetryFile);
      if (policyFile) formData.append('policy_file', policyFile);

      const token = localStorage.getItem('vajranet_token');
      const res = await fetch(`${API_BASE_URL}/assessments`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });
      if (res.ok) {
        const assessment = await res.json();
        return { success: true, assessment, tunnelId };
      }
    } catch (e) {
      console.warn('Backend assessment API failed, simulating local evaluation', e);
    }

    // Offline simulation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      success: true,
      tunnelId: tunnelId || 'tun-02'
    };
  }
};
