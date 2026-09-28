from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...core.database import get_db
from ...core.security import require_roles
from ...models.entities import SecurityPolicy
from ...schemas.schemas import PolicyOut, PolicyCreate

router = APIRouter(prefix="/policies", tags=["Policies"])

@router.get("", response_model=List[PolicyOut])
def get_policies(db: Session = Depends(get_db)):
    policies = db.query(SecurityPolicy).all()
    return [PolicyOut.model_validate(p) for p in policies]

@router.post("", response_model=PolicyOut)
def create_policy(policy_data: PolicyCreate, db: Session = Depends(get_db)):
    existing = db.query(SecurityPolicy).filter(SecurityPolicy.name == policy_data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Policy with this name already exists")
    policy = SecurityPolicy(**policy_data.model_dump())
    db.add(policy)
    db.commit()
    db.refresh(policy)
    return PolicyOut.model_validate(policy)
