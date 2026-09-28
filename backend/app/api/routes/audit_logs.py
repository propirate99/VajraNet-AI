from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...models.entities import AuditLog
from ...schemas.schemas import AuditLogOut

router = APIRouter(prefix="/audit-logs", tags=["Audit Logs"])

@router.get("", response_model=List[AuditLogOut])
def get_audit_logs(db: Session = Depends(get_db)):
    logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(100).all()
    return [AuditLogOut.model_validate(l) for l in logs]
