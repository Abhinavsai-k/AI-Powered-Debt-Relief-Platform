from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship

from app.database.database import Base


# ==================================================
# User Model
# ==================================================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    loans = relationship(
        "Loan",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    financial_profiles = relationship(
        "FinancialProfile",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    ai_history = relationship(
        "AIHistory",
        back_populates="user",
        cascade="all, delete-orphan",
    )


# ==================================================
# Loan Model
# ==================================================
class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    loan_type = Column(String, nullable=False)
    lender = Column(String, nullable=False)

    amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)

    tenure = Column(Integer, nullable=False)
    emi = Column(Float, nullable=False)

    overdue_months = Column(Integer, default=0)

    remaining_balance = Column(Float, nullable=False)

    status = Column(String, default="Active")

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship(
        "User",
        back_populates="loans",
    )

    settlements = relationship(
        "Settlement",
        back_populates="loan",
        cascade="all, delete-orphan",
    )


# ==================================================
# Financial Profile Model
# ==================================================
class FinancialProfile(Base):
    __tablename__ = "financial_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    monthly_income = Column(Float, nullable=False)
    monthly_expenses = Column(Float, nullable=False)
    savings = Column(Float, nullable=False)

    employment_type = Column(String, nullable=False)

    credit_score = Column(Integer, nullable=False)

    dependents = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    user = relationship(
        "User",
        back_populates="financial_profiles",
    )


# ==================================================
# Settlement Model
# ==================================================
class Settlement(Base):
    __tablename__ = "settlements"

    id = Column(Integer, primary_key=True, index=True)

    loan_id = Column(
        Integer,
        ForeignKey("loans.id"),
        nullable=False,
    )

    settlement_percentage = Column(Float, nullable=False)

    predicted_amount = Column(Float, nullable=False)

    eligibility = Column(String, nullable=False)

    status = Column(String, default="Pending")

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    loan = relationship(
        "Loan",
        back_populates="settlements",
    )


# ==================================================
# AI History Model
# ==================================================
class AIHistory(Base):
    __tablename__ = "ai_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    history_type = Column(
        String,
        nullable=False,
    )  # chat / strategy / letter

    prompt = Column(
        String,
        nullable=True,
    )

    response = Column(
        String,
        nullable=True,
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship(
        "User",
        back_populates="ai_history",
    )