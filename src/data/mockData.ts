import { Tunnel, SectorSummary, ThreatMatrixItem, SAEvent } from '../types';

export const mockTunnels: Tunnel[] = [
  {
    id: 'tun-01',
    name: 'Hospital-HQ ↔ Diagnostic-Lab',
    endpoints: {
      siteA: 'Hospital HQ (New Delhi)',
      siteB: 'Diagnostic Lab Node (Gurugram)',
      ipA: '172.20.10.1',
      ipB: '172.20.10.2'
    },
    sector: 'Healthcare',
    criticality: 'High',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated authentication',
    dhGroup: 'Group 14 (MODP 2048)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 3600,
    policyMaxLifetime: 3600,
    securityScore: 92,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 32,
    trafficClassification: {
      label: 'Web-like / Bulk-Transfer mix',
      confidence: 76,
      reason: 'Controlled-lab flow features match typical HTTP/S and medical diagnostic batch transfers.'
    },
    findings: [
      {
        id: 'COMPLY-001',
        title: 'Cryptographic Configuration Matches Sovereign Baseline',
        severity: 'Informational',
        evidenceType: 'Verified',
        confidence: 100,
        evidence: 'Verified via swanctl --list-sas telemetry and approved hospital policy',
        recommendation: 'Continue regular telemetry monitoring and quarterly key rotation review.',
        status: 'Resolved'
      }
    ],
    recommendations: [
      'Maintain existing IKEv2 and AES-256-GCM configuration.',
      'Quarterly review of diagnostic node allowlists.',
      'Continue policy validation on gateway rekeys.'
    ]
  },
  {
    id: 'tun-02',
    name: 'District-Office ↔ State-Data-Centre',
    endpoints: {
      siteA: 'District Administration (Varanasi)',
      siteB: 'State Data Centre (Lucknow)',
      ipA: '172.20.20.1',
      ipB: '172.20.20.2'
    },
    sector: 'Government',
    criticality: 'Critical',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-CBC + HMAC-SHA256',
    integrity: 'HMAC-SHA256-128',
    dhGroup: 'None (PFS Disabled)',
    pfs: 'Disabled',
    replayProtection: 'Not Verified',
    childSaLifetime: 14400,
    policyMaxLifetime: 3600,
    securityScore: 54,
    riskStatus: 'High',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 12,
    metadataExposureScore: 72,
    trafficClassification: {
      label: 'High-burst Database Sync & Video Burst',
      confidence: 84,
      reason: 'Periodic heavy payload bursts without traffic-flow confidentiality padding.'
    },
    findings: [
      {
        id: 'PFS-001',
        title: 'Perfect Forward Secrecy is Disabled on Child SA',
        severity: 'High',
        evidenceType: 'Verified',
        confidence: 100,
        evidence: 'Child SA proposal negotiated without Diffie-Hellman group in swanctl SA export',
        recommendation: 'Enable PFS with DH Group 14 or Group 19 (ECP 256) in strongSwan swanctl.conf.',
        status: 'Open'
      },
      {
        id: 'LIFE-001',
        title: 'Security Association Lifetime Exceeds Approved Policy',
        severity: 'Medium',
        evidenceType: 'Verified',
        confidence: 100,
        evidence: 'Active SA lifetime configured to 14,400s (Policy threshold: 3,600s)',
        recommendation: 'Enforce max Child SA lifetime of 3,600s to limit cryptographic exposure.',
        status: 'Open'
      },
      {
        id: 'AUTH-001',
        title: 'Repeated IKE Authentication Failures Detected',
        severity: 'Medium',
        evidenceType: 'Observed + Verified',
        confidence: 94,
        evidence: '12 failed IKE negotiation events in 10 minutes logged at gateway',
        recommendation: 'Investigate peer authentication credentials and review firewall allowlists.',
        status: 'Investigating'
      },
      {
        id: 'REPLAY-001',
        title: 'Anti-Replay Protection Status Unverified',
        severity: 'Medium',
        evidenceType: 'Not Verified',
        confidence: 0,
        evidence: 'Replay window configuration omitted from telemetry export',
        recommendation: 'Verify anti-replay window depth (minimum 64 packets) through gateway telemetry.',
        status: 'Open'
      }
    ],
    recommendations: [
      'Enable Perfect Forward Secrecy (PFS) with approved DH Group 14+.',
      'Reduce Child SA lifetime from 14,400s to 3,600s.',
      'Validate anti-replay configuration via authorized gateway telemetry.',
      'Investigate IKE authentication failures and validate peer endpoint allowlist.'
    ]
  },
  {
    id: 'tun-03',
    name: 'Secure-Site-A ↔ Secure-Site-B',
    endpoints: {
      siteA: 'Operations Command HQ (Delhi)',
      siteB: 'Tactical Regional Centre (Air-Gapped)',
      ipA: '10.10.100.1',
      ipB: '10.10.100.2'
    },
    sector: 'Defence',
    criticality: 'Critical',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 19 (ECP 256)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 1800,
    policyMaxLifetime: 3600,
    securityScore: 84,
    riskStatus: 'Moderate',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 68,
    trafficClassification: {
      label: 'Video-like UDP Stream (Tactical Telemetry)',
      confidence: 81,
      reason: 'Sustained packet rate, low inter-arrival variance, characteristic burst signature.'
    },
    findings: [
      {
        id: 'META-001',
        title: 'High Encrypted-Traffic Metadata Exposure Distinguishability',
        severity: 'Medium',
        evidenceType: 'AI-Inferred',
        confidence: 81,
        evidence: 'Radar analysis indicates 82/100 timing exposure and 78/100 burst uniqueness',
        recommendation: 'Evaluate Traffic Flow Confidentiality (TFC) padding and traffic shaping on edge.',
        status: 'Open'
      }
    ],
    recommendations: [
      'Evaluate Traffic Flow Confidentiality (TFC) padding where supported.',
      'Assess traffic shaping for high-sensitivity flows.',
      'Maintain strict air-gapped sovereign analysis mode.'
    ]
  },
  {
    id: 'tun-04',
    name: 'Hospital-DR ↔ Cloud-Backup',
    endpoints: {
      siteA: 'Hospital Disaster Recovery Hub',
      siteB: 'Sovereign Health Cloud Vault',
      ipA: '172.24.1.10',
      ipB: '172.24.2.20'
    },
    sector: 'Healthcare',
    criticality: 'Critical',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 14 (MODP 2048)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 3600,
    policyMaxLifetime: 3600,
    securityScore: 88,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 40,
    trafficClassification: {
      label: 'Encrypted Bulk Data Replication',
      confidence: 89,
      reason: 'Large uniform packet sizes matching encrypted database replication windows.'
    },
    findings: [],
    recommendations: ['Maintain existing schedule and verify automated SA rekeying weekly.']
  },
  {
    id: 'tun-05',
    name: 'Ministry-HQ ↔ State-Portal',
    endpoints: {
      siteA: 'Central Ministry Gateway',
      siteB: 'State Citizen Portal Gateway',
      ipA: '172.16.5.1',
      ipB: '172.16.5.2'
    },
    sector: 'Government',
    criticality: 'High',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-128-CBC + HMAC-SHA1',
    integrity: 'HMAC-SHA1-96 (Deprecation Risk)',
    dhGroup: 'Unknown',
    pfs: 'Unknown',
    replayProtection: 'Enabled',
    childSaLifetime: 7200,
    policyMaxLifetime: 3600,
    securityScore: 63,
    riskStatus: 'Moderate',
    tunnelStatus: 'Unstable',
    failedIkeAttemptsLast10Min: 4,
    metadataExposureScore: 58,
    trafficClassification: {
      label: 'Web Transaction Traffic',
      confidence: 72,
      reason: 'Interactive client-server request/response cadence.'
    },
    findings: [
      {
        id: 'CRYPTO-002',
        title: 'Legacy Cryptographic Suite Detected (AES-CBC + SHA1)',
        severity: 'High',
        evidenceType: 'Verified',
        confidence: 100,
        evidence: 'Gateway telemetry reveals deprecated HMAC-SHA1 in Child SA negotiation',
        recommendation: 'Upgrade to AES-256-GCM or AES-128-GCM modern AEAD ciphers.',
        status: 'Open'
      },
      {
        id: 'PFS-002',
        title: 'PFS Configuration State Unverified',
        severity: 'Medium',
        evidenceType: 'Not Verified',
        confidence: 70,
        evidence: 'Missing DH group confirmation in gateway telemetry report',
        recommendation: 'Export complete swanctl configuration to verify PFS parameter.',
        status: 'Open'
      }
    ],
    recommendations: [
      'Upgrade cipher suite from AES-CBC/SHA1 to AES-256-GCM.',
      'Investigate periodic tunnel restarts and rekey failures.'
    ]
  },
  {
    id: 'tun-06',
    name: 'Defence-Ops ↔ Radar-Station',
    endpoints: {
      siteA: 'Air Defence Operations Command',
      siteB: 'Coastal Radar Facility Beta',
      ipA: '10.20.1.1',
      ipB: '10.20.1.25'
    },
    sector: 'Defence',
    criticality: 'Critical',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 20 (ECP 384)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 1800,
    policyMaxLifetime: 3600,
    securityScore: 91,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 35,
    trafficClassification: {
      label: 'Continuous Telemetry Stream',
      confidence: 93,
      reason: 'Uniform interval packet arrival matching radar sensor heartbeat.'
    },
    findings: [],
    recommendations: ['Policy compliant. Maintain strict MAC allowlists.']
  },
  {
    id: 'tun-07',
    name: 'NIC-Gateway ↔ District-Treasury',
    endpoints: {
      siteA: 'National Informatics Centre Hub',
      siteB: 'District Treasury Subnet',
      ipA: '172.18.40.10',
      ipB: '172.18.40.50'
    },
    sector: 'Government',
    criticality: 'Critical',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 14 (MODP 2048)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 3600,
    policyMaxLifetime: 3600,
    securityScore: 87,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 42,
    trafficClassification: {
      label: 'Financial API Batches',
      confidence: 82,
      reason: 'Structured payload packet lengths during active treasury transaction hours.'
    },
    findings: [],
    recommendations: ['Compliant with CERT-In government guidelines.']
  },
  {
    id: 'tun-08',
    name: 'AIIMS-Main ↔ Telemedicine-Hub',
    endpoints: {
      siteA: 'AIIMS Apex Healthcare Centre',
      siteB: 'Rural Telemedicine Outpost',
      ipA: '192.168.100.1',
      ipB: '192.168.100.5'
    },
    sector: 'Healthcare',
    criticality: 'High',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 14 (MODP 2048)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 3600,
    policyMaxLifetime: 3600,
    securityScore: 89,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 48,
    trafficClassification: {
      label: 'Real-time Teleconsult Video Feed',
      confidence: 85,
      reason: 'RTP-like encrypted metadata cadence over ESP.'
    },
    findings: [],
    recommendations: ['Patient data safe. No plaintext inspection performed.']
  },
  {
    id: 'tun-09',
    name: 'Customs-HQ ↔ Sea-Port',
    endpoints: {
      siteA: 'Central Customs Authority',
      siteB: 'Major Port Terminal Gate',
      ipA: '172.30.12.1',
      ipB: '172.30.12.99'
    },
    sector: 'Government',
    criticality: 'Medium',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-128-CBC + HMAC-SHA256',
    integrity: 'HMAC-SHA256-128',
    dhGroup: 'None',
    pfs: 'Disabled',
    replayProtection: 'Enabled',
    childSaLifetime: 7200,
    policyMaxLifetime: 3600,
    securityScore: 58,
    riskStatus: 'High',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 2,
    metadataExposureScore: 65,
    trafficClassification: {
      label: 'Cargo Manifest Transfer',
      confidence: 78,
      reason: 'Bursty FTP/HTTPS data transfers over IPsec.'
    },
    findings: [
      {
        id: 'PFS-003',
        title: 'Perfect Forward Secrecy Not Enforced',
        severity: 'High',
        evidenceType: 'Verified',
        confidence: 100,
        evidence: 'swanctl SA dump confirms Child SA negotiated without DH group',
        recommendation: 'Enable PFS with DH Group 14 or higher.',
        status: 'Open'
      }
    ],
    recommendations: ['Enable PFS immediately during next scheduled maintenance.']
  },
  {
    id: 'tun-10',
    name: 'Border-Command ↔ Forward-Base',
    endpoints: {
      siteA: 'Northern Border Surveillance Command',
      siteB: 'High-Altitude Forward Base',
      ipA: '10.50.2.1',
      ipB: '10.50.2.2'
    },
    sector: 'Defence',
    criticality: 'Critical',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 19 (ECP 256)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 1800,
    policyMaxLifetime: 3600,
    securityScore: 89,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 52,
    trafficClassification: {
      label: 'Telemetry & Command Feed',
      confidence: 90,
      reason: 'Low packet rate, strict constant heartbeat interval.'
    },
    findings: [],
    recommendations: ['Sovereign air-gapped configuration verified.']
  },
  {
    id: 'tun-11',
    name: 'Revenue-Dept ↔ State-Treasury',
    endpoints: {
      siteA: 'State Revenue Department',
      siteB: 'State Reserve Treasury',
      ipA: '172.19.1.5',
      ipB: '172.19.1.20'
    },
    sector: 'Government',
    criticality: 'High',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 14 (MODP 2048)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 3600,
    policyMaxLifetime: 3600,
    securityScore: 85,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 44,
    trafficClassification: {
      label: 'Database Transactions',
      confidence: 86,
      reason: 'Structured payload sizes conforming to financial schemas.'
    },
    findings: [],
    recommendations: ['Audit passed. Maintain continuous telemetry logs.']
  },
  {
    id: 'tun-12',
    name: 'Ayushman-Bharat ↔ Insurance-Grid',
    endpoints: {
      siteA: 'National Health Authority Node',
      siteB: 'Empanelled Insurance Gateway',
      ipA: '172.22.100.1',
      ipB: '172.22.100.8'
    },
    sector: 'Healthcare',
    criticality: 'Critical',
    mode: 'Tunnel',
    ikeVersion: 'IKEv2',
    encryption: 'AES-256-GCM',
    integrity: 'AEAD-integrated',
    dhGroup: 'Group 14 (MODP 2048)',
    pfs: 'Enabled',
    replayProtection: 'Enabled',
    childSaLifetime: 3600,
    policyMaxLifetime: 3600,
    securityScore: 93,
    riskStatus: 'Low',
    tunnelStatus: 'Active',
    failedIkeAttemptsLast10Min: 0,
    metadataExposureScore: 36,
    trafficClassification: {
      label: 'Healthcare Claims API Traffic',
      confidence: 88,
      reason: 'Conforms to ABDM Privacy-by-design standards. Zero patient data exposed.'
    },
    findings: [],
    recommendations: ['ABDM Security and Privacy-by-design baseline compliant.']
  }
];

export const mockSectorSummaries: SectorSummary[] = [
  {
    sector: 'Government',
    tunnelsCount: 6,
    averageScore: 74,
    riskLevel: 'Moderate',
    criticalTunnels: 3,
    iconName: 'Building2'
  },
  {
    sector: 'Defence',
    tunnelsCount: 3,
    averageScore: 88,
    riskLevel: 'Low',
    criticalTunnels: 3,
    iconName: 'ShieldAlert'
  },
  {
    sector: 'Healthcare',
    tunnelsCount: 3,
    averageScore: 82,
    riskLevel: 'Low',
    criticalTunnels: 2,
    iconName: 'Activity'
  }
];

export const mockThreatMatrix: ThreatMatrixItem[] = [
  {
    id: 'PFS-001',
    finding: 'Perfect Forward Secrecy disabled',
    tunnel: 'District Office ↔ State DC',
    sector: 'Government',
    severity: 'High',
    evidenceType: 'Verified',
    confidence: '100%',
    recommendedAction: 'Enable PFS with approved DH group (Group 14+)',
    status: 'Open'
  },
  {
    id: 'LIFE-001',
    finding: 'Child SA lifetime exceeds policy',
    tunnel: 'District Office ↔ State DC',
    sector: 'Government',
    severity: 'Medium',
    evidenceType: 'Verified',
    confidence: '100%',
    recommendedAction: 'Reduce lifetime to 3,600 seconds',
    status: 'Open'
  },
  {
    id: 'AUTH-001',
    finding: 'Repeated IKE authentication failures',
    tunnel: 'Ministry HQ ↔ State Portal',
    sector: 'Government',
    severity: 'Medium',
    evidenceType: 'Observed + Verified',
    confidence: '94%',
    recommendedAction: 'Review credentials and peer endpoint allowlist',
    status: 'Investigating'
  },
  {
    id: 'META-001',
    finding: 'High traffic pattern distinguishability',
    tunnel: 'Secure Site A ↔ Secure Site B',
    sector: 'Defence',
    severity: 'Medium',
    evidenceType: 'AI-Inferred',
    confidence: '81%',
    recommendedAction: 'Evaluate traffic shaping / padding in controlled test',
    status: 'Open'
  },
  {
    id: 'REPLAY-001',
    finding: 'Replay protection status unknown',
    tunnel: 'District Office ↔ State DC',
    sector: 'Government',
    severity: 'Medium',
    evidenceType: 'Not Verified',
    confidence: 'N/A',
    recommendedAction: 'Validate replay window depth through gateway telemetry',
    status: 'Open'
  },
  {
    id: 'PFS-003',
    finding: 'Perfect Forward Secrecy not enforced',
    tunnel: 'Customs HQ ↔ Sea Port',
    sector: 'Government',
    severity: 'High',
    evidenceType: 'Verified',
    confidence: '100%',
    recommendedAction: 'Enable PFS with DH Group 14+ during maintenance window',
    status: 'Open'
  },
  {
    id: 'COMPLY-001',
    finding: 'Configuration matches sovereign baseline',
    tunnel: 'Hospital HQ ↔ Diagnostic Lab',
    sector: 'Healthcare',
    severity: 'Informational',
    evidenceType: 'Verified',
    confidence: '100%',
    recommendedAction: 'Continue regular telemetry monitoring and quarterly audit',
    status: 'Resolved'
  }
];

export const mockSAEvents: SAEvent[] = [
  {
    id: 'sa-1',
    time: '10:00:04',
    timestamp: 1727498404,
    event: 'IKE_SA_INIT detected',
    type: 'Observed',
    details: 'UDP/500 initiation request received. Nonces and DH values exchanged (Group 14).'
  },
  {
    id: 'sa-2',
    time: '10:00:05',
    timestamp: 1727498405,
    event: 'IKE_AUTH successful',
    type: 'Verified',
    details: 'Mutual authentication verified via pre-shared key credentials. Session established.'
  },
  {
    id: 'sa-3',
    time: '10:00:06',
    timestamp: 1727498406,
    event: 'CHILD_SA established',
    type: 'Verified',
    details: 'Child SA created. Initial SPI negotiated: 0xC54B21D8 with AES-256-GCM.'
  },
  {
    id: 'sa-4',
    time: '10:00:08',
    timestamp: 1727498408,
    event: 'ESP encrypted traffic started',
    type: 'Observed',
    details: 'First ESP packet captured (Protocol 50). Outgoing sequence: #1. Zero payload leakage.'
  },
  {
    id: 'sa-5',
    time: '10:15:05',
    timestamp: 1727499305,
    event: 'Rekey initiated',
    type: 'Observed',
    details: 'CREATE_CHILD_SA exchange detected for scheduled SA renewal with PFS DH Group 14.'
  },
  {
    id: 'sa-6',
    time: '10:15:06',
    timestamp: 1727499306,
    event: 'New SPI detected: 0xF8A91A43',
    type: 'Verified',
    details: 'Seamless cryptographic rollover confirmed. New Child SA active without packet drop.',
    spi: '0xF8A91A43'
  },
  {
    id: 'sa-7',
    time: '10:15:08',
    timestamp: 1727499308,
    event: 'Previous Child SA closed successfully',
    type: 'Verified',
    details: 'Old SPI 0xC54B21D8 cleanly terminated. Rekey completed in 3 seconds.'
  }
];

export const mockMetadataRadar = [
  { subject: 'Packet Size Visibility', value: 68, fullMark: 100 },
  { subject: 'Timing Pattern Visibility', value: 82, fullMark: 100 },
  { subject: 'Session Duration Visibility', value: 60, fullMark: 100 },
  { subject: 'Endpoint Exposure', value: 45, fullMark: 100 },
  { subject: 'Burst Uniqueness', value: 78, fullMark: 100 },
  { subject: 'Directional Flow Exposure', value: 55, fullMark: 100 }
];

export const mockRiskBarChart = [
  { name: 'Hospital HQ', score: 92, risk: 'Low', fill: '#16A34A' },
  { name: 'District Office', score: 54, risk: 'High', fill: '#DC2626' },
  { name: 'Secure Site A', score: 84, risk: 'Moderate', fill: '#F4B400' },
  { name: 'Hospital DR', score: 88, risk: 'Low', fill: '#16A34A' },
  { name: 'Ministry HQ', score: 63, risk: 'Moderate', fill: '#F97316' },
  { name: 'Defence Ops', score: 91, risk: 'Low', fill: '#16A34A' },
  { name: 'NIC Treasury', score: 87, risk: 'Low', fill: '#16A34A' },
  { name: 'Customs Port', score: 58, risk: 'High', fill: '#DC2626' },
];
