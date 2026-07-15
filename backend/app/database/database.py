from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session

from app.config import settings

# ==================================================
# Database Engine
# ==================================================

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=(
        {"check_same_thread": False}
        if settings.DATABASE_URL.startswith("sqlite")
        else {}
    ),
    pool_pre_ping=True,
)

# ==================================================
# Database Session
# ==================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# ==================================================
# Base Model
# ==================================================

Base = declarative_base()

# ==================================================
# Dependency
# ==================================================

def get_db() -> Generator[Session, None, None]:
    """
    Create a database session for each request.
    The session is automatically closed afterwards.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()