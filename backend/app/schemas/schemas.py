from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

# Auth Schemas
class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    role: str
    organization: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut

# Finding Schemas
class FindingOut(BaseModel):
    id: int
    finding_code: str
    tunnel_id: str
    assessment_id: Optional[str] = None
    title: str
    severity: str
    evidence_type: str
    confidence: float
    evidence: str
    recommendation: str
    status: str

    class Config:
        from_attributes = True

class FindingUpdate(BaseModel):
    status: str

# Tunnel Schemas
class TunnelOut(BaseModel):
    id: str
    name: str
    sector: str
    organization: Optional[str] = None
    site_a: str
    site_b: str
    ip_a: str
    ip_b: str
    criticality: str
    mode: str
    ike_version: str
    encryption: str
    integrity: str
    dh_group: str
    pfs: str
    replay_protection: str
    child_sa_lifetime: int
    policy_max_lifetime: int
    security_score: int
    risk_status: str
    tunnel_status: str
    failed_ike_attempts: int
    metadata_exposure_score: int
    traffic_label: str
    traffic_confidence: float
    findings: List[FindingOut] = []

    class Config:
        from_attributes = True

class TunnelCreate(BaseModel):
    id: str
    name: str
    sector: str
    site_a: str
    site_b: str
    ip_a: str
    ip_b: str
    criticality: str = "High"
    mode: str = "Tunnel"
    ike_version: str = "IKEv2"
    encryption: str = "AES-256-GCM"
    pfs: str = "Enabled"

# Assessment Schemas
class AssessmentOut(BaseModel):
    id: str
    tunnel_id: str
    assessment_name: str
    status: str
    score: int
    risk_level: str
    pcap_filename: Optional[str] = None
    telemetry_filename: Optional[str] = None
    created_at: datetime
    findings: List[FindingOut] = []

    class Config:
        from_attributes = True

class AssessmentCreate(BaseModel):
    tunnel_id: str
    assessment_name: str
    notes: Optional[str] = None
    is_authorized: bool

# Policy Schemas
class PolicyOut(BaseModel):
    id: int
    name: str
    sector: str
    description: Optional[str] = None
    required_ike_version: str
    required_pfs: bool
    required_replay_protection: bool
    allowed_encryption: str
    max_child_sa_lifetime: int
    min_security_score: int
    is_active: bool

    class Config:
        from_attributes = True

class PolicyCreate(BaseModel):
    name: str
    sector: str = "Government"
    description: Optional[str] = None
    required_ike_version: str = "IKEv2"
    required_pfs: bool = True
    required_replay_protection: bool = True
    allowed_encryption: str = "AES-256-GCM,AES-128-GCM"
    max_child_sa_lifetime: int = 3600
    min_security_score: int = 70

# Report Schemas
class ReportOut(BaseModel):
    id: str
    assessment_id: str
    report_type: str
    filename: str
    sha256_hash: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ReportGenerateRequest(BaseModel):
    assessment_id: str
    report_type: str  # Executive, Technical, Compliance

# Audit Schemas
class AuditLogOut(BaseModel):
    id: int
    user_email: str
    role: str
    action: str
    entity_type: Optional[str] = None
    entity_id: Optional[str] = None
    details: Optional[str] = None
    ip_address: str
    created_at: datetime

    class Config:
        from_attributes = True

# Dashboard Summary
class DashboardSummaryOut(BaseModel):
    total_tunnels: int
    healthy_tunnels: int
    high_risk_tunnels: int
    policy_drift_tunnels: int
    overall_score: int
    risk_level: str
    sector_postures: List[Dict[str, Any]]
    recent_findings: List[FindingOut]
