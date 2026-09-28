from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from ..core.database import Base

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    sector = Column(String(50), nullable=False)  # Government, Defence, Healthcare
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    tunnels = relationship("Tunnel", back_populates="org")

class Tunnel(Base):
    __tablename__ = "tunnels"

    id = Column(String(50), primary_key=True, index=True)  # e.g. tun-01
    name = Column(String(255), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    sector = Column(String(50), nullable=False)  # Government, Defence, Healthcare
    site_a = Column(String(255), nullable=False)
    site_b = Column(String(255), nullable=False)
    ip_a = Column(String(50), nullable=False)
    ip_b = Column(String(50), nullable=False)
    criticality = Column(String(50), default="High")  # Critical, High, Medium, Low
    mode = Column(String(50), default="Tunnel")
    ike_version = Column(String(50), default="IKEv2")
    encryption = Column(String(100), default="AES-256-GCM")
    integrity = Column(String(100), default="AEAD-integrated")
    dh_group = Column(String(100), default="Group 14 (MODP 2048)")
    pfs = Column(String(50), default="Enabled")  # Enabled, Disabled, Unknown
    replay_protection = Column(String(50), default="Enabled")  # Enabled, Disabled, Not Verified
    child_sa_lifetime = Column(Integer, default=3600)
    policy_max_lifetime = Column(Integer, default=3600)
    security_score = Column(Integer, default=85)
    risk_status = Column(String(50), default="Low")  # Low, Moderate, High, Critical
    tunnel_status = Column(String(50), default="Active")  # Active, Unstable, Inactive
    failed_ike_attempts = Column(Integer, default=0)
    metadata_exposure_score = Column(Integer, default=40)
    traffic_label = Column(String(255), default="Web-like / Bulk-Transfer mix")
    traffic_confidence = Column(Float, default=76.0)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    org = relationship("Organization", back_populates="tunnels")
    assessments = relationship("Assessment", back_populates="tunnel", cascade="all, delete-orphan")
    findings = relationship("Finding", back_populates="tunnel", cascade="all, delete-orphan")

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(String(50), primary_key=True, index=True)
    tunnel_id = Column(String(50), ForeignKey("tunnels.id"), nullable=False)
    assessment_name = Column(String(255), nullable=False)
    status = Column(String(50), default="Completed")  # Queued, Processing, Completed, Failed
    score = Column(Integer, default=100)
    risk_level = Column(String(50), default="Low")
    pcap_filename = Column(String(255), nullable=True)
    telemetry_filename = Column(String(255), nullable=True)
    policy_filename = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    tunnel = relationship("Tunnel", back_populates="assessments")
    findings = relationship("Finding", back_populates="assessment", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="assessment", cascade="all, delete-orphan")

class Finding(Base):
    __tablename__ = "findings"

    id = Column(Integer, primary_key=True, index=True)
    finding_code = Column(String(50), index=True, nullable=False)  # PFS-001, LIFE-001, etc.
    tunnel_id = Column(String(50), ForeignKey("tunnels.id"), nullable=False)
    assessment_id = Column(String(50), ForeignKey("assessments.id"), nullable=True)
    title = Column(String(255), nullable=False)
    severity = Column(String(50), default="Medium")  # Critical, High, Medium, Low, Informational
    evidence_type = Column(String(50), default="Verified")  # Observed, Verified, AI-Inferred, Not Verified
    confidence = Column(Float, default=100.0)
    evidence = Column(Text, nullable=False)
    recommendation = Column(Text, nullable=False)
    status = Column(String(50), default="Open")  # Open, Investigating, Remediated, Resolved
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    tunnel = relationship("Tunnel", back_populates="findings")
    assessment = relationship("Assessment", back_populates="findings")

class SecurityPolicy(Base):
    __tablename__ = "security_policies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    sector = Column(String(50), default="Government")
    description = Column(Text, nullable=True)
    required_ike_version = Column(String(50), default="IKEv2")
    required_pfs = Column(Boolean, default=True)
    required_replay_protection = Column(Boolean, default=True)
    allowed_encryption = Column(String(255), default="AES-256-GCM,AES-128-GCM")
    max_child_sa_lifetime = Column(Integer, default=3600)
    min_security_score = Column(Integer, default=70)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Report(Base):
    __tablename__ = "reports"

    id = Column(String(50), primary_key=True, index=True)
    assessment_id = Column(String(50), ForeignKey("assessments.id"), nullable=False)
    report_type = Column(String(50), nullable=False)  # Executive, Technical, Compliance
    filename = Column(String(255), nullable=False)
    sha256_hash = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    assessment = relationship("Assessment", back_populates="reports")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user_email = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    action = Column(String(100), nullable=False)  # LOGIN, UPLOAD, ASSESS, REMEDIATE, REPORT_GEN
    entity_type = Column(String(50), nullable=True)
    entity_id = Column(String(100), nullable=True)
    details = Column(Text, nullable=True)
    ip_address = Column(String(50), default="127.0.0.1")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="audit_logs")
