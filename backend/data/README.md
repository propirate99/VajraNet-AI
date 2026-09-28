# VajraNet AI — Sovereign Datasets & Demo Artifacts

> **Security & Privacy Disclaimer:**
> All files in this directory are **synthetic testbed data or sanitized metadata summaries** generated exclusively for authorized testing and demonstration of the VajraNet AI framework.
> **RFC 4303 Zero-Payload Compliance:** No confidential communications, user payloads, private keys, or certificates are stored, inspected, or decrypted.

---

## Directory Overview

```
data/
├── synthetic_ipsec_flow_dataset.csv       # 2,500 synthetic flows (6 traffic classes) for ML training
├── demo_pcaps/                           # Non-payload PCAP metadata summaries
│   ├── secure_hospital_metadata.json     # Compliant Healthcare flow
│   ├── risky_government_metadata.json    # Non-compliant Gov flow (PFS disabled, high lifetime)
│   ├── defence_airgapped_metadata.json   # Tactical Defence flow with anti-traffic analysis padding
│   └── healthcare_dr_metadata.json       # Disaster recovery high-burst medical sync flow
├── demo_telemetry/                       # Authorized strongSwan `swanctl --list-sas` telemetry text dumps
│   ├── secure_hospital_swanctl.txt
│   ├── risky_government_swanctl.txt
│   ├── defence_demo_swanctl.txt
│   └── healthcare_dr_swanctl.txt
└── demo_policies/                        # Sovereign baseline policy definitions (YAML)
    ├── government_secure_vpn_baseline.yaml
    ├── defence_restricted_network_baseline.yaml
    └── healthcare_critical_connectivity_baseline.yaml
```

---

## Traffic Classes in `synthetic_ipsec_flow_dataset.csv`

The synthetic dataset contains **2,500 flows** balanced across 6 operational traffic types:

| Traffic Class | Typical Mean Packet Length (Bytes) | Typical Pkt Rate (pps) | Interarrival Mean (ms) | Description |
|:---|:---:|:---:|:---:|:---|
| **Encrypted_VoIP** | 180 – 240 | 45 – 55 | 18.0 – 22.0 | Constant packet size, steady 20ms cadence |
| **Interactive_SSH** | 80 – 160 | 4 – 15 | 80.0 – 220.0 | Variable typing latency, small bursts |
| **Database_Replication** | 900 – 1200 | 120 – 280 | 3.0 – 6.0 | High throughput, large packets, structured bursts |
| **Medical_Imaging_DICOM** | 1200 – 1420 | 180 – 420 | 2.0 – 4.5 | Jumbo packet sizes, heavy transfer sessions |
| **Telemetry_Heartbeat** | 90 – 140 | 1 – 3 | 950.0 – 1050.0 | Periodic 1-second pulse, small fixed size |
| **Bulk_Data_Transfer** | 1250 – 1440 | 250 – 500 | 1.8 – 3.2 | MTU-bounded bulk streams |

---

## Evidence Separation Protocol

Every assessment adheres to the **3-Layer Truth Engine**:
1. **Observed (PCAP Metadata)**: SPIs, packet length distribution, interarrival times, packet rates, rekey intervals.
2. **Verified (Gateway Telemetry)**: Real strongSwan VICI / `swanctl` states confirming cipher suite, PFS group, replay window, SA lifetimes.
3. **AI-Inferred (Probabilistic)**: Flow classification and metadata exposure risks produced by local Random Forest model without inspection of payload.
