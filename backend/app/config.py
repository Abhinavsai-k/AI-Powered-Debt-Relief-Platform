from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central configuration for the FinRelief AI application.
    All application settings are loaded from the .env file.
    """

    # ==================================================
    # Application
    # ==================================================
    APP_NAME: str = "FinRelief AI"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = True
    API_PREFIX: str = "/api"

    # ==================================================
    # Database
    # ==================================================
    DATABASE_URL: str

    # ==================================================
    # JWT Authentication
    # ==================================================
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120

    # ==================================================
    # Google Gemini
    # ==================================================
    GEMINI_API_KEY: str

    # ==================================================
    # CORS
    # ==================================================
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    # ==================================================
    # Logging
    # ==================================================
    LOG_LEVEL: str = "INFO"

    # ==================================================
    # Environment
    # ==================================================
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()