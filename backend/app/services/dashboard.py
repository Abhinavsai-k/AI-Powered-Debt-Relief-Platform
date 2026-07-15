from sqlalchemy.orm import Session

from app.database.models import Loan, FinancialProfile


def dashboard_summary(user_id: int, db: Session):

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

    if not profile:
        return {
            "success": False,
            "message": "Financial profile not found."
        }

    income = profile.monthly_income
    expenses = profile.monthly_expenses
    savings = profile.savings
    credit_score = profile.credit_score

    total_debt = sum(loan.remaining_balance for loan in loans)
    total_emi = sum(loan.emi for loan in loans)

    monthly_surplus = income - expenses

    debt_to_income_ratio = (
        round((total_debt / income) * 100, 2)
        if income > 0 else 0
    )

    emi_ratio = (
        round((total_emi / income) * 100, 2)
        if income > 0 else 0
    )

    savings_ratio = (
        round((savings / income) * 100, 2)
        if income > 0 else 0
    )

    # Financial Score
    score = 100

    if emi_ratio > 70:
        score -= 30
    elif emi_ratio > 50:
        score -= 20
    elif emi_ratio > 30:
        score -= 10

    if savings_ratio < 20:
        score -= 10

    if credit_score < 600:
        score -= 20
    elif credit_score >= 750:
        score += 10

    score = max(0, min(score, 100))

    # Financial Health
    if score >= 80:
        financial_health = "Excellent"
    elif score >= 60:
        financial_health = "Good"
    elif score >= 40:
        financial_health = "Risky"
    else:
        financial_health = "Critical"

    # Debt Stress
    if debt_to_income_ratio < 30:
        debt_stress = "Low"
    elif debt_to_income_ratio < 60:
        debt_stress = "Medium"
    else:
        debt_stress = "High"

    # Settlement Probability
    settlement_probability = min(
        100,
        int((score * 0.6) + (credit_score * 0.05))
    )

    # Highest Priority Loan
    highest_priority = "None"

    if loans:
        highest = max(
            loans,
            key=lambda loan: (
                loan.overdue_months,
                loan.interest_rate,
                loan.remaining_balance,
            ),
        )

        highest_priority = (
            f"{highest.loan_type} ({highest.lender})"
        )

    recommendations = []

    if monthly_surplus <= 0:
        recommendations.append(
            "Reduce monthly expenses."
        )

    if debt_stress == "High":
        recommendations.append(
            "Negotiate high-interest loans first."
        )

    if savings_ratio < 20:
        recommendations.append(
            "Increase monthly savings."
        )

    if credit_score < 700:
        recommendations.append(
            "Improve your credit score."
        )

    if not recommendations:
        recommendations.append(
            "Your financial health is excellent."
        )

    return {
        "success": True,

        "financial_score": score,
        "financial_health": financial_health,

        "monthly_income": income,
        "monthly_expenses": expenses,
        "monthly_savings": savings,
        "monthly_surplus": monthly_surplus,

        "active_loans": len(loans),

        "monthly_emi": total_emi,
        "total_outstanding_debt": total_debt,

        "emi_to_income_ratio": emi_ratio,
        "debt_to_income_ratio": debt_to_income_ratio,
        "savings_ratio": savings_ratio,

        "debt_stress": debt_stress,

        "settlement_probability": settlement_probability,

        "highest_priority_loan": highest_priority,

        "recommendations": recommendations,
    }