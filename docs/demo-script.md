# VajraNet AI — Smart India Hackathon 2026 Live Demo Script

> **Theme:** Cybersecurity & Sovereign Critical Infrastructure Defense  
> **Tagline:** “Verify the Tunnel. Protect the Mission.”  
> **Duration:** 5 – 7 Minutes

---

## Act 1: The Sovereign Problem Statement (1 min)
- **Presenter:** *“Honorable Jury, IPsec VPNs form the cryptographic backbone of India’s Government Secretariats, Tri-Services Military Commands, and ABDM Healthcare Enclaves. Yet today, security teams face a critical blindspot: how do you assess if an encrypted tunnel is misconfigured, drifting from policy, or vulnerable to metadata traffic analysis—**without decrypting the payload and violating national secrecy or patient privacy**?”*
- **Screen:** Show `http://localhost:5173/landing` with the gold Vajra insignia and the tagline: *“Verify the Tunnel. Protect the Mission.”*
- **Action:** Click **“One-Click Evaluator Presets”** -> Select **“Analyst”** -> Enter Sovereign Console.

---

## Act 2: National Triad Posture & 3-Layer Truth Engine (1.5 min)
- **Screen:** Show `http://localhost:5173/overview`
- **Highlight:**
  1. **Overall Security Score**: `78/100` (Moderate Risk).
  2. **The National Triad**: 6 Government tunnels, 3 Defence tunnels, 3 Healthcare tunnels.
  3. **The 3-Layer Truth Engine**: Explain why we never mix probabilistic ML with cryptographic hardware facts:
     - *Layer 1: Observed* (Outer PCAP headers, timing, SPIs).
     - *Layer 2: Verified* (Kernel `swanctl --list-sas` telemetry).
     - *Layer 3: AI-Inferred* (Random Forest flow classification).

---

## Act 3: Identifying the Vulnerable Government Link (1.5 min)
- **Screen:** Navigate to `http://localhost:5173/tunnels` or click on **District-Office ↔ State-Data-Centre (`tun-02`)**.
- **Observation:**
  - Security Score is **54/100 (HIGH RISK)**.
  - Why? Perfect Forward Secrecy (PFS) is **DISABLED (`pfs=no`)**, Child SA Lifetime is **86,400s (24 hours)** vs. policy limit of 3,600s, cipher is legacy AES-CBC.
- **Screen:** Open `http://localhost:5173/sa-timeline`.
  - Show the **SA Digital Twin**: Point to the rekey event gap, stale SPI `0x7b11a904`, and 12 failed authentication attempts.

---

## Act 4: The Threat Matrix & Metadata Exposure (1 min)
- **Screen:** Navigate to `http://localhost:5173/threat-matrix`.
  - Show the interactive **5x5 Heatmap** with color-coded severities.
- **Screen:** Navigate to `http://localhost:5173/metadata-exposure`.
  - Inspect the **6-Axis Radar Chart**: Point out how unpadded packet lengths and timing jitter allow passive adversaries to fingerprint application types even across encrypted ESP.

---

## Act 5: Interactive Remediation & Cryptographic Report (1.5 min)
- **Screen:** In the Overview or Tunnel detail modal, open the **Remediation Simulator**.
  - Show the toggle: *Enable PFS (DH Group 14) + Rotate SA Lifetime to 3600s*.
  - Watch the live score jump from **54/100 ➔ 86/100**.
  - Click **“Apply Sovereign Fix”** (executes live backend API call).
- **Screen:** Navigate to `http://localhost:5173/reports`.
  - Click **“Generate Executive PDF Report”**.
  - Show the instant on-premises ReportLab generation with the **SHA-256 Digest**: `f8efe0738f5115d69d...`.
  - Click **“Download Signed PDF”** to verify zero external cloud dependency.

---

## Closing Statement (30 seconds)
- **Presenter:** *“VajraNet AI proves that sovereign cyber defense does not require breaking encryption or compromising operational privacy. By fusing outer metadata observation, verified gateway telemetry, and explainable AI, we verify every tunnel and protect the nation’s mission. Thank you!”*
