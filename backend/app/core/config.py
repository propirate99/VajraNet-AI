import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "VajraNet AI"
    VERSION: str = "1.0.0 (SIH Sovereign Edition)"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "vajranet-sovereign-ipsec-jwt-secret-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Database: Default to local SQLite fallback if PostgreSQL not configured
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./vajranet.db")
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
    # Sovereign Operating Parameters
    AIR_GAPPED_MODE: bool = True
    ALLOW_CLOUD_EXPORT: bool = False
    DEMO_MODE: bool = True
    MINIMUM_SCORE_ALERT_THRESHOLD: int = 70
    
    class Config:
        case_sensitive = True

settings = Settings()
