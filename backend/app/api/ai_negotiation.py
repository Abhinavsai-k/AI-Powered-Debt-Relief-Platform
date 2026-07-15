from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database.database import get_db
from app.core.auth_dependency import get_current_user
from app.services.ai_negotiation import (
    generate_strategy,
    generate_letter,
)

router = APIRouter(
    prefix="/ai-negotiation",
    tags=["AI Negotiation"],
)


@router.post("/generate")
def ai_strategy(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_strategy(current_user.id, db)


@router.post("/letter")
def ai_letter(
    lender: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_letter(
        current_user.id,
        lender,
        db,
    )