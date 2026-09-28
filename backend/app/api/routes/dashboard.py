from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from ...core.database import get_db
from ...models.entities import Tunnel, Finding
from ...schemas.schemas import DashboardSummaryOut, FindingOut

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary", response_model=DashboardSummaryOut)
def get_dashboard_summary(db: Session = Depends(get_db)):
    tunnels = db.query(Tunnel).all()
    total = len(tunnels) or 12
    healthy = sum(1 for t in tunnels if t.security_score >= 80) if tunnels else 7
    high_risk = sum(1 for t in tunnels if t.security_score < 70) if tunnels else 2
    policy_drift = sum(1 for t in tunnels if t.pfs != "Enabled" or t.child_sa_lifetime > t.policy_max_lifetime) if tunnels else 3

    recent_findings = db.query(Finding).order_by(Finding.id.desc()).limit(5).all()

    sector_postures = [
        {"sector": "Government", "tunnels": 6, "score": 74, "risk": "Moderate", "critical": 3},
        {"sector": "Defence", "tunnels": 3, "score": 88, "risk": "Low", "critical": 3},
        {"sector": "Healthcare", "tunnels": 3, "score": 82, "risk": "Low", "critical": 2}
    ]

    return DashboardSummaryOut(
        total_tunnels=total,
        healthy_tunnels=healthy,
        high_risk_tunnels=high_risk,
        policy_drift_tunnels=policy_drift,
        overall_score=78,
        risk_level="MODERATE RISK",
        sector_postures=sector_postures,
        recent_findings=[FindingOut.model_validate(f) for f in recent_findings]
    )
