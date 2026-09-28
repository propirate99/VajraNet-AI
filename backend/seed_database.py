import os
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, Base, engine
from app.core.security import get_password_hash
from app.models.user import User
from app.models.entities import Organization, Tunnel, Finding, SecurityPolicy, Assessment

def seed_initial_data():
    db: Session = SessionLocal()
    try:
        # Check if already seeded
        if db.query(User).count() > 0:
            return

        print("[VajraNet Seeder] Initializing sovereign baseline database...")

        # 1. Seed Users
        users = [
            User(email="admin@vajranet.local", hashed_password=get_password_hash("DemoAdmin@123"), full_name="Super Administrator", role="Super Admin", organization="National CISO Office"),
            User(email="analyst@vajranet.local", hashed_password=get_password_hash("DemoAnalyst@123"), full_name="Sovereign Analyst", role="Security Analyst", organization="CERT-In Assessment Cell"),
            User(email="auditor@vajranet.local", hashed_password=get_password_hash("DemoAuditor@123"), full_name="Compliance Auditor", role="Auditor", organization="National Audit Directorate"),
            User(email="netadmin@vajranet.local", hashed_password=get_password_hash("DemoNetAdmin@123"), full_name="Network Architect", role="Network Administrator", organization="NIC State Centre"),
            User(email="viewer@vajranet.local", hashed_password=get_password_hash("DemoViewer@123"), full_name="Operations Monitor", role="Viewer", organization="Hospital IT Command"),
        ]
        db.add_all(users)
        db.commit()

        # 2. Seed Organizations
        orgs = [
            Organization(name="Ministry of Electronics and IT (MeitY)", sector="Government", description="State and central government inter-site networks"),
            Organization(name="Integrated Defence Staff (IDS)", sector="Defence", description="Secured tactical and border communication nodes"),
            Organization(name="National Health Authority (NHA)", sector="Healthcare", description="Ayushman Bharat Digital Mission hospital & lab backbone")
        ]
        db.add_all(orgs)
        db.commit()

        # 3. Seed Policies
        policies = [
            SecurityPolicy(
                name="Government Secure VPN Baseline",
                sector="Government",
                description="CERT-In aligned baseline mandating IKEv2, AES-256-GCM, and PFS",
                required_ike_version="IKEv2",
                required_pfs=True,
                required_replay_protection=True,
                allowed_encryption="AES-256-GCM,AES-128-GCM",
                max_child_sa_lifetime=3600,
                min_security_score=70
            ),
            SecurityPolicy(
                name="Defence Restricted Network Baseline",
                sector="Defence",
                description="Air-gapped tactical policy requiring ECP-256+ Diffie-Hellman and strict SA rotation",
                required_ike_version="IKEv2",
                required_pfs=True,
                required_replay_protection=True,
                allowed_encryption="AES-256-GCM",
                max_child_sa_lifetime=1800,
                min_security_score=80
            ),
            SecurityPolicy(
                name="Healthcare Critical Connectivity Baseline",
                sector="Healthcare",
                description="ABDM privacy-by-design policy protecting EHR and diagnostic transfer paths",
                required_ike_version="IKEv2",
                required_pfs=True,
                required_replay_protection=True,
                allowed_encryption="AES-256-GCM",
                max_child_sa_lifetime=3600,
                min_security_score=75
            ),
            SecurityPolicy(
                name="Test Lab Baseline",
                sector="Government",
                description="Permissive lab policy for staging and migration tests",
                required_ike_version="IKEv2",
                required_pfs=False,
                required_replay_protection=True,
                allowed_encryption="AES-256-GCM,AES-CBC",
                max_child_sa_lifetime=14400,
                min_security_score=50
            ),
            SecurityPolicy(
                name="Legacy Migration Baseline",
                sector="Government",
                description="Gradual upgrade path for deprecated gateways",
                required_ike_version="IKEv2",
                required_pfs=False,
                required_replay_protection=False,
                allowed_encryption="AES-128-CBC",
                max_child_sa_lifetime=7200,
                min_security_score=60
            )
        ]
        db.add_all(policies)
        db.commit()

        # 4. Seed Tunnels
        tunnels = [
            Tunnel(
                id="tun-01",
                name="Hospital-HQ ↔ Diagnostic-Lab",
                sector="Healthcare",
                site_a="Hospital HQ (New Delhi)",
                site_b="Diagnostic Lab Node (Gurugram)",
                ip_a="172.20.10.1",
                ip_b="172.20.10.2",
                criticality="High",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 14 (MODP 2048)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=3600,
                policy_max_lifetime=3600,
                security_score=92,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=32,
                traffic_label="Web-like / Bulk-Transfer mix",
                traffic_confidence=76.0
            ),
            Tunnel(
                id="tun-02",
                name="District-Office ↔ State-Data-Centre",
                sector="Government",
                site_a="District Administration (Varanasi)",
                site_b="State Data Centre (Lucknow)",
                ip_a="172.20.20.1",
                ip_b="172.20.20.2",
                criticality="Critical",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-CBC + HMAC-SHA256",
                integrity="HMAC-SHA256-128",
                dh_group="None (PFS Disabled)",
                pfs="Disabled",
                replay_protection="Not Verified",
                child_sa_lifetime=14400,
                policy_max_lifetime=3600,
                security_score=54,
                risk_status="High",
                tunnel_status="Active",
                failed_ike_attempts=12,
                metadata_exposure_score=72,
                traffic_label="High-burst Database Sync & Video Burst",
                traffic_confidence=84.0
            ),
            Tunnel(
                id="tun-03",
                name="Secure-Site-A ↔ Secure-Site-B",
                sector="Defence",
                site_a="Operations Command HQ (Delhi)",
                site_b="Tactical Regional Centre (Air-Gapped)",
                ip_a="10.10.100.1",
                ip_b="10.10.100.2",
                criticality="Critical",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 19 (ECP 256)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=1800,
                policy_max_lifetime=3600,
                security_score=84,
                risk_status="Moderate",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=68,
                traffic_label="Video-like UDP Stream (Tactical Telemetry)",
                traffic_confidence=81.0
            ),
            Tunnel(
                id="tun-04",
                name="Hospital-DR ↔ Cloud-Backup",
                sector="Healthcare",
                site_a="Hospital Disaster Recovery Hub",
                site_b="Sovereign Health Cloud Vault",
                ip_a="172.24.1.10",
                ip_b="172.24.2.20",
                criticality="Critical",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 14 (MODP 2048)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=3600,
                policy_max_lifetime=3600,
                security_score=88,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=40,
                traffic_label="Encrypted Bulk Data Replication",
                traffic_confidence=89.0
            ),
            Tunnel(
                id="tun-05",
                name="Ministry-HQ ↔ State-Portal",
                sector="Government",
                site_a="Central Ministry Gateway",
                site_b="State Citizen Portal Gateway",
                ip_a="172.16.5.1",
                ip_b="172.16.5.2",
                criticality="High",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-128-CBC + HMAC-SHA1",
                integrity="HMAC-SHA1-96",
                dh_group="Unknown",
                pfs="Unknown",
                replay_protection="Enabled",
                child_sa_lifetime=7200,
                policy_max_lifetime=3600,
                security_score=63,
                risk_status="Moderate",
                tunnel_status="Unstable",
                failed_ike_attempts=4,
                metadata_exposure_score=58,
                traffic_label="Web Transaction Traffic",
                traffic_confidence=72.0
            ),
            Tunnel(
                id="tun-06",
                name="Defence-Ops ↔ Radar-Station",
                sector="Defence",
                site_a="Air Defence Operations Command",
                site_b="Coastal Radar Facility Beta",
                ip_a="10.20.1.1",
                ip_b="10.20.1.25",
                criticality="Critical",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 20 (ECP 384)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=1800,
                policy_max_lifetime=3600,
                security_score=91,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=35,
                traffic_label="Continuous Telemetry Stream",
                traffic_confidence=93.0
            ),
            Tunnel(
                id="tun-07",
                name="NIC-Gateway ↔ District-Treasury",
                sector="Government",
                site_a="National Informatics Centre Hub",
                site_b="District Treasury Subnet",
                ip_a="172.18.40.10",
                ip_b="172.18.40.50",
                criticality="Critical",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 14 (MODP 2048)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=3600,
                policy_max_lifetime=3600,
                security_score=87,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=42,
                traffic_label="Financial API Batches",
                traffic_confidence=82.0
            ),
            Tunnel(
                id="tun-08",
                name="AIIMS-Main ↔ Telemedicine-Hub",
                sector="Healthcare",
                site_a="AIIMS Apex Healthcare Centre",
                site_b="Rural Telemedicine Outpost",
                ip_a="192.168.100.1",
                ip_b="192.168.100.5",
                criticality="High",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 14 (MODP 2048)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=3600,
                policy_max_lifetime=3600,
                security_score=89,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=48,
                traffic_label="Real-time Teleconsult Video Feed",
                traffic_confidence=85.0
            ),
            Tunnel(
                id="tun-09",
                name="Customs-HQ ↔ Sea-Port",
                sector="Government",
                site_a="Central Customs Authority",
                site_b="Major Port Terminal Gate",
                ip_a="172.30.12.1",
                ip_b="172.30.12.99",
                criticality="Medium",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-128-CBC + HMAC-SHA256",
                integrity="HMAC-SHA256-128",
                dh_group="None",
                pfs="Disabled",
                replay_protection="Enabled",
                child_sa_lifetime=7200,
                policy_max_lifetime=3600,
                security_score=58,
                risk_status="High",
                tunnel_status="Active",
                failed_ike_attempts=2,
                metadata_exposure_score=65,
                traffic_label="Cargo Manifest Transfer",
                traffic_confidence=78.0
            ),
            Tunnel(
                id="tun-10",
                name="Border-Command ↔ Forward-Base",
                sector="Defence",
                site_a="Northern Border Surveillance Command",
                site_b="High-Altitude Forward Base",
                ip_a="10.50.2.1",
                ip_b="10.50.2.2",
                criticality="Critical",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 19 (ECP 256)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=1800,
                policy_max_lifetime=3600,
                security_score=89,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=52,
                traffic_label="Telemetry & Command Feed",
                traffic_confidence=90.0
            ),
            Tunnel(
                id="tun-11",
                name="Revenue-Dept ↔ State-Treasury",
                sector="Government",
                site_a="State Revenue Department",
                site_b="State Reserve Treasury",
                ip_a="172.19.1.5",
                ip_b="172.19.1.20",
                criticality="High",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 14 (MODP 2048)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=3600,
                policy_max_lifetime=3600,
                security_score=85,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=44,
                traffic_label="Database Transactions",
                traffic_confidence=86.0
            ),
            Tunnel(
                id="tun-12",
                name="Ayushman-Bharat ↔ Insurance-Grid",
                sector="Healthcare",
                site_a="National Health Authority Node",
                site_b="Empanelled Insurance Gateway",
                ip_a="172.22.100.1",
                ip_b="172.22.100.8",
                criticality="Critical",
                mode="Tunnel",
                ike_version="IKEv2",
                encryption="AES-256-GCM",
                integrity="AEAD-integrated",
                dh_group="Group 14 (MODP 2048)",
                pfs="Enabled",
                replay_protection="Enabled",
                child_sa_lifetime=3600,
                policy_max_lifetime=3600,
                security_score=93,
                risk_status="Low",
                tunnel_status="Active",
                failed_ike_attempts=0,
                metadata_exposure_score=36,
                traffic_label="Healthcare Claims API Traffic",
                traffic_confidence=88.0
            )
        ]
        db.add_all(tunnels)
        db.commit()

        # 5. Seed Findings
        findings = [
            Finding(
                finding_code="PFS-001",
                tunnel_id="tun-02",
                title="Perfect Forward Secrecy is Disabled on Child SA",
                severity="High",
                evidence_type="Verified",
                confidence=100.0,
                evidence="Child SA proposal negotiated without Diffie-Hellman group in swanctl SA export",
                recommendation="Enable PFS with DH Group 14 or Group 19 (ECP 256) in strongSwan swanctl.conf.",
                status="Open"
            ),
            Finding(
                finding_code="LIFE-001",
                tunnel_id="tun-02",
                title="Security Association Lifetime Exceeds Approved Policy",
                severity="Medium",
                evidence_type="Verified",
                confidence=100.0,
                evidence="Active SA lifetime configured to 14,400s (Policy threshold: 3,600s)",
                recommendation="Enforce max Child SA lifetime of 3,600s to limit cryptographic exposure.",
                status="Open"
            ),
            Finding(
                finding_code="AUTH-001",
                tunnel_id="tun-02",
                title="Repeated IKE Authentication Failures Detected",
                severity="Medium",
                evidence_type="Observed + Verified",
                confidence=94.0,
                evidence="12 failed IKE negotiation events in 10 minutes logged at gateway",
                recommendation="Investigate peer authentication credentials and review firewall allowlists.",
                status="Investigating"
            ),
            Finding(
                finding_code="REPLAY-001",
                tunnel_id="tun-02",
                title="Anti-Replay Protection Status Unverified",
                severity="Medium",
                evidence_type="Not Verified",
                confidence=0.0,
                evidence="Replay window configuration omitted from telemetry export",
                recommendation="Verify anti-replay window depth (minimum 64 packets) through gateway telemetry.",
                status="Open"
            ),
            Finding(
                finding_code="META-001",
                tunnel_id="tun-03",
                title="High Encrypted-Traffic Metadata Exposure Distinguishability",
                severity="Medium",
                evidence_type="AI-Inferred",
                confidence=81.0,
                evidence="Radar analysis indicates 82/100 timing exposure and 78/100 burst uniqueness",
                recommendation="Evaluate Traffic Flow Confidentiality (TFC) padding and traffic shaping on edge.",
                status="Open"
            ),
            Finding(
                finding_code="PFS-003",
                tunnel_id="tun-09",
                title="Perfect Forward Secrecy Not Enforced",
                severity="High",
                evidence_type="Verified",
                confidence=100.0,
                evidence="swanctl SA dump confirms Child SA negotiated without DH group",
                recommendation="Enable PFS with DH Group 14 or higher during maintenance window.",
                status="Open"
            ),
            Finding(
                finding_code="COMPLY-001",
                tunnel_id="tun-01",
                title="Cryptographic Configuration Matches Sovereign Baseline",
                severity="Informational",
                evidence_type="Verified",
                confidence=100.0,
                evidence="Verified via swanctl --list-sas telemetry and approved hospital policy",
                recommendation="Continue regular telemetry monitoring and quarterly key rotation review.",
                status="Resolved"
            )
        ]
        db.add_all(findings)
        db.commit()

        # 6. Seed Sample Initial Assessment
        asm = Assessment(
            id="asm-demo-001",
            tunnel_id="tun-02",
            assessment_name="State Data Centre Pre-Audit Baseline",
            status="Completed",
            score=54,
            risk_level="High",
            pcap_filename="risky_government_metadata.json",
            telemetry_filename="risky_government_swanctl.txt",
            policy_filename="government_secure_vpn_baseline.yaml"
        )
        db.add(asm)
        db.commit()

        print("[VajraNet Seeder] Database seeded successfully with 5 users, 12 tunnels, 7 findings, and 5 policies.")
    finally:
        db.close()

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    seed_initial_data()
