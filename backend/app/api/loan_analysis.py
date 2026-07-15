from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.auth_dependency import get_current_user
from app.services.loan_analysis import analyze_loans

router = APIRouter(
    prefix="/loan-analysis",
    tags=["Loan Analysis"],
)


@router.get("/")
def loan_analysis(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return analyze_loans(
        user_id=current_user.id,
        db=db,
    )