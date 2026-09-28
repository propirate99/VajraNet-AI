# VajraNet AI — System Architecture & Pipeline Specification

> **Tagline:** “Verify the Tunnel. Protect the Mission.”  
> **Platform Category:** Sovereign AI-Powered IPsec VPN Security Assessment Framework  
> **Standard Compliance:** RFC 4303 (IPsec ESP), RFC 7296 (IKEv2), NIST SP 800-77 Rev. 1, CERT-In Cyber Security Directions 2026.

---

## 1. High-Level Blueprint

VajraNet AI operates as an on-premises, defense-in-depth security intelligence platform structured into **6 discrete stages**. The platform never requires outbound internet connectivity or access to inner payload bytes.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       STAGE 1: AUTHORIZED INGESTION                         │
│   • Outer ESP Headers (Proto 50)  • strongSwan Telemetry (swanctl/VICI)     │
│   • IKEv2 Negotiation (UDP 500)   • Baseline Security Policies (YAML)       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    STAGE 2: METADATA & PARSER PIPELINE                      │
│   • PCAP Parser (Packet rates, interarrivals, burst indices, SPI sets)      │
│   • strongSwan Parser (Cipher suites, DH groups, PFS status, SA lifetime)   │
│   • Policy Parser (Minimum security requirements, maximum allowed drift)    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                     STAGE 3: 3-LAYER TRUTH ENGINE                           │
│   ┌───────────────────────┬────────────────────────┬────────────────────┐   │
│   │  1. Observed Layer    │  2. Verified Layer     │ 3. AI-Inferred     │   │
│   │  (Outer PCAP Headers) │  (Gateway Telemetry)   │ (Flow Fingerprint) │   │
│   └───────────────────────┴────────────────────────┴────────────────────┘   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│              STAGE 4: SA DIGITAL TWIN & DRIFT ASSESSMENT                    │
│   • SPI Sequence Tracking        • Rekey Transition Dead-Zone Monitoring    │
│   • Policy Baseline Checks       • Anti-Replay Window Verification          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                STAGE 5: EXPLAINABLE SCORING & REMEDIATION                   │
│   • Evidence-Weighted Deductions (-18 for PFS, -10 for Lifetime Drift)      │
│   • Interactive Remediation Engine (54/100 -> 86/100 Before/After Sim)      │
│   • Actionable swanctl.conf / ipsec.conf Config Snippet Generator           │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                 STAGE 6: SOVEREIGN REPORTING & AUDITING                     │
│   • Local ReportLab Cryptographic PDF Generation                            │
│   • SHA-256 Digest Signing       • Immutable SQLite/PG RBAC Audit Trail     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 3-Layer Truth Engine

A core innovation of VajraNet AI is strict evidence channel isolation, ensuring that heuristic model estimates are never conflated with cryptographic hardware ground truth.

| Evidence Layer | Data Source | Confidence | Example Finding |
|:---|:---|:---:|:---|
| **Layer 1: Observed** | Outer PCAP headers, SPI changes, packet lengths, interarrivals | Ground Truth (Observed) | *“SPI 0x7b11a904 observed in active use for 14,200 consecutive seconds without rekey event.”* |
| **Layer 2: Verified** | Authorized gateway telemetry (`swanctl --list-sas` / VICI) | Cryptographic Ground Truth | *“Child SA negotiated with DH Group none (pfs=no). Replay window depth is 0 packets.”* |
| **Layer 3: AI-Inferred** | Random Forest flow classifier over metadata distributions | Probabilistic (75–98%) | *“Traffic exhibits high resemblance to unpadded Interactive SSH / Terminal burst pattern (86% confidence).”* |

---

## 3. Technology Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Canvas-based radar visualization.
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy, Pydantic v2, PyJWT, bcrypt.
- **Machine Learning**: Scikit-Learn (RandomForestClassifier), NumPy, Pandas, Joblib.
- **Report Generation**: ReportLab (pure on-premises PDF compiler, zero external web fonts or CDN calls).
- **Database**: SQLite (default local zero-install database) or PostgreSQL 15+.
- **Packaging**: Docker Compose, Multi-stage Dockerfiles, GitHub Actions CI.
