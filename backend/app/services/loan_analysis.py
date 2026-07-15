from sqlalchemy.orm import Session

from app.database.models import Loan, FinancialProfile


def analyze_loans(user_id: int, db: Session):

    loans = db.query(Loan).filter(
        Loan.user_id == user_id
    ).all()

    profile = db.query(FinancialProfile).filter(
        FinancialProfile.user_id == user_id
    ).first()

    if not loans:
        return {
            "success": False,
            "message": "No loans found."
        }

    income = profile.monthly_income if profile else 0

    total_balance = sum(
        loan.remaining_balance for loan in loans
    )

    total_emi = sum(
        loan.emi for loan in loans
    )

    analysis = []

    for loan in loans:

        score = (
            loan.overdue_months * 5
            + loan.interest_rate
            + (loan.remaining_balance / 100000)
        )

        if score >= 80:
            priority = "High"
        elif score >= 40:
            priority = "Medium"
        else:
            priority = "Low"

        months_left = (
            int(loan.remaining_balance / loan.emi)
            if loan.emi > 0 else 0
        )

        analysis.append({
            "loan_id": loan.id,
            "loan_type": loan.loan_type,
            "lender": loan.lender,
            "remaining_balance": loan.remaining_balance,
            "interest_rate": loan.interest_rate,
            "emi": loan.emi,
            "priority": priority,
            "estimated_months_remaining": months_left
        })

    analysis.sort(
        key=lambda x: (
            {"High": 0, "Medium": 1, "Low": 2}[x["priority"]],
            -x["remaining_balance"]
        )
    )

    emi_ratio = (
        (total_emi / income) * 100
        if income > 0 else 0
    )

    return {
        "success": True,
        "total_loans": len(loans),
        "total_balance": round(total_balance, 2),
        "monthly_emi": round(total_emi, 2),
        "emi_to_income_ratio": round(emi_ratio, 2),
        "loan_priority": analysis
    }