import os
import uuid
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ...core.database import get_db
from ...core.security import get_current_user
from ...models.user import User
from ...models.entities import Assessment, Tunnel, Finding, AuditLog
from ...schemas.schemas import AssessmentOut, FindingOut
from ...services.parsers import PCAPParser, StrongSwanParser
from ...services.risk_policy_engine import PolicyAndRiskEngine
from ...services.traffic_classifier import TrafficClassifier

router = APIRouter(prefix="/assessments", tags=["Assessments"])

@router.get("", response_model=List[AssessmentOut])
def get_assessments(db: Session = Depends(get_db)):
    assessments = db.query(Assessment).order_by(Assessment.created_at.desc()).all()
    return [AssessmentOut.model_validate(a) for a in assessments]

@router.get("/{assessment_id}", response_model=AssessmentOut)
def get_assessment(assessment_id: str, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return AssessmentOut.model_validate(assessment)

@router.post("", response_model=AssessmentOut)
async def create_assessment(
    tunnel_id: str = Form("tun-02"),
    assessment_name: str = Form("Air-Gapped Sovereign Audit"),
    is_authorized: bool = Form(True),
    pcap_file: Optional[UploadFile] = File(None),
    telemetry_file: Optional[UploadFile] = File(None),
    policy_file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not is_authorized:
        raise HTTPException(status_code=400, detail="Authorization confirmation is required to analyze network data.")

    tunnel = db.query(Tunnel).filter(Tunnel.id == tunnel_id).first()
    if not tunnel:
        tunnel = db.query(Tunnel).first()

    assessment_id = f"asm-{uuid.uuid4().hex[:8]}"

    # Execute Parsers & Analysis
    pcap_parser = PCAPParser()
    pcap_text = (await pcap_file.read()).decode("utf-8", errors="ignore") if pcap_file else ""
    pcap_stats = pcap_parser.parse_metadata_file(pcap_text)

    swan_parser = StrongSwanParser()
    telemetry_text = (await telemetry_file.read()).decode("utf-8", errors="ignore") if telemetry_file else ""
    telemetry_stats = swan_parser.parse_sas_output(telemetry_text)

    # Evaluate Policy & Risk
    engine = PolicyAndRiskEngine()
    tunnel_eval_data = {
        "id": tunnel.id,
        "encryption": telemetry_stats.get("encryption", tunnel.encryption),
        "pfs": telemetry_stats.get("pfs_status", tunnel.pfs),
        "replay_protection": telemetry_stats.get("replay_protection", tunnel.replay_protection),
        "child_sa_lifetime": telemetry_stats.get("child_sa_lifetime", tunnel.child_sa_lifetime),
        "failed_ike_attempts": telemetry_stats.get("auth_failures_detected", tunnel.failed_ike_attempts),
        "metadata_exposure_score": tunnel.metadata_exposure_score
    }
    score, risk_level, findings_data = engine.evaluate_tunnel(tunnel_eval_data)

    # Run ML Traffic Classifier
    classifier = TrafficClassifier()
    ml_res = classifier.classify_flow(pcap_stats)

    # Persist Assessment
    assessment = Assessment(
        id=assessment_id,
        tunnel_id=tunnel.id,
        assessment_name=assessment_name,
        status="Completed",
        score=score,
        risk_level=risk_level,
        pcap_filename=pcap_file.filename if pcap_file else "district_office_capture.pcap",
        telemetry_filename=telemetry_file.filename if telemetry_file else "swanctl_list_sas_dump.txt",
        policy_filename=policy_file.filename if policy_file else "sovereign_vpn_policy_2026.yaml"
    )
    db.add(assessment)

    # Persist Findings
    for f in findings_data:
        finding = Finding(
            finding_code=f["finding_code"],
            tunnel_id=tunnel.id,
            assessment_id=assessment_id,
            title=f["title"],
            severity=f["severity"],
            evidence_type=f["evidence_type"],
            confidence=f["confidence"],
            evidence=f["evidence"],
            recommendation=f["recommendation"],
            status=f["status"]
        )
        db.add(finding)

    # Update Tunnel state
    tunnel.security_score = score
    tunnel.risk_status = risk_level
    tunnel.traffic_label = ml_res["predicted_label"]
    tunnel.traffic_confidence = ml_res["confidence_score"]

    audit = AuditLog(
        user_id=current_user.id,
        user_email=current_user.email,
        role=current_user.role,
        action="ASSESS",
        entity_type="Assessment",
        entity_id=assessment_id,
        details=f"Ran local assessment '{assessment_name}' on {tunnel.name}. Score: {score}/100"
    )
    db.add(audit)
    db.commit()
    db.refresh(assessment)

    return AssessmentOut.model_validate(assessment)
