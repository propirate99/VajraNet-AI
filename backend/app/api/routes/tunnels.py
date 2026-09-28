from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from ...core.database import get_db
from ...core.security import get_current_user, require_roles
from ...models.user import User
from ...models.entities import Tunnel, Finding, AuditLog
from ...schemas.schemas import TunnelOut, TunnelCreate, FindingOut

router = APIRouter(prefix="/tunnels", tags=["Tunnels"])

@router.get("", response_model=List[TunnelOut])
def get_all_tunnels(db: Session = Depends(get_db)):
    tunnels = db.query(Tunnel).all()
    return [TunnelOut.model_validate(t) for t in tunnels]

@router.get("/{tunnel_id}", response_model=TunnelOut)
def get_tunnel_detail(tunnel_id: str, db: Session = Depends(get_db)):
    tunnel = db.query(Tunnel).filter(Tunnel.id == tunnel_id).first()
    if not tunnel:
        raise HTTPException(status_code=404, detail="Tunnel not found")
    return TunnelOut.model_validate(tunnel)

@router.post("/{tunnel_id}/remediate")
def remediate_tunnel(tunnel_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    tunnel = db.query(Tunnel).filter(Tunnel.id == tunnel_id).first()
    if not tunnel:
        raise HTTPException(status_code=404, detail="Tunnel not found")

    # Apply sovereign remediation delta
    tunnel.pfs = "Enabled"
    tunnel.dh_group = "Group 14 (MODP 2048)"
    tunnel.child_sa_lifetime = 3600
    tunnel.replay_protection = "Enabled"
    tunnel.failed_ike_attempts = 0
    tunnel.security_score = 86
    tunnel.risk_status = "Low"

    # Mark findings resolved
    findings = db.query(Finding).filter(Finding.tunnel_id == tunnel_id).all()
    for f in findings:
        if f.finding_code in ["PFS-001", "LIFE-001", "AUTH-001", "REPLAY-001"]:
            f.status = "Resolved"

    audit = AuditLog(
        user_id=current_user.id,
        user_email=current_user.email,
        role=current_user.role,
        action="REMEDIATE",
        entity_type="Tunnel",
        entity_id=tunnel.id,
        details=f"Remediated tunnel {tunnel.name}: PFS enabled, lifetime set to 3600s, score increased to 86"
    )
    db.add(audit)
    db.commit()
    db.refresh(tunnel)

    return {
        "message": "Remediation applied successfully",
        "new_score": tunnel.security_score,
        "pfs": tunnel.pfs,
        "lifetime": tunnel.child_sa_lifetime
    }

@router.get("/{tunnel_id}/timeline")
def get_tunnel_timeline(tunnel_id: str):
    # Returns standard SA lifecycle events
    return [
        {
            "id": "sa-1",
            "time": "10:00:04",
            "event": "IKE_SA_INIT detected",
            "type": "Observed",
            "details": "UDP/500 initiation request received. Nonces and DH values exchanged (Group 14)."
        },
        {
            "id": "sa-2",
            "time": "10:00:05",
            "event": "IKE_AUTH successful",
            "type": "Verified",
            "details": "Mutual authentication verified via pre-shared key credentials. Session established."
        },
        {
            "id": "sa-3",
            "time": "10:00:06",
            "event": "CHILD_SA established",
            "type": "Verified",
            "details": "Child SA created. Initial SPI negotiated: 0xC54B21D8 with AES-256-GCM."
        },
        {
            "id": "sa-4",
            "time": "10:00:08",
            "event": "ESP encrypted traffic started",
            "type": "Observed",
            "details": "First ESP packet captured (Protocol 50). Outgoing sequence: #1. Zero payload leakage."
        },
        {
            "id": "sa-5",
            "time": "10:15:05",
            "event": "Rekey initiated",
            "type": "Observed",
            "details": "CREATE_CHILD_SA exchange detected for scheduled SA renewal with PFS DH Group 14."
        },
        {
            "id": "sa-6",
            "time": "10:15:06",
            "event": "New SPI detected: 0xF8A91A43",
            "type": "Verified",
            "details": "Seamless cryptographic rollover confirmed. New Child SA active without packet drop.",
            "spi": "0xF8A91A43"
        },
        {
            "id": "sa-7",
            "time": "10:15:08",
            "event": "Previous Child SA closed successfully",
            "type": "Verified",
            "details": "Old SPI 0xC54B21D8 cleanly terminated. Rekey completed in 3 seconds."
        }
    ]
