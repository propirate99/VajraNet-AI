export type Sector = 'Government' | 'Defence' | 'Healthcare';
export type Criticality = 'Critical' | 'High' | 'Medium' | 'Low';
export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type EvidenceType = 'Observed' | 'Verified' | 'AI-Inferred' | 'Not Verified' | 'Observed + Verified';

export interface Tunnel {
  id: string;
  name: string;
  endpoints: {
    siteA: string;
    siteB: string;
    ipA: string;
    ipB: string;
  };
  sector: Sector;
  criticality: Criticality;
  mode: 'Tunnel' | 'Transport';
  ikeVersion: 'IKEv2' | 'IKEv1';
  encryption: string;
  integrity: string;
  dhGroup: string;
  pfs: 'Enabled' | 'Disabled' | 'Unknown';
  replayProtection: 'Enabled' | 'Disabled' | 'Not Verified';
  childSaLifetime: number; // in seconds
  policyMaxLifetime: number; // in seconds
  securityScore: number;
  riskStatus: RiskLevel;
  tunnelStatus: 'Active' | 'Unstable' | 'Inactive';
  failedIkeAttemptsLast10Min: number;
  metadataExposureScore: number;
  trafficClassification: {
    label: string;
    confidence: number;
    reason: string;
  };
  findings: Finding[];
  recommendations: string[];
}

export interface Finding {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  evidenceType: EvidenceType;
  confidence: number;
  evidence: string;
  recommendation: string;
  status: 'Open' | 'Investigating' | 'Remediated' | 'Resolved';
}

export interface SAEvent {
  id: string;
  time: string;
  timestamp: number;
  event: string;
  type: 'Observed' | 'Verified' | 'Warning' | 'Error';
  details: string;
  spi?: string;
}

export interface SectorSummary {
  sector: Sector;
  tunnelsCount: number;
  averageScore: number;
  riskLevel: RiskLevel;
  criticalTunnels: number;
  iconName: string;
}

export interface ThreatMatrixItem {
  id: string;
  finding: string;
  tunnel: string;
  sector: Sector;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  evidenceType: EvidenceType;
  confidence: string;
  recommendedAction: string;
  status: 'Open' | 'Investigating' | 'Resolved';
}
