# VajraNet AI — Sovereign Security & Zero-Payload Verification Model

---

## 1. Zero-Payload Decryption Guarantee (RFC 4303)

Traditional network inspection tools often attempt SSL/TLS interception or private key escrow to inspect data. In sovereign defense, government, and healthcare environments, **this practice introduces severe security liabilities**:
1. Storing master private keys creates a single point of catastrophic failure.
2. Inspecting healthcare EHR payloads violates patient privacy laws (DISHA, ABDM, HIPAA).
3. Air-gapped defense enclaves strictly forbid key sharing with monitoring tools.

### How VajraNet AI Avoids Decryption:
- **Outer Header Analysis**: Operates strictly on IPsec ESP (Protocol 50) outer headers, SPIs, and sequence numbers.
- **Timing & Cadence Analysis**: Employs interarrival times and burst densities to detect operational behavior without inspecting data bytes.
- **Gateway Telemetry Ingestion**: Gathers cryptographic suite parameters directly from authorized gateway control planes (`swanctl --list-sas` / VICI), confirming negotiation status at the kernel level without reading traffic content.

---

## 2. Role-Based Access Control (RBAC) Matrix

| Action | Security Analyst | Root Admin | Compliance Auditor |
|:---|:---:|:---:|:---:|
| View Dashboard & Tunnels | ✅ | ✅ | ✅ |
| View SA Digital Twin | ✅ | ✅ | ✅ |
| View Threat Matrix | ✅ | ✅ | ✅ |
| Execute New Assessment | ✅ | ✅ | ❌ |
| Apply Remediation Fix | ✅ | ✅ | ❌ |
| Create/Edit Policies | ❌ | ✅ | ❌ |
| Generate Cryptographic PDF | ✅ | ✅ | ✅ |
| View Audit Logs | ❌ | ✅ | ✅ |

---

## 3. Cryptographic Verification & Audit Trail

- **SHA-256 Digest Signing**: Every generated PDF report includes a SHA-256 hash calculated over the raw PDF byte stream at compile time.
- **Audit Logging**: Every configuration remediation, assessment run, and login event is permanently recorded in the `audit_logs` table with timestamp, operator ID, and origin IP address.
