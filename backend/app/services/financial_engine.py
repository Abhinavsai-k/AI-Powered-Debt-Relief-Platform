from sqlalchemy.orm import Session

from app.database.models import FinancialProfile, Loan


def analyze_finances(user_id: int, db: Session):
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

    if profile is None:
        return {
            "financial_score": 0,
            "financial_health": "Unknown",
            "risk_level": "Unknown",
            "monthly_surplus": 0,
            "total_outstanding_debt": 0,
            "monthly_emi": 0,
            "debt_to_income_ratio": 0,
            "emi_to_income_ratio": 0,
            "expense_ratio": 0,
            "savings_ratio": 0,
            "settlement_probability": 0,
            "loan_priority": [],
            "estimated_repayment_months": 0,
            "recommendations": [
                "Please create your Financial Profile first."
            ],
        }

    income = profile.monthly_income or 0
    expenses = profile.monthly_expenses or 0
    savings = profile.savings or 0
    credit = profile.credit_score or 0

    total_debt = sum(loan.remaining_balance for loan in loans)
    total_emi = sum(loan.emi for loan in loans)

    monthly_surplus = income - expenses

    debt_ratio = (
        (total_debt / income) * 100
        if income > 0 else 0
    )

    emi_ratio = (
        (total_emi / income) * 100
        if income > 0 else 0
    )

    expense_ratio = (
        (expenses / income) * 100
        if income > 0 else 0
    )

    savings_ratio = (
        (savings / income) * 100
        if income > 0 else 0
    )

    score = 100

    if emi_ratio > 60:
        score -= 30
    elif emi_ratio > 40:
        score -= 20
    elif emi_ratio > 25:
        score -= 10

    if savings_ratio < 10:
        score -= 20
    elif savings_ratio < 20:
        score -= 10

    if credit >= 750:
        score += 10
    elif credit < 600:
        score -= 20

    score = max(0, min(score, 100))

    if score >= 80:
        financial_health = "Excellent"
        risk = "Low"
    elif score >= 60:
        financial_health = "Good"
        risk = "Medium"
    elif score >= 40:
        financial_health = "Risky"
        risk = "High"
    else:
        financial_health = "Critical"
        risk = "Very High"

    probability = int(
        score * 0.7 +
        min(savings_ratio, 100) * 0.2 +
        min(credit / 10, 100) * 0.1
    )

    probability = max(0, min(probability, 100))

    # ==========================
    # Loan Priority Analysis
    # ==========================

    prioritized_loans = []

    for loan in loans:

        priority_score = (
            (loan.overdue_months * 10)
            + loan.interest_rate
            + (loan.remaining_balance / 100000)
        )

        if priority_score >= 40:
            priority = "High"
        elif priority_score >= 20:
            priority = "Medium"
        else:
            priority = "Low"

        prioritized_loans.append({
            "loan_type": loan.loan_type,
            "lender": loan.lender,
            "remaining_balance": round(loan.remaining_balance, 2),
            "interest_rate": loan.interest_rate,
            "overdue_months": loan.overdue_months,
            "priority": priority,
            "priority_score": round(priority_score, 2),
        })

    prioritized_loans.sort(
        key=lambda x: x["priority_score"],
        reverse=True,
    )

    # ==========================
    # Debt Repayment Timeline
    # ==========================

    repayment_months = 0

    if monthly_surplus > 0 and total_debt > 0:
        repayment_months = round(
            total_debt / monthly_surplus,
            1,
        )

    # ==========================
    # Recommendations
    # ==========================

    recommendations = []

    if monthly_surplus <= 0:
        recommendations.append(
            "Reduce monthly expenses to create a positive monthly surplus."
        )

    if emi_ratio > 40:
        recommendations.append(
            "Your EMI burden is high. Consider negotiating your loans."
        )

    if savings_ratio < 20:
        recommendations.append(
            "Increase your monthly savings."
        )

    if credit < 700:
        recommendations.append(
            "Improve your credit score for better settlement opportunities."
        )

    if total_debt > income * 12:
        recommendations.append(
            "Prioritize paying high-interest loans first."
        )

    if repayment_months > 60:
        recommendations.append(
            "Consider debt restructuring to reduce repayment duration."
        )

    if not recommendations:
        recommendations.append(
            "Your financial condition is healthy. Continue maintaining your finances."
        )

    return {
        "financial_score": score,
        "financial_health": financial_health,
        "risk_level": risk,

        "monthly_surplus": round(monthly_surplus, 2),

        "total_outstanding_debt": round(total_debt, 2),
        "monthly_emi": round(total_emi, 2),

        "debt_to_income_ratio": round(debt_ratio, 2),
        "emi_to_income_ratio": round(emi_ratio, 2),
        "expense_ratio": round(expense_ratio, 2),
        "savings_ratio": round(savings_ratio, 2),

        "settlement_probability": probability,

        "loan_priority": prioritized_loans,

        "estimated_repayment_months": repayment_months,

        "recommendations": recommendations,
    }