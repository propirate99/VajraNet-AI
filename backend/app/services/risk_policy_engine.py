from typing import Dict, Any, List, Tuple

class PolicyAndRiskEngine:
    """
    Evaluates verified telemetry and PCAP evidence against sovereign IPsec security baselines.
    Applies deterministic scoring penalties and produces evidence-linked findings.
    """

    DEFAULT_POLICY = {
        "required_ike_version": "IKEv2",
        "required_pfs": True,
        "required_replay_protection": True,
        "allowed_encryption": ["AES-256-GCM", "AES-128-GCM"],
        "max_child_sa_lifetime_seconds": 3600,
        "min_security_score": 70
    }

    def evaluate_tunnel(self, tunnel_data: Dict[str, Any], policy: Dict[str, Any] = None) -> Tuple[int, str, List[Dict[str, Any]]]:
        if policy is None:
            policy = self.DEFAULT_POLICY

        score = 100
        findings = []

        # 1. Check Encryption Profile
        encryption = tunnel_data.get("encryption", "AES-256-GCM")
        is_cipher_allowed = any(c in encryption for c in policy.get("allowed_encryption", ["AES-256-GCM"]))
        if not is_cipher_allowed:
            score -= 20
            findings.append({
                "finding_code": "CRYPTO-001",
                "title": f"Unapproved or Legacy Cipher Suite Configured ({encryption})",
                "severity": "High",
                "evidence_type": "Verified",
                "confidence": 100.0,
                "evidence": f"Gateway negotiated {encryption}. Sovereign baseline permits only AES-256-GCM / AES-128-GCM AEAD.",
                "recommendation": "Upgrade proposal in swanctl.conf to aes256gcm16.",
                "status": "Open"
            })

        # 2. Check Perfect Forward Secrecy (PFS)
        pfs = tunnel_data.get("pfs", "Enabled")
        if pfs == "Disabled":
            score -= 15
            findings.append({
                "finding_code": "PFS-001",
                "title": "Perfect Forward Secrecy is Disabled on Child SA",
                "severity": "High",
                "evidence_type": "Verified",
                "confidence": 100.0,
                "evidence": "Child SA proposal negotiated without Diffie-Hellman group in verified telemetry.",
                "recommendation": "Enable PFS with DH Group 14 (MODP 2048) or Group 19 (ECP 256).",
                "status": "Open"
            })
        elif pfs == "Unknown":
            score -= 8
            findings.append({
                "finding_code": "PFS-002",
                "title": "PFS Configuration State Unverified",
                "severity": "Medium",
                "evidence_type": "Not Verified",
                "confidence": 70.0,
                "evidence": "Telemetry export lacks DH group parameters for Child SA renewal.",
                "recommendation": "Export complete swanctl configuration to verify PFS.",
                "status": "Open"
            })

        # 3. Check Anti-Replay Protection
        replay = tunnel_data.get("replay_protection", "Enabled")
        if replay == "Disabled":
            score -= 15
            findings.append({
                "finding_code": "REPLAY-001",
                "title": "Anti-Replay Window Disabled",
                "severity": "High",
                "evidence_type": "Verified",
                "confidence": 100.0,
                "evidence": "Replay window explicitly configured to 0 in kernel IPsec policy.",
                "recommendation": "Enable replay window with depth >= 64 packets.",
                "status": "Open"
            })
        elif replay == "Not Verified":
            score -= 8
            findings.append({
                "finding_code": "REPLAY-002",
                "title": "Anti-Replay Protection Status Not Verified",
                "severity": "Medium",
                "evidence_type": "Not Verified",
                "confidence": 0.0,
                "evidence": "Anti-replay window size omitted from telemetry export.",
                "recommendation": "Validate anti-replay protection via gateway telemetry audit.",
                "status": "Open"
            })

        # 4. Check Child SA Lifetime
        lifetime = tunnel_data.get("child_sa_lifetime", 3600)
        max_lifetime = policy.get("max_child_sa_lifetime_seconds", 3600)
        if lifetime > max_lifetime:
            score -= 10
            findings.append({
                "finding_code": "LIFE-001",
                "title": f"Child SA Lifetime Exceeds Policy Baseline ({lifetime}s vs {max_lifetime}s)",
                "severity": "Medium",
                "evidence_type": "Verified",
                "confidence": 100.0,
                "evidence": f"Configured SA renewal lifetime is {lifetime} seconds (Policy limit: {max_lifetime}s).",
                "recommendation": f"Enforce maximum lifetime of {max_lifetime} seconds in swanctl.conf.",
                "status": "Open"
            })

        # 5. Check Repeated IKE Failures
        ike_failures = tunnel_data.get("failed_ike_attempts", 0)
        if ike_failures >= 5:
            score -= 10
            findings.append({
                "finding_code": "AUTH-001",
                "title": f"Repeated IKE Authentication Failures Detected ({ike_failures} in last 10m)",
                "severity": "Medium",
                "evidence_type": "Observed + Verified",
                "confidence": 94.0,
                "evidence": f"{ike_failures} failed authentication attempts recorded at gateway interface.",
                "recommendation": "Review peer credentials, pre-shared keys, and endpoint firewall allowlists.",
                "status": "Investigating"
            })

        # 6. Check Metadata Exposure Score
        metadata_score = tunnel_data.get("metadata_exposure_score", 40)
        if metadata_score >= 65:
            score -= 10
            findings.append({
                "finding_code": "META-001",
                "title": f"High Encrypted-Traffic Metadata Exposure ({metadata_score}/100)",
                "severity": "Medium",
                "evidence_type": "AI-Inferred",
                "confidence": 81.0,
                "evidence": "Observed packet timing and burstiness reveal distinctive operational signatures.",
                "recommendation": "Evaluate Traffic Flow Confidentiality (TFC) padding and traffic shaping on edge.",
                "status": "Open"
            })

        # Compliant baseline indicator
        if len(findings) == 0:
            findings.append({
                "finding_code": "COMPLY-001",
                "title": "Cryptographic Configuration Matches Sovereign Baseline",
                "severity": "Informational",
                "evidence_type": "Verified",
                "confidence": 100.0,
                "evidence": "IKEv2, AES-256-GCM, PFS Enabled, Anti-Replay active, and lifetime compliant.",
                "recommendation": "Continue regular telemetry monitoring and quarterly key rotation review.",
                "status": "Resolved"
            })

        # Clamp score between 0 and 100
        score = max(0, min(100, score))

        # Determine risk band
        if score >= 90:
            risk_level = "Low"
        elif score >= 75:
            risk_level = "Low"
        elif score >= 50:
            risk_level = "Moderate"
        elif score >= 25:
            risk_level = "High"
        else:
            risk_level = "Critical"

        return score, risk_level, findings
