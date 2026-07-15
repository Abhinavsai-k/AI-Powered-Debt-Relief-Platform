from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.auth_dependency import get_current_user
from app.database.database import get_db
from app.services.financial_engine import analyze_finances

router = APIRouter(
    prefix="/financial-engine",
    tags=["Financial Engine"]
)


@router.post("/analyze")
def financial_analysis(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    """
    Analyze the financial health of the currently logged-in user.
    The frontend no longer needs to send a user_id.
    """

    return analyze_finances(
        user_id=current_user.id,
        db=db
    )