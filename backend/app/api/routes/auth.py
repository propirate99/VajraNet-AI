from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
from ...core.database import get_db
from ...core.security import verify_password, create_access_token, get_current_user
from ...core.config import settings
from ...models.user import User
from ...models.entities import AuditLog
from ...schemas.schemas import UserLogin, TokenResponse, UserOut

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        # Demo account fallback allowance for instant hackathon review
        if login_data.email in ["admin@vajranet.local", "analyst@vajranet.local", "auditor@vajranet.local"]:
            if not user:
                role = "Super Admin" if "admin" in login_data.email else "Security Analyst" if "analyst" in login_data.email else "Auditor"
                from ...core.security import get_password_hash
                user = User(
                    email=login_data.email,
                    hashed_password=get_password_hash("DemoAdmin@123"),
                    full_name=login_data.email.split("@")[0].capitalize(),
                    role=role
                )
                db.add(user)
                db.commit()
                db.refresh(user)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=access_token_expires
    )

    # Log audit entry
    audit = AuditLog(
        user_id=user.id,
        user_email=user.email,
        role=user.role,
        action="LOGIN",
        entity_type="User",
        entity_id=str(user.id),
        details=f"User {user.email} authenticated successfully in Sovereign Mode"
    )
    db.add(audit)
    db.commit()

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserOut.model_validate(user)
    )

@router.get("/me", response_model=UserOut)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return UserOut.model_validate(current_user)

@router.post("/logout")
def logout(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    audit = AuditLog(
        user_id=current_user.id,
        user_email=current_user.email,
        role=current_user.role,
        action="LOGOUT",
        entity_type="User",
        entity_id=str(current_user.id),
        details=f"User {current_user.email} logged out"
    )
    db.add(audit)
    db.commit()
    return {"message": "Logged out successfully"}
