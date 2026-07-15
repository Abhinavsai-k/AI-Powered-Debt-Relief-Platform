from sqlalchemy.orm import Session

from app.database.models import Loan, FinancialProfile


def predict_settlement(user_id: int, db: Session):
    profile = (
        db.query(FinancialProfile)
        .filter(FinancialProfile.user_id == user_id)
        .first()
    )

    loans = (
        db.query(Loan)
        .filter(Loan.user_id == user_id)
        .all()
    )

    if not loans:
        return {
            "success": False,
            "message": "No loans found."
        }

    results = []

    total_original = 0
    total_recommended = 0

    for loan in loans:

        total_original += loan.remaining_balance

        # Settlement Percentage
        if loan.overdue_months >= 12:
            settlement_percent = 45
        elif loan.overdue_months >= 6:
            settlement_percent = 60
        elif loan.overdue_months >= 3:
            settlement_percent = 75
        else:
            settlement_percent = 90

        recommended_amount = (
            loan.remaining_balance * settlement_percent
        ) / 100

        total_recommended += recommended_amount

        # Risk Category
        if loan.interest_rate >= 18:
            risk = "High"
        elif loan.interest_rate >= 10:
            risk = "Medium"
        else:
            risk = "Low"

        # Priority
        priority_score = (
            loan.overdue_months * 5
            + loan.interest_rate
            + (loan.remaining_balance / 100000)
        )

        if priority_score >= 80:
            priority = "High"
        elif priority_score >= 40:
            priority = "Medium"
        else:
            priority = "Low"

        # Settlement Eligibility
        if loan.overdue_months >= 6:
            eligibility = "Eligible"
        elif loan.overdue_months >= 3:
            eligibility = "Partially Eligible"
        else:
            eligibility = "Low Eligibility"

        # Recommendation
        if priority == "High":
            recommendation = (
                "Negotiate this loan immediately."
            )
        elif priority == "Medium":
            recommendation = (
                "Plan settlement within the next few months."
            )
        else:
            recommendation = (
                "Continue regular repayments."
            )

        results.append(
            {
                "loan_id": loan.id,
                "loan_type": loan.loan_type,
                "lender": loan.lender,
                "remaining_balance": round(
                    loan.remaining_balance,
                    2,
                ),
                "interest_rate": loan.interest_rate,
                "overdue_months": loan.overdue_months,

                "settlement_percentage": settlement_percent,
                "recommended_amount": round(
                    recommended_amount,
                    2,
                ),

                "risk_category": risk,
                "priority": priority,
                "priority_score": round(
                    priority_score,
                    2,
                ),

                "eligibility": eligibility,
                "recommendation": recommendation,
            }
        )

    # Sort highest priority first
    results.sort(
        key=lambda x: x["priority_score"],
        reverse=True,
    )

    estimated_savings = (
        total_original - total_recommended
    )

    return {
        "success": True,

        "financial_health": (
            profile.credit_score if profile else None
        ),

        "total_loans": len(results),

        "total_outstanding": round(
            total_original,
            2,
        ),

        "recommended_settlement_total": round(
            total_recommended,
            2,
        ),

        "estimated_savings": round(
            estimated_savings,
            2,
        ),

        "settlement_analysis": results,
    }