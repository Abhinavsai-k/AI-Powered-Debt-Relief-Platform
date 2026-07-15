from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.models import Loan
from app.models.schemas import LoanCreate, LoanUpdate

from app.core.auth_dependency import get_current_user

router = APIRouter(
    prefix="/loans",
    tags=["Loans"],
)


# ==================================================
# Get My Loans
# ==================================================

@router.get("/")
def get_loans(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return (
        db.query(Loan)
        .filter(Loan.user_id == current_user.id)
        .all()
    )


# ==================================================
# Create Loan
# ==================================================

@router.post("/")
def create_loan(
    loan: LoanCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    new_loan = Loan(
        user_id=current_user.id,
        loan_type=loan.loan_type,
        lender=loan.lender,
        amount=loan.amount,
        interest_rate=loan.interest_rate,
        tenure=loan.tenure,
        emi=loan.emi,
        overdue_months=loan.overdue_months,
        remaining_balance=loan.remaining_balance,
        status=loan.status,
    )

    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)

    return new_loan


# ==================================================
# Get Loan By ID
# ==================================================

@router.get("/{loan_id}")
def get_loan(
    loan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    loan = (
        db.query(Loan)
        .filter(
            Loan.id == loan_id,
            Loan.user_id == current_user.id,
        )
        .first()
    )

    if loan is None:
        raise HTTPException(
            status_code=404,
            detail="Loan not found",
        )

    return loan


# ==================================================
# Update Loan
# ==================================================

@router.put("/{loan_id}")
def update_loan(
    loan_id: int,
    updated: LoanUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    loan = (
        db.query(Loan)
        .filter(
            Loan.id == loan_id,
            Loan.user_id == current_user.id,
        )
        .first()
    )

    if loan is None:
        raise HTTPException(
            status_code=404,
            detail="Loan not found",
        )

    loan.loan_type = updated.loan_type
    loan.lender = updated.lender
    loan.amount = updated.amount
    loan.interest_rate = updated.interest_rate
    loan.tenure = updated.tenure
    loan.emi = updated.emi
    loan.overdue_months = updated.overdue_months
    loan.remaining_balance = updated.remaining_balance
    loan.status = updated.status

    db.commit()
    db.refresh(loan)

    return loan


# ==================================================
# Delete Loan
# ==================================================

@router.delete("/{loan_id}")
def delete_loan(
    loan_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    loan = (
        db.query(Loan)
        .filter(
            Loan.id == loan_id,
            Loan.user_id == current_user.id,
        )
        .first()
    )

    if loan is None:
        raise HTTPException(
            status_code=404,
            detail="Loan not found",
        )

    db.delete(loan)
    db.commit()

    return {
        "success": True,
        "message": "Loan deleted successfully",
    }