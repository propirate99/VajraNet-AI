from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...models.entities import Finding
from ...schemas.schemas import FindingOut, FindingUpdate

router = APIRouter(prefix="/findings", tags=["Findings"])

@router.get("", response_model=List[FindingOut])
def get_findings(db: Session = Depends(get_db)):
    findings = db.query(Finding).order_by(Finding.id.desc()).all()
    return [FindingOut.model_validate(f) for f in findings]

@router.put("/{finding_id}/status", response_model=FindingOut)
def update_finding_status(finding_id: int, update_data: FindingUpdate, db: Session = Depends(get_db)):
    finding = db.query(Finding).filter(Finding.id == finding_id).first()
    if not finding:
        raise HTTPException(status_code=404, detail="Finding not found")
    finding.status = update_data.status
    db.commit()
    db.refresh(finding)
    return FindingOut.model_validate(finding)
