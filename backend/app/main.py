import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .core.config import settings
from .core.database import engine, Base
from .api.routes.auth import router as auth_router
from .api.routes.dashboard import router as dashboard_router
from .api.routes.tunnels import router as tunnels_router
from .api.routes.assessments import router as assessments_router
from .api.routes.findings import router as findings_router
from .api.routes.policies import router as policies_router
from .api.routes.reports import router as reports_router
from .api.routes.audit_logs import router as audit_logs_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema is created
    Base.metadata.create_all(bind=engine)
    
    # Auto-seed database if empty
    try:
        from seed_database import seed_initial_data
        seed_initial_data()
    except Exception as e:
        print(f"Database auto-seed note: {e}")
    
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Sovereign AI-Powered IPsec VPN Security Assessment Framework for Indian Government, Defence, and Healthcare Networks. Verify the Tunnel. Protect the Mission.",
    lifespan=lifespan
)

# Enable CORS for local Vite dev server and production clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routes
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(dashboard_router, prefix=settings.API_V1_STR)
app.include_router(tunnels_router, prefix=settings.API_V1_STR)
app.include_router(assessments_router, prefix=settings.API_V1_STR)
app.include_router(findings_router, prefix=settings.API_V1_STR)
app.include_router(policies_router, prefix=settings.API_V1_STR)
app.include_router(reports_router, prefix=settings.API_V1_STR)
app.include_router(audit_logs_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "OPERATIONAL",
        "mode": "ON-PREMISES / AIR-GAPPED READY",
        "version": settings.VERSION,
        "payload_decryption": "DISABLED (STRICT RFC 4303)",
        "cloud_export": "DISABLED"
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "framework": "VajraNet AI",
        "tagline": "Verify the Tunnel. Protect the Mission.",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
