from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import FinancialProfile

from app.models.schemas import (
    FinancialProfileCreate,
    FinancialProfileUpdate,
)

from app.core.auth_dependency import get_current_user

router = APIRouter(
    prefix="/financial-profile",
    tags=["Financial Profile"],
)


# ==================================================
# GET My Financial Profile
# ==================================================
@router.get("/")
def get_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    profile = (
        db.query(FinancialProfile)
        .filter(FinancialProfile.user_id == current_user.id)
        .first()
    )

    if profile is None:
        return None

    return profile


# ==================================================
# POST Create Financial Profile
# ==================================================
@router.post("/")
def create_profile(
    profile: FinancialProfileCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    existing = (
        db.query(FinancialProfile)
        .filter(FinancialProfile.user_id == current_user.id)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Financial Profile already exists.",
        )

    new_profile = FinancialProfile(
        user_id=current_user.id,
        monthly_income=profile.monthly_income,
        monthly_expenses=profile.monthly_expenses,
        savings=profile.savings,
        employment_type=profile.employment_type,
        credit_score=profile.credit_score,
        dependents=profile.dependents,
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


# ==================================================
# PUT Update Financial Profile
# ==================================================
@router.put("/")
def update_profile(
    profile: FinancialProfileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    existing = (
        db.query(FinancialProfile)
        .filter(FinancialProfile.user_id == current_user.id)
        .first()
    )

    if existing is None:
        raise HTTPException(
            status_code=404,
            detail="Financial Profile not found.",
        )

    existing.monthly_income = profile.monthly_income
    existing.monthly_expenses = profile.monthly_expenses
    existing.savings = profile.savings
    existing.employment_type = profile.employment_type
    existing.credit_score = profile.credit_score
    existing.dependents = profile.dependents

    db.commit()
    db.refresh(existing)

    return existing


# ==================================================
# DELETE Financial Profile
# ==================================================
@router.delete("/")
def delete_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    profile = (
        db.query(FinancialProfile)
        .filter(FinancialProfile.user_id == current_user.id)
        .first()
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Financial Profile not found.",
        )

    db.delete(profile)
    db.commit()

    return {
        "success": True,
        "message": "Financial Profile deleted successfully."
    }