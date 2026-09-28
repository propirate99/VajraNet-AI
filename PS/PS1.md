# Smart India Hackathon 2026 
#### Internal Hackathon @ Amrita Vishwa Vidyapeetham, Coimbatore Campus - Organized by Institution's Innovation Council (IIC)

<p align="Center">
  <img src="../assets/images/header.png" width=921 alt="SIH 2026 Banner" />
</p>

## SIH26-A0H-T001 - Team VajraNet AI <br/>

### Problem Statement #1: Sovereign AI-Powered IPsec VPN Security Assessment Framework

* **Problem Statement ID:** SIH26001
* **Problem Statement Title:** Sovereign AI-Powered IPsec VPN Security Assessment Framework
* **Theme / Category:** Cybersecurity / National Defence & Critical Infrastructure Protection
* **Ministry / Organization:** Ministry of Home Affairs / National Cyber Coordination Centre / CERT-In

---

### 1. The Core Challenge & Blindspot
IPsec VPN tunnels form the cryptographic backbone of India’s Government Secretariats, Tri-Services Military Commands, and ABDM Healthcare Enclaves. However, existing network inspection tools present severe liabilities:
1. **Key Escrow Vulnerability:** Requiring private keys or certificate decryption introduces single-point-of-failure vulnerabilities into classified networks.
2. **Regulatory & Privacy Violations:** Decrypting sensitive payloads breaches healthcare privacy (DISHA, ABDM) and data sovereignty laws.
3. **Configuration Drift & Blindspots:** Misconfigured Phase 2 Child SAs, disabled Perfect Forward Secrecy (PFS), long SA lifetimes, and packet timing leaks often go unnoticed until a catastrophic breach occurs.

---

### 2. The Solution: VajraNet AI
**VajraNet AI** is an on-premises, evidence-aware cybersecurity assessment framework that analyzes authorized IPsec VPN PCAP metadata, gateway telemetry (`swanctl`/VICI), and baseline security policies to detect configuration risks, tunnel instability, and metadata exposure—**without decrypting protected payloads.**

#### Key Innovations:
- **RFC 4303 Zero-Payload Decryption:** Analyzes only outer ESP headers (Protocol 50), SPI rotations, packet lengths, and interarrival pacing.
- **The 3-Layer Truth Engine:**
  - *Layer 1 (Observed):* Outer PCAP metadata and sequence counters.
  - *Layer 2 (Verified):* Kernel `swanctl --list-sas` telemetry confirming cryptographic ciphers, PFS DH groups, and replay protection.
  - *Layer 3 (AI-Inferred):* Supervised Random Forest flow classifier detecting application traffic types from encrypted timing fingerprints without payload inspection.
- **National Triad Monitoring:** Unified coverage across 12 monitored tunnels spanning Government, Defence, and Healthcare.
- **Explainable Remediation Engine:** Interactive simulator that models security posture jumps (e.g. 54/100 ➔ 86/100) before applying hardened gateway configurations.
- **On-Premises Cryptographic PDF Reports:** Automated report generation signed with real-time SHA-256 digests.
