import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...core.security import get_current_user
from ...models.user import User
from ...models.entities import Report, Assessment, Tunnel, Finding, AuditLog
from ...schemas.schemas import ReportOut, ReportGenerateRequest
from ...services.report_generator import ReportGenerator

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("", response_model=List[ReportOut])
def get_reports(db: Session = Depends(get_db)):
    reports = db.query(Report).order_by(Report.created_at.desc()).all()
    return [ReportOut.model_validate(r) for r in reports]

@router.post("/generate", response_model=ReportOut)
def generate_report(
    req: ReportGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    assessment = db.query(Assessment).filter(Assessment.id == req.assessment_id).first()
    if not assessment:
        # Fallback to first available assessment
        assessment = db.query(Assessment).first()
        if not assessment:
            raise HTTPException(status_code=404, detail="No assessment found to generate report")

    tunnel = db.query(Tunnel).filter(Tunnel.id == assessment.tunnel_id).first()
    findings = db.query(Finding).filter(Finding.tunnel_id == assessment.tunnel_id).all()

    tunnel_data = {
        "id": tunnel.id if tunnel else "tun-01",
        "name": tunnel.name if tunnel else "Hospital-HQ ↔ Diagnostic-Lab",
        "sector": tunnel.sector if tunnel else "Healthcare",
        "criticality": tunnel.criticality if tunnel else "High",
        "security_score": assessment.score,
        "risk_status": assessment.risk_level
    }

    findings_data = [
        {
            "finding_code": f.finding_code,
            "title": f.title,
            "evidence_type": f.evidence_type,
            "severity": f.severity
        }
        for f in findings
    ]

    gen = ReportGenerator()
    result = gen.generate_report(req.report_type, tunnel_data, findings_data)

    report_record = Report(
        id=f"rep-{os.urandom(4).hex()}",
        assessment_id=assessment.id,
        report_type=req.report_type,
        filename=result["filename"],
        sha256_hash=result["sha256_hash"]
    )
    db.add(report_record)

    audit = AuditLog(
        user_id=current_user.id,
        user_email=current_user.email,
        role=current_user.role,
        action="REPORT_GEN",
        entity_type="Report",
        entity_id=report_record.id,
        details=f"Generated {req.report_type} PDF dossier for assessment {assessment.id}"
    )
    db.add(audit)
    db.commit()
    db.refresh(report_record)

    return ReportOut.model_validate(report_record)

@router.get("/{report_id}/download")
def download_report(report_id: str, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    gen = ReportGenerator()
    file_path = os.path.join(gen.output_dir, report.filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File on disk not found")

    return FileResponse(file_path, filename=report.filename, media_type="application/pdf")
